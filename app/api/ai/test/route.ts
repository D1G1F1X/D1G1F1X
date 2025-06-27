import { NextResponse } from "next/server"
import { aiServiceManager } from "@/lib/ai/enhanced-ai-service-manager"

export async function GET() {
  try {
    console.log("🧪 AI Test API called")

    const testResult = await aiServiceManager.testConfiguration()

    console.log("📊 Test results:", testResult)

    return NextResponse.json({
      ...testResult,
      timestamp: new Date().toISOString(),
      message: testResult.success ? "AI service is working correctly" : "AI service has configuration issues",
    })
  } catch (error) {
    console.error("💥 AI Test API error:", error)

    return NextResponse.json(
      {
        success: false,
        assistant_configured: false,
        assistant_accessible: false,
        chat_completion_available: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
        message: "Failed to test AI service configuration",
      },
      { status: 500 },
    )
  }
}
