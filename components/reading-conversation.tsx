"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ReadingConversationProps {
  initialReading: string
  cards: any[]
  userName: string
}

export function ReadingConversation({ initialReading, cards, userName }: ReadingConversationProps) {
  const [messages, setMessages] = useState([{ role: "oracle", content: initialReading }])
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!question.trim()) return

    // Add user question to messages
    setMessages((prev) => [...prev, { role: "user", content: question }])

    // Clear input
    const currentQuestion = question
    setQuestion("")
    setIsLoading(true)

    try {
      // Call the follow-up API
      const response = await fetch("/api/follow-up-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalReading: initialReading || "",
          cards: Array.isArray(cards) ? cards : [],
          followUpQuestion: currentQuestion,
          userName: userName || "User",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to get response")
      }

      const data = await response.json()

      // Add oracle response to messages
      if (data && data.response) {
        setMessages((prev) => [...prev, { role: "oracle", content: data.response }])
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.error("Error getting follow-up response:", error)
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      })

      // Add error message to the conversation
      setMessages((prev) => [
        ...prev,
        {
          role: "oracle",
          content:
            "I apologize, but I'm having trouble generating a response right now. Please try asking again or rephrase your question.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="space-y-4 mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-4`}
            >
              {message.role === "oracle" ? (
                <div className="prose dark:prose-invert max-w-none">
                  {message.content.split("\n\n").map((paragraph, i) => (
                    <p
                      key={i}
                      className={`mb-4 ${message.role === "user" ? "text-primary-foreground" : "text-muted-foreground"}`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a follow-up question..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !question.trim()}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  )
}
