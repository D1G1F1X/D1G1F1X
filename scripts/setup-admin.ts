import { validateAdminConfiguration } from '../lib/admin-credentials'

/**
 * Admin Configuration Setup Script
 * Validates admin credentials on application startup
 * Call this during app initialization
 */

export async function validateAdminSetup(): Promise<boolean> {
  console.log('\n' + '='.repeat(70))
  console.log('Admin Configuration Validation')
  console.log('='.repeat(70))

  const validation = validateAdminConfiguration()

  if (validation.isValid) {
    console.log('✓ Admin credentials are properly configured')
    console.log('✓ Application is ready for admin authentication')
    console.log('='.repeat(70) + '\n')
    return true
  }

  console.error('\n✗ Admin configuration validation failed:')
  validation.errors.forEach((error) => {
    console.error(`  - ${error}`)
  })

  console.error('\n' + '-'.repeat(70))
  console.error('To fix this, please:')
  console.error('-'.repeat(70))
  console.error('1. Generate a password hash using the setup script:')
  console.error('   node scripts/generate-admin-hash.js "your-password"')
  console.error('')
  console.error('2. Set the environment variables:')
  console.error('   ADMIN_EMAIL: Administrator email address')
  console.error('   ADMIN_PASSWORD_HASH: Hash generated from step 1')
  console.error('   ADMIN_USERNAME: (optional) Administrator username')
  console.error('')
  console.error('3. For Vercel deployment, add these in project settings:')
  console.error('   Settings > Environment Variables')
  console.error('')
  console.error('4. For local development, add to .env.local:')
  console.error('   ADMIN_EMAIL=admin@lumenhelix.com')
  console.error('   ADMIN_PASSWORD_HASH=<generated-hash>')
  console.error('')
  console.error('='.repeat(70) + '\n')

  return false
}

// Export for use in api/health or startup checks
export default validateAdminSetup
