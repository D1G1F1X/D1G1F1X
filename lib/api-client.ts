interface ReadingRequest {
  message?: string
  fullName?: string
  dateOfBirth?: string
  timeOfBirth?: string
  question?: string
  selectedCards?: any[]
  spreadType?: string
}

interface ApiResponse {
  threadId: string
  runId: string
  content?: string
  success: boolean
  error?: string
  details?: string
}

export async function generateReading(data: ReadingRequest): Promise<ApiResponse> {
  try {
    const response = await fetch("/api/generateCompleteReading", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || "Failed to generate reading")
    }

    return result
  } catch (error) {
    console.error("Error generating reading:", error)
    return {
      threadId: "",
      runId: "",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

export async function continueConversation(threadId: string, message: string): Promise<ApiResponse> {
  try {
    const response = await fetch("/api/continueConversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ threadId, message }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || "Failed to continue conversation")
    }

    return result
  } catch (error) {
    console.error("Error continuing conversation:", error)
    return {
      threadId,
      runId: "",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

export async function getConversationHistory(threadId: string) {
  try {
    const response = await fetch("/api/assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "getHistory",
        threadId,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || "Failed to get conversation history")
    }

    return result.history || []
  } catch (error) {
    console.error("Error getting conversation history:", error)
    return []
  }
}
