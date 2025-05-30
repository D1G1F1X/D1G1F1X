import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, type Content } from "@google/generative-ai"
import { GoogleGenerativeAIStream, StreamingTextResponse, type Message as VercelAIMessage } from "ai"
import { experimental_buildGoogleGenAIPrompt } from "ai/prompts"

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY

export const runtime = "nodejs"

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
]

const systemInstruction = `You are Lumen, a friendly and helpful AI site assistant for Lumen Helix Solutions.
Lumen Helix Solutions is a cutting-edge technology and creative solutions provider specializing in:
- AI Strategy & Integration (including AI Strategy Fusion)
- Web Development (including 3D interactive experiences)
- Graphic Design (logos, branding)
- Project Management
- Marketing Strategy
- Tech Consulting

Your primary goal is to assist users in navigating the website, understanding our services, exploring our portfolio and case studies, and learning about our company.
Be concise, informative, and guide users towards relevant sections of the website.
If a user asks about a service we offer, briefly explain it and suggest they visit the relevant service page.
If a user asks about our work, mention our portfolio or case studies.
If a user asks about the company, direct them to the 'About Us' page.
If a user wants to get in touch, guide them to the 'Contact Us' page.
Do not answer questions outside the scope of Lumen Helix Solutions or general web assistance.
Keep your responses helpful and focused on the company's offerings.
If you are asked a question you cannot answer based on the context provided, say "I'm sorry, I can only provide information about Lumen Helix Solutions. Is there anything specific about our services, portfolio, or company that I can help you with?".
`

export async function POST(req: Request) {
  console.log("[LUMEN CHAT API] Received POST request.")

  if (!apiKey) {
    console.error("[LUMEN CHAT API] CRITICAL: GOOGLE_GENERATIVE_AI_API_KEY is NOT SET.")
    return new Response(JSON.stringify({ error: "AI Assistant configuration error: API key missing." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
  console.log("[LUMEN CHAT API] API Key is present.")

  try {
    const body = await req.json()
    const messages: VercelAIMessage[] = body.messages ?? []
    console.log("[LUMEN CHAT API] Received messages:", JSON.stringify(messages, null, 2))

    if (messages.length === 0) {
      console.warn("[LUMEN CHAT API] No messages received in the request body.")
      return new Response(JSON.stringify({ error: "No messages provided." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Use the Vercel AI SDK helper to build the prompt for Google Gemini
    const contents: Content[] = await experimental_buildGoogleGenAIPrompt(messages)
    console.log("[LUMEN CHAT API] Transformed contents for Gemini:", JSON.stringify(contents, null, 2))

    // Ensure contents are not empty after transformation, which could happen if input messages were invalid
    if (contents.length === 0 && messages.length > 0) {
      console.error(
        "[LUMEN CHAT API] Failed to build valid contents for Gemini from messages. Original messages:",
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
      systemInstruction: systemInstruction, // Pass the system instruction string directly
    })
    console.log("[LUMEN CHAT API] Model object obtained.")

    console.log("[LUMEN CHAT API] Sending contents to Gemini for stream generation.")
    const geminiStream = await model.generateContentStream({
      contents: contents,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    })
    console.log("[LUMEN CHAT API] Successfully initiated content stream from Gemini.")

    const stream = GoogleGenerativeAIStream(geminiStream)
    return new StreamingTextResponse(stream)
  } catch (error: any) {
    console.error("[LUMEN CHAT API] --- ERROR ---")
    console.error("[LUMEN CHAT API] Error Name:", error.name)
    console.error("[LUMEN CHAT API] Error Message:", error.message)
    if (error.stack) {
      console.error("[LUMEN CHAT API] Error Stack:", error.stack)
    }
    if (error.response && error.response.data) {
      console.error("[LUMEN CHAT API] Error Response Data:", JSON.stringify(error.response.data))
    }
    console.error(
      "[LUMEN CHAT API] Full error object (stringified for inspection):",
      JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
    )

    return new Response(
      JSON.stringify({
        error: "AI Assistant internal error.",
        details: error.message || "An unexpected error occurred.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
