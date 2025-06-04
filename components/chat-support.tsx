"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MessageCircle, X, Send, ChevronRight, ChevronLeft } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const predefinedResponses = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    response: "Hello! Welcome to NUMO Oracle. How can I assist you today?",
  },
  {
    keywords: ["card", "reading", "oracle"],
    response:
      "Our oracle cards combine numerology and elemental wisdom. You can try a reading in the Tools section of our site.",
  },
  {
    keywords: ["numerology", "number", "numbers"],
    response:
      "Numerology is the study of the mystical relationship between numbers and events. Our system pairs numbers with elemental forces for deeper insights.",
  },
  {
    keywords: ["buy", "purchase", "order", "shop"],
    response: "You can purchase the NUMO Oracle deck in our shop. We offer worldwide shipping and digital options.",
  },
  {
    keywords: ["account", "login", "register", "sign"],
    response:
      "You can create an account or log in using the links in the top navigation bar. This allows you to save readings and access premium features.",
  },
]

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your NUMO Oracle guide. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized, messages])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")

    // Generate bot response
    setTimeout(() => {
      const botResponse = generateResponse(message)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 600)
  }

  const generateResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase()

    // Check for predefined responses
    for (const item of predefinedResponses) {
      if (item.keywords.some((keyword) => lowercaseMessage.includes(keyword))) {
        return item.response
      }
    }

    // Default response if no keywords match
    return "I'm not sure how to help with that specific question. You can explore our site using the navigation menu, or ask me about oracle cards, numerology, or account features."
  }

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg z-50 transition-all duration-300 ease-in-out"
          aria-label="Open chat support"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat window */}
      <div
        className={`fixed bottom-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isOpen
            ? isMinimized
              ? "transform translate-y-[calc(100%-3rem)]"
              : "transform translate-x-0"
            : "transform translate-x-full"
        }`}
      >
        <Card className="w-80 md:w-96 h-[30rem] flex flex-col rounded-t-lg shadow-xl border-purple-500 bg-gray-900">
          {/* Chat header */}
          <div className="p-3 border-b border-gray-700 bg-purple-900 rounded-t-lg flex justify-between items-center">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:text-purple-200"
              aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
            >
              {isMinimized ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>

            <h3 className="text-white font-medium">NUMO Oracle Assistant</h3>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-purple-200"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-100"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div className="p-3 border-t border-gray-700 bg-gray-900">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex space-x-2"
            >
              <Input
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-gray-800 border-gray-700 text-white"
              />
              <Button type="submit" size="icon" className="bg-purple-600 hover:bg-purple-700">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </>
  )
}
