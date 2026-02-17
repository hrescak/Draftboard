import { NextRequest } from "next/server";
import { getPresignedUploadUrlForKey } from "~/lib/r2";
import {
  inferStaticAssetCacheControl,
  normalizeStaticObjectPath,
  normalizeStaticSiteSlug,
  staticSiteSignSchema,
} from "~/lib/static-sites";
import { authenticateStaticPublishRequest } from "~/lib/static-publish-auth";
import { resolveStaticSiteOwnerContext } from "~/lib/static-site-owner";
import { db } from "~/server/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const authResult = await authenticateStaticPublishRequest({
    request,
    db,
  });
  if (authResult instanceof Response) {
    return authResult;
  }

  const body = await request.json().catch(() => null);
  const parsed = staticSiteSignSchema.safeParse(body);

  if (!parsed.success) {
    return new Response(parsed.error.issues[0]?.message || "Invalid request payload", {
      status: 400,
    });
  }

  let siteSlug: string;
  try {
    siteSlug = normalizeStaticSiteSlug(parsed.data.siteSlug);
  } catch (error) {
    return new Response(error instanceof Error ? error.message : "Invalid site slug", {
      status: 400,
    });
  }

  try {
    const ownerContext = await resolveStaticSiteOwnerContext({
      db,
      actor: authResult.actor,
      ownerProfileSlug: parsed.data.ownerProfileSlug,
    });
    if (ownerContext instanceof Response) {
      return ownerContext;
    }

    const site = await db.staticSite.findUnique({
      where: {
        ownerId_slug: {
          ownerId: ownerContext.ownerId,
          slug: siteSlug,
        },
      },
      select: {
        id: true,
      },
    });

    if (!site) {
      return new Response("Site not found", { status: 404 });
    }

    const deployment = await db.staticDeployment.findUnique({
      where: { id: parsed.data.deploymentId },
      select: {
        id: true,
        siteId: true,
        status: true,
        prefix: true,
      },
    });

    if (!deployment || deployment.siteId !== site.id) {
      return new Response("Deployment not found", { status: 404 });
    }

    if (deployment.status !== "UPLOADING") {
      return new Response("Deployment is not accepting uploads", { status: 409 });
    }

    const seenPaths = new Set<string>();
    const normalizedFiles: Array<{ path: string; contentType: string }> = [];

    for (const file of parsed.data.files) {
      let normalizedPath: string;
      try {
        normalizedPath = normalizeStaticObjectPath(file.path);
      } catch (error) {
        return new Response(
          error instanceof Error ? `Invalid file path (${file.path}): ${error.message}` : "Invalid file path",
          { status: 400 },
        );
      }

      if (seenPaths.has(normalizedPath)) {
        return new Response(`Duplicate file path in request: ${normalizedPath}`, {
          status: 400,
        });
      }
      seenPaths.add(normalizedPath);

      normalizedFiles.push({
        path: normalizedPath,
        contentType: file.contentType,
      });
    }

    const uploads = await Promise.all(
      normalizedFiles.map(async (file) => {
        const cacheControl = inferStaticAssetCacheControl(file.path);
        const key = `${deployment.prefix}/${file.path}`;
        const signed = await getPresignedUploadUrlForKey({
          key,
          contentType: file.contentType,
          cacheControl,
        });

        return {
          path: file.path,
          key,
          uploadUrl: signed.uploadUrl,
          headers: {
            "content-type": file.contentType,
            "cache-control": cacheControl,
          },
        };
      }),
    );

    return Response.json({
      deploymentId: deployment.id,
      uploads,
    });
  } catch (error) {
    console.error("Failed to sign static site files", error);
    return new Response("Failed to sign upload URLs", { status: 500 });
  }
}
