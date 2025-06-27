"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle, Clock, Zap } from "lucide-react"

interface AssistantStatus {
  success: boolean
  assistant_configured: boolean
  assistant_accessible: boolean
  chat_completion_available: boolean
  error?: string
  timestamp: string
  environment: {
    has_openai_key: boolean
    has_assistant_key: boolean
    has_assistant_id: boolean
    model: string
    max_tokens: string
  }
}

interface TestReading {
  reading: string
  interpretation: string
  guidance: string
  success: boolean
  method: "assistant" | "chat_completion"
  error?: string
}

export default function AIServiceTester() {
  const [status, setStatus] = useState<AssistantStatus | null>(null)
  const [readingResult, setReadingResult] = useState<TestReading | null>(null)
  const [loading, setLoading] = useState(false)
  const [testQuestion, setTestQuestion] = useState("What guidance do you have for me today?")

  const checkStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/ai/assistant-status")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error("Failed to check status:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateTestReading = async () => {
    setLoading(true)
    try {
      const testCards = [
        {
          id: "01-cauldron-spirit",
          name: "Cauldron of Spirit",
          element: "Spirit",
          tool: "Cauldron",
          number: 1,
          meaning: "New beginnings and spiritual awakening",
          description:
            "The Cauldron of Spirit represents the divine spark within, the source of all creation and inspiration.",
          keywords: ["inspiration", "creativity", "divine connection", "new beginnings"],
        },
      ]

      const response = await fetch("/api/ai/reading", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cards: testCards,
          question: testQuestion,
          spread_type: "single_card",
          user_context: "Testing AI service integration",
        }),
      })

      const data = await response.json()
      setReadingResult(data)
    } catch (error) {
      console.error("Failed to test reading:", error)
      setReadingResult({
        reading: "Test failed",
        interpretation: "Unable to connect to AI service",
        guidance: "Please check your configuration",
        success: false,
        method: "chat_completion",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setLoading(false)
    }
  }

  const StatusBadge = ({
    condition,
    trueText,
    falseText,
  }: { condition: boolean; trueText: string; falseText: string }) => (
    <Badge variant={condition ? "default" : "destructive"} className="flex items-center gap-1">
      {condition ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
      {condition ? trueText : falseText}
    </Badge>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            AI Service Configuration Test
          </CardTitle>
          <CardDescription>Test your OpenAI Assistant and Chat Completion configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={checkStatus} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Checking Status...
              </>
            ) : (
              "Check AI Service Status"
            )}
          </Button>

          {status && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <StatusBadge condition={status.success} trueText="Service Available" falseText="Service Unavailable" />
                <StatusBadge
                  condition={status.assistant_configured}
                  trueText="Assistant Configured"
                  falseText="Assistant Not Configured"
                />
                <StatusBadge
                  condition={status.assistant_accessible}
                  trueText="Assistant Accessible"
                  falseText="Assistant Inaccessible"
                />
                <StatusBadge
                  condition={status.chat_completion_available}
                  trueText="Chat Completion Available"
                  falseText="Chat Completion Unavailable"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-semibold">Environment Configuration</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>OpenAI API Key: {status.environment.has_openai_key ? "✅" : "❌"}</div>
                  <div>Assistant API Key: {status.environment.has_assistant_key ? "✅" : "❌"}</div>
                  <div>Assistant ID: {status.environment.has_assistant_id ? "✅" : "❌"}</div>
                  <div>Model: {status.environment.model}</div>
                  <div>Max Tokens: {status.environment.max_tokens}</div>
                  <div>Last Check: {new Date(status.timestamp).toLocaleString()}</div>
                </div>
              </div>

              {status.error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-800 text-sm">{status.error}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Reading Generation</CardTitle>
          <CardDescription>Generate a test reading to verify AI service functionality</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="test-question">Test Question</Label>
            <Input
              id="test-question"
              value={testQuestion}
              onChange={(e) => setTestQuestion(e.target.value)}
              placeholder="Enter a question for the test reading"
            />
          </div>

          <Button onClick={generateTestReading} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Generating Test Reading...
              </>
            ) : (
              "Generate Test Reading"
            )}
          </Button>

          {readingResult && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <StatusBadge
                  condition={readingResult.success}
                  trueText="Reading Generated"
                  falseText="Reading Failed"
                />
                <Badge variant="outline">
                  Method: {readingResult.method === "assistant" ? "OpenAI Assistant" : "Chat Completion"}
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="font-semibold">Reading</Label>
                  <Textarea value={readingResult.reading} readOnly className="min-h-[100px]" />
                </div>

                <div>
                  <Label className="font-semibold">Interpretation</Label>
                  <Textarea value={readingResult.interpretation} readOnly className="min-h-[100px]" />
                </div>

                <div>
                  <Label className="font-semibold">Guidance</Label>
                  <Textarea value={readingResult.guidance} readOnly className="min-h-[100px]" />
                </div>
              </div>

              {readingResult.error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-800 text-sm">{readingResult.error}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
