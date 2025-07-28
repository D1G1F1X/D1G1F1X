import { NextResponse } from "next/server"
import { aiServiceManager } from "@/lib/ai/enhanced-ai-service-manager"

export async function GET() {
  try {
    console.log("🔍 Checking AI service status...")

    const status = await aiServiceManager.testConfiguration()

    console.log("📊 AI Service Status:", status)

    return NextResponse.json({
      success: true,
      ...status,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Error checking AI service status:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        assistant_configured: false,
        assistant_accessible: false,
        chat_completion_available: false,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
