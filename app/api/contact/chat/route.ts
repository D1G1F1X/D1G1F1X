import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

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

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: systemPrompt,
      prompt: message,
      temperature: 0.7,
      maxTokens: 200,
    })

    return Response.json({ message: text })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json({ error: "Failed to process your message" }, { status: 500 })
  }
}
