"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AssistantChatProps {
  initialReading?: string
  threadId?: string
  onThreadCreated?: (threadId: string) => void
}

const AssistantChat: React.FC<AssistantChatProps> = ({ initialReading, threadId, onThreadCreated }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialReading) {
      setMessages([
        {
          id: "initial-reading",
          role: "assistant",
          content: initialReading,
          timestamp: new Date(),
        },
      ])
    }
  }, [initialReading])

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = inputMessage.trim()
    setInputMessage("")
    setIsLoading(true)

    // Add user message to chat
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])

    try {
      let currentThreadId = threadId

      // If no thread exists, create one with the initial reading
      if (!currentThreadId) {
        const response = await fetch("/api/generateReading", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage }),
        })

        const data = await response.json()

        if (response.ok && data.success) {
          currentThreadId = data.threadId
          onThreadCreated?.(currentThreadId)
        } else {
          throw new Error(data.error || "Failed to create conversation thread")
        }
      } else {
        // Continue existing conversation
        const response = await fetch("/api/continueConversation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            threadId: currentThreadId,
            message: userMessage,
          }),
        })

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to continue conversation")
        }
      }

      // For now, add a placeholder assistant response
      // In a real implementation, you'd poll for the assistant's actual response
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I'm processing your question about the reading. This is a placeholder response while the assistant generates a proper answer.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)

      // Add error message to chat
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble responding right now. Please try again later.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className={`mb-2 ${message.role === "user" ? "text-right" : "text-left"}`}>
            <div className={`inline-block p-2 rounded-lg ${message.role === "user" ? "bg-blue-200" : "bg-gray-200"}`}>
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left">
            <div className="inline-block p-2 rounded-lg bg-gray-200">Thinking...</div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex rounded-md shadow-sm">
          <input
            type="text"
            className="flex-grow focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
            placeholder="Ask a question about the reading..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage()
            }}
          />
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={sendMessage}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AssistantChat

// Provide a named export in addition to the default one
export { AssistantChat }
