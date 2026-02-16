import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { isSSO } from "~/lib/auth-provider";
import { InviteProcessor } from "./invite-processor";

export const metadata: Metadata = {
  title: "Join Draftboard",
  description: "You've been invited to share with your team.",
  openGraph: {
    title: "Join Draftboard",
    description: "You've been invited to share with your team.",
    images: [{ url: "/OG_invite.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Draftboard",
    description: "You've been invited to share with your team.",
    images: ["/OG_invite.png"],
  },
};

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function InvitePage({ params }: PageProps) {
  // Invite links don't apply for SSO — users are auto-provisioned
  if (isSSO()) {
    redirect("/sign-in");
  }

  const { token } = await params;

  // Validate the invite token
  const settings = await db.siteSettings.findFirst({
    where: { inviteToken: token },
  });

  if (!settings) {
    redirect("/sign-in?error=invalid_invite");
  }

  return <InviteProcessor token={token} />;
}
