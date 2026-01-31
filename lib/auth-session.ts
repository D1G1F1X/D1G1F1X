import { cookies } from 'next/headers'
import { verifySession, getUserById } from './auth'
import type { User } from './auth-types'

const SESSION_COOKIE_NAME = 'lumen_session_token'

export async function getSessionFromCookies(): Promise<{
  user: User | null
  token: string | null
}> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (!token) {
    return { user: null, token: null }
  }

  const session = await verifySession(token)
  if (!session || !session.user) {
    return { user: null, token: null }
  }

  return { user: session.user, token }
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  })
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export function hasPermission(
  userRole: string,
  requiredPermission: string
): boolean {
  const ROLE_PERMISSIONS: Record<string, string[]> = {
    admin: [
      'users:create',
      'users:read',
      'users:update',
      'users:delete',
      'roles:manage',
      'permissions:manage',
      'projects:manage',
      'analytics:view',
      'settings:manage',
    ],
    editor: [
      'projects:read',
      'projects:update',
      'projects:create',
      'content:create',
      'content:update',
      'content:delete',
      'comments:create',
    ],
    user: [
      'projects:read',
      'content:read',
      'comments:read',
      'comments:create',
      'profile:update',
    ],
    guest: ['projects:read', 'content:read', 'comments:read'],
  }

  const permissions = ROLE_PERMISSIONS[userRole] || []
  return permissions.includes(requiredPermission)
}

export function canAccessResource(
  userRole: string,
  resource: string
): boolean {
  const RESOURCE_ACCESS: Record<string, string[]> = {
    admin_panel: ['admin'],
    user_management: ['admin'],
    analytics: ['admin', 'editor'],
    projects: ['admin', 'editor', 'user'],
    content: ['admin', 'editor', 'user', 'guest'],
    comments: ['admin', 'editor', 'user', 'guest'],
    public: ['admin', 'editor', 'user', 'guest'],
  }

  const allowedRoles = RESOURCE_ACCESS[resource] || []
  return allowedRoles.includes(userRole)
}
