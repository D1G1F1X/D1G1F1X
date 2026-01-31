import { pool } from '@/lib/db'

export interface StaffAccessLevel {
  id: string
  staff_id: string
  staff_type: 'in-house' | 'contractor' | 'vendor'
  permission_level: 'junior' | 'senior' | 'lead' | 'manager'
  department?: string
  managed_by?: string
  can_manage_guests: boolean
  can_view_analytics: boolean
  can_manage_projects: boolean
  can_manage_tickets: boolean
  approved_at?: string
  created_at: string
  updated_at: string
}

// Get staff access level
export async function getStaffAccessLevel(staffId: string) {
  const result = await pool.query(
    `SELECT * FROM staff_access_levels WHERE staff_id = $1`,
    [staffId]
  )
  return result.rows[0] as StaffAccessLevel | undefined
}

// Create staff access level
export async function createStaffAccessLevel(
  staffId: string,
  staffType: string,
  permissionLevel: string,
  department?: string,
  managedBy?: string
) {
  const result = await pool.query(
    `INSERT INTO staff_access_levels 
     (staff_id, staff_type, permission_level, department, managed_by, approved_at)
     VALUES ($1, $2, $3, $4, $5, NOW())
     RETURNING *`,
    [staffId, staffType, permissionLevel, department, managedBy]
  )
  return result.rows[0]
}

// Update staff access permissions
export async function updateStaffAccessPermissions(
  staffId: string,
  permissions: Partial<{
    can_manage_guests: boolean
    can_view_analytics: boolean
    can_manage_projects: boolean
    can_manage_tickets: boolean
  }>
) {
  const updates: string[] = []
  const values: (string | boolean)[] = [staffId]
  let paramIndex = 2

  if (permissions.can_manage_guests !== undefined) {
    updates.push(`can_manage_guests = $${paramIndex++}`)
    values.push(permissions.can_manage_guests)
  }
  if (permissions.can_view_analytics !== undefined) {
    updates.push(`can_view_analytics = $${paramIndex++}`)
    values.push(permissions.can_view_analytics)
  }
  if (permissions.can_manage_projects !== undefined) {
    updates.push(`can_manage_projects = $${paramIndex++}`)
    values.push(permissions.can_manage_projects)
  }
  if (permissions.can_manage_tickets !== undefined) {
    updates.push(`can_manage_tickets = $${paramIndex++}`)
    values.push(permissions.can_manage_tickets)
  }

  if (updates.length === 0) return null

  updates.push(`updated_at = NOW()`)
  const query = `UPDATE staff_access_levels SET ${updates.join(', ')} WHERE staff_id = $1 RETURNING *`

  const result = await pool.query(query, values)
  return result.rows[0]
}

// Check staff permission
export async function hasStaffPermission(
  staffId: string,
  permission: keyof Omit<StaffAccessLevel, 'id' | 'staff_id' | 'staff_type' | 'permission_level' | 'department' | 'managed_by' | 'approved_at' | 'created_at' | 'updated_at'>
): Promise<boolean> {
  const staffAccess = await getStaffAccessLevel(staffId)
  if (!staffAccess) return false
  return staffAccess[permission] === true
}

// Get staff by manager
export async function getStaffByManager(managerId: string) {
  const result = await pool.query(
    `SELECT * FROM staff_access_levels WHERE managed_by = $1 ORDER BY created_at DESC`,
    [managerId]
  )
  return result.rows
}

// Get all staff by type
export async function getStaffByType(staffType: string) {
  const result = await pool.query(
    `SELECT sal.*, u.email, u.name 
     FROM staff_access_levels sal
     JOIN users u ON sal.staff_id = u.id
     WHERE sal.staff_type = $1
     ORDER BY sal.created_at DESC`,
    [staffType]
  )
  return result.rows
}
