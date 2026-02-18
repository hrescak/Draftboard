import { NextRequest } from "next/server";
import { normalizeProfileSlug } from "~/lib/profile-slug";
import { getPresignedDownloadUrl, isR2Configured } from "~/lib/r2";
import {
  buildStaticObjectCandidates,
  normalizeStaticRequestPath,
  normalizeStaticSiteSlug,
} from "~/lib/static-sites";
import { db } from "~/server/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface StaticSiteRouteParams {
  profileSlug: string;
  siteSlug: string;
  path?: string[];
}

const PASSTHROUGH_HEADERS = [
  "content-type",
  "cache-control",
  "last-modified",
] as const;

async function fetchObjectFromR2(key: string, method: "GET" | "HEAD"): Promise<Response | null> {
  const signedUrl = await getPresignedDownloadUrl(key);
  const upstream = await fetch(signedUrl, {
    method,
    cache: "no-store",
  });

  if (upstream.status === 404) {
    return null;
  }

  if (!upstream.ok) {
    throw new Error(`R2 responded with status ${upstream.status}`);
  }

  const headers = new Headers();
  for (const headerName of PASSTHROUGH_HEADERS) {
    const value = upstream.headers.get(headerName);
    if (value) {
      headers.set(headerName, value);
    }
  }

  if (!headers.has("cache-control")) {
    headers.set("cache-control", "public, max-age=0, must-revalidate");
  }

  return new Response(method === "HEAD" ? null : upstream.body, {
    status: 200,
    headers,
  });
}

async function resolveSiteData(rawProfileSlug: string, rawSiteSlug: string) {
  const profileSlug = normalizeProfileSlug(rawProfileSlug);
  const siteSlug = normalizeStaticSiteSlug(rawSiteSlug);

  const site = await db.staticSite.findFirst({
    where: {
      slug: siteSlug,
      owner: {
        profileSlug,
      },
    },
    select: {
      activeDeployment: {
        select: {
          id: true,
          prefix: true,
          status: true,
        },
      },
    },
  });

  if (!site?.activeDeployment || site.activeDeployment.status !== "ACTIVE") {
    return null;
  }

  return site;
}

async function handleRequest(
  request: NextRequest,
  paramsPromise: Promise<StaticSiteRouteParams>,
  method: "GET" | "HEAD",
): Promise<Response> {
  if (!isR2Configured()) {
    return new Response("Static hosting is not configured", { status: 503 });
  }

  const params = await paramsPromise;

  let site;
  try {
    site = await resolveSiteData(params.profileSlug, params.siteSlug);
  } catch {
    return new Response("Not Found", { status: 404 });
  }

  if (!site?.activeDeployment) {
    return new Response("Not Found", { status: 404 });
  }

  let requestPath = "";
  try {
    requestPath = normalizeStaticRequestPath(params.path);
  } catch {
    return new Response("Not Found", { status: 404 });
  }

  const objectCandidates = buildStaticObjectCandidates(requestPath);

  try {
    for (const candidate of objectCandidates) {
      const key = `${site.activeDeployment.prefix}/${candidate}`;
      const response = await fetchObjectFromR2(key, method);
      if (response) {
        return response;
      }
    }

    const fallback404 = await fetchObjectFromR2(
      `${site.activeDeployment.prefix}/404.html`,
      method,
    );

    if (!fallback404) {
      return new Response("Not Found", { status: 404 });
    }

    return new Response(method === "HEAD" ? null : fallback404.body, {
      status: 404,
      headers: fallback404.headers,
    });
  } catch (error) {
    console.error("Failed to serve static site request", {
      url: request.url,
      error,
    });

    return new Response("Failed to load static asset", { status: 502 });
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<StaticSiteRouteParams> },
) {
  return handleRequest(request, context.params, "GET");
}

export async function HEAD(
  request: NextRequest,
  context: { params: Promise<StaticSiteRouteParams> },
) {
  return handleRequest(request, context.params, "HEAD");
}
