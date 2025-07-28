"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function ApiTestComponent() {
  const [message, setMessage] = useState("Tell me about my spiritual journey")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testApi = async () => {
    setIsLoading(true)
    setError(null)
    setResponse(null)

    try {
      const result = await fetch("/api/generateReading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })

      const data = await result.json()

      if (result.ok) {
        setResponse(data)
      } else {
        setError(data.error || "API call failed")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Test OpenAI API Integration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
            className="flex-1"
          />
          <Button onClick={testApi} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              "Test API"
            )}
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">Error:</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {response && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">Success!</p>
            <div className="mt-2 space-y-1">
              <p>
                <strong>Thread ID:</strong> {response.threadId}
              </p>
              <p>
                <strong>Run ID:</strong> {response.runId}
              </p>
              {response.content && (
                <div>
                  <strong>Content:</strong>
                  <pre className="mt-1 text-sm bg-white p-2 rounded border overflow-auto">{response.content}</pre>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
