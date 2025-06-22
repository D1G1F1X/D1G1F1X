import { type NextRequest, NextResponse } from "next/server"
import {
  generateOracleReading,
  continueConversation,
  getConversationHistory,
  type ReadingRequest,
  type ReadingResponse,
} from "@/lib/openai-assistant"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...data } = body

    console.log(`[API/Assistant] Received request with action: ${action}`)

    switch (action) {
      case "generateReading":
        const readingRequest: ReadingRequest = {
          fullName: data.fullName,
          dateOfBirth: data.dateOfBirth,
          timeOfBirth: data.timeOfBirth,
          question: data.question,
          selectedCards: data.selectedCards,
          spreadType: data.spreadType,
        }

        console.log("[API/Assistant] Calling generateOracleReading with request:", readingRequest)
        const reading: ReadingResponse = await generateOracleReading(readingRequest)
        console.log(
          "[API/Assistant] generateOracleReading response:",
          reading.success ? "Success" : "Failure",
          reading.error || reading.details,
        )
        return NextResponse.json(reading)

      case "continueConversation":
        if (!data.threadId || !data.message) {
          console.error("[API/Assistant] Error: Thread ID and message are required for continueConversation.")
          return NextResponse.json(
            {
              error: "Thread ID and message are required",
              success: false,
            },
            { status: 400 },
          )
        }

        console.log(`[API/Assistant] Calling continueConversation for thread: ${data.threadId}`)
        const response: ReadingResponse = await continueConversation(data.threadId, data.message)
        console.log(
          "[API/Assistant] continueConversation response:",
          response.success ? "Success" : "Failure",
          response.error || response.details,
        )
        return NextResponse.json(response)

      case "getHistory":
        if (!data.threadId) {
          console.error("[API/Assistant] Error: Thread ID is required for getHistory.")
          return NextResponse.json(
            {
              error: "Thread ID is required",
              success: false,
            },
            { status: 400 },
          )
        }

        console.log(`[API/Assistant] Calling getConversationHistory for thread: ${data.threadId}`)
        const history = await getConversationHistory(data.threadId)
        console.log(`[API/Assistant] getConversationHistory retrieved ${history.length} messages.`)
        return NextResponse.json({ history, success: true })

      default:
        console.error(`[API/Assistant] Error: Invalid action received: ${action}`)
        return NextResponse.json(
          {
            error: "Invalid action",
            success: false,
          },
          { status: 400 },
        )
    }
  } catch (error: any) {
    console.error("[API/Assistant] CRITICAL ERROR in Assistant API route:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message || "Unknown error",
        success: false,
      },
      { status: 500 },
    )
  }
}
