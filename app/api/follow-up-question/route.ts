// Import the new optimization utilities
import { tryCatch } from "@/lib/error-handler"
import { cachedRequest, retryWithBackoff } from "@/lib/api-optimizer"
import { type NextRequest, NextResponse } from "next/server"
import { generateFollowUpPrompt } from "@/lib/ai-prompt-manager"
import { getGeminiResponse } from "@/lib/gemini"

export async function POST(request: NextRequest) {
  return await tryCatch(
    async () => {
      const { originalReading, followUpQuestion } = await request.json()

      if (!originalReading || !followUpQuestion) {
        return NextResponse.json({ error: "Original reading and follow-up question are required" }, { status: 400 })
      }

      // Create a cache key for the follow-up question
      const cacheKey = `followup:${Buffer.from(originalReading.substring(0, 100)).toString("base64")}:${followUpQuestion}`

      // Use the cachedRequest utility
      const response = await cachedRequest(cacheKey, async () => {
        // Generate the prompt for the follow-up question
        const prompt = await generateFollowUpPrompt(originalReading, followUpQuestion)

        // Use retry with backoff for reliability
        return await retryWithBackoff(
          async () => await getGeminiResponse(prompt),
          3, // max retries
          500, // base delay
        )
      })

      return NextResponse.json({
        response,
        cached: false,
      })
    },
    NextResponse.json({ error: "Failed to process follow-up question" }, { status: 500 }),
  )
}
