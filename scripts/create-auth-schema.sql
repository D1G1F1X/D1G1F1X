-- Authentication and Authorization Schema
-- Supports admin, editor, user, and guest roles with hierarchical permissions

-- Create ENUM types for roles and permissions
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'user', 'guest');
CREATE TYPE permission_level AS ENUM ('read', 'write', 'delete', 'admin');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role user_role DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Roles table (for role definitions and descriptions)
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name user_role UNIQUE NOT NULL,
  description TEXT,
  hierarchy_level INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Permissions table
CREATE TABLE IF NOT EXISTS permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  resource VARCHAR(255),
  level permission_level,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Role-Permission mapping
CREATE TABLE IF NOT EXISTS role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(role_id, permission_id)
);

-- Sessions table (for session management)
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(500) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User activity logs
CREATE TABLE IF NOT EXISTS user_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(255),
  resource VARCHAR(255),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON user_activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON user_activity_logs(timestamp);

-- Insert default roles
INSERT INTO roles (name, description, hierarchy_level) VALUES
  ('admin', 'Full system access and administration capabilities', 4),
  ('editor', 'Can create, read, and modify content and projects', 3),
  ('user', 'Can read and interact with assigned resources', 2),
  ('guest', 'Read-only access to public resources', 1)
ON CONFLICT DO NOTHING;

-- Insert default permissions
INSERT INTO permissions (name, description, resource, level) VALUES
  ('users_read', 'View user information', 'users', 'read'),
  ('users_write', 'Create and edit users', 'users', 'write'),
  ('users_delete', 'Delete users', 'users', 'delete'),
  ('users_admin', 'Full user administration', 'users', 'admin'),
  ('projects_read', 'View projects', 'projects', 'read'),
  ('projects_write', 'Create and edit projects', 'projects', 'write'),
  ('projects_delete', 'Delete projects', 'projects', 'delete'),
  ('projects_admin', 'Full project administration', 'projects', 'admin'),
  ('tickets_read', 'View tickets', 'tickets', 'read'),
  ('tickets_write', 'Create and edit tickets', 'tickets', 'write'),
  ('tickets_delete', 'Delete tickets', 'tickets', 'delete'),
  ('roles_admin', 'Manage roles and permissions', 'roles', 'admin'),
  ('system_admin', 'Full system administration', 'system', 'admin')
ON CONFLICT DO NOTHING;

-- Assign permissions to roles
DO $$
DECLARE
  admin_role_id UUID;
  editor_role_id UUID;
  user_role_id UUID;
  guest_role_id UUID;
BEGIN
  SELECT id INTO admin_role_id FROM roles WHERE name = 'admin';
  SELECT id INTO editor_role_id FROM roles WHERE name = 'editor';
  SELECT id INTO user_role_id FROM roles WHERE name = 'user';
  SELECT id INTO guest_role_id FROM roles WHERE name = 'guest';

  -- Admin permissions
  INSERT INTO role_permissions (role_id, permission_id)
  SELECT admin_role_id, id FROM permissions
  ON CONFLICT DO NOTHING;

  -- Editor permissions
  INSERT INTO role_permissions (role_id, permission_id)
  SELECT editor_role_id, id FROM permissions WHERE level IN ('read', 'write')
  ON CONFLICT DO NOTHING;

  -- User permissions
  INSERT INTO role_permissions (role_id, permission_id)
  SELECT user_role_id, id FROM permissions WHERE level = 'read' AND resource != 'roles'
  ON CONFLICT DO NOTHING;

  -- Guest permissions
  INSERT INTO role_permissions (role_id, permission_id)
  SELECT guest_role_id, id FROM permissions WHERE resource IN ('projects', 'tickets') AND level = 'read'
  ON CONFLICT DO NOTHING;
END $$;
