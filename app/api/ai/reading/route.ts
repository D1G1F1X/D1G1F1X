import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

// Ensure Node runtime and allow longer processing window than 10s Edge default
export const runtime = "nodejs"
export const maxDuration = 30
export const dynamic = "force-dynamic"
import { aiServiceManager } from "@/lib/ai/ai-service-manager"
import type { ReadingRequest } from "@/lib/ai/ai-service-manager"

export async function POST(request: NextRequest) {
  try {
    console.log("[API] AI reading request received")

    // Parse request body with error handling
    let body: any
    try {
      body = await request.json()
    } catch (parseError) {
      console.error("[API] Failed to parse request body:", parseError)
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request format",
          fallback: true,
        },
        { status: 400 },
      )
    }

    console.log("[API] Request body parsed:", {
      fullName: body.fullName,
      hasQuestion: !!body.question,
      hasCards: !!body.selectedCards,
      spreadType: body.spreadType,
    })

    // Validate required fields
    if (!body.question || !body.selectedCards) {
      console.error("[API] Missing required fields:", {
        fullName: !!body.fullName,
        question: !!body.question,
        selectedCards: !!body.selectedCards,
      })
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: question or selectedCards",
          fallback: true,
        },
        { status: 400 },
      )
    }

    // Validate selectedCards is an array
    if (!Array.isArray(body.selectedCards)) {
      console.error("[API] Invalid selectedCards:", body.selectedCards)
      return NextResponse.json(
        {
          success: false,
          error: "selectedCards must be an array",
          fallback: true,
        },
        { status: 400 },
      )
    }

    // For chat initialization, allow empty cards array, otherwise require at least one card
    if (body.spreadType !== "chat_init" && body.selectedCards.length === 0) {
      console.error("[API] Empty selectedCards for non-chat spread:", body.selectedCards)
      return NextResponse.json(
        {
          success: false,
          error: "selectedCards must contain at least one card for card readings",
          fallback: true,
        },
        { status: 400 },
      )
    }

    const readingRequest: ReadingRequest = {
      fullName: body.fullName || "Anonymous User",
      dateOfBirth: body.dateOfBirth || undefined,
      timeOfBirth: body.timeOfBirth || undefined,
      birthPlace: body.birthPlace || undefined,
      question: body.question,
      selectedCards: body.selectedCards,
      spreadType: body.spreadType || "single",
      isMember: body.isMember || false,
    }

    console.log("[API] Calling AI service manager...")
    const response = await aiServiceManager.generateOracleReading(readingRequest)

    console.log("[API] AI service response:", {
      success: response.success,
      hasReading: !!response.reading,
      hasThreadId: !!response.threadId,
      error: response.error,
    })

    // In development (or when explicitly requested), block and poll until completion to restore local behavior
    const url = new URL(request.url)
    const wantBlocking = url.searchParams.get("blocking") === "true"
    const isDev = process.env.NODE_ENV !== "production"

    if (response.success && response.threadId && response.runId && (isDev || wantBlocking)) {
      console.log("[API] Dev/blocking mode: polling run until completion")
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

      let attempts = 0
      const maxAttempts = 25 // ~25s
      let status: string | undefined
      let finalContent: string | null = null

      while (attempts < maxAttempts) {
        const run = await openai.beta.threads.runs.retrieve(response.threadId, response.runId)
        status = run.status
        if (status === "completed") {
          const messages = await openai.beta.threads.messages.list(response.threadId, { order: "desc", limit: 1 })
          const assistantMessage = messages.data[0]
          if (assistantMessage?.content?.[0]?.type === "text") {
            finalContent = assistantMessage.content[0].text.value
          }
          break
        }
        if (status === "failed") {
          console.error("[API] Run failed while blocking:", run.last_error)
          break
        }
        await new Promise((r) => setTimeout(r, 1000))
        attempts++
      }

      if (finalContent) {
        return NextResponse.json({
          success: true,
          reading: finalContent,
          threadId: response.threadId,
          runId: response.runId,
        })
      }

      // Fall back to non-blocking response if not completed within timebox
      console.log("[API] Dev/blocking mode timed out, returning non-blocking payload")
      return NextResponse.json(response)
    }

    // Default: return immediately and let the client poll
    return NextResponse.json(response)
  } catch (error: any) {
    console.error("[API] Unexpected error in AI reading route:", error)
    console.error("[API] Error stack:", error.stack)

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error.message,
        fallback: true,
        reading:
          "I apologize, but the AI service is currently unavailable. Please try again later or contact support if the issue persists.",
      },
      { status: 500 },
    )
  }
}
