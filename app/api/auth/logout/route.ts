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
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Logout failed'
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    )
  }
}
