// CRM Data Access Layer - Query utilities for database operations
import { sql } from '@neon-serverless/client'
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
    const result = await sql`
      SELECT * FROM crm_contacts WHERE email = ${email} LIMIT 1
    `
    return result.rows[0] as Contact | undefined
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
    const result = await sql`
      INSERT INTO crm_contacts (
        email, first_name, last_name, phone, company_id, title,
        source, attribution_utm_source, attribution_utm_medium,
        attribution_utm_campaign, attribution_referrer,
        first_touch_at, last_touch_at, consent, consent_at,
        created_by, updated_by
      ) VALUES (
        ${data.email},
        ${data.first_name || null},
        ${data.last_name || null},
        ${data.phone || null},
        ${data.company_id || null},
        ${data.title || null},
        ${data.source},
        ${data.attribution_utm_source || null},
        ${data.attribution_utm_medium || null},
        ${data.attribution_utm_campaign || null},
        ${data.attribution_referrer || null},
        NOW(),
        NOW(),
        ${data.consent || false},
        ${data.consent ? sql`NOW()` : null},
        ${data.created_by || null},
        ${data.created_by || null}
      )
      RETURNING *
    `
    if (!result.rows[0]) {
      throw new Error('Failed to create contact - no rows returned')
    }
    return result.rows[0] as Contact
  } catch (error) {
    throw error
  }
}

