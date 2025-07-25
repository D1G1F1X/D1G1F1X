import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyAdminCredentials } from "@/lib/simple-auth"

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (verifyAdminCredentials(username, password)) {
    // In a real application, you'd use a more robust session management system
    // like JWTs or a database-backed session. For this simple admin, a cookie
    // indicating authentication is sufficient.
    cookies().set("admin_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
  }
}
