import { NextRequest, NextResponse } from "next/server";
import {
  normalizeStaticRequestPath,
  normalizeStaticSiteSlug,
} from "~/lib/static-sites";
import { db } from "~/server/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface StaticSiteLegacyRouteParams {
  slug: string;
  path?: string[];
}

async function resolveLegacySiteSlug(rawSlug: string): Promise<{
  status: "ok" | "not_found" | "ambiguous";
  profileSlug?: string;
  siteSlug?: string;
}> {
  const siteSlug = normalizeStaticSiteSlug(rawSlug);

  const matches = await db.staticSite.findMany({
    where: {
      slug: siteSlug,
      activeDeployment: {
        status: "ACTIVE",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 2,
    select: {
      owner: {
        select: {
          profileSlug: true,
        },
      },
    },
  });

  if (matches.length === 0) {
    return { status: "not_found" };
  }

  if (matches.length > 1) {
    return { status: "ambiguous" };
  }

  return {
    status: "ok",
    profileSlug: matches[0]?.owner.profileSlug,
    siteSlug,
  };
}

async function handleRequest(
  request: NextRequest,
  paramsPromise: Promise<StaticSiteLegacyRouteParams>,
): Promise<Response> {
  const params = await paramsPromise;

  let resolvedSite;
  try {
    resolvedSite = await resolveLegacySiteSlug(params.slug);
  } catch {
    return new Response("Not Found", { status: 404 });
  }

  if (resolvedSite.status === "not_found") {
    return new Response("Not Found", { status: 404 });
  }

  if (resolvedSite.status === "ambiguous") {
    return new Response("Multiple sites use this slug. Use /u/<profile>/<site>.", {
      status: 409,
    });
  }

  let requestPath = "";
  try {
    requestPath = normalizeStaticRequestPath(params.path);
  } catch {
    return new Response("Not Found", { status: 404 });
  }

  const pathSuffix = requestPath ? `/${requestPath}` : "";
  const destination = new URL(
    `/u/${resolvedSite.profileSlug}/${resolvedSite.siteSlug}${pathSuffix}`,
    request.url,
  );
  destination.search = request.nextUrl.search;

  return NextResponse.redirect(destination, { status: 307 });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<StaticSiteLegacyRouteParams> },
) {
  return handleRequest(request, context.params);
}

export async function HEAD(
  request: NextRequest,
  context: { params: Promise<StaticSiteLegacyRouteParams> },
) {
  return handleRequest(request, context.params);
}
