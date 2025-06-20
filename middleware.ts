import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const response = NextResponse.next()

  // Add CSP headers for pages that might need YouTube embeds
  if (path.includes("/blog/") || path.includes("/guidebook/") || path.includes("/about")) {
    response.headers.set(
      "Content-Security-Policy",
      "img-src 'self' blob: data: https://blob.vercel-storage.com https://blob.v0.dev; frame-src 'self' https://www.youtube.com https://youtube.com https://tally.so https://formsubmit.co; frame-ancestors 'self';",
    )
  }

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

  return response
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/dashboard/:path*", "/readings/:path*", "/user/:path*", "/blog/:path*", "/guidebook/:path*", "/about"],
}
