import { NextResponse } from "next/server"
import { aiServiceManager } from "@/lib/ai/enhanced-ai-service-manager"

export async function GET() {
  try {
    const status = await aiServiceManager.testConfiguration()

    return NextResponse.json({
      ...status,
      timestamp: new Date().toISOString(),
      environment: {
        has_openai_key: !!process.env.OPENAI_API_KEY,
        has_assistant_key: !!process.env.OPENAI_ASSISTANT_API_KEY,
        has_assistant_id: !!process.env.OPENAI_ASSISTANT_ID,
        model: process.env.OPENAI_MODEL || "gpt-4o",
        max_tokens: process.env.OPENAI_MAX_TOKENS || "4000",
      },
    })
  } catch (error) {
    console.error("Assistant status check failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
