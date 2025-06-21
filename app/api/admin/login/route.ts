import { type NextRequest, NextResponse } from "next/server"
import { login } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    console.log("=== ADMIN LOGIN API ===")
    const body = await request.json()
    const { identifier, password } = body

    console.log("Login request received for:", identifier)

    // Create FormData to match the login function signature
    const formData = new FormData()
    formData.append("identifier", identifier || "")
    formData.append("password", password || "")

    const result = await login(null, formData)

    console.log("Login result:", { success: result.success, message: result.message })

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Login successful",
        user: { username: identifier },
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Invalid credentials",
          errors: result.errors,
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("Admin login API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during login",
        error: process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
      },
      { status: 500 },
    )
  }
}
