import { query } from '@/lib/db'
import { Ticket } from '@/lib/pms-types'

export async function getTickets(projectId: string): Promise<Ticket[]> {
  const result = await query<Ticket>(
    'SELECT * FROM tickets WHERE project_id = $1 ORDER BY created_at DESC',
    [projectId]
  )
  return result.rows
}

export async function getTicket(id: string): Promise<Ticket | null> {
  const result = await query<Ticket>(
    'SELECT * FROM tickets WHERE id = $1',
    [id]
  )
  return result.rows[0] || null
}

export async function createTicket(
  projectId: string,
  title: string,
  description?: string,
  priority: string = 'medium',
  assignedTo?: string
): Promise<Ticket> {
  const id = `ticket_${Date.now()}`
  const result = await query<Ticket>(
    `INSERT INTO tickets (id, project_id, title, description, status, priority, assigned_to, created_at, updated_at)
     VALUES ($1, $2, $3, $4, 'open', $5, $6, NOW(), NOW())
     RETURNING *`,
    [id, projectId, title, description, priority, assignedTo]
  )
  return result.rows[0]
}

export async function updateTicket(
  id: string,
  updates: Partial<Ticket>
): Promise<Ticket> {
  const fields: string[] = []
  const values: any[] = []
  let paramCount = 1

  Object.entries(updates).forEach(([key, value]) => {
    if (key !== 'id' && key !== 'created_at') {
      fields.push(`${key} = $${paramCount}`)
      values.push(value)
      paramCount++
    }
  })

  fields.push(`updated_at = $${paramCount}`)
  values.push(new Date())
  values.push(id)

  const result = await query<Ticket>(
    `UPDATE tickets SET ${fields.join(', ')} WHERE id = $${paramCount + 1} RETURNING *`,
    values
  )
  return result.rows[0]
}

export async function deleteTicket(id: string): Promise<void> {
  await query('DELETE FROM tickets WHERE id = $1', [id])
}
