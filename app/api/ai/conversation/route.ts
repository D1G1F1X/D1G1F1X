import { type NextRequest, NextResponse } from "next/server"
import { aiServiceManager } from "@/lib/ai/ai-service-manager"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, threadId, message } = body

    console.log(`[API] AI conversation request: ${action}`)

    switch (action) {
      case "continue":
        if (!threadId || !message) {
          return NextResponse.json({ success: false, error: "Thread ID and message are required" }, { status: 400 })
        }

        const response = await aiServiceManager.continueConversation(threadId, message)
        return NextResponse.json(response)

      case "history":
        if (!threadId) {
          return NextResponse.json({ success: false, error: "Thread ID is required" }, { status: 400 })
        }

        const history = await aiServiceManager.getConversationHistory(threadId)
        return NextResponse.json({ success: true, history })

      default:
        return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("[API] Error in AI conversation route:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
