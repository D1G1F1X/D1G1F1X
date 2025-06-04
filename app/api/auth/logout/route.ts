import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  // Clear the session cookies
  cookies().delete("session_id")
  cookies().delete("admin_session")

  // Return a JSON response
  return NextResponse.json({
    success: true,
    message: "Logout successful",
  })
}

// Add a GET handler for direct access
export async function GET() {
  // Clear the session cookies
  cookies().delete("session_id")
  cookies().delete("admin_session")

  // Return a JSON response
  return NextResponse.json({
    success: true,
    message: "Logout successful",
  })
}
