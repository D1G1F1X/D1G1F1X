-- Guest Access Control & Project Assignment Schema
-- Extends the existing auth schema to support guest-specific access controls

-- Guest registrations table (tracks pending guest approvals)
CREATE TABLE IF NOT EXISTS guest_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255),
  contact_email VARCHAR(255),
  phone VARCHAR(20),
  reason_for_access TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Guest project assignments (links guests to specific projects they can access)
CREATE TABLE IF NOT EXISTS guest_project_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID,
  access_level VARCHAR(50) DEFAULT 'view', -- view, comment, limited_edit
  assigned_by UUID REFERENCES users(id),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(guest_id, project_id)
);

-- Guest ticket access (links guests to specific tickets they can access)
CREATE TABLE IF NOT EXISTS guest_ticket_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id UUID REFERENCES users(id) ON DELETE CASCADE,
  ticket_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(guest_id, ticket_id)
);

-- Admin notifications table (for admin alerts on guest registrations and access changes)
CREATE TABLE IF NOT EXISTS admin_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES users(id) ON DELETE CASCADE,
  notification_type VARCHAR(100), -- guest_registration, access_request, project_assignment
  related_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  related_resource_id VARCHAR(255),
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  action_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Staff access levels table (for fine-grained in-house and out-of-house staff control)
CREATE TABLE IF NOT EXISTS staff_access_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id UUID REFERENCES users(id) ON DELETE CASCADE,
  staff_type VARCHAR(50), -- in-house, contractor, vendor
  permission_level VARCHAR(50), -- junior, senior, lead, manager
  department VARCHAR(100),
  managed_by UUID REFERENCES users(id),
  can_manage_guests BOOLEAN DEFAULT false,
  can_view_analytics BOOLEAN DEFAULT false,
  can_manage_projects BOOLEAN DEFAULT false,
  can_manage_tickets BOOLEAN DEFAULT false,
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Access audit log (tracks all access control changes)
CREATE TABLE IF NOT EXISTS access_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100), -- grant_access, revoke_access, approve_registration, reject_registration
  target_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  resource_type VARCHAR(100), -- project, ticket, workspace
  resource_id VARCHAR(255),
  old_value TEXT,
  new_value TEXT,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_guest_registrations_status ON guest_registrations(status);
CREATE INDEX IF NOT EXISTS idx_guest_registrations_user_id ON guest_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_guest_registrations_pending ON guest_registrations(status) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_guest_project_access_guest ON guest_project_access(guest_id);
CREATE INDEX IF NOT EXISTS idx_guest_project_access_project ON guest_project_access(project_id);
CREATE INDEX IF NOT EXISTS idx_guest_ticket_access_guest ON guest_ticket_access(guest_id);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_admin ON admin_notifications(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_is_read ON admin_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_created ON admin_notifications(created_at);
CREATE INDEX IF NOT EXISTS idx_staff_access_levels_staff ON staff_access_levels(staff_id);
CREATE INDEX IF NOT EXISTS idx_staff_access_levels_type ON staff_access_levels(staff_type);
CREATE INDEX IF NOT EXISTS idx_access_audit_log_actor ON access_audit_log(actor_id);
CREATE INDEX IF NOT EXISTS idx_access_audit_log_created ON access_audit_log(created_at);
