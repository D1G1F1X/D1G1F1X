import { NextResponse } from "next/server"
import { aiServiceManager } from "@/lib/ai/enhanced-ai-service-manager"

export async function GET() {
  try {
    const status = await aiServiceManager.getServiceStatus()
    return NextResponse.json(status)
  } catch (error) {
    console.error("Failed to get AI service status:", error)
    return NextResponse.json(
      {
        success: false,
        assistant_configured: false,
        assistant_accessible: false,
        chat_completion_available: false,
        timestamp: new Date().toISOString(),
        error: `Internal server error: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    )
  }
}
