import { NextResponse } from "next/server"
import { brevoEmailService } from "@/lib/services/brevo-email-service"

export async function GET() {
  try {
    const result = await brevoEmailService.healthCheck()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Email health check error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
