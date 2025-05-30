"use client"

import { useState, useEffect, useRef } from "react"
import { useChat, type Message } from "ai/react"
import { Bot, X, Send, User, Loader2, MessageSquarePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function SiteAssistantChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat", // Ensure this matches your API route
    initialMessages: [
      {
        id: "initial-greeting",
        role: "assistant",
        content: "Hi! I'm Lumen, your AI site assistant. How can I help you explore Lumen Helix Solutions today?",
      },
    ],
    onError: (err) => {
      console.error("Chat error:", err)
      // Potentially add a user-facing error message to the chat here
    },
  })

  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [messages])

  const toggleChat = () => setIsOpen(!isOpen)

  return (
    <>
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-6 left-6 z-50 p-4 rounded-full shadow-lg bg-gradient-to-br from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white"
          aria-label="Open Chat Assistant"
        >
          <MessageSquarePlus size={28} />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 left-6 z-50 w-[380px] h-[550px] shadow-xl flex flex-col bg-background/80 backdrop-blur-md border-primary/30">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center space-x-2">
              <Image src="/images/logo-bulb.png" alt="Lumen Helix Logo" width={28} height={28} />
              <CardTitle className="text-lg font-semibold text-foreground">Lumen Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} aria-label="Close chat">
              <X size={20} className="text-muted-foreground" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow p-0 overflow-hidden">
            <ScrollArea ref={scrollAreaRef} className="h-full p-4 space-y-4">
              {messages.map((m: Message) => (
                <div
                  key={m.id}
                  className={cn("flex items-start space-x-3 py-2", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  {m.role === "assistant" && (
                    <div className="p-2 bg-primary/20 rounded-full">
                      <Bot size={20} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "p-3 rounded-lg max-w-[80%]",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground self-end"
                        : "bg-muted text-muted-foreground self-start",
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                  </div>
                  {m.role === "user" && (
                    <div className="p-2 bg-muted rounded-full">
                      <User size={20} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center justify-start space-x-3 py-2">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Bot size={20} className="text-primary" />
                  </div>
                  <div className="p-3 rounded-lg bg-muted text-muted-foreground">
                    <Loader2 size={20} className="animate-spin text-primary" />
                  </div>
                </div>
              )}
            </ScrollArea>
          </CardContent>
          {error && (
            <div className="p-4 text-xs text-red-500 border-t border-border/50">
              Error: {error.message}. Please try again.
            </div>
          )}
          <CardFooter className="p-4 border-t border-border/50">
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask Lumen anything..."
                className="flex-grow bg-background focus:ring-primary focus:border-primary"
                aria-label="Chat input"
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()} aria-label="Send message">
                <Send size={20} />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
