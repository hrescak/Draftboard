import { normalizeProfileSlug } from "~/lib/profile-slug";
import { type StaticPublishActor } from "~/lib/static-publish-auth";

interface StaticSiteOwnerContext {
  ownerId: string;
  profileSlug: string;
}

export async function resolveStaticSiteOwnerContext(params: {
  db: typeof import("~/server/db").db;
  actor: StaticPublishActor;
  ownerProfileSlug?: string;
}): Promise<StaticSiteOwnerContext | Response> {
  if (params.actor.type === "user") {
    if (!params.actor.userId || !params.actor.profileSlug) {
      return new Response("Unauthorized", { status: 401 });
    }

    const actorProfileSlug = normalizeProfileSlug(params.actor.profileSlug);
    if (params.ownerProfileSlug) {
      let requestedProfileSlug: string;
      try {
        requestedProfileSlug = normalizeProfileSlug(params.ownerProfileSlug);
      } catch (error) {
        return new Response(
          error instanceof Error ? error.message : "Invalid profile slug",
          {
            status: 400,
          },
        );
      }

      if (requestedProfileSlug !== actorProfileSlug) {
        return new Response("Token cannot publish to another profile", {
          status: 403,
        });
      }
    }

    return {
      ownerId: params.actor.userId,
      profileSlug: actorProfileSlug,
    };
  }

  if (!params.ownerProfileSlug) {
    return new Response("ownerProfileSlug is required for service token publishing", {
      status: 400,
    });
  }

  let normalizedProfileSlug: string;
  try {
    normalizedProfileSlug = normalizeProfileSlug(params.ownerProfileSlug);
  } catch (error) {
    return new Response(
      error instanceof Error ? error.message : "Invalid profile slug",
      {
        status: 400,
      },
    );
  }

  const owner = await params.db.user.findUnique({
    where: { profileSlug: normalizedProfileSlug },
    select: {
      id: true,
      profileSlug: true,
      deactivated: true,
    },
  });

  if (!owner) {
    return new Response("Profile not found", { status: 404 });
  }

  if (owner.deactivated) {
    return new Response("Profile is deactivated", { status: 403 });
  }

  return {
    ownerId: owner.id,
    profileSlug: owner.profileSlug,
  };
}
