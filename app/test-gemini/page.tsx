"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestGeminiPage() {
  const [models, setModels] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  // Function to list available models
  const fetchModels = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/test-gemini/models")
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()
      setModels(data.models || [])
    } catch (err) {
      setError(`Failed to fetch models: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  // Function to test generation
  const testGeneration = async () => {
    setLoading(true)
    setResult("")
    setError("")
    try {
      const response = await fetch("/api/test-gemini/generate")
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()
      setResult(data.result || "No result returned")
    } catch (err) {
      setError(`Failed to generate content: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  // Fetch models on page load
  useEffect(() => {
    fetchModels()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Google Gemini API Test</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Models</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && models.length === 0 ? (
              <p>Loading models...</p>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : models.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {models.map((model, index) => (
                  <li key={index}>{model}</li>
                ))}
              </ul>
            ) : (
              <p>No models found</p>
            )}
            <Button onClick={fetchModels} disabled={loading} className="mt-4">
              Refresh Models
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Generation</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={testGeneration} disabled={loading} className="mb-4">
              Generate Test Content
            </Button>

            {loading && !result ? (
              <p>Generating content...</p>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : result ? (
              <div className="p-4 bg-gray-100 rounded-md whitespace-pre-wrap">{result}</div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
