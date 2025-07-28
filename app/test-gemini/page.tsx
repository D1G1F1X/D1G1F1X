"use client"

import { ScrollArea } from "@/components/ui/scroll-area"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader2, Send, Sparkles, List, XCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GeminiModel {
  name: string
  displayName: string
  inputTokenLimit: number
  outputTokenLimit: number
  supportedGenerationMethods: string[]
}

export default function TestGeminiPage() {
  const [prompt, setPrompt] = useState("Write a short poem about a mystical forest.")
  const [generatedText, setGeneratedText] = useState<string | null>(null)
  const [loadingGeneration, setLoadingGeneration] = useState(false)
  const [generationError, setGenerationError] = useState<string | null>(null)
  const [models, setModels] = useState<GeminiModel[]>([])
  const [loadingModels, setLoadingModels] = useState(false)
  const [modelsError, setModelsError] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string>("gemini-pro") // Default to a common model
  const { toast } = useToast()

  const handleGenerateText = async () => {
    setLoadingGeneration(true)
    setGeneratedText(null)
    setGenerationError(null)

    try {
      const res = await fetch("/api/test-gemini/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, model: selectedModel }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate text")
      }

      setGeneratedText(data.text)
      toast({
        title: "Text Generated",
        description: "Gemini successfully generated text.",
        variant: "default",
      })
    } catch (err: any) {
      setGenerationError(err.message)
      toast({
        title: "Generation Failed",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setLoadingGeneration(false)
    }
  }

  const handleListModels = async () => {
    setLoadingModels(true)
    setModels([])
    setModelsError(null)

    try {
      const res = await fetch("/api/test-gemini/models")
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to list models")
      }

      setModels(data)
      toast({
        title: "Models Listed",
        description: `${data.length} Gemini models found.`,
        variant: "default",
      })
    } catch (err: any) {
      setModelsError(err.message)
      toast({
        title: "Model Listing Failed",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setLoadingModels(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gemini API Test Page</h1>
          <p className="text-muted-foreground">Test integration with Google Gemini models.</p>
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" /> Generate Text
          </CardTitle>
          <CardDescription>Send a prompt to a Gemini model and get a text response.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model-select">Select Model</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger id="model-select">
                <SelectValue placeholder="Select a Gemini model" />
              </SelectTrigger>
              <SelectContent>
                {models.length > 0 ? (
                  models.map((model) => (
                    <SelectItem key={model.name} value={model.name}>
                      {model.displayName} ({model.name})
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="loading" disabled>
                    {loadingModels ? "Loading models..." : "No models loaded. Click 'List Models'"}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              rows={6}
            />
          </div>
          <Button onClick={handleGenerateText} disabled={loadingGeneration || !selectedModel}>
            {loadingGeneration ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            {loadingGeneration ? "Generating..." : "Generate Text"}
          </Button>
          {generatedText && (
            <div className="space-y-2">
              <Label>Generated Text</Label>
              <div className="rounded-md border bg-muted p-4 text-sm whitespace-pre-wrap">{generatedText}</div>
            </div>
          )}
          {generationError && (
            <div className="flex items-center gap-2 text-red-500">
              <XCircle className="h-5 w-5" />
              <p className="font-medium">Error: {generationError}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <List className="h-5 w-5" /> List Available Models
          </CardTitle>
          <CardDescription>Fetch a list of all available Gemini models.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleListModels} disabled={loadingModels}>
            {loadingModels ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <List className="mr-2 h-4 w-4" />}
            {loadingModels ? "Loading Models..." : "List Models"}
          </Button>
          {models.length > 0 && (
            <ScrollArea className="h-64 w-full rounded-md border p-4">
              <ul className="space-y-2">
                {models.map((model) => (
                  <li key={model.name} className="text-sm">
                    <p className="font-medium">
                      {model.displayName} ({model.name})
                    </p>
                    <p className="text-muted-foreground">
                      Input: {model.inputTokenLimit} tokens | Output: {model.outputTokenLimit} tokens
                    </p>
                    <p className="text-muted-foreground">Methods: {model.supportedGenerationMethods.join(", ")}</p>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          )}
          {modelsError && (
            <div className="flex items-center gap-2 text-red-500">
              <XCircle className="h-5 w-5" />
              <p className="font-medium">Error: {modelsError}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
