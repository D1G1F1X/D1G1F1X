import { NextRequest, NextResponse } from 'next/server'
import type { NextMiddleware } from 'next/server'

export const middleware: NextMiddleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname

  // Public routes and assets that don't require auth
  const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/contact',
    '/blog',
    '/team',
    '/about',
    '/api/public',
    '/api/health',
    '/sitemap.xml',
    '/robots.txt',
  ]

  // Asset routes that should be public
  const isAssetRoute =
    pathname.startsWith('/static/') ||
    pathname.startsWith('/_next/') ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot)$/)

  // Check if route is public
  const isPublicRoute =
    isAssetRoute || publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Protected routes - check for session cookie
  const sessionToken = request.cookies.get('lumen_session_token')?.value

  if (!sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Add user info to request headers for API routes
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-session-token', sessionToken)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - .well-known (well-known files)
     */
    '/((?!_next/static|_next/image|favicon.ico|apple-icon|.well-known).*)',
  ],
}
