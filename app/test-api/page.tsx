"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader2, Send, XCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function TestApiPage() {
  const [endpoint, setEndpoint] = useState("/api/hello")
  const [method, setMethod] = useState("GET")
  const [requestBody, setRequestBody] = useState("")
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleTestApi = async () => {
    setLoading(true)
    setResponse(null)
    setError(null)

    try {
      const options: RequestInit = { method }
      if (method === "POST" || method === "PUT" || method === "PATCH") {
        try {
          options.headers = { "Content-Type": "application/json" }
          options.body = JSON.stringify(JSON.parse(requestBody))
        } catch (e) {
          throw new Error("Invalid JSON in Request Body")
        }
      }

      const res = await fetch(endpoint, options)
      const data = await res.text() // Get raw text to handle non-JSON responses

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText} - ${data}`)
      }

      try {
        setResponse(JSON.stringify(JSON.parse(data), null, 2))
      } catch {
        setResponse(data) // If not JSON, display as plain text
      }

      toast({
        title: "API Test Successful",
        description: `Request to ${endpoint} (${method}) succeeded.`,
        variant: "default",
      })
    } catch (err: any) {
      setError(err.message)
      toast({
        title: "API Test Failed",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Test Utility</h1>
          <p className="text-muted-foreground">Test your Next.js API routes directly from the browser.</p>
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Request Configuration</CardTitle>
          <CardDescription>Configure the API endpoint, method, and request body.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="endpoint">API Endpoint</Label>
            <Input
              id="endpoint"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="/api/your-route"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="method">HTTP Method</Label>
            <select
              id="method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
          </div>
          {(method === "POST" || method === "PUT" || method === "PATCH") && (
            <div className="space-y-2">
              <Label htmlFor="requestBody">Request Body (JSON)</Label>
              <Textarea
                id="requestBody"
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                placeholder='{"key": "value"}'
                rows={6}
              />
            </div>
          )}
          <Button onClick={handleTestApi} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            {loading ? "Sending Request..." : "Send Request"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Response</CardTitle>
          <CardDescription>The response from your API endpoint.</CardDescription>
        </CardHeader>
        <CardContent>
          {response && (
            <pre className="whitespace-pre-wrap break-all rounded-md bg-muted p-4 text-sm font-mono">{response}</pre>
          )}
          {error && (
            <div className="flex items-center gap-2 text-red-500">
              <XCircle className="h-5 w-5" />
              <p className="font-medium">Error: {error}</p>
            </div>
          )}
          {!response && !error && !loading && (
            <p className="text-muted-foreground">No response yet. Send a request to see results.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
