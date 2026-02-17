import { NextRequest } from "next/server";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { createPublishSessionSchema } from "~/lib/static-sites";
import {
  hashPublishSessionToken,
  makePublishSessionToken,
} from "~/lib/static-publish-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const parsed = createPublishSessionSchema.safeParse(body);

  if (!parsed.success) {
    return new Response(parsed.error.issues[0]?.message || "Invalid request payload", {
      status: 400,
    });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      profileSlug: true,
      deactivated: true,
    },
  });

  if (!user || user.deactivated) {
    return new Response("Unauthorized", { status: 401 });
  }

  const expiresInMinutes = parsed.data.expiresInMinutes ?? 60;
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);

  const token = makePublishSessionToken();
  const tokenHash = hashPublishSessionToken(token);

  await db.staticPublishSession.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt,
    },
  });

  return Response.json(
    {
      token,
      profileSlug: user.profileSlug,
      expiresAt: expiresAt.toISOString(),
      expiresInMinutes,
    },
    {
      headers: {
        "cache-control": "no-store",
      },
    },
  );
}
