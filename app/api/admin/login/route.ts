import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { ADMIN_USERNAME, ADMIN_PASSWORD } from "@/lib/config/environment"

export async function POST(request: Request) {
  const { identifier, password } = await request.json()

  if (identifier === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // In a real application, you'd generate a secure, signed token (e.g., JWT)
    // and set it as an HttpOnly cookie. For simplicity, we'll use a basic flag.
    cookies().set("admin_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })
    return NextResponse.json({ success: true, message: "Login successful" })
  } else {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
  }
}
