import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    console.log("=== ADMIN VERIFY API ===")
    const user = await getCurrentUser()

    console.log("Verification result:", user ? "authenticated" : "not authenticated")

    if (user && user.role === "admin") {
      return NextResponse.json({
        authenticated: true,
        user: {
          id: user.id,
          username: user.username || user.name,
          email: user.email,
          role: user.role,
        },
      })
    } else {
      return NextResponse.json(
        {
          authenticated: false,
          message: "Not authenticated or insufficient permissions",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("Admin verify API error:", error)
    return NextResponse.json(
      {
        authenticated: false,
        message: "Verification failed",
        error: process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
      },
      { status: 500 },
    )
  }
}
