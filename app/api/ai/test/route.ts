import { NextResponse } from "next/server"
import { aiServiceManager } from "@/lib/ai/ai-service-manager"

export async function GET() {
  try {
    const isConfigured = aiServiceManager.isAIConfigured()

    const config = {
      isConfigured,
      hasAssistantApiKey: !!process.env.OPENAI_ASSISTANT_API_KEY,
      hasRegularApiKey: !!process.env.OPENAI_API_KEY,
      hasAssistantId: !!process.env.OPENAI_ASSISTANT_ID,
      isServer: typeof window === "undefined",
    }

    console.log("[AI Test] Configuration check:", config)

    return NextResponse.json({
      success: true,
      configured: isConfigured,
      config,
      message: isConfigured ? "AI service is properly configured" : "AI service configuration is incomplete",
    })
  } catch (error: any) {
    console.error("[AI Test] Error checking configuration:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        configured: false,
      },
      { status: 500 },
    )
  }
}
