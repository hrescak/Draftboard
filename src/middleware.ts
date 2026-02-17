import NextAuth from "next-auth";
import { authConfig } from "~/server/auth.config";

// Use lightweight auth config for middleware (Edge runtime compatible)
// This avoids bundling Prisma and other Node.js dependencies
const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes - handled by tRPC)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon, manifest, icons (public assets)
     * - s/<slug> (public static-site hosting route)
     * - u/<profile>/<slug> (public static-site hosting route)
     * - sign-in, sign-up, invite, deactivated, reset-password (auth pages)
     */
    "/((?!api|_next/static|_next/image|favicon|manifest|icon-|logo|avatar|sign-in|sign-up|invite|deactivated|reset-password|s(?:/|$)|u(?:/|$)).*)",
  ],
};
