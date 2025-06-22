import { type NextRequest, NextResponse } from "next/server"
import { createCustomOpenAIResponse } from "@/lib/openai-assistant"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { promptMessages, temperature, maxOutputTokens, topP, tools } = body

    if (!promptMessages || !Array.isArray(promptMessages)) {
      return NextResponse.json(
        {
          error: "promptMessages array is required",
          success: false,
        },
        { status: 400 },
      )
    }

    console.log("Generating custom OpenAI response with request:", body)
    const response = await createCustomOpenAIResponse(promptMessages, temperature, maxOutputTokens, topP, tools)
    return NextResponse.json(response)
  } catch (error) {
    console.error("Custom OpenAI Response API error:", error)
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
