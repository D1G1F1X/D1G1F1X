#!/usr/bin/env node
/**
 * Generated Admin Credentials - Test Setup
 * This file is for reference only. Use the values below in your environment variables.
 */

const crypto = require('crypto')

// Generate a secure test password
const testPassword = 'LumenHelix@2024Admin'

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex')
  return `${salt}:${hash}`
}

const hash = hashPassword(testPassword)

console.log('\n' + '='.repeat(80))
console.log('SECURE ADMIN CREDENTIALS GENERATED')
console.log('='.repeat(80))
console.log('\n✓ Use these credentials to login:')
console.log('-'.repeat(80))
console.log(`Email: admin@lumenhelix.com`)
console.log(`Password: ${testPassword}`)
console.log(`Password Hash: ${hash}`)
console.log('-'.repeat(80))
console.log('\n✓ For local development (.env.local):')
console.log('-'.repeat(80))
console.log(`ADMIN_EMAIL=admin@lumenhelix.com`)
console.log(`ADMIN_PASSWORD_HASH=${hash}`)
console.log(`ADMIN_USERNAME=admin`)
console.log('-'.repeat(80))
console.log('\n✓ For Vercel Production:')
console.log('-'.repeat(80))
console.log('Go to: Project Settings → Environment Variables')
console.log('Add the following variables:')
console.log(`  Name: ADMIN_EMAIL | Value: admin@lumenhelix.com`)
console.log(`  Name: ADMIN_PASSWORD_HASH | Value: ${hash}`)
console.log(`  Name: ADMIN_USERNAME | Value: admin`)
console.log('-'.repeat(80))
console.log('\nStep-by-step to login:')
console.log('1. Go to /login page')
console.log(`2. Enter Email: admin@lumenhelix.com`)
console.log(`3. Enter Password: ${testPassword}`)
console.log('4. Select "Admin" as user type')
console.log('5. Click Login')
console.log('='.repeat(80) + '\n')
