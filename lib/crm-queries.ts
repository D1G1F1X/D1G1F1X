// CRM Data Access Layer - Query utilities for database operations
import { pool } from '@/lib/db'
import type {
  Contact,
  Account,
  Deal,
  Activity,
  Task,
  DocumentLink,
  Partner,
  Referral,
  PayoutLedger,
  ContactSource,
  DealPipeline,
  DealStage,
} from './crm-types'

// CONTACTS
export async function getContactByEmail(email: string): Promise<Contact | null> {
  try {
    const result = await pool.query<Contact>(
      'SELECT * FROM crm_contacts WHERE email = $1 LIMIT 1',
      [email]
    )
    return result.rows[0] || null
  } catch (error) {
    throw error
  }
}

export async function createContact(data: {
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  company_id?: string
  title?: string
  source: ContactSource
  attribution_utm_source?: string
  attribution_utm_medium?: string
  attribution_utm_campaign?: string
  attribution_referrer?: string
  consent?: boolean
  created_by?: string
}): Promise<Contact> {
  try {
    const result = await pool.query<Contact>(
      `INSERT INTO crm_contacts (
        email, first_name, last_name, phone, company_id, title,
        source, attribution_utm_source, attribution_utm_medium,
        attribution_utm_campaign, attribution_referrer,
        first_touch_at, last_touch_at, consent, consent_at,
        created_by, updated_by
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW(), $12, $13, $14, $15
      )
      RETURNING *`,
      [
        data.email,
        data.first_name || null,
        data.last_name || null,
        data.phone || null,
        data.company_id || null,
        data.title || null,
        data.source,
        data.attribution_utm_source || null,
        data.attribution_utm_medium || null,
        data.attribution_utm_campaign || null,
        data.attribution_referrer || null,
        data.consent || false,
        data.consent ? new Date() : null,
        data.created_by || null,
        data.created_by || null,
      ]
    )
    if (!result.rows[0]) {
      throw new Error('Failed to create contact - no rows returned')
    }
    return result.rows[0]
  } catch (error) {
    throw error
  }
}

export async function updateContact(id: string, data: Partial<Contact>): Promise<Contact> {
  try {
    const updates = Object.entries(data)
      .filter(([key]) => key !== 'id' && key !== 'created_at')
      .map(([key], index) => `${key} = $${index + 2}`)
      .join(', ')

    const values = Object.entries(data)
      .filter(([key]) => key !== 'id' && key !== 'created_at')
      .map(([, value]) => value)

    const result = await pool.query<Contact>(
      `UPDATE crm_contacts 
      SET ${updates}, updated_at = NOW()
      WHERE id = $1
      RETURNING *`,
      [id, ...values]
    )
    return result.rows[0]
  } catch (error) {
    throw error
  }
}

export async function getContactsForAccount(accountId: string): Promise<Contact[]> {
  try {
    const result = await pool.query<Contact>(
      `SELECT * FROM crm_contacts
      WHERE company_id = $1
      ORDER BY last_touch_at DESC NULLS LAST`,
      [accountId]
    )
    return result.rows
  } catch (error) {
    throw error
  }
}

// ACCOUNTS
export async function createAccount(data: {
  name: string
  domain?: string
  email_domain?: string
  industry?: string
  size?: 'startup' | 'smb' | 'mid-market' | 'enterprise'
  website?: string
  created_by?: string
}): Promise<Account> {
  try {
    const result = await pool.query<Account>(
      `INSERT INTO crm_accounts (
        name, domain, email_domain, industry, size, website, created_by, updated_by
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8
      )
      RETURNING *`,
      [
        data.name,
        data.domain || null,
        data.email_domain || null,
        data.industry || null,
        data.size || null,
        data.website || null,
        data.created_by || null,
        data.created_by || null,
      ]
    )
    return result.rows[0]
  } catch (error) {
    throw error
  }
}

export async function getAccountByDomain(domain: string): Promise<Account | null> {
  try {
    const result = await pool.query<Account>(
      'SELECT * FROM crm_accounts WHERE domain = $1 LIMIT 1',
      [domain]
    )
    return result.rows[0] || null
  } catch (error) {
    return null
  }
}

// DEALS
export async function createDeal(data: {
  title: string
  pipeline: DealPipeline
  stage: DealStage
  contact_id?: string
  account_id?: string
  value?: number
  probability_percent?: number
  estimated_close_date?: Date
  created_by?: string
}): Promise<Deal> {
  try {
    const result = await pool.query<Deal>(
      `INSERT INTO crm_deals (
        title, pipeline, stage, contact_id, account_id,
        value, probability_percent, estimated_close_date, created_by, updated_by
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      )
      RETURNING *`,
      [
        data.title,
        data.pipeline,
        data.stage,
        data.contact_id || null,
        data.account_id || null,
        data.value || null,
        data.probability_percent || 0,
        data.estimated_close_date || null,
        data.created_by || null,
        data.created_by || null,
      ]
    )
    return result.rows[0]
  } catch {
    throw new Error('Failed to create deal')
  }
}

export async function getDealsForContact(contactId: string): Promise<Deal[]> {
  try {
    const result = await pool.query<Deal>(
      `SELECT * FROM crm_deals
      WHERE contact_id = $1
      ORDER BY updated_at DESC`,
      [contactId]
    )
    return result.rows
  } catch {
    throw new Error('Failed to fetch deals for contact')
  }
}

