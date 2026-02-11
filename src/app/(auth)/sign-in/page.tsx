import { getAuthMode } from "~/lib/auth-provider";
import { CredentialsSignIn } from "./credentials-sign-in";
import { SSOSignIn } from "./sso-sign-in";

export default function SignInPage() {
  const authMode = getAuthMode();

  if (authMode === "credentials") {
    return <CredentialsSignIn />;
  }

  return <SSOSignIn authMode={authMode} />;
}
