import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { kv } from "@vercel/kv"

// User credentials - in a real app, these would be in a database
const USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@numoracle.com",
    username: "admin",
    password: "numoracle",
    role: "admin",
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    username: "user",
    password: "password",
    role: "member",
  },
]

async function createSession(userId: string): Promise<string> {
  const sessionId = Math.random().toString(36).substring(2, 15)
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

  await kv.set(
    `session:${sessionId}`,
    {
      userId,
      expiresAt,
    },
    { ex: 86400 }, // expire in 24 hours
  )

  return sessionId
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, identifier } = body

    // Support both email and identifier for backward compatibility
    const loginIdentifier = email || identifier

    // Find user by email or username
    const user = USERS.find(
      (u) => (u.email === loginIdentifier || u.username === loginIdentifier) && u.password === password,
    )

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    // Create session
    const sessionId = await createSession(user.id)

    // Set cookie based on user role
    if (user.role === "admin") {
      cookies().set({
        name: "admin_session",
        value: "logged_in",
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    }

    // Set general session cookie
    cookies().set({
      name: "session_id",
      value: sessionId,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    // Return user info without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during login" }, { status: 500 })
  }
}

// Handle GET requests (when someone visits the API URL directly)
export function GET() {
  return NextResponse.json({ message: "Login API endpoint" })
}
