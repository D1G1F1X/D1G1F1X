import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const adminAuth = cookies().get("admin_auth")?.value

  if (adminAuth === "true") {
    return NextResponse.json({ authenticated: true })
  } else {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
