-- CRM Database Schema for LumenHelix
-- Entities: Contact, Account, Deal, Activity, Task, DocumentLink, Partner, Referral, PayoutLedger

-- Contacts table
CREATE TABLE IF NOT EXISTS crm_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  phone VARCHAR(20),
  company_id UUID REFERENCES crm_accounts(id) ON DELETE SET NULL,
  title VARCHAR(255),
  source VARCHAR(50), -- 'resources', 'diagnostic', 'partner_referral', 'direct'
  attribution_utm_source VARCHAR(255),
  attribution_utm_medium VARCHAR(255),
  attribution_utm_campaign VARCHAR(255),
  attribution_referrer VARCHAR(255),
  first_touch_at TIMESTAMP WITH TIME ZONE,
  last_touch_at TIMESTAMP WITH TIME ZONE,
  qualified BOOLEAN DEFAULT FALSE,
  qualified_at TIMESTAMP WITH TIME ZONE,
  consent BOOLEAN DEFAULT FALSE,
  consent_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'archived', 'invalid'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  updated_by UUID
);

-- Accounts table (companies)
CREATE TABLE IF NOT EXISTS crm_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  domain VARCHAR(255),
  email_domain VARCHAR(255),
  industry VARCHAR(255),
  size VARCHAR(50), -- 'startup', 'smb', 'mid-market', 'enterprise'
  website VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  updated_by UUID
);

-- Deals table (two pipelines: client sales and partner)
CREATE TABLE IF NOT EXISTS crm_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  pipeline VARCHAR(50) NOT NULL, -- 'client', 'partner'
  stage VARCHAR(50) NOT NULL, -- client: New Lead...Closed Won; partner: Applied...Inactive
  contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
  account_id UUID REFERENCES crm_accounts(id) ON DELETE CASCADE,
  value DECIMAL(12, 2),
  currency VARCHAR(3) DEFAULT 'USD',
  probability_percent INT DEFAULT 0,
  estimated_close_date DATE,
  actual_close_date DATE,
  status VARCHAR(50) DEFAULT 'open', -- 'open', 'won', 'lost', 'stuck'
  days_in_stage INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  updated_by UUID
);

-- Activities table (append-only audit trail)
CREATE TABLE IF NOT EXISTS crm_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_type VARCHAR(50), -- 'call', 'email', 'meeting', 'note', 'stage_change', 'task_created', 'document_added'
  contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES crm_deals(id) ON DELETE SET NULL,
  account_id UUID REFERENCES crm_accounts(id) ON DELETE SET NULL,
  title VARCHAR(255),
  description TEXT,
  metadata JSONB, -- Extra data (e.g. stage_from, stage_to for stage_change)
  actor_id UUID,
  actor_email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table (work assignments with SLA)
CREATE TABLE IF NOT EXISTS crm_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  task_type VARCHAR(50), -- 'review', 'follow_up', 'outreach', 'qualification', 'escalation'
  contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES crm_deals(id) ON DELETE SET NULL,
  account_id UUID REFERENCES crm_accounts(id) ON DELETE SET NULL,
  owner_id UUID,
  status VARCHAR(50) DEFAULT 'open', -- 'open', 'in_progress', 'completed', 'overdue'
  priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
  due_date DATE NOT NULL,
  sla_hours INT, -- Expected completion time in hours
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID
);

-- DocumentLinks table (Google Drive/Docs only, no file uploads)
CREATE TABLE IF NOT EXISTS crm_document_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url VARCHAR(500) NOT NULL,
  external_id VARCHAR(255), -- Google Drive file ID
  name VARCHAR(255),
  doc_type VARCHAR(50), -- 'diagnostic', 'proposal', 'contract', 'resource'
  access_level_expected VARCHAR(50) DEFAULT 'unknown', -- 'public', 'anyone_with_link', 'restricted', 'unknown'
  lifecycle VARCHAR(50) DEFAULT 'active', -- 'active', 'replaced', 'removed', 'revoked'
  contact_id UUID REFERENCES crm_contacts(id) ON DELETE SET NULL,
  deal_id UUID REFERENCES crm_deals(id) ON DELETE SET NULL,
  account_id UUID REFERENCES crm_accounts(id) ON DELETE SET NULL,
  added_by UUID,
  removed_by UUID,
  removed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partners table
CREATE TABLE IF NOT EXISTS crm_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
  account_id UUID REFERENCES crm_accounts(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES crm_deals(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'active', 'suspended'
  tier VARCHAR(50), -- 'standard', 'premium', 'strategic'
  commission_percent DECIMAL(5, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_by UUID,
  approved_at TIMESTAMP WITH TIME ZONE
);

-- Referrals table
CREATE TABLE IF NOT EXISTS crm_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES crm_partners(id) ON DELETE SET NULL,
  deal_id UUID REFERENCES crm_deals(id) ON DELETE SET NULL,
  referral_type VARCHAR(50), -- 'client', 'resource', 'strategic'
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'converted', 'lost'
  attributed_deal_value DECIMAL(12, 2),
  commission_amount DECIMAL(12, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PayoutLedger table (manual tracking)
CREATE TABLE IF NOT EXISTS crm_payout_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES crm_partners(id) ON DELETE SET NULL,
  referral_id UUID REFERENCES crm_referrals(id) ON DELETE SET NULL,
  amount DECIMAL(12, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid', 'hold'
  payout_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ResourceAsset table
CREATE TABLE IF NOT EXISTS crm_resource_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  asset_type VARCHAR(50), -- 'guide', 'template', 'tool', 'case_study'
  url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ResourceRequest table
CREATE TABLE IF NOT EXISTS crm_resource_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
  account_id UUID REFERENCES crm_accounts(id) ON DELETE SET NULL,
  resource_id UUID REFERENCES crm_resource_assets(id) ON DELETE SET NULL,
  request_type VARCHAR(50), -- 'download', 'consultation', 'trial'
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CRM Idempotency table (for request deduplication)
CREATE TABLE IF NOT EXISTS crm_idempotency_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key VARCHAR(255) NOT NULL UNIQUE,
  endpoint VARCHAR(255),
  result JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '24 hours'
);

-- Create indexes
CREATE INDEX idx_crm_contacts_email ON crm_contacts(email);
CREATE INDEX idx_crm_contacts_company_id ON crm_contacts(company_id);
CREATE INDEX idx_crm_contacts_source ON crm_contacts(source);
CREATE INDEX idx_crm_accounts_domain ON crm_accounts(domain);
CREATE INDEX idx_crm_deals_pipeline_stage ON crm_deals(pipeline, stage);
CREATE INDEX idx_crm_deals_contact_id ON crm_deals(contact_id);
CREATE INDEX idx_crm_activities_contact_id ON crm_activities(contact_id);
CREATE INDEX idx_crm_activities_deal_id ON crm_activities(deal_id);
CREATE INDEX idx_crm_activities_created_at ON crm_activities(created_at);
CREATE INDEX idx_crm_tasks_owner_id ON crm_tasks(owner_id);
CREATE INDEX idx_crm_tasks_status ON crm_tasks(status);
CREATE INDEX idx_crm_tasks_due_date ON crm_tasks(due_date);
CREATE INDEX idx_crm_document_links_deal_id ON crm_document_links(deal_id);
CREATE INDEX idx_crm_idempotency_keys ON crm_idempotency_keys(idempotency_key);
