export type UserRole = 'admin' | 'editor' | 'user' | 'guest'

export interface User {
  id: string
  email: string
  name: string
  password_hash: string
  role: UserRole
  is_active: boolean
  last_login: Date | null
  created_at: Date
  updated_at: Date
}

export interface Session {
  id: string
  user_id: string
  token: string
  expires_at: Date
  created_at: Date
  user?: User
}

export interface Permission {
  id: string
  name: string
  description: string
  resource: string
  action: string
  created_at: Date
}

export interface RolePermission {
  role: UserRole
  permission_id: string
  permission?: Permission
}

export interface AuthRequest {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
  session?: Session
  token?: string
}

// Permission definitions by role
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
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
  guest: [
    'projects:read',
    'content:read',
    'comments:read',
  ],
}
