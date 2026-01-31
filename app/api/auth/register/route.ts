import { NextRequest, NextResponse } from 'next/server'
import { registerUser } from '@/lib/auth'
import { getDefaultRegistrationRole } from '@/lib/admin-credentials'

export async function POST(request: NextRequest) {
  try {
    const { email, name, password, password_confirm } = await request.json()

    if (!email || !name || !password) {
      return NextResponse.json(
        { success: false, message: 'Email, name, and password are required' },
        { status: 400 }
      )
    }

    if (password !== password_confirm) {
      return NextResponse.json(
        { success: false, message: 'Passwords do not match' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Get default role from admin configuration
    const defaultRole = getDefaultRegistrationRole()
    console.log('[v0] Registering user with default role:', defaultRole)

    const result = await registerUser(email, name, password, defaultRole)

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Registration failed' },
      { status: 500 }
    )
  }
}
