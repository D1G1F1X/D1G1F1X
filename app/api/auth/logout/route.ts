import { NextRequest, NextResponse } from 'next/server'
import { logoutUser, verifySession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('lumen_session_token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No active session' },
        { status: 400 }
      )
    }

    await logoutUser(token)

    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    })

    response.cookies.delete('lumen_session_token')
    return response
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Logout failed' },
      { status: 500 }
    )
  }
}
