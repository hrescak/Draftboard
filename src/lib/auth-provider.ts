/**
 * Auth Provider Detection
 *
 * Determines which authentication mode is active based on environment variables.
 * Only ONE auth provider can be active at a time per deployment.
 *
 * - "credentials": Default. Email/password auth (no special env vars needed)
 * - "okta": Okta SSO. Requires AUTH_OKTA_CLIENT_ID, AUTH_OKTA_CLIENT_SECRET, AUTH_OKTA_ISSUER
 * - "google": Google Workspace. Requires AUTH_GOOGLE_CLIENT_ID, AUTH_GOOGLE_CLIENT_SECRET
 */

export type AuthMode = "credentials" | "okta" | "google";

export function getAuthMode(): AuthMode {
  const oktaVars = {
    AUTH_OKTA_CLIENT_ID: process.env.AUTH_OKTA_CLIENT_ID,
    AUTH_OKTA_CLIENT_SECRET: process.env.AUTH_OKTA_CLIENT_SECRET,
    AUTH_OKTA_ISSUER: process.env.AUTH_OKTA_ISSUER,
  };

  const googleVars = {
    AUTH_GOOGLE_CLIENT_ID: process.env.AUTH_GOOGLE_CLIENT_ID,
    AUTH_GOOGLE_CLIENT_SECRET: process.env.AUTH_GOOGLE_CLIENT_SECRET,
  };

  const oktaSet = Object.entries(oktaVars).filter(([, v]) => !!v);
  const googleSet = Object.entries(googleVars).filter(([, v]) => !!v);

  const hasOkta = oktaSet.length === Object.keys(oktaVars).length;
  const hasGoogle = googleSet.length === Object.keys(googleVars).length;

  // Detect partial SSO configuration — operator likely intended SSO but missed a variable
  if (!hasOkta && oktaSet.length > 0) {
    const missing = Object.entries(oktaVars)
      .filter(([, v]) => !v)
      .map(([k]) => k);
    throw new Error(
      `Incomplete Okta SSO configuration: missing ${missing.join(", ")}. ` +
        "Set all AUTH_OKTA_* variables to enable Okta SSO, or remove them all to use credentials auth."
    );
  }

  if (!hasGoogle && googleSet.length > 0) {
    const missing = Object.entries(googleVars)
      .filter(([, v]) => !v)
      .map(([k]) => k);
    throw new Error(
      `Incomplete Google auth configuration: missing ${missing.join(", ")}. ` +
        "Set all required AUTH_GOOGLE_* variables to enable Google auth, or remove them all to use credentials auth."
    );
  }

  if (hasOkta && hasGoogle) {
    throw new Error(
      "Invalid auth configuration: both Okta and Google auth providers are configured. " +
        "Only one auth provider can be active per deployment. " +
        "Remove either the AUTH_OKTA_* or AUTH_GOOGLE_* environment variables."
    );
  }

  if (hasOkta) return "okta";
  if (hasGoogle) return "google";
  return "credentials";
}

/** Whether the current auth mode uses SSO (OAuth) rather than credentials */
export function isSSO(): boolean {
  return getAuthMode() !== "credentials";
}
