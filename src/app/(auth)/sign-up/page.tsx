import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { db } from "~/server/db";
import { isSSO } from "~/lib/auth-provider";
import { SignUpForm } from "./sign-up-form";

export const dynamic = "force-dynamic";

export default async function SignUpPage() {
  // SSO deployments don't use sign-up — users are auto-provisioned on first SSO sign-in
  if (isSSO()) {
    redirect("/sign-in");
  }

  // Check if any users exist
  const userCount = await db.user.count();
  const isFirstUser = userCount === 0;

  // Get invite token from cookie
  const cookieStore = await cookies();
  const inviteToken = cookieStore.get("invite_token")?.value;

  // If not first user and no invite token, redirect to sign-in
  if (!isFirstUser && !inviteToken) {
    redirect("/sign-in");
  }

  // If has invite token, validate it
  if (inviteToken && !isFirstUser) {
    const settings = await db.siteSettings.findFirst({
      where: { inviteToken },
    });

    if (!settings) {
      // Invalid token - clear cookie and redirect
      cookieStore.delete("invite_token");
      redirect("/sign-in?error=invalid_invite");
    }
  }

  return (
    <SignUpForm 
      isFirstUser={isFirstUser} 
      inviteToken={inviteToken} 
    />
  );
}
