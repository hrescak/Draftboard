import { NextRequest } from "next/server";
import { auth } from "~/server/auth";
import { getPresignedDownloadUrl } from "~/lib/r2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function buildBadRequest(message: string) {
  return new Response(message, { status: 400 });
}

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const key = request.nextUrl.searchParams.get("key");
  const src = request.nextUrl.searchParams.get("src");

  let sourceUrl: string | null = null;

  if (key) {
    sourceUrl = await getPresignedDownloadUrl(key);
  } else if (src) {
    try {
      const parsed = new URL(src);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return buildBadRequest("Invalid source protocol");
      }
      sourceUrl = parsed.toString();
    } catch {
      return buildBadRequest("Invalid source URL");
    }
  } else {
    return buildBadRequest("Missing frame source");
  }

  try {
    const upstream = await fetch(sourceUrl, {
      cache: "no-store",
    });

    if (!upstream.ok || !upstream.body) {
      return new Response("Failed to fetch frame image", {
        status: upstream.status || 502,
      });
    }

    const headers = new Headers();
    const contentType = upstream.headers.get("content-type");
    if (contentType) {
      headers.set("Content-Type", contentType);
    }
    headers.set("Cache-Control", "private, max-age=300");

    return new Response(upstream.body, {
      status: 200,
      headers,
    });
  } catch {
    return new Response("Failed to fetch frame image", { status: 502 });
  }
}
