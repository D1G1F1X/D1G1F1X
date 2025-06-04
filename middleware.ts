import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Only protect user routes, admin routes are protected client-side
  if (
    (path.startsWith("/dashboard") || path.startsWith("/readings") || path.startsWith("/user")) &&
    !path.includes("/_next") &&
    !path.includes("/favicon.ico")
  ) {
    const userSession = request.cookies.get("user_session")

    // If no user session, redirect to login
    if (!userSession || userSession.value !== "logged_in") {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/dashboard/:path*", "/readings/:path*", "/user/:path*"],
}
