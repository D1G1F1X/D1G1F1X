import { pool } from '@/lib/db'

export interface GuestAccess {
  id: string
  guest_id: string
  project_id: string
  access_level: 'view' | 'comment' | 'limited_edit'
  assigned_by: string
  assigned_at: string
  expires_at?: string
}

export interface GuestRegistration {
  id: string
  user_id: string
  company_name?: string
  contact_email: string
  phone?: string
  reason_for_access: string
  status: 'pending' | 'approved' | 'rejected'
  approved_by?: string
  approved_at?: string
  created_at: string
  updated_at: string
}

// Get pending guest registrations
export async function getPendingGuestRegistrations() {
  const result = await pool.query(
    `SELECT * FROM guest_registrations WHERE status = 'pending' ORDER BY created_at DESC`
  )
  return result.rows
}

// Get guest registration by ID
export async function getGuestRegistration(id: string) {
  const result = await pool.query(
    `SELECT * FROM guest_registrations WHERE id = $1`,
    [id]
  )
  return result.rows[0]
}

// Approve guest registration
export async function approveGuestRegistration(
  registrationId: string,
  adminId: string
) {
  const result = await pool.query(
    `UPDATE guest_registrations 
     SET status = 'approved', approved_by = $1, approved_at = NOW(), updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
    [adminId, registrationId]
  )
  return result.rows[0]
}

// Reject guest registration
export async function rejectGuestRegistration(
  registrationId: string,
  adminId: string
) {
  const result = await pool.query(
    `UPDATE guest_registrations 
     SET status = 'rejected', approved_by = $1, approved_at = NOW(), updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
    [adminId, registrationId]
  )
  return result.rows[0]
}

// Assign guest to project
export async function assignGuestToProject(
  guestId: string,
  projectId: string,
  accessLevel: string,
  assignedBy: string,
  expiresAt?: string
) {
  const result = await pool.query(
    `INSERT INTO guest_project_access (guest_id, project_id, access_level, assigned_by, expires_at)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (guest_id, project_id) 
     DO UPDATE SET access_level = $3, assigned_by = $4, expires_at = $5, updated_at = NOW()
     RETURNING *`,
    [guestId, projectId, accessLevel, assignedBy, expiresAt]
  )
  return result.rows[0]
}

// Get guest project access
export async function getGuestProjectAccess(guestId: string) {
  const result = await pool.query(
    `SELECT * FROM guest_project_access WHERE guest_id = $1 AND (expires_at IS NULL OR expires_at > NOW())`,
    [guestId]
  )
  return result.rows
}

// Check if guest can access project
export async function canGuestAccessProject(
  guestId: string,
  projectId: string
): Promise<boolean> {
  const result = await pool.query(
    `SELECT EXISTS(
      SELECT 1 FROM guest_project_access 
      WHERE guest_id = $1 AND project_id = $2 AND (expires_at IS NULL OR expires_at > NOW())
    )`,
    [guestId, projectId]
  )
  return result.rows[0].exists
}

// Revoke guest project access
export async function revokeGuestProjectAccess(
  guestId: string,
  projectId: string
) {
  const result = await pool.query(
    `DELETE FROM guest_project_access WHERE guest_id = $1 AND project_id = $2 RETURNING *`,
    [guestId, projectId]
  )
  return result.rows[0]
}

// Link guest to ticket
export async function linkGuestToTicket(guestId: string, ticketId: string) {
  const result = await pool.query(
    `INSERT INTO guest_ticket_access (guest_id, ticket_id)
     VALUES ($1, $2)
     ON CONFLICT (guest_id, ticket_id) DO NOTHING
     RETURNING *`,
    [guestId, ticketId]
  )
  return result.rows[0]
}

// Get guest accessible tickets
export async function getGuestAccessibleTickets(guestId: string) {
  const result = await pool.query(
    `SELECT DISTINCT ticket_id FROM guest_ticket_access WHERE guest_id = $1`,
    [guestId]
  )
  return result.rows.map((row) => row.ticket_id)
}
