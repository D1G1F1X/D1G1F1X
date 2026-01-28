"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Loader2 } from "lucide-react"
import ChatIntakeForm from "./ChatIntakeForm"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
}

export default function ChatTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm the Lumen Helix AI Assistant. I can answer questions about our services, research projects, and team. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showIntakeForm, setShowIntakeForm] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageListRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    setError(null)

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)
    setMessageCount((prev) => prev + 1)

    try {
      const response = await fetch("/api/contact/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: data.message,
      }
      setMessages((prev) => [...prev, assistantMessage])

      // Show intake form after 3 exchanges (6 messages)
      if (messageCount >= 5) {
        setShowIntakeForm(true)
      }
    } catch (err) {
      console.error("Chat error:", err)
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError("Failed to send message. Please try again.")
      const failureMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "Sorry, I encountered an error. Please try again or use another contact method.",
      }
      setMessages((prev) => [...prev, failureMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
      <div
        ref={messageListRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
      >
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === "user"
                  ? "bg-primary-500 text-white rounded-br-none"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div
          className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm rounded"
          role="alert"
        >
          {error}
        </div>
      )}

      {showIntakeForm && <ChatIntakeForm />}

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 disabled:opacity-50"
            aria-label="Chat message input"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg disabled:opacity-50 transition-colors"
            aria-label={loading ? "Sending message..." : "Send message"}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </form>
    </div>
  )
}
