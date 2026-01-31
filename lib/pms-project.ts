import { query } from '@/lib/db'
import { Project } from '@/lib/pms-types'

export async function getProjects(workspaceId: string): Promise<Project[]> {
  const result = await query<Project>(
    'SELECT * FROM projects WHERE workspace_id = $1 ORDER BY created_at DESC',
    [workspaceId]
  )
  return result.rows
}

export async function getProject(id: string): Promise<Project | null> {
  const result = await query<Project>(
    'SELECT * FROM projects WHERE id = $1',
    [id]
  )
  return result.rows[0] || null
}

export async function createProject(
  workspaceId: string,
  name: string,
  description?: string
): Promise<Project> {
  const id = `proj_${Date.now()}`
  const result = await query<Project>(
    `INSERT INTO projects (id, workspace_id, name, description, status, created_at, updated_at)
     VALUES ($1, $2, $3, $4, 'active', NOW(), NOW())
     RETURNING *`,
    [id, workspaceId, name, description]
  )
  return result.rows[0]
}

export async function updateProject(
  id: string,
  updates: Partial<Project>
): Promise<Project> {
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

  const result = await query<Project>(
    `UPDATE projects SET ${fields.join(', ')} WHERE id = $${paramCount + 1} RETURNING *`,
    values
  )
  return result.rows[0]
}

export async function deleteProject(id: string): Promise<void> {
  await query('DELETE FROM projects WHERE id = $1', [id])
}
