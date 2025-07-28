// lib/openai-assistant.ts
import OpenAI from "openai"

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_ASSISTANT_API_KEY || process.env.OPENAI_API_KEY,
})

//------------------------------------------------------------------
//  NEW HELPERS  – satisfy required named exports & keep logic DRY
//------------------------------------------------------------------
/**
 * Low-level helper that sends an arbitrary prompt to the
 * ChatGPT Assistant (beta) endpoint and returns the raw text.
 *
 * Falls back to the regular OpenAI key if the dedicated
 * `OPENAI_ASSISTANT_API_KEY` is not present.
 */
export async function createCustomOpenAIResponse(
  prompt: string,
  {
    model = process.env.OPENAI_MODEL || "gpt-4o-mini",
    temperature = Number(process.env.OPENAI_TEMPERATURE ?? 0.7),
    maxTokens = Number(process.env.OPENAI_MAX_TOKENS ?? 1024),
  }: {
    model?: string
    temperature?: number
    maxTokens?: number
  } = {},
) {
  const completion = await openaiClient.chat.completions.create({
    model,
    temperature,
    max_tokens: maxTokens,
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
  })

  return completion.choices[0]?.message?.content?.trim() ?? ""
}

/**
 * Domain-specific wrapper that prepares an oracle-reading prompt
 * and delegates to `createCustomOpenAIResponse`.
 *
 * NOTE: This function deliberately remains lightweight so that
 * downstream business logic (e.g. /api/ai/reading) can compose
 * additional context without altering this core util.
 */
export async function generateOracleReading({
  querentData,
  cardSpread,
}: {
  querentData: Record<string, unknown>
  cardSpread: Record<string, unknown>
}) {
  const prompt = `
You are the NUMO Oracle AI.
Given the querent information and the card spread below,
produce a concise but insightful reading.

Querent:
${JSON.stringify(querentData, null, 2)}

Cards:
${JSON.stringify(cardSpread, null, 2)}
`
  return createCustomOpenAIResponse(prompt)
}

export { openaiClient }

// lib/numerology.ts
import { calculateExpression } from "lib/numerology/core"

//------------------------------------------------------------------
// ALIAS EXPORT  – satisfy build expecting calculateExpressionNumber
//------------------------------------------------------------------
export const calculateExpressionNumber = calculateExpression
