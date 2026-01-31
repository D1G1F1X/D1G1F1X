import { generateText } from "ai"

export const runtime = "edge"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return Response.json({ error: "Message is required" }, { status: 400 })
    }

    const systemPrompt = `You are a helpful customer service AI assistant for Lumen Helix Solutions, a company specializing in:
- Quantum computing research and development
- AI ethics and implementation
- Advanced software development
- Quaternionic computing frameworks (Cauldron, RUBIC, NUMO Field)
- Research and consulting services

You should:
- Answer questions about our services, projects, and expertise
- Be professional but friendly
- Keep responses concise (2-3 sentences max)
- Direct users to specific pages for detailed information
- Suggest scheduling a consultation if appropriate
- Never make up information about services or capabilities`

    const result = await generateText({
      model: "openai/gpt-4o-mini",
      system: systemPrompt,
      prompt: message,
      temperature: 0.7,
      maxTokens: 200,
    })

    return Response.json({ message: result.text })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to process your message"
    return Response.json(
      {
        error: "Our AI assistant is temporarily unavailable. Please try again or contact us directly.",
        details: errorMessage,
      },
      { status: 500 },
    )
  }
}
