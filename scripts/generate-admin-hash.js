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
  process.stderr.write('Error: Please provide a password as an argument\n')
  process.stderr.write('Usage: node scripts/generate-admin-hash.js "your-password"\n')
  process.exit(1)
}

if (password.length < 8) {
  process.stderr.write('Error: Password must be at least 8 characters long\n')
  process.exit(1)
}

const hash = hashPassword(password)

process.stdout.write('\n' + '='.repeat(70) + '\n')
process.stdout.write('Admin Password Hash Generated\n')
process.stdout.write('='.repeat(70) + '\n')
process.stdout.write(`\nPassword: ${password}\n`)
process.stdout.write(`Hash: ${hash}\n`)
process.stdout.write('\n' + '-'.repeat(70) + '\n')
process.stdout.write('To use this hash, set it in your environment:\n')
process.stdout.write('-'.repeat(70) + '\n')
process.stdout.write(`\nADMIN_PASSWORD_HASH=${hash}\n`)
process.stdout.write('\nFor Vercel deployment:\n')
process.stdout.write('1. Go to your project settings\n')
process.stdout.write('2. Navigate to Environment Variables\n')
process.stdout.write('3. Add ADMIN_PASSWORD_HASH with the value above\n')
process.stdout.write('4. Redeploy your application\n')
process.stdout.write('\nFor local development (.env.local):\n')
process.stdout.write(`ADMIN_EMAIL=admin@lumenhelix.com\n`)
process.stdout.write(`ADMIN_PASSWORD_HASH=${hash}\n`)
process.stdout.write(`ADMIN_USERNAME=admin\n\n`)
process.stdout.write('='.repeat(70) + '\n\n')
