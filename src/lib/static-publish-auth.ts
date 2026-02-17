import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { getPublishTokenFromRequest } from "~/lib/static-sites";

export interface StaticPublishActor {
  type: "service" | "user";
  userId?: string;
  profileSlug?: string;
}

interface AuthenticatedStaticPublish {
  actor: StaticPublishActor;
  tokenHash?: string;
}

function tokenHash(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function constantTimeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function makePublishSessionToken(): string {
  return `spub_${randomBytes(24).toString("hex")}`;
}

export function hashPublishSessionToken(token: string): string {
  return tokenHash(token);
}

export async function authenticateStaticPublishRequest(params: {
  request: Request;
  db: typeof import("~/server/db").db;
}): Promise<AuthenticatedStaticPublish | Response> {
  const providedToken = getPublishTokenFromRequest(params.request);
  if (!providedToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const configuredServiceToken = process.env.STATIC_PUBLISH_TOKEN?.trim();
  if (configuredServiceToken && constantTimeEqual(providedToken, configuredServiceToken)) {
    return { actor: { type: "service" } };
  }

  const hashedToken = tokenHash(providedToken);

  const session = await params.db.staticPublishSession.findFirst({
    where: {
      tokenHash: hashedToken,
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
    select: {
      id: true,
      userId: true,
      user: {
        select: {
          profileSlug: true,
        },
      },
    },
  });

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  await params.db.staticPublishSession.update({
    where: { id: session.id },
    data: { lastUsedAt: new Date() },
  });

  return {
    actor: {
      type: "user",
      userId: session.userId,
      profileSlug: session.user.profileSlug,
    },
    tokenHash: hashedToken,
  };
}