export async function updateContact(id: string, data: Partial<Contact>): Promise<Contact> {
  try {
    const updates = Object.entries(data)
      .filter(([key]) => key !== 'id' && key !== 'created_at')
      .map(([key, value]) => `${key} = ${typeof value === 'string' ? `'${value}'` : value}`)
      .join(', ')

    const result = await sql`
      UPDATE crm_contacts 
      SET ${sql(updates)}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return result.rows[0] as Contact
  } catch (error) {

    throw error
  }
}

export async function getContactsForAccount(accountId: string): Promise<Contact[]> {
  try {
    const result = await sql`
      SELECT * FROM crm_contacts
      WHERE company_id = ${accountId}
      ORDER BY last_touch_at DESC NULLS LAST
    `
    return result.rows as Contact[]
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
    const result = await sql`
      INSERT INTO crm_accounts (
        name, domain, email_domain, industry, size, website, created_by, updated_by
      ) VALUES (
        ${data.name},
        ${data.domain || null},
        ${data.email_domain || null},
        ${data.industry || null},
        ${data.size || null},
        ${data.website || null},
        ${data.created_by || null},
        ${data.created_by || null}
      )
      RETURNING *
    `
    return result.rows[0] as Account
  } catch (error) {
    throw error
  }
}

export async function getAccountByDomain(domain: string): Promise<Account | null> {
  try {
    const result = await sql`
      SELECT * FROM crm_accounts WHERE domain = ${domain} LIMIT 1
    `
    return result.rows[0] as Account | undefined
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
    const result = await sql`
      INSERT INTO crm_deals (
        title, pipeline, stage, contact_id, account_id,
        value, probability_percent, estimated_close_date, created_by, updated_by
      ) VALUES (
        ${data.title},
        ${data.pipeline},
        ${data.stage},
        ${data.contact_id || null},
        ${data.account_id || null},
        ${data.value || null},
        ${data.probability_percent || 0},
        ${data.estimated_close_date || null},
        ${data.created_by || null},
        ${data.created_by || null}
      )
      RETURNING *
    `
    return result.rows[0] as Deal
  } catch (error) {
    console.error('createDeal error:', error)
    throw error
  }
}

export async function getDealsForContact(contactId: string): Promise<Deal[]> {
  try {
    const result = await sql`
      SELECT * FROM crm_deals
      WHERE contact_id = ${contactId}
      ORDER BY updated_at DESC
    `
    return result.rows as Deal[]
  } catch (error) {
    console.error('getDealsForContact error:', error)
    throw error
  }
}

export async function getDealsInPipeline(
  pipeline: DealPipeline,
  stage?: DealStage
): Promise<Deal[]> {
  try {
    if (stage) {
      const result = await sql`
        SELECT * FROM crm_deals
        WHERE pipeline = ${pipeline} AND stage = ${stage}
        ORDER BY updated_at DESC
      `
      return result.rows as Deal[]
    } else {
      const result = await sql`
        SELECT * FROM crm_deals
        WHERE pipeline = ${pipeline}
        ORDER BY updated_at DESC
      `
      return result.rows as Deal[]
    }
  } catch (error) {
    console.error('getDealsInPipeline error:', error)
    throw error
  }
}

export async function updateDealStage(
  dealId: string,
  newStage: DealStage,
  updatedBy?: string
): Promise<Deal> {
  try {
    const result = await sql`
      UPDATE crm_deals
      SET stage = ${newStage}, updated_at = NOW(), updated_by = ${updatedBy || null}
      WHERE id = ${dealId}
      RETURNING *
    `
    return result.rows[0] as Deal
  } catch (error) {
    console.error('updateDealStage error:', error)
    throw error
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
  metadata?: Record<string, any>
  actor_id?: string
  actor_email?: string
}): Promise<Activity> {
  try {
    const result = await sql`
      INSERT INTO crm_activities (
        activity_type, contact_id, deal_id, account_id,
        title, description, metadata, actor_id, actor_email
      ) VALUES (
        ${data.activity_type},
        ${data.contact_id || null},
        ${data.deal_id || null},
        ${data.account_id || null},
        ${data.title || null},
        ${data.description || null},
        ${data.metadata ? JSON.stringify(data.metadata) : null},
        ${data.actor_id || null},
        ${data.actor_email || null}
      )
      RETURNING *
    `
    return result.rows[0] as Activity
  } catch (error) {
    console.error('createActivity error:', error)
    throw error
  }
}

export async function getActivitiesForContact(contactId: string, limit = 50): Promise<Activity[]> {
  try {
    const result = await sql`
      SELECT * FROM crm_activities
      WHERE contact_id = ${contactId}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `
    return result.rows as Activity[]
  } catch (error) {
    console.error('getActivitiesForContact error:', error)
    throw error
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
    const result = await sql`
      INSERT INTO crm_tasks (
        title, task_type, contact_id, deal_id, account_id,
        owner_id, priority, due_date, sla_hours, created_by
      ) VALUES (
        ${data.title},
        ${data.task_type},
        ${data.contact_id || null},
        ${data.deal_id || null},
        ${data.account_id || null},
        ${data.owner_id || null},
        ${data.priority || 'medium'},
        ${data.due_date},
        ${data.sla_hours || null},
        ${data.created_by || null}
      )
      RETURNING *
    `
    return result.rows[0] as Task
  } catch (error) {
    console.error('createTask error:', error)
    throw error
  }
}

export async function getTasksForOwner(ownerId: string): Promise<Task[]> {
  try {
    const result = await sql`
      SELECT * FROM crm_tasks
      WHERE owner_id = ${ownerId} AND status != 'completed'
      ORDER BY priority DESC, due_date ASC
    `
    return result.rows as Task[]
  } catch (error) {
    console.error('getTasksForOwner error:', error)
    throw error
  }
}

export async function updateTaskStatus(
  taskId: string,
  status: 'open' | 'in_progress' | 'completed' | 'overdue'
): Promise<Task> {
  try {
    const completedAt = status === 'completed' ? sql`NOW()` : null
    const result = await sql`
      UPDATE crm_tasks
      SET status = ${status}, completed_at = ${completedAt}, updated_at = NOW()
      WHERE id = ${taskId}
      RETURNING *
    `
    return result.rows[0] as Task
  } catch (error) {
    console.error('updateTaskStatus error:', error)
    throw error
  }
}

// IDEMPOTENCY
export async function checkIdempotencyKey(key: string): Promise<any | null> {
  try {
    const result = await sql`
      SELECT result FROM crm_idempotency_keys
      WHERE idempotency_key = ${key} AND expires_at > NOW()
      LIMIT 1
    `
    return result.rows[0]?.result || null
  } catch (error) {
    console.error('checkIdempotencyKey error:', error)
    return null
  }
}

export async function storeIdempotencyKey(
  key: string,
  endpoint: string,
  result: any
): Promise<void> {
  try {
    await sql`
      INSERT INTO crm_idempotency_keys (idempotency_key, endpoint, result)
      VALUES (${key}, ${endpoint}, ${JSON.stringify(result)})
      ON CONFLICT (idempotency_key) DO UPDATE
      SET result = ${JSON.stringify(result)}, created_at = NOW()
    `
  } catch (error) {
    console.error('storeIdempotencyKey error:', error)
  }
}
