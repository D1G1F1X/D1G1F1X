import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const adminSession = cookies().get("admin_session")

    if (adminSession && adminSession.value === "logged_in") {
      return NextResponse.json({ authenticated: true }, { status: 200 })
    } else {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json(
      { authenticated: false, message: "An error occurred during verification" },
      { status: 500 },
    )
  }
}
