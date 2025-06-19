import { type NextRequest, NextResponse } from "next/server"
import {
  generateOracleReading,
  continueConversation,
  getConversationHistory,
  type ReadingRequest,
} from "@/lib/openai-assistant"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...data } = body

    console.log(`Assistant API called with action: ${action}`)

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

        console.log("Generating reading with request:", readingRequest)
        const reading = await generateOracleReading(readingRequest)
        return NextResponse.json(reading)

      case "continueConversation":
        if (!data.threadId || !data.message) {
          return NextResponse.json(
            {
              error: "Thread ID and message are required",
              success: false,
            },
            { status: 400 },
          )
        }

        console.log(`Continuing conversation in thread: ${data.threadId}`)
        const response = await continueConversation(data.threadId, data.message)
        return NextResponse.json(response)

      case "getHistory":
        if (!data.threadId) {
          return NextResponse.json(
            {
              error: "Thread ID is required",
              success: false,
            },
            { status: 400 },
          )
        }

        console.log(`Getting history for thread: ${data.threadId}`)
        const history = await getConversationHistory(data.threadId)
        return NextResponse.json({ history, success: true })

      default:
        return NextResponse.json(
          {
            error: "Invalid action",
            success: false,
          },
          { status: 400 },
        )
    }
  } catch (error) {
    console.error("Assistant API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
        success: false,
      },
      { status: 500 },
    )
  }
}
