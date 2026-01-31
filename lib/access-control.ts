import { pool } from '@/lib/db'
import type { AuthUser } from '@/lib/auth-types'

export type AccessResource = 'project' | 'ticket' | 'workspace' | 'analytics'

export interface AccessCheckResult {
  allowed: boolean
  reason?: string
}

// Enforce access control based on user role and resource
export async function checkAccess(
  user: AuthUser,
  resource: AccessResource,
  resourceId: string,
  action: 'view' | 'edit' | 'delete' | 'manage' = 'view'
): Promise<AccessCheckResult> {
  // Admins have full access
  if (user.role === 'admin') {
    return { allowed: true }
  }

  // Guests can only access tickets and assigned projects
  if (user.role === 'guest') {
    if (resource === 'ticket') {
      const access = await pool.query(
        `SELECT EXISTS(SELECT 1 FROM guest_ticket_access WHERE guest_id = $1 AND ticket_id = $2)`,
        [user.id, resourceId]
      )
      if (!access.rows[0].exists) {
        return {
          allowed: false,
          reason: 'Guest does not have access to this ticket',
        }
      }
      // Guests can only view/comment, not edit
      if (action !== 'view') {
        return {
          allowed: false,
          reason: 'Guests can only view tickets',
        }
      }
      return { allowed: true }
    }

    if (resource === 'project') {
      const access = await pool.query(
        `SELECT access_level FROM guest_project_access 
         WHERE guest_id = $1 AND project_id = $2 AND (expires_at IS NULL OR expires_at > NOW())`,
        [user.id, resourceId]
      )
      if (access.rows.length === 0) {
        return {
          allowed: false,
          reason: 'Guest does not have access to this project',
        }
      }

      const accessLevel = access.rows[0].access_level
      if (action === 'view') {
        return { allowed: true }
      }
      if (action === 'edit' || action === 'manage') {
        return {
          allowed: accessLevel === 'limited_edit',
          reason: 'Guest access level does not permit editing',
        }
      }
      return {
        allowed: false,
        reason: 'Guest does not have permission for this action',
      }
    }

    // Guests cannot access anything else
    return {
      allowed: false,
      reason: 'Guests can only access assigned tickets and projects',
    }
  }

  // Staff access control
  if (user.role === 'user' || user.role === 'editor') {
    const staffAccess = await pool.query(
      `SELECT * FROM staff_access_levels WHERE staff_id = $1`,
      [user.id]
    )

    if (staffAccess.rows.length === 0) {
      return {
        allowed: false,
        reason: 'No staff access configuration found',
      }
    }

    const access = staffAccess.rows[0]

    if (resource === 'analytics' && !access.can_view_analytics) {
      return {
        allowed: false,
        reason: 'Staff member does not have analytics access',
      }
    }

    if (resource === 'project') {
      if (
        (action === 'edit' || action === 'delete') &&
        !access.can_manage_projects
      ) {
        return {
          allowed: false,
          reason: 'Staff member does not have project management access',
        }
      }
      return { allowed: true }
    }

    if (resource === 'ticket') {
      if (
        (action === 'edit' || action === 'delete') &&
        !access.can_manage_tickets
      ) {
        return {
          allowed: false,
          reason: 'Staff member does not have ticket management access',
        }
      }
      return { allowed: true }
    }

    return { allowed: true }
  }

  return {
    allowed: false,
    reason: 'Unknown user role',
  }
}

// Restrict guest to only tickets and assigned projects
export async function enforceGuestRestrictions(
  user: AuthUser,
  resource: AccessResource
): Promise<boolean> {
  if (user.role !== 'guest') {
    return true
  }

  // Guests can only access tickets and projects
  return resource === 'ticket' || resource === 'project'
}
