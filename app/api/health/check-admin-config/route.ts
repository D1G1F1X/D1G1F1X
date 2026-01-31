import { NextRequest, NextResponse } from 'next/server'
import { validateAdminConfiguration } from '@/lib/admin-credentials'

/**
 * Admin Configuration Health Check Endpoint
 * 
 * GET /api/health/check-admin-config
 * 
 * Returns validation status of admin credentials configuration
 * Useful for deployment verification and debugging
 */

export async function GET(request: NextRequest) {
  try {
    const validation = validateAdminConfiguration()

    if (validation.isValid) {
      return NextResponse.json(
        {
          status: 'healthy',
          message: 'Admin credentials are properly configured',
          configured: true,
          errors: [],
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        status: 'degraded',
        message: 'Admin credentials are not properly configured',
        configured: false,
        errors: validation.errors,
        setup_instructions: {
          step_1: 'Generate password hash: node scripts/generate-admin-hash.js "password"',
          step_2: 'Set ADMIN_EMAIL in environment variables',
          step_3: 'Set ADMIN_PASSWORD_HASH in environment variables',
          step_4: 'Redeploy application',
        },
      },
      { status: 503 }
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to check admin configuration',
        error: error.message,
      },
      { status: 500 }
    )
  }
}
