import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await getSession(request)

  // Guest-only restricted paths
  const guestRestrictedPaths = [
    '/dashboard/admin',
    '/analytics',
    '/settings/staff',
  ]

  // Check if guest is trying to access restricted paths
  if (session && session.user.role === 'guest') {
    for (const restrictedPath of guestRestrictedPaths) {
      if (pathname.startsWith(restrictedPath)) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  }

  // Redirect unauthenticated users from protected pages
  const protectedPaths = ['/dashboard', '/admin', '/analytics', '/projects']
  if (!session && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
