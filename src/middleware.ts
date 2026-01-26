import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple middleware that redirects to sign-in if no auth cookie is present
// This avoids importing server-only code in edge runtime
export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("authjs.session-token") ||
                     request.cookies.get("__Secure-authjs.session-token");

  // Allow auth pages and API routes
  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  const isApiRoute = pathname.startsWith("/api/");
  const isStaticFile = pathname.startsWith("/_next/") ||
                       pathname.startsWith("/favicon.ico");

  if (isAuthPage || isApiRoute || isStaticFile) {
    return NextResponse.next();
  }

  // Redirect to sign-in if no auth cookie
  if (!authCookie) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
