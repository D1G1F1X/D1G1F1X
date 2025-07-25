import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const authCookie = cookies().get("admin_auth")?.value
  if (authCookie === "true") {
    return NextResponse.json({ authenticated: true })
  } else {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
