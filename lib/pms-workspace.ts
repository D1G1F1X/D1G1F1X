import { query } from '@/lib/db'
import { Workspace } from '@/lib/pms-types'

export async function getWorkspaces(ownerId: string): Promise<Workspace[]> {
  const result = await query<Workspace>(
    'SELECT * FROM workspaces WHERE owner_id = $1 ORDER BY created_at DESC',
    [ownerId]
  )
  return result.rows
}

export async function getWorkspace(id: string): Promise<Workspace | null> {
  const result = await query<Workspace>(
    'SELECT * FROM workspaces WHERE id = $1',
    [id]
  )
  return result.rows[0] || null
}

export async function createWorkspace(
  ownerId: string,
  name: string,
  description?: string
): Promise<Workspace> {
  const id = `ws_${Date.now()}`
  const result = await query<Workspace>(
    `INSERT INTO workspaces (id, owner_id, name, description, created_at, updated_at)
     VALUES ($1, $2, $3, $4, NOW(), NOW())
     RETURNING *`,
    [id, ownerId, name, description]
  )
  return result.rows[0]
}

export async function updateWorkspace(
  id: string,
  updates: Partial<Workspace>
): Promise<Workspace> {
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

  const result = await query<Workspace>(
    `UPDATE workspaces SET ${fields.join(', ')} WHERE id = $${paramCount + 1} RETURNING *`,
    values
  )
  return result.rows[0]
}

export async function deleteWorkspace(id: string): Promise<void> {
  await query('DELETE FROM workspaces WHERE id = $1', [id])
}
