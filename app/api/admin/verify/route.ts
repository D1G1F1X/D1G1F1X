import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Force dynamic rendering for this route
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Check for admin session cookie
    const cookieStore = cookies()
    const adminSession = cookieStore.get("admin_session")

    if (adminSession && adminSession.value === "logged_in") {
      return NextResponse.json({ authenticated: true })
    }

    return NextResponse.json({ authenticated: false })
  } catch (error) {
    console.error("Auth verification error:", error)
    return NextResponse.json({ authenticated: false, error: "Authentication verification failed" }, { status: 500 })
  }
}
