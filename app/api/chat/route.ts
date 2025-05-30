import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, type Content } from "@google/generative-ai"
import {
  GoogleGenerativeAIStream,
  StreamingTextResponse,
  type Message as VercelAIMessage,
  experimental_buildGoogleGenAIPrompt,
} from "ai" // Updated import

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
// Note: GOOGLE_GENERATIVE_AI_API_KEY is checked within the POST handler.

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
    console.error(
      "[LUMEN CHAT API] CRITICAL_ERROR: GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set. Cannot process request.",
    )
    return new Response(JSON.stringify({ error: "AI Assistant configuration error: API key is missing." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
  console.log("[LUMEN CHAT API] GOOGLE_GENERATIVE_AI_API_KEY is loaded.")

  try {
    const body = await req.json()
    const messages: VercelAIMessage[] = body.messages ?? []
    console.log("[LUMEN CHAT API] Received messages from client:", JSON.stringify(messages, null, 2))

    if (messages.length === 0) {
      console.warn("[LUMEN CHAT API] No messages received in the request body.")
      return new Response(JSON.stringify({ error: "No messages provided." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Use the Vercel AI SDK helper to build the prompt for Google Gemini
    // This handles history, role mapping, and system prompts correctly.
    const contents: Content[] = await experimental_buildGoogleGenAIPrompt(messages)
    console.log(
      "[LUMEN CHAT API] Transformed contents for Gemini API using experimental_buildGoogleGenAIPrompt:",
      JSON.stringify(contents, null, 2),
    )

    if (contents.length === 0 && messages.filter((m) => m.role === "user").length > 0) {
      console.error(
        "[LUMEN CHAT API] Failed to build valid contents for Gemini from messages, or only non-user messages remained. Original messages:",
        JSON.stringify(messages),
      )
      return new Response(JSON.stringify({ error: "Failed to process chat history for AI model." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-preview-0514",
      safetySettings,
      systemInstruction: systemPromptText,
    })
    console.log("[LUMEN CHAT API] Google AI Model object obtained.")

    console.log("[LUMEN CHAT API] Attempting to generate content stream from Gemini...")
    const geminiStream = await model.generateContentStream({
      contents: contents,
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.75,
      },
    })
    console.log("[LUMEN CHAT API] Successfully initiated content stream from Gemini.")

    const stream = GoogleGenerativeAIStream(geminiStream)
    console.log("[LUMEN CHAT API] Streaming response to client.")
    return new StreamingTextResponse(stream)
  } catch (error: any) {
    console.error("[LUMEN CHAT API ERROR] An error occurred in POST /api/chat.")
    console.error("[LUMEN CHAT API ERROR] Error Name:", error.name)
    console.error("[LUMEN CHAT API ERROR] Error Message:", error.message)
    if (error.stack) {
      console.error("[LUMEN CHAT API ERROR] Error Stack:", error.stack)
    }
    console.error(
      "[LUMEN CHAT API ERROR] Full error object (stringified):",
      JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
    )

    let clientErrorMessage = "An internal error occurred with the AI assistant. Please try again later."
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
    } else if (error.message && error.message.includes("[GoogleGenerativeAI Error]: Error fetching from")) {
      clientErrorMessage = "AI Assistant Error: There was an issue communicating with the AI service."
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
