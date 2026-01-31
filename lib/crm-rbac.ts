// CRM Role-Based Access Control (RBAC)
// 5 roles: administrator, manager, sales, viewer, partner

import { UserRole } from './crm-types'

export type Permission = 
  | 'contacts:read' | 'contacts:create' | 'contacts:edit' | 'contacts:delete'
  | 'deals:read' | 'deals:create' | 'deals:edit' | 'deals:delete' | 'deals:close'
  | 'tasks:read' | 'tasks:create' | 'tasks:edit' | 'tasks:delete' | 'tasks:complete'
  | 'activities:read' | 'activities:create'
  | 'reports:read' | 'reports:export'
  | 'partners:read' | 'partners:manage'
  | 'users:read' | 'users:manage'
  | 'settings:manage'

export interface RolePermissions {
  [key: string]: Permission[]
}

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  administrator: [
    // Full access to everything
    'contacts:read', 'contacts:create', 'contacts:edit', 'contacts:delete',
    'deals:read', 'deals:create', 'deals:edit', 'deals:delete', 'deals:close',
    'tasks:read', 'tasks:create', 'tasks:edit', 'tasks:delete', 'tasks:complete',
    'activities:read', 'activities:create',
    'reports:read', 'reports:export',
    'partners:read', 'partners:manage',
    'users:read', 'users:manage',
    'settings:manage',
  ],
  
  manager: [
    // Can manage team, deals, and view reports
    'contacts:read', 'contacts:create', 'contacts:edit',
    'deals:read', 'deals:create', 'deals:edit', 'deals:close',
    'tasks:read', 'tasks:create', 'tasks:edit', 'tasks:complete',
    'activities:read', 'activities:create',
    'reports:read',
    'partners:read',
  ],
  
  sales: [
    // Can manage their own contacts, deals, and tasks
    'contacts:read', 'contacts:create', 'contacts:edit',
    'deals:read', 'deals:create', 'deals:edit',
    'tasks:read', 'tasks:create', 'tasks:edit', 'tasks:complete',
    'activities:read', 'activities:create',
  ],
  
  viewer: [
    // Read-only access
    'contacts:read',
    'deals:read',
    'tasks:read',
    'activities:read',
    'reports:read',
  ],
  
  partner: [
    // Limited partner access
    'contacts:read',
    'deals:read',
    'activities:read',
  ],
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role] || []
  return permissions.includes(permission)
}

export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some(p => hasPermission(role, p))
}

export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every(p => hasPermission(role, p))
}

// Resource-level access control
export interface AccessContext {
  userId: string
  role: UserRole
  isOwnResource?: boolean
}

export function canAccessResource(
  context: AccessContext,
  permission: Permission,
  resourceOwnerId?: string
): boolean {
  // Administrators can access everything
  if (context.role === 'administrator') {
    return true
  }

  // Check base permission
  if (!hasPermission(context.role, permission)) {
    return false
  }

  // If it's an edit/delete operation on a resource owned by someone else
  if ((permission.includes('edit') || permission.includes('delete')) && resourceOwnerId) {
    // Managers can edit any resource
    if (context.role === 'manager') {
      return true
    }
    // Sales can only edit their own resources
    if (context.role === 'sales') {
      return context.userId === resourceOwnerId
    }
    // Viewers cannot edit/delete
    return false
  }

  return true
}

// Middleware for API routes
export async function checkRBACPermission(
  userRole: UserRole,
  requiredPermission: Permission
): Promise<boolean> {
  return hasPermission(userRole, requiredPermission)
}
