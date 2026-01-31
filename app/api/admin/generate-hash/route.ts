import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

/**
 * POST /api/admin/generate-hash
 * 
 * Generates a secure password hash in the format: salt:hash
 * 
 * Body:
 *   {
 *     "password": "your-password"
 *   }
 * 
 * Response:
 *   {
 *     "success": true,
 *     "password": "your-password",
 *     "hash": "salt:hash",
 *     "instructions": "Copy the hash value above and set it as ADMIN_PASSWORD_HASH environment variable"
 *   }
 */

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex')
  return `${salt}:${hash}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    // Validation
    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      )
    }

    if (typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Password must be a string' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Generate hash
    const hash = hashPassword(password)

    return NextResponse.json({
      success: true,
      password: password,
      hash: hash,
      instructions: 'Copy the hash value above and set it as ADMIN_PASSWORD_HASH environment variable in your Vercel project settings',
      vercelSteps: [
        '1. Go to your Vercel project dashboard',
        '2. Navigate to Settings > Environment Variables',
        '3. Create or update ADMIN_PASSWORD_HASH',
        '4. Paste the hash value',
        '5. Redeploy your application',
      ],
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate hash' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST method to generate a password hash',
    example: {
      method: 'POST',
      url: '/api/admin/generate-hash',
      body: { password: 'YourSecurePassword123' },
    },
  })
}
