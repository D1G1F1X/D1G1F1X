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
    console.error(
      '[Admin Config] Primary admin credentials not configured in environment variables'
    )
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
    return verifyPassword(password, adminConfig.primary.passwordHash)
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
 * Validate that admin credentials are properly configured
 * This should be called during app startup
 */
export function validateAdminConfiguration(): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

  if (!adminEmail) {
    errors.push('ADMIN_EMAIL is not configured')
  }

  if (!adminPasswordHash) {
    errors.push('ADMIN_PASSWORD_HASH is not configured')
  }

  // Validate password hash format (should be salt:hash format)
  if (adminPasswordHash && !adminPasswordHash.includes(':')) {
    errors.push('ADMIN_PASSWORD_HASH has invalid format. Expected salt:hash format.')
  }

  // Warn if backup admin is partially configured
  const backupAdminEmail = process.env.BACKUP_ADMIN_EMAIL
  const backupAdminPasswordHash = process.env.BACKUP_ADMIN_PASSWORD_HASH

  if ((backupAdminEmail && !backupAdminPasswordHash) || (!backupAdminEmail && backupAdminPasswordHash)) {
    errors.push('Backup admin credentials are partially configured. Either provide both or neither.')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
