import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import {
  normalizeStaticSiteSlug,
  staticSiteFinalizeSchema,
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

function buildLexicalTextState(text: string): Prisma.InputJsonValue {
  return {
    root: {
      type: "root",
      version: 1,
      format: "",
      indent: 0,
      direction: null,
      children: [
        {
          type: "paragraph",
          version: 1,
          format: "",
          indent: 0,
          direction: null,
          children: [
            {
              type: "text",
              version: 1,
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text,
            },
          ],
        },
      ],
    },
  } as Prisma.InputJsonValue;
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
  const parsed = staticSiteFinalizeSchema.safeParse(body);

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
        slug: true,
        name: true,
        ownerId: true,
        activeDeploymentId: true,
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
        publishedPostId: true,
      },
    });

    if (!deployment || deployment.siteId !== site.id) {
      return new Response("Deployment not found", { status: 404 });
    }

    if (deployment.status === "ARCHIVED") {
      return new Response("Deployment is archived and cannot be activated", {
        status: 409,
      });
    }

    const deploymentUpdateData: {
      status: "ACTIVE";
      activatedAt: Date;
      fileCount?: number;
      totalBytes?: number;
      publishedPostId?: string;
    } = {
      status: "ACTIVE",
      activatedAt: new Date(),
    };

    if (typeof parsed.data.fileCount === "number") {
      deploymentUpdateData.fileCount = parsed.data.fileCount;
    }

    if (typeof parsed.data.totalBytes === "number") {
      deploymentUpdateData.totalBytes = parsed.data.totalBytes;
    }

    const shouldCreatePost = parsed.data.createPost ?? true;

    const publishUrl = staticSiteUrl(
      getBaseUrl(request),
      ownerContext.profileSlug,
      site.slug,
    );

    const result = await db.$transaction(async (tx) => {
      let publishedPostId = deployment.publishedPostId;

      if (shouldCreatePost && !publishedPostId) {
        const post = await tx.post.create({
          data: {
            title: site.name,
            content: buildLexicalTextState(
              `Published ${site.name} at ${publishUrl}`,
            ),
            liveUrl: publishUrl,
            authorId: site.ownerId,
          },
          select: {
            id: true,
          },
        });
        publishedPostId = post.id;
      }

      if (site.activeDeploymentId && site.activeDeploymentId !== deployment.id) {
        await tx.staticDeployment.update({
          where: { id: site.activeDeploymentId },
          data: { status: "ARCHIVED" },
        });
      }

      if (publishedPostId) {
        deploymentUpdateData.publishedPostId = publishedPostId;
      }

      await tx.staticDeployment.update({
        where: { id: deployment.id },
        data: deploymentUpdateData,
      });

      await tx.staticSite.update({
        where: { id: site.id },
        data: { activeDeploymentId: deployment.id },
      });

      return {
        publishedPostId,
      };
    });

    return Response.json({
      deploymentId: deployment.id,
      siteSlug: site.slug,
      ownerProfileSlug: ownerContext.profileSlug,
      publishedPostId: result.publishedPostId,
      url: publishUrl,
    });
  } catch (error) {
    console.error("Failed to finalize static site deployment", error);
    return new Response("Failed to finalize deployment", { status: 500 });
  }
}
