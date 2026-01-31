import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl

  // Public routes that don't require auth
  const publicRoutes = ['/', '/login', '/register', '/contact', '/blog', '/team', '/about', '/services', '/portfolio', '/diagnostic', '/research-development', '/partners']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route)) || pathname.startsWith('/_next') || pathname.startsWith('/public')

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Protected routes - check for session cookie
  const sessionToken = request.cookies.get('lumen_session_token')?.value

  if (!sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Continue to the protected route
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
