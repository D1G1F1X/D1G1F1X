import { NextResponse } from "next/server"
import { verifyAuthToken } from "@/lib/simple-auth"
import { cookies } from "next/headers"

export async function GET() {
  const token = cookies().get("admin_token")?.value

  if (!token) {
    return NextResponse.json({ isAuthenticated: false, message: "No token provided" }, { status: 401 })
  }

  try {
    const decoded = verifyAuthToken(token)
    if (decoded && decoded.role === "admin") {
      return NextResponse.json({ isAuthenticated: true, user: { username: decoded.username, role: decoded.role } })
    } else {
      return NextResponse.json({ isAuthenticated: false, message: "Invalid or unauthorized token" }, { status: 403 })
    }
  } catch (error) {
    console.error("Token verification failed:", error)
    return NextResponse.json({ isAuthenticated: false, message: "Invalid token" }, { status: 401 })
  }
}
