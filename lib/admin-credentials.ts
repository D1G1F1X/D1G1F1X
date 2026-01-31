import { verifyPassword } from './auth'

/**
 * Admin Credentials Configuration
 * Retrieves admin credentials from environment variables
 * Supports primary admin and backup admin for emergency access
 */

export interface AdminCredentials {
  email: string
  passwordHash: string
  username: string
}

export interface AdminConfig {
  primary: AdminCredentials
  backup?: AdminCredentials
  isConfigured: boolean
}

/**
 * Get admin credentials from environment variables
 */
export function getAdminConfig(): AdminConfig {
  const primaryEmail = process.env.ADMIN_EMAIL
  const primaryPasswordHash = process.env.ADMIN_PASSWORD_HASH
  const primaryUsername = process.env.ADMIN_USERNAME

  const backupEmail = process.env.BACKUP_ADMIN_EMAIL
  const backupPasswordHash = process.env.BACKUP_ADMIN_PASSWORD_HASH

  // Validate primary admin is configured
  if (!primaryEmail || !primaryPasswordHash) {
    return {
      primary: {
        email: '',
        passwordHash: '',
        username: '',
      },
      isConfigured: false,
    }
  }

  const config: AdminConfig = {
    primary: {
      email: primaryEmail,
      passwordHash: primaryPasswordHash,
      username: primaryUsername || 'admin',
    },
    isConfigured: true,
  }

  // Add backup admin if configured
  if (backupEmail && backupPasswordHash) {
    config.backup = {
      email: backupEmail,
      passwordHash: backupPasswordHash,
      username: 'backup-admin',
    }
  }

  return config
}

/**
 * Verify admin credentials against environment variables
 * Supports both primary and backup admin
 */
export function verifyAdminCredentials(email: string, password: string): boolean {
  const adminConfig = getAdminConfig()

  if (!adminConfig.isConfigured) {
    return false
  }

  // Check primary admin
  if (email === adminConfig.primary.email) {
    const isValid = verifyPassword(password, adminConfig.primary.passwordHash)
    return isValid
  }

  // Check backup admin
  if (adminConfig.backup && email === adminConfig.backup.email) {
    return verifyPassword(password, adminConfig.backup.passwordHash)
  }

  return false
}

/**
 * Check if an email is an admin email
 */
export function isAdminEmail(email: string): boolean {
  const adminConfig = getAdminConfig()

  if (!adminConfig.isConfigured) {
    return false
  }

  if (email === adminConfig.primary.email) {
    return true
  }

  if (adminConfig.backup && email === adminConfig.backup.email) {
    return true
  }

  return false
}

/**
 * Get admin email from environment
 */
export function getAdminEmail(): string | null {
  return process.env.ADMIN_EMAIL || null
}

/**
 * Get backup admin email from environment
 */
export function getBackupAdminEmail(): string | null {
  return process.env.BACKUP_ADMIN_EMAIL || null
}

/**
 * Get default registration role from environment configuration
 * Allows admin to set what role new users receive on registration
 */
export function getDefaultRegistrationRole(): 'admin' | 'editor' | 'user' | 'guest' {
  const defaultRole = process.env.DEFAULT_REGISTRATION_ROLE
  
  // Validate the role is one of the allowed types
  if (defaultRole && ['admin', 'editor', 'user', 'guest'].includes(defaultRole)) {
    return defaultRole as 'admin' | 'editor' | 'user' | 'guest'
  }

  // Default to 'user' if not configured or invalid
  return 'user'
}
