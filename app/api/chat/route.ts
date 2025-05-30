import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"
import { GoogleGenerativeAIStream, StreamingTextResponse, type Message } from "ai"

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY

if (!apiKey) {
  console.error(
    "CRITICAL_ERROR: GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set or not accessible in this environment.",
  )
  // This function will likely fail when genAI is initialized or used.
} else {
  console.log("[LUMEN CHAT API] GOOGLE_GENERATIVE_AI_API_KEY is loaded.")
}

const genAI = new GoogleGenerativeAI(apiKey || "FALLBACK_KEY_IF_UNDEFINED") // Fallback to prevent immediate crash if undefined, though calls will fail.

export const runtime = "nodejs"

const systemPromptText = `You are Lumen, an AI assistant for Lumen Helix Solutions.
Lumen Helix Solutions is a tech consulting firm that merges strategic insight with practical implementation.
Services offered include:
- AI Strategy & Fusion: Helping businesses integrate AI.
- Web Development: Building modern, responsive websites, including interactive 3D single-page sites (currently on special for $199 including 1 year hosting).
- Graphic Design: Logos, branding, and visual assets.
- Marketing Strategy: Digital marketing campaigns and strategies.
- Tech Consulting: Providing expert advice on technology solutions.
- Project Management: Efficiently managing tech projects.

Your goal is to be helpful, friendly, and informative. Answer questions about Lumen Helix Solutions, its services, projects, and provide general assistance related to the website's content.
Keep your responses concise and to the point. If you don't know an answer, say so politely.
Do not engage in off-topic conversations.
The current date is ${new Date().toLocaleDateString()}.
`

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
]

export async function POST(req: Request) {
  console.log("[LUMEN CHAT API] Received POST request to /api/chat")

  if (!apiKey) {
    console.error("[LUMEN CHAT API] ERROR: API key is missing. Cannot process request.")
    return new Response(JSON.stringify({ error: "AI Assistant configuration error: API key is missing." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const { messages }: { messages: Message[] } = await req.json()
    console.log("[LUMEN CHAT API] Received messages:", JSON.stringify(messages, null, 2))

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-preview-0514", // Ensure this model name is correct and accessible
      systemInstruction: systemPromptText,
      safetySettings,
    })

    // Convert Vercel AI SDK Message format to Google's Content format
    // Filter out:
    // 1. System messages (handled by systemInstruction)
    // 2. The initial assistant greeting if it's the very first message in the array
    const contentsForGemini = messages
      .filter((msg, index) => {
        if (msg.role === "system") return false
        if (index === 0 && msg.role === "assistant") {
          console.log("[LUMEN CHAT API] Filtering out initial assistant greeting:", msg.content)
          return false
        }
        return true
      })
      .map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }))

    console.log(
      "[LUMEN CHAT API] Processed contentsForGemini for Google API:",
      JSON.stringify(contentsForGemini, null, 2),
    )

    // Gemini API requires that the history does not have two consecutive messages from the same role.
    // And if the history is not empty, it should start with a 'user' message.
    const validatedHistory = []
    if (contentsForGemini.length > 0) {
      // Ensure it starts with 'user' if not empty
      let currentProcessingHistory = [...contentsForGemini]
      if (currentProcessingHistory[0].role !== "user") {
        console.warn(
          `[LUMEN CHAT API] History for Gemini does not start with 'user'. First message role: ${currentProcessingHistory[0].role}. Attempting to find first user message.`,
        )
        const firstUserIndex = currentProcessingHistory.findIndex((m) => m.role === "user")
        if (firstUserIndex !== -1) {
          currentProcessingHistory = currentProcessingHistory.slice(firstUserIndex)
          console.log("[LUMEN CHAT API] Sliced history to start with first user message.")
        } else {
          console.warn("[LUMEN CHAT API] No user messages found in history. Sending empty contents.")
          currentProcessingHistory = []
        }
      }

      if (currentProcessingHistory.length > 0) {
        validatedHistory.push(currentProcessingHistory[0])
        for (let i = 1; i < currentProcessingHistory.length; i++) {
          if (currentProcessingHistory[i].role !== validatedHistory[validatedHistory.length - 1].role) {
            validatedHistory.push(currentProcessingHistory[i])
          } else {
            // Merge content if roles are the same
            console.warn(`[LUMEN CHAT API] Merging consecutive messages of role: ${currentProcessingHistory[i].role}`)
            validatedHistory[validatedHistory.length - 1].parts[0].text +=
              "\n" + currentProcessingHistory[i].parts[0].text
          }
        }
      }
    }

    console.log("[LUMEN CHAT API] Validated history for Gemini API:", JSON.stringify(validatedHistory, null, 2))

    if (validatedHistory.length === 0) {
      console.log(
        "[LUMEN CHAT API] Validated history is empty. This is likely the first user turn after system prompt.",
      )
    }

    const geminiStream = await model.generateContentStream({
      contents: validatedHistory,
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.75,
        // topP and topK can be added if needed
      },
    })
    console.log("[LUMEN CHAT API] Successfully initiated content stream from Gemini.")

    const stream = GoogleGenerativeAIStream(geminiStream)
    return new StreamingTextResponse(stream)
  } catch (error: any) {
    console.error("[LUMEN CHAT API ERROR] An error occurred in POST /api/chat.")
    console.error("[LUMEN CHAT API ERROR] Error Name:", error.name)
    console.error("[LUMEN CHAT API ERROR] Error Message:", error.message)
    if (error.stack) {
      console.error("[LUMEN CHAT API ERROR] Error Stack:", error.stack)
    }
    // Log the full error object structure for detailed debugging
    console.error(
      "[LUMEN CHAT API ERROR] Full error object (stringified):",
      JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
    )

    let clientErrorMessage = "An internal error occurred with the AI assistant. Please try again later."
    // Attempt to provide more specific client-facing errors based on common issues
    if (error.message && error.message.toLowerCase().includes("api key not valid")) {
      clientErrorMessage = "AI Assistant Error: API key is not valid. Please check configuration."
    } else if (error.message && error.message.toLowerCase().includes("user location is not supported")) {
      clientErrorMessage = "AI Assistant Error: Service not available in your location."
    } else if (
      (error.message && error.message.toLowerCase().includes("model not found")) ||
      (error.message && error.message.toLowerCase().includes("permission denied"))
    ) {
      clientErrorMessage = "AI Assistant Error: The requested AI model is not accessible. Please check configuration."
    } else if (error.name === "AbortError" || (error.message && error.message.toLowerCase().includes("fetch_error"))) {
      clientErrorMessage =
        "AI Assistant Error: Could not connect to the AI service. Please check your network or API configuration."
    }

    return new Response(
      JSON.stringify({
        error: clientErrorMessage,
        details: process.env.NODE_ENV === "development" && error.message ? error.message : undefined,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
