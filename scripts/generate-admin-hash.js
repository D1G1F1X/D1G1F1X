#!/usr/bin/env node
/**
 * Admin Password Hash Generator
 * 
 * Usage:
 *   node scripts/generate-admin-hash.js "your-password"
 * 
 * This script generates a secure password hash that can be stored in environment variables.
 * Copy the output and set it as ADMIN_PASSWORD_HASH or BACKUP_ADMIN_PASSWORD_HASH
 */

const crypto = require('crypto')

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex')
  return `${salt}:${hash}`
}

// Get password from command line arguments
const password = process.argv[2]

if (!password) {
  console.error('Error: Please provide a password as an argument')
  console.error('Usage: node scripts/generate-admin-hash.js "your-password"')
  process.exit(1)
}

if (password.length < 8) {
  console.error('Error: Password must be at least 8 characters long')
  process.exit(1)
}

const hash = hashPassword(password)

console.log('\n' + '='.repeat(70))
console.log('Admin Password Hash Generated')
console.log('='.repeat(70))
console.log(`\nPassword: ${password}`)
console.log(`Hash: ${hash}`)
console.log('\n' + '-'.repeat(70))
console.log('To use this hash, set it in your environment:')
console.log('-'.repeat(70))
console.log(`\nADMIN_PASSWORD_HASH=${hash}`)
console.log('\nFor Vercel deployment:')
console.log('1. Go to your project settings')
console.log('2. Navigate to Environment Variables')
console.log('3. Add ADMIN_PASSWORD_HASH with the value above')
console.log('4. Redeploy your application')
console.log('\nFor local development (.env.local):')
console.log(`ADMIN_EMAIL=admin@lumenhelix.com`)
console.log(`ADMIN_PASSWORD_HASH=${hash}`)
console.log(`ADMIN_USERNAME=admin\n`)
console.log('='.repeat(70) + '\n')
