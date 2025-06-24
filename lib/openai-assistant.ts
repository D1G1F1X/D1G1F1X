import OpenAI from "openai"

// Use separate API key for ChatGPT Assistant
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_ASSISTANT_API_KEY || process.env.OPENAI_API_KEY,
  defaultHeaders: {
    "OpenAI-Beta": "assistants=v2",
  },
})

// Add validation for the assistant-specific API key
export function validateAssistantConfig(): boolean {
  const hasApiKey = !!(process.env.OPENAI_ASSISTANT_API_KEY || process.env.OPENAI_API_KEY)
  const hasAssistantId = !!process.env.OPENAI_ASSISTANT_ID

  if (!hasApiKey) {
    console.warn("⚠️ OpenAI Assistant API key not configured")
  }
  if (!hasAssistantId) {
    console.warn("⚠️ OpenAI Assistant ID not configured")
  }

  return hasApiKey && hasAssistantId
}

/** Utility: create a chat completion with sensible defaults. */
export async function createCustomOpenAIResponse(prompt: string): Promise<string> {
  try {
    const { choices } = await openaiClient.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      max_tokens: 800,
      temperature: 0.7,
      messages: [{ role: "user", content: prompt }],
    })
    return choices?.[0]?.message?.content ?? ""
  } catch (err) {
    console.error("createCustomOpenAIResponse failed", err)
    return "⚠️ AI unavailable at the moment."
  }
}

/** Higher-level helper used by oracle endpoints */
export async function generateOracleReading(cardSpread: unknown): Promise<string> {
  const systemPrompt =
    "You are Numoracle, a mystical oracle. Provide a concise, insightful reading based on the spread that follows."
  const prompt = `${systemPrompt}\n\nSpread JSON:\n${JSON.stringify(cardSpread)}`
  return createCustomOpenAIResponse(prompt)
}

/* re-export the client so other modules can reuse the configured instance */
export { openaiClient }
