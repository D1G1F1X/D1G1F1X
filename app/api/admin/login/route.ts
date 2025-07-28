import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Admin credentials - in a real app, these would be in a database
const ADMIN_USERNAME = "admin"
const ADMIN_EMAIL = "admin@numoracle.com"
const ADMIN_PASSWORD = "numoracle"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { identifier, password } = body

    // Validate credentials
    const isValidCredentials =
      password === ADMIN_PASSWORD && (identifier === ADMIN_USERNAME || identifier === ADMIN_EMAIL)

    if (!isValidCredentials) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    // Set HTTP-only cookie with secure settings
    cookies().set({
      name: "admin_session",
      value: "logged_in",
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    return NextResponse.json({
      success: true,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during login" }, { status: 500 })
  }
}
