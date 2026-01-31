import { NextResponse } from 'next/server'
import { validateAdminConfiguration } from '@/lib/admin-credentials'

export async function GET() {
  try {
    const validation = validateAdminConfiguration()
    
    return NextResponse.json({
      isValid: validation.isValid,
      errors: validation.errors,
      adminEmailSet: !!process.env.ADMIN_EMAIL,
      adminPasswordHashSet: !!process.env.ADMIN_PASSWORD_HASH,
      adminEmail: process.env.ADMIN_EMAIL || 'NOT SET',
      message: validation.isValid ? 'Admin credentials properly configured' : 'Admin credentials missing or invalid'
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      isValid: false
    }, { status: 500 })
  }
}
