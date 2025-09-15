// Client-side polling utility for AI responses
export interface PollingResult {
  success: boolean
  content?: string
  error?: string
  status?: string
}

export interface PollingOptions {
  maxAttempts?: number
  intervalMs?: number
  onProgress?: (attempt: number, status: string) => void
}

/**
 * Polls the AI status endpoint until completion or timeout
 */
export async function pollAIStatus(
  threadId: string,
  runId: string,
  options: PollingOptions = {}
): Promise<PollingResult> {
  const { maxAttempts = 60, intervalMs = 1000, onProgress } = options

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(`/api/ai/status?threadId=${threadId}&runId=${runId}`)
      const data = await response.json()

      if (!response.ok || !data.success) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}`,
        }
      }

      onProgress?.(attempt, data.status)

      if (data.status === "completed" && data.content) {
        return {
          success: true,
          content: data.content,
          status: data.status,
        }
      }

      if (data.status === "failed") {
        return {
          success: false,
          error: "AI run failed",
          status: data.status,
        }
      }

      if (data.status === "requires_action") {
        return {
          success: false,
          error: "AI run requires action",
          status: data.status,
        }
      }

      // Still processing (queued, in_progress, cancelling)
      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, intervalMs))
      }
    } catch (error: any) {
      console.error(`[AI Polling] Attempt ${attempt} failed:`, error)
      if (attempt === maxAttempts) {
        return {
          success: false,
          error: `Polling failed: ${error.message}`,
        }
      }
      // Wait before retrying on network error
      await new Promise((resolve) => setTimeout(resolve, intervalMs))
    }
  }

  return {
    success: false,
    error: "Polling timeout - AI response took too long",
    status: "timeout",
  }
}

/**
 * Enhanced AI reading function that handles both blocking and non-blocking responses
 */
export async function generateAIReading(
  payload: any,
  options: PollingOptions = {}
): Promise<{ success: boolean; reading: string; threadId?: string; runId?: string; error?: string }> {
  try {
    const response = await fetch("/api/ai/reading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      return {
        success: false,
        reading: data.reading || `Failed to generate reading: ${data.error || "Unknown error"}`,
        error: data.error,
      }
    }

    // If we have a final reading (blocking mode), return it immediately
    if (data.reading && data.reading !== "Response is being generated..." && !data.threadId) {
      return {
        success: true,
        reading: data.reading,
      }
    }

    // If we have threadId/runId (non-blocking mode), start polling
    if (data.threadId && data.runId) {
      const pollingResult = await pollAIStatus(data.threadId, data.runId, options)

      if (pollingResult.success && pollingResult.content) {
        return {
          success: true,
          reading: pollingResult.content,
          threadId: data.threadId,
          runId: data.runId,
        }
      }

      return {
        success: false,
        reading: pollingResult.error || "Failed to get AI response",
        threadId: data.threadId,
        runId: data.runId,
        error: pollingResult.error,
      }
    }

    // Fallback: return whatever reading we got
    return {
      success: true,
      reading: data.reading || "No response received",
      threadId: data.threadId,
      runId: data.runId,
    }
  } catch (error: any) {
    return {
      success: false,
      reading: `Network error: ${error.message}`,
      error: error.message,
    }
  }
}