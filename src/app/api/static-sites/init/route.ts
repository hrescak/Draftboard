import { NextRequest } from "next/server";
import {
  makeStaticDeploymentKey,
  normalizeStaticSiteSlug,
  staticSiteInitSchema,
  staticSiteUrl,
} from "~/lib/static-sites";
import { authenticateStaticPublishRequest } from "~/lib/static-publish-auth";
import { resolveStaticSiteOwnerContext } from "~/lib/static-site-owner";
import { db } from "~/server/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getBaseUrl(request: NextRequest): string {
  return process.env.NEXTAUTH_URL?.trim() || request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  const authResult = await authenticateStaticPublishRequest({
    request,
    db,
  });
  if (authResult instanceof Response) {
    return authResult;
  }

  const body = await request.json().catch(() => null);
  const parsed = staticSiteInitSchema.safeParse(body);

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

    const siteName = parsed.data.siteName?.trim() || siteSlug;
    const deploymentKey = makeStaticDeploymentKey();
    const prefix = `sites/${ownerContext.profileSlug}/${siteSlug}/${deploymentKey}`;

    const site = await db.staticSite.upsert({
      where: {
        ownerId_slug: {
          ownerId: ownerContext.ownerId,
          slug: siteSlug,
        },
      },
      create: {
        ownerId: ownerContext.ownerId,
        slug: siteSlug,
        name: siteName,
      },
      update: parsed.data.siteName ? { name: siteName } : {},
      select: {
        id: true,
        slug: true,
        name: true,
        owner: {
          select: {
            profileSlug: true,
          },
        },
      },
    });

    const deployment = await db.staticDeployment.create({
      data: {
        siteId: site.id,
        deploymentKey,
        prefix,
        status: "UPLOADING",
      },
      select: {
        id: true,
        deploymentKey: true,
        prefix: true,
        createdAt: true,
      },
    });

    const baseUrl = getBaseUrl(request);

    return Response.json({
      site,
      deployment,
      publishUrl: staticSiteUrl(baseUrl, site.owner.profileSlug, site.slug),
    });
  } catch (error) {
    console.error("Failed to initialize static site deployment", error);
    return new Response("Failed to initialize deployment", { status: 500 });
  }
}
