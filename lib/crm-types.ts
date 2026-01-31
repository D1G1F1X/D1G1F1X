// CRM Type Definitions

export type ContactSource = 'resources' | 'diagnostic' | 'partner_referral' | 'direct'
export type DealPipeline = 'client' | 'partner'
export type DealStage = 
  | 'new_lead' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost'
  | 'applied' | 'active' | 'inactive' // Partner pipeline
export type ActivityType = 'call' | 'email' | 'meeting' | 'note' | 'stage_change' | 'task_created' | 'document_added'
export type TaskType = 'review' | 'follow_up' | 'outreach' | 'qualification' | 'escalation'
export type TaskStatus = 'open' | 'in_progress' | 'completed' | 'overdue'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
export type DocumentType = 'diagnostic' | 'proposal' | 'contract' | 'resource'
export type AccessLevel = 'public' | 'anyone_with_link' | 'restricted' | 'unknown'
export type DocumentLifecycle = 'active' | 'replaced' | 'removed' | 'revoked'
export type PartnerStatus = 'pending' | 'approved' | 'active' | 'suspended'
export type ReferralType = 'client' | 'resource' | 'strategic'
export type ReferralStatus = 'pending' | 'converted' | 'lost'
export type PayoutStatus = 'pending' | 'paid' | 'hold'
export type ResourceAssetType = 'guide' | 'template' | 'tool' | 'case_study'
export type UserRole = 'administrator' | 'manager' | 'sales' | 'viewer' | 'partner'

export interface Contact {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  company_id: string | null
  title: string | null
  source: ContactSource
  attribution_utm_source: string | null
  attribution_utm_medium: string | null
  attribution_utm_campaign: string | null
  attribution_referrer: string | null
  first_touch_at: Date | null
  last_touch_at: Date | null
  qualified: boolean
  qualified_at: Date | null
  consent: boolean
  consent_at: Date | null
  status: 'active' | 'archived' | 'invalid'
  created_at: Date
  updated_at: Date
  created_by: string | null
  updated_by: string | null
}

export interface Account {
  id: string
  name: string
  domain: string | null
  email_domain: string | null
  industry: string | null
  size: 'startup' | 'smb' | 'mid-market' | 'enterprise' | null
  website: string | null
  status: string
  created_at: Date
  updated_at: Date
  created_by: string | null
  updated_by: string | null
}

export interface Deal {
  id: string
  title: string
  pipeline: DealPipeline
  stage: DealStage
  contact_id: string | null
  account_id: string | null
  value: number | null
  currency: string
  probability_percent: number
  estimated_close_date: Date | null
  actual_close_date: Date | null
  status: 'open' | 'won' | 'lost' | 'stuck'
  days_in_stage: number | null
  created_at: Date
  updated_at: Date
  created_by: string | null
  updated_by: string | null
}

export interface Activity {
  id: string
  activity_type: ActivityType
  contact_id: string | null
  deal_id: string | null
  account_id: string | null
  title: string | null
  description: string | null
  metadata: Record<string, any> | null
  actor_id: string | null
  actor_email: string | null
  created_at: Date
}

export interface Task {
  id: string
  title: string
  description: string | null
  task_type: TaskType
  contact_id: string | null
  deal_id: string | null
  account_id: string | null
  owner_id: string | null
  status: TaskStatus
  priority: TaskPriority
  due_date: Date
  sla_hours: number | null
  completed_at: Date | null
  created_at: Date
  updated_at: Date
  created_by: string | null
}

export interface DocumentLink {
  id: string
  url: string
  external_id: string | null
  name: string | null
  doc_type: DocumentType
  access_level_expected: AccessLevel
  lifecycle: DocumentLifecycle
  contact_id: string | null
  deal_id: string | null
  account_id: string | null
  added_by: string | null
  removed_by: string | null
  removed_at: Date | null
  created_at: Date
  updated_at: Date
}

export interface Partner {
  id: string
  contact_id: string | null
  account_id: string | null
  deal_id: string | null
  status: PartnerStatus
  tier: string | null
  commission_percent: number | null
  created_at: Date
  updated_at: Date
  approved_by: string | null
  approved_at: Date | null
}

export interface Referral {
  id: string
  partner_id: string | null
  deal_id: string | null
  referral_type: ReferralType
  status: ReferralStatus
  attributed_deal_value: number | null
  commission_amount: number | null
  created_at: Date
  updated_at: Date
}

export interface PayoutLedger {
  id: string
  partner_id: string | null
  referral_id: string | null
  amount: number
  currency: string
  status: PayoutStatus
  payout_date: Date | null
  notes: string | null
  created_at: Date
  updated_at: Date
}

export interface ResourceAsset {
  id: string
  name: string
  description: string | null
  asset_type: ResourceAssetType
  url: string | null
  created_at: Date
  updated_at: Date
}

export interface IdempotencyKey {
  id: string
  idempotency_key: string
  endpoint: string | null
  result: Record<string, any> | null
  created_at: Date
  expires_at: Date
}
