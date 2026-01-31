import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware handles auth redirects
// Note: Can't access database in edge runtime, so sign-up page handles invite validation
export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("authjs.session-token") ||
                     request.cookies.get("__Secure-authjs.session-token");

  const pathname = request.nextUrl.pathname;
  
  // Public routes that don't require auth
  const isSignIn = pathname.startsWith("/sign-in");
  const isSignUp = pathname.startsWith("/sign-up");
  const isInvite = pathname.startsWith("/invite");
  const isApiRoute = pathname.startsWith("/api/");
  const isStaticFile = pathname.startsWith("/_next/") ||
                       pathname.startsWith("/favicon.ico");

  // Always allow API routes and static files
  if (isApiRoute || isStaticFile) {
    return NextResponse.next();
  }

  // Allow invite route (public - validates token and sets cookie)
  if (isInvite) {
    return NextResponse.next();
  }

  // If authenticated, redirect away from auth pages to home
  if (authCookie && (isSignIn || isSignUp)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow sign-in page for unauthenticated users
  if (isSignIn) {
    return NextResponse.next();
  }

  // Allow sign-up page - the page itself checks for first-user or invite cookie
  if (isSignUp) {
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
