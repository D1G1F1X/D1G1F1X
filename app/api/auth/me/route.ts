import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('lumen_session_token')?.value

    if (!token) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 401 }
      )
    }

    const session = await verifySession(token)

    if (!session || !session.user) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 401 }
      )
    }

    const { password_hash, ...userWithoutPassword } = session.user
    return NextResponse.json({
      authenticated: true,
      user: userWithoutPassword,
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json(
      { authenticated: false, error: errorMessage },
      { status: 500 }
    )
  }
}
