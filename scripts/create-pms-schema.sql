-- LumenHelix Project Management System Schema
-- Multi-workspace | RUBIC Versioning | Release Builder

-- Workspaces
CREATE TABLE IF NOT EXISTS workspaces (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT,
  icon TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  surface TEXT,
  category TEXT,
  stage INTEGER,
  sensitivity TEXT DEFAULT 'internal',
  status TEXT DEFAULT 'active',
  claim TEXT,
  description TEXT,
  project_lead TEXT,
  contributors TEXT[] DEFAULT ARRAY[]::TEXT[],
  partner_org TEXT,
  due_date DATE,
  rubic_status TEXT DEFAULT 'compliant',
  rollback_procedure TEXT,
  rollback_time TEXT,
  current_version TEXT,
  ip_note TEXT,
  privacy_impact TEXT,
  drive_folder_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(workspace_id, id)
);

-- Version History
CREATE TABLE IF NOT EXISTS version_history (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  version TEXT NOT NULL,
  date TIMESTAMP DEFAULT NOW(),
  author TEXT NOT NULL,
  changes TEXT NOT NULL,
  type TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Artifacts (Specs, Demos, etc.)
CREATE TABLE IF NOT EXISTS artifacts (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  artifact_type TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  version TEXT,
  drive_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Releases
CREATE TABLE IF NOT EXISTS releases (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  version TEXT NOT NULL,
  tag TEXT NOT NULL,
  date TIMESTAMP DEFAULT NOW(),
  status TEXT DEFAULT 'pending',
  environment TEXT,
  notes TEXT,
  approved_by TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Experiments
CREATE TABLE IF NOT EXISTS experiments (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  date TIMESTAMP DEFAULT NOW(),
  metrics JSONB,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Decisions
CREATE TABLE IF NOT EXISTS decisions (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  date TIMESTAMP DEFAULT NOW(),
  decision TEXT NOT NULL,
  rationale TEXT,
  approver TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Support Tickets
CREATE TABLE IF NOT EXISTS tickets (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  surface TEXT,
  severity TEXT DEFAULT 'SEV3',
  status TEXT DEFAULT 'open',
  owner TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Google Drive Integration
CREATE TABLE IF NOT EXISTS drive_connections (
  workspace_id TEXT PRIMARY KEY REFERENCES workspaces(id) ON DELETE CASCADE,
  connected BOOLEAN DEFAULT FALSE,
  account TEXT,
  root_folder_id TEXT,
  quota_used FLOAT,
  quota_total FLOAT,
  quota_unit TEXT DEFAULT 'GB',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS drive_files (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_type TEXT,
  parent_id TEXT,
  modified TIMESTAMP,
  owner TEXT,
  shared BOOLEAN DEFAULT FALSE,
  url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_workspace ON projects(workspace_id);
CREATE INDEX IF NOT EXISTS idx_projects_stage ON projects(stage);
CREATE INDEX IF NOT EXISTS idx_version_history_project ON version_history(project_id);
CREATE INDEX IF NOT EXISTS idx_artifacts_project ON artifacts(project_id);
CREATE INDEX IF NOT EXISTS idx_releases_project ON releases(project_id);
CREATE INDEX IF NOT EXISTS idx_tickets_workspace ON tickets(workspace_id);
CREATE INDEX IF NOT EXISTS idx_drive_files_workspace ON drive_files(workspace_id);
