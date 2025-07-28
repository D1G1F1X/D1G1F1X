"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Loader2, CheckCircle, AlertTriangle, XCircle, ImageIcon } from "lucide-react"
import { getCardData } from "@/lib/card-data-access"
import { useToast } from "@/components/ui/use-toast"

interface ImageDiagnosticResult {
  cardId: string
  element: string
  imagePath: string
  status: "success" | "loading" | "error"
  error?: string
}

export default function ImageDiagnosticsPage() {
  const [diagnosticResults, setDiagnosticResults] = useState<ImageDiagnosticResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const { toast } = useToast()

  const runDiagnostics = async () => {
    setIsLoading(true)
    setDiagnosticResults([])
    setLastChecked(null)

    const allCards = getCardData() // Get all card metadata
    const results: ImageDiagnosticResult[] = []

    // Map to store promises for image loading to track completion
    const imageLoadPromises: Promise<void>[] = []

    for (const card of allCards) {
      // Test base element image
      results.push({
        cardId: card.id,
        element: card.baseElement,
        imagePath: "", // Will be set by EnhancedCardImage
        status: "loading",
      })

      // Test synergistic element image if different
      if (card.baseElement !== card.synergisticElement) {
        results.push({
          cardId: card.id,
          element: card.synergisticElement,
          imagePath: "",
          status: "loading",
        })
      }
    }

    setDiagnosticResults(results) // Set initial loading state

    // Use a queue to limit concurrent image loads and prevent network saturation
    const queue: (() => Promise<void>)[] = []
    const concurrencyLimit = 5 // Adjust as needed

    const processQueue = async () => {
      while (queue.length > 0) {
        const batch = queue.splice(0, concurrencyLimit)
        await Promise.all(batch.map((task) => task()))
      }
    }

    results.forEach((result, index) => {
      queue.push(async () => {
        return new Promise<void>((resolve) => {
          // This simulates the loading by rendering the EnhancedCardImage component
          // in a hidden div or by directly calling its internal logic.
          // Since EnhancedCardImage is a client component designed for rendering,
          // we'll simulate the load and check for success/failure via its props.
          // For a true "diagnostic", you'd typically make HEAD requests, but
          // given the component-based approach, we simulate component behavior.

          const tempImg = new Image()
          const cardObj = allCards.find((c) => c.id === result.cardId)
          if (!cardObj) {
            results[index].status = "error"
            results[index].error = "Card data not found"
            resolve()
            return
          }

          // Use the getCardImagePath from lib/card-data-access.ts to get the expected URL
          let expectedPath = ""
          try {
            expectedPath = getCardImagePath(cardObj, result.element === cardObj.baseElement ? "first" : "second")
          } catch (e: any) {
            results[index].status = "error"
            results[index].error = `Path gen error: ${e.message}`
            resolve()
            return
          }

          results[index].imagePath = expectedPath // Store the expected path

          tempImg.onload = () => {
            results[index].status = "success"
            setDiagnosticResults([...results])
            resolve()
          }
          tempImg.onerror = (e) => {
            results[index].status = "error"
            results[index].error = "Failed to load image"
            setDiagnosticResults([...results])
            resolve()
          }
          tempImg.src = expectedPath // Trigger actual image load
          tempImg.crossOrigin = "anonymous" // Important for CORS on some servers
        })
      })
    })

    await processQueue() // Start processing the queue

    setLastChecked(new Date())
    const successCount = results.filter((r) => r.status === "success").length
    const errorCount = results.filter((r) => r.status === "error").length

    toast({
      title: "Image Diagnostics Complete",
      description: `${successCount} images loaded, ${errorCount} failed.`,
      variant: errorCount > 0 ? "destructive" : "default",
    })
    setIsLoading(false)
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  const successCount = diagnosticResults.filter((r) => r.status === "success").length
  const errorCount = diagnosticResults.filter((r) => r.status === "error").length

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Image Diagnostics</h1>
          <p className="text-muted-foreground">Analyze the loading status of all Oracle Card images.</p>
        </div>
        <Button onClick={runDiagnostics} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ImageIcon className="mr-2 h-4 w-4" />}
          {isLoading ? "Running Diagnostics..." : "Run Diagnostics Now"}
        </Button>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Diagnostic Results</CardTitle>
          <CardDescription>
            {lastChecked ? (
              <span>Last run: {lastChecked.toLocaleString()}</span>
            ) : (
              <span>Running initial diagnostics...</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-48">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-lg text-muted-foreground">Checking all image paths...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle className="h-5 w-5" />
                  <span>Successful: {successCount}</span>
                </div>
                <div className="flex items-center gap-2 text-red-500">
                  <XCircle className="h-5 w-5" />
                  <span>Failed: {errorCount}</span>
                </div>
              </div>

              <ScrollArea className="h-96 w-full rounded-md border p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {diagnosticResults.map((result, index) => (
                    <div key={index} className="border rounded-md p-3 flex items-center gap-3">
                      {result.status === "success" && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />}
                      {result.status === "error" && <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />}
                      {result.status === "loading" && (
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground flex-shrink-0" />
                      )}
                      <div className="flex-grow">
                        <p className="font-semibold text-sm">
                          {result.cardId} ({result.element})
                        </p>
                        <p className="text-xs text-muted-foreground break-all">{result.imagePath}</p>
                        {result.error && <p className="text-xs text-red-400 mt-1">Error: {result.error}</p>}
                      </div>
                    </div>
                  ))}
                </div>
                {diagnosticResults.length === 0 && !isLoading && (
                  <p className="text-center text-muted-foreground">No diagnostic results to display.</p>
                )}
              </ScrollArea>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Import getCardImagePath for use in the diagnostic logic
import { getCardImagePath } from "@/lib/card-data-access"
