import { pool } from '@/lib/db'

export interface AdminNotification {
  id: string
  admin_id: string
  notification_type: string
  related_user_id?: string
  related_resource_id?: string
  message: string
  is_read: boolean
  read_at?: string
  action_url?: string
  created_at: string
}

// Create admin notification
export async function createAdminNotification(
  adminId: string,
  notificationType: string,
  message: string,
  relatedUserId?: string,
  relatedResourceId?: string,
  actionUrl?: string
) {
  const result = await pool.query(
    `INSERT INTO admin_notifications 
     (admin_id, notification_type, message, related_user_id, related_resource_id, action_url)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [adminId, notificationType, message, relatedUserId, relatedResourceId, actionUrl]
  )
  return result.rows[0]
}

// Get admin notifications
export async function getAdminNotifications(adminId: string, unreadOnly = false) {
  const query = unreadOnly
    ? `SELECT * FROM admin_notifications 
       WHERE admin_id = $1 AND is_read = false 
       ORDER BY created_at DESC`
    : `SELECT * FROM admin_notifications 
       WHERE admin_id = $1 
       ORDER BY created_at DESC LIMIT 100`

  const result = await pool.query(query, [adminId])
  return result.rows
}

// Mark notification as read
export async function markNotificationAsRead(notificationId: string) {
  const result = await pool.query(
    `UPDATE admin_notifications 
     SET is_read = true, read_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [notificationId]
  )
  return result.rows[0]
}

// Mark all notifications as read
export async function markAllNotificationsAsRead(adminId: string) {
  const result = await pool.query(
    `UPDATE admin_notifications 
     SET is_read = true, read_at = NOW()
     WHERE admin_id = $1 AND is_read = false
     RETURNING *`,
    [adminId]
  )
  return result.rows
}

// Get unread notification count
export async function getUnreadNotificationCount(adminId: string) {
  const result = await pool.query(
    `SELECT COUNT(*) as count FROM admin_notifications 
     WHERE admin_id = $1 AND is_read = false`,
    [adminId]
  )
  return result.rows[0].count
}

// Notify all admins
export async function notifyAllAdmins(
  notificationType: string,
  message: string,
  relatedUserId?: string,
  relatedResourceId?: string,
  actionUrl?: string
) {
  const admins = await pool.query(
    `SELECT id FROM users WHERE role = 'admin'`
  )

  const notifications = await Promise.all(
    admins.rows.map((admin) =>
      createAdminNotification(
        admin.id,
        notificationType,
        message,
        relatedUserId,
        relatedResourceId,
        actionUrl
      )
    )
  )

  return notifications
}
