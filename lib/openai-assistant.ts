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
