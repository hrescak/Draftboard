import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Okta from "next-auth/providers/okta";
import Google from "next-auth/providers/google";
import { getAuthMode } from "~/lib/auth-provider";

/**
 * Edge-compatible auth config.
 * This file should NOT import Prisma or any Node.js-specific libraries.
 * It's used by the middleware which runs on the Edge runtime.
 *
 * Provider declarations here are stubs for Edge — the actual authorization
 * logic and full provider config lives in auth.ts (Node.js runtime).
 */

const authMode = getAuthMode();

function getEdgeProviders(): NextAuthConfig["providers"] {
  switch (authMode) {
    case "okta":
      return [
        Okta({
          clientId: process.env.AUTH_OKTA_CLIENT_ID,
          clientSecret: process.env.AUTH_OKTA_CLIENT_SECRET,
          issuer: process.env.AUTH_OKTA_ISSUER,
        }),
      ];
    case "google":
      return [
        Google({
          clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
          clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
          authorization: {
            params: {
              // hd param pre-selects the Google Workspace domain in the consent screen
              ...(process.env.AUTH_GOOGLE_ALLOWED_DOMAIN && {
                hd: process.env.AUTH_GOOGLE_ALLOWED_DOMAIN,
              }),
            },
          },
        }),
      ];
    default:
      return [
        Credentials({
          name: "credentials",
          credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
          },
          // This authorize function is overridden in auth.ts
          authorize: () => null,
        }),
      ];
  }
}

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: getEdgeProviders(),
  callbacks: {
    authorized({ auth, request }) {
      // Redirect deactivated users to sign-out flow
      if (auth?.user?.deactivated) {
        return Response.redirect(new URL("/deactivated", request.url));
      }
      return !!auth?.user;
    },
  },
};
