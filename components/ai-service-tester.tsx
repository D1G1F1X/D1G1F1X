"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle, XCircle, AlertCircle, Zap, MessageSquare } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface AIStatus {
  success: boolean
  assistant_configured: boolean
  assistant_accessible: boolean
  chat_completion_available: boolean
  error?: string
  timestamp?: string
}

interface TestReading {
  reading: string
  interpretation: string
  guidance: string
  success: boolean
  method: "assistant" | "chat_completion"
  error?: string
}

export function AIServiceTester() {
  const [status, setStatus] = useState<AIStatus | null>(null)
  const [isCheckingStatus, setIsCheckingStatus] = useState(false)
  const [testReading, setTestReading] = useState<TestReading | null>(null)
  const [isGeneratingTest, setIsGeneratingTest] = useState(false)
  const [testQuestion, setTestQuestion] = useState("What guidance do you have for me today?")
  const { toast } = useToast()

  const checkStatus = async () => {
    setIsCheckingStatus(true)
    try {
      const response = await fetch("/api/ai/assistant-status")
      const data = await response.json()
      setStatus(data)

      if (data.success) {
        toast({
          title: "Status Check Complete",
          description: "AI service status retrieved successfully",
        })
      } else {
        toast({
          title: "Status Check Failed",
          description: data.error || "Unknown error occurred",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Status check error:", error)
      toast({
        title: "Network Error",
        description: "Failed to check AI service status",
        variant: "destructive",
      })
    } finally {
      setIsCheckingStatus(false)
    }
  }

  const generateTestReading = async () => {
    setIsGeneratingTest(true)
    try {
      // Create test card data
      const testCards = [
        {
          id: "1-cauldron",
          name: "1 Cauldron - The Cauldron of Manifestation",
          element: "Fire",
          tool: "Cauldron",
          number: 1,
          meaning: "Creative force, willpower, and illumination",
          description: "The cauldron pours forth its contents—the creation is emerging",
          keywords: ["manifestation", "creativity", "action", "leadership"],
        },
      ]

      const response = await fetch("/api/ai/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cards: testCards,
          question: testQuestion,
          spread_type: "single",
          user_context: "This is a test reading to validate the AI service",
        }),
      })

      const data = await response.json()
      setTestReading(data)

      if (data.success) {
        toast({
          title: "Test Reading Generated!",
          description: `Successfully generated using ${data.method}`,
        })
      } else {
        toast({
          title: "Test Reading Failed",
          description: data.error || "Unknown error occurred",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Test reading error:", error)
      toast({
        title: "Network Error",
        description: "Failed to generate test reading",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingTest(false)
    }
  }

  const StatusBadge = ({ condition, label }: { condition: boolean; label: string }) => (
    <Badge variant={condition ? "default" : "destructive"} className="flex items-center gap-1">
      {condition ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
      {label}
    </Badge>
  )

  return (
    <div className="space-y-6">
      {/* Status Check Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            AI Service Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={checkStatus} disabled={isCheckingStatus} className="w-full">
            {isCheckingStatus ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking Status...
              </>
            ) : (
              <>
                <AlertCircle className="mr-2 h-4 w-4" />
                Check AI Service Status
              </>
            )}
          </Button>

          {status && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <StatusBadge condition={status.success} label="Service Available" />
                <StatusBadge condition={status.assistant_configured} label="Assistant Configured" />
                <StatusBadge condition={status.assistant_accessible} label="Assistant Accessible" />
                <StatusBadge condition={status.chat_completion_available} label="Chat Completion Available" />
              </div>

              {status.error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-700 dark:text-red-300">
                    <strong>Error:</strong> {status.error}
                  </p>
                </div>
              )}

              {status.timestamp && (
                <p className="text-xs text-gray-500">Last checked: {new Date(status.timestamp).toLocaleString()}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Reading Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Test Reading Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="testQuestion">Test Question</Label>
            <Textarea
              id="testQuestion"
              value={testQuestion}
              onChange={(e) => setTestQuestion(e.target.value)}
              placeholder="Enter a question for the test reading..."
              rows={2}
            />
          </div>

          <Button onClick={generateTestReading} disabled={isGeneratingTest} className="w-full">
            {isGeneratingTest ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Test Reading...
              </>
            ) : (
              <>
                <MessageSquare className="mr-2 h-4 w-4" />
                Generate Test Reading
              </>
            )}
          </Button>

          {testReading && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant={testReading.success ? "default" : "destructive"}>
                  {testReading.success ? "Success" : "Failed"}
                </Badge>
                <Badge variant="outline">{testReading.method}</Badge>
              </div>

              {testReading.success ? (
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Reading</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">{testReading.reading}</p>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Interpretation</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">{testReading.interpretation}</p>
                  </div>

                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-md">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Guidance</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">{testReading.guidance}</p>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-700 dark:text-red-300">
                    <strong>Error:</strong> {testReading.error}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Environment Variables Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Environment Variables Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Make sure these environment variables are set in your deployment:
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md font-mono text-sm">
              <div>OPENAI_ASSISTANT_API_KEY=your_api_key</div>
              <div>OPENAI_ASSISTANT_ID=asst_your_assistant_id</div>
              <div>OPENAI_MODEL=gpt-4o</div>
              <div>OPENAI_MAX_TOKENS=4000</div>
            </div>
            <p className="text-xs text-gray-500">
              Note: After adding environment variables in Vercel, you need to redeploy for them to take effect.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
