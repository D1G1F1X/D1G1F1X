import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  // Clear the admin session cookie
  cookies().delete("admin_session")

  return NextResponse.json({
    success: true,
    message: "Logged out successfully",
  })
}