export async function getDealsInPipeline(
  pipeline: DealPipeline,
  stage?: DealStage
): Promise<Deal[]> {
  try {
    if (stage) {
      const result = await pool.query<Deal>(
        `SELECT * FROM crm_deals
        WHERE pipeline = $1 AND stage = $2
        ORDER BY updated_at DESC`,
        [pipeline, stage]
      )
      return result.rows
    } else {
      const result = await pool.query<Deal>(
        `SELECT * FROM crm_deals
        WHERE pipeline = $1
        ORDER BY updated_at DESC`,
        [pipeline]
      )
      return result.rows
    }
  } catch {
    throw new Error('Failed to fetch deals in pipeline')
  }
}

export async function updateDealStage(
  dealId: string,
  newStage: DealStage,
  updatedBy?: string
): Promise<Deal> {
  try {
    const result = await pool.query<Deal>(
      `UPDATE crm_deals
      SET stage = $1, updated_at = NOW(), updated_by = $2
      WHERE id = $3
      RETURNING *`,
      [newStage, updatedBy || null, dealId]
    )
    return result.rows[0]
  } catch {
    throw new Error('Failed to update deal stage')
  }
}

// ACTIVITIES
export async function createActivity(data: {
  activity_type: string
  contact_id?: string
  deal_id?: string
  account_id?: string
  title?: string
  description?: string
  metadata?: Record<string, unknown>
  actor_id?: string
  actor_email?: string
}): Promise<Activity> {
  try {
    const result = await pool.query<Activity>(
      `INSERT INTO crm_activities (
        activity_type, contact_id, deal_id, account_id,
        title, description, metadata, actor_id, actor_email
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      )
      RETURNING *`,
      [
        data.activity_type,
        data.contact_id || null,
        data.deal_id || null,
        data.account_id || null,
        data.title || null,
        data.description || null,
        data.metadata ? JSON.stringify(data.metadata) : null,
        data.actor_id || null,
        data.actor_email || null,
      ]
    )
    return result.rows[0]
  } catch {
    throw new Error('Failed to create activity')
  }
}

export async function getActivitiesForContact(contactId: string, limit = 50): Promise<Activity[]> {
  try {
    const result = await pool.query<Activity>(
      `SELECT * FROM crm_activities
      WHERE contact_id = $1
      ORDER BY created_at DESC
      LIMIT $2`,
      [contactId, limit]
    )
    return result.rows
  } catch {
    throw new Error('Failed to fetch activities')
  }
}

// TASKS
export async function createTask(data: {
  title: string
  task_type: string
  contact_id?: string
  deal_id?: string
  account_id?: string
  owner_id?: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  due_date: Date
  sla_hours?: number
  created_by?: string
}): Promise<Task> {
  try {
    const result = await pool.query<Task>(
      `INSERT INTO crm_tasks (
        title, task_type, contact_id, deal_id, account_id,
        owner_id, priority, due_date, sla_hours, created_by
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      )
      RETURNING *`,
      [
        data.title,
        data.task_type,
        data.contact_id || null,
        data.deal_id || null,
        data.account_id || null,
        data.owner_id || null,
        data.priority || 'medium',
        data.due_date,
        data.sla_hours || null,
        data.created_by || null,
      ]
    )
    return result.rows[0]
  } catch {
    throw new Error('Failed to create task')
  }
}

export async function getTasksForOwner(ownerId: string): Promise<Task[]> {
  try {
    const result = await pool.query<Task>(
      `SELECT * FROM crm_tasks
      WHERE owner_id = $1 AND status != 'completed'
      ORDER BY priority DESC, due_date ASC`,
      [ownerId]
    )
    return result.rows
  } catch {
    throw new Error('Failed to fetch tasks')
  }
}

export async function updateTaskStatus(
  taskId: string,
  status: 'open' | 'in_progress' | 'completed' | 'overdue'
): Promise<Task> {
  try {
    const completedAt = status === 'completed' ? new Date() : null
    const result = await pool.query<Task>(
      `UPDATE crm_tasks
      SET status = $1, completed_at = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING *`,
      [status, completedAt, taskId]
    )
    return result.rows[0]
  } catch {
    throw new Error('Failed to update task status')
  }
}

// IDEMPOTENCY
export async function checkIdempotencyKey(key: string): Promise<Record<string, unknown> | null> {
  try {
    const result = await pool.query<{ result: Record<string, unknown> }>(
      `SELECT result FROM crm_idempotency_keys
      WHERE idempotency_key = $1 AND expires_at > NOW()
      LIMIT 1`,
      [key]
    )
    return result.rows[0]?.result || null
  } catch {
    return null
  }
}

export async function storeIdempotencyKey(
  key: string,
  endpoint: string,
  result: Record<string, unknown>
): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO crm_idempotency_keys (idempotency_key, endpoint, result)
      VALUES ($1, $2, $3)
      ON CONFLICT (idempotency_key) DO UPDATE
      SET result = $3, created_at = NOW()`,
      [key, endpoint, JSON.stringify(result)]
    )
  } catch {
    // Silently handle idempotency key storage errors
  }
}
