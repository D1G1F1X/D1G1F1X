import { NextRequest, NextResponse } from 'next/server'
import { loginUser } from '@/lib/auth'
import { setSessionCookie } from '@/lib/auth-session'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    const result = await loginUser(email, password)

    if (!result.success || !result.token) {
      return NextResponse.json(result, { status: 401 })
    }

    // Set session cookie
    const response = NextResponse.json(result)
    response.cookies.set('lumen_session_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })

    return response
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Login failed' },
      { status: 500 }
    )
  }
}
