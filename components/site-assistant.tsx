"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X, Send, ChevronRight, ChevronLeft, Compass } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

// Comprehensive navigation and feature guidance responses
const navigationResponses = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    response:
      "Hello! I'm the NUMO Oracle Site Assistant. I can help you navigate the site and find features. What would you like to know about?",
  },
  {
    keywords: ["navigate", "find", "where", "how to", "site", "website"],
    response:
      "The main sections of our site are: Home, About, Tools, Library, Cards, and Buy. You can access them from the navigation menu at the top of the page. What section are you looking for?",
  },
  {
    keywords: ["card", "reading", "oracle", "dealer", "simulator"],
    response:
      "For card readings and simulations, please visit our NUMO Card Dealer in the Tools section. The Card Dealer allows you to draw cards and receive interpretations based on our system.",
  },
  {
    keywords: ["numerology", "number", "numbers", "calculator"],
    response:
      "Our Numerology Calculator is available in the Tools section. It can help you calculate your life path number and other numerological insights based on your birth date.",
  },
  {
    keywords: ["buy", "purchase", "order", "shop"],
    response:
      "You can purchase the NUMO Oracle deck in our Shop section. We offer physical decks with worldwide shipping and digital options for immediate access.",
  },
  {
    keywords: ["account", "login", "register", "sign"],
    response:
      "You can create an account or log in using the links in the top navigation bar. An account allows you to save readings, access premium features, and track your orders.",
  },
  {
    keywords: ["about", "numo", "history", "creator"],
    response:
      "The About page provides information about NUMO Oracle's history, philosophy, and the system's creator. You'll also find our YouTube channel with instructional videos there.",
  },
  {
    keywords: ["tools", "features", "what can i do"],
    response:
      "In our Tools section, you'll find: the NUMO Card Dealer, Numerology Calculator, Card Directory, and other interactive features to explore the NUMO Oracle system.",
  },
  {
    keywords: ["library", "learn", "guide", "guidebook"],
    response:
      "Our Library section contains the NUMO Oracle Guidebook, articles, and educational resources to help you understand our numerology system and card interpretations.",
  },
  {
    keywords: ["faq", "questions", "frequently"],
    response:
      "You can find answers to frequently asked questions on our FAQ page. If you have specific questions about site navigation or features, I'm here to help!",
  },
  {
    keywords: ["report", "bug", "issue", "typo"],
    response:
      "To report a bug or typo, click the yellow triangle icon in the bottom left corner of any page. You can include a description and even upload a screenshot of the issue.",
  },
  {
    keywords: ["contact", "support", "help", "email"],
    response:
      "For customer support, please visit our Contact page or email support@numoracle.com. For technical issues, you can use the bug reporting tool in the bottom left corner.",
  },
  {
    keywords: ["membership", "premium", "subscribe"],
    response:
      "We offer free and premium membership options. Premium members get access to advanced readings, saved history, and exclusive content. You can upgrade on your account page.",
  },
  {
    keywords: ["fortune", "future", "predict", "tell me"],
    response:
      "I'm a site navigation assistant, not an oracle. For divination and readings, please use the NUMO Card Dealer in our Tools section, which is designed for that purpose.",
  },
]

export default function SiteAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your NUMO Oracle Site Assistant. I can help you navigate the site and find features. What would you like to know about?",
      sender: "assistant",
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

    // Generate assistant response
    setTimeout(() => {
      const assistantResponse = generateResponse(message)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: assistantResponse,
        sender: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    }, 600)
  }

  const generateResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase()

    // Check for card reading requests that should be directed to the Card Dealer
    if (
      lowercaseMessage.includes("read my cards") ||
      lowercaseMessage.includes("do a reading") ||
      lowercaseMessage.includes("tell my fortune") ||
      lowercaseMessage.includes("predict") ||
      (lowercaseMessage.includes("what") &&
        (lowercaseMessage.includes("future") ||
          lowercaseMessage.includes("destiny") ||
          lowercaseMessage.includes("fate")))
    ) {
      return "I'm a site navigation assistant, not an oracle. For card readings and divination, please use the NUMO Card Dealer in our Tools section, which is specifically designed for that purpose."
    }

    // Check for navigation and feature guidance responses
    for (const item of navigationResponses) {
      if (item.keywords.some((keyword) => lowercaseMessage.includes(keyword))) {
        return item.response
      }
    }

    // Default response if no keywords match
    return "I can help you navigate the NUMO Oracle site and find features. You can ask about specific sections like Tools, Library, or Cards, or ask how to use features like the Card Dealer or Numerology Calculator."
  }

  return (
    <>
      {/* Site Assistant button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg z-50 transition-all duration-300 ease-in-out"
          aria-label="Open site assistant"
        >
          <Compass className="h-6 w-6" />
        </button>
      )}

      {/* Site Assistant window */}
      <div
        className={`fixed bottom-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isOpen
            ? isMinimized
              ? "transform translate-y-[calc(100%-3rem)]"
              : "transform translate-x-0"
            : "transform translate-x-full"
        }`}
      >
        <Card className="w-80 md:w-96 h-[30rem] flex flex-col rounded-t-lg shadow-xl border-indigo-500 bg-gray-900">
          {/* Assistant header */}
          <div className="p-3 border-b border-gray-700 bg-indigo-900 rounded-t-lg flex justify-between items-center">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:text-indigo-200"
              aria-label={isMinimized ? "Expand assistant" : "Minimize assistant"}
            >
              {isMinimized ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>

            <h3 className="text-white font-medium flex items-center gap-2">
              <Compass className="h-4 w-4" />
              Site Assistant & Directory
            </h3>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-indigo-200"
              aria-label="Close assistant"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Assistant messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.sender === "user" ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-100"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick navigation buttons */}
          <div className="p-2 border-t border-gray-700 bg-gray-850 flex flex-wrap gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => {
                setMessage("Where is the Card Dealer?")
                handleSendMessage()
              }}
            >
              Card Dealer
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => {
                setMessage("How do I use the numerology calculator?")
                handleSendMessage()
              }}
            >
              Numerology
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => {
                setMessage("Where can I buy cards?")
                handleSendMessage()
              }}
            >
              Shop
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => {
                setMessage("How do I report a bug?")
                handleSendMessage()
              }}
            >
              Help
            </Button>
          </div>

          {/* Assistant input */}
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
                placeholder="Ask about site features..."
                className="flex-1 bg-gray-800 border-gray-700 text-white"
              />
              <Button type="submit" size="icon" className="bg-indigo-600 hover:bg-indigo-700">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </>
  )
}
