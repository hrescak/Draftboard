import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { db } from "~/server/db";

interface InvitePageProps {
  params: Promise<{ token: string }>;
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { token } = await params;

  // Validate the invite token
  const settings = await db.siteSettings.findFirst({
    where: { inviteToken: token },
  });

  if (!settings) {
    // Invalid token - redirect to sign-in with error
    redirect("/sign-in?error=invalid_invite");
  }

  // Valid token - set cookie and redirect to sign-up
  const cookieStore = await cookies();
  cookieStore.set("invite_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  redirect("/sign-up");
}
