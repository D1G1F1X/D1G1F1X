// Workspace
export interface Workspace {
  id: string
  name: string
  description?: string
  owner_id: string
  created_at: Date
  updated_at: Date
}

// Project
export interface Project {
  id: string
  workspace_id: string
  name: string
  description?: string
  status: 'active' | 'archived' | 'completed'
  created_at: Date
  updated_at: Date
}

// Version History
export interface VersionHistory {
  id: string
  project_id: string
  version_number: number
  changes: string
  created_by: string
  created_at: Date
}

// Artifact
export interface Artifact {
  id: string
  project_id: string
  name: string
  type: string
  url: string
  created_at: Date
  updated_at: Date
}

// Release
export interface Release {
  id: string
  project_id: string
  version: string
  release_notes: string
  released_at: Date
  created_at: Date
}

// Experiment
export interface Experiment {
  id: string
  project_id: string
  name: string
  description?: string
  status: 'active' | 'completed' | 'failed'
  results?: string
  created_at: Date
  updated_at: Date
}

// Decision
export interface Decision {
  id: string
  project_id: string
  title: string
  description: string
  decision: string
  rationale: string
  created_by: string
  created_at: Date
}

// Ticket
export interface Ticket {
  id: string
  project_id: string
  title: string
  description?: string
  status: 'open' | 'in_progress' | 'completed' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assigned_to?: string
  created_at: Date
  updated_at: Date
}

// Google Drive Integration
export interface GoogleDriveIntegration {
  id: string
  workspace_id: string
  google_account_email: string
  folder_id: string
  is_active: boolean
  last_sync: Date
  created_at: Date
  updated_at: Date
}
