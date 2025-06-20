"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, RefreshCw } from "lucide-react"
import { getAllCards, getCardImagePath } from "@/lib/card-data-access"

interface ImageVerificationResult {
  cardId: string
  cardName: string
  firstEndStatus: "loading" | "success" | "error"
  secondEndStatus: "loading" | "success" | "error"
  firstEndPath: string
  secondEndPath: string
  firstEndFallbackUsed: boolean
  secondEndFallbackUsed: boolean
}

// Changed to default export
export default function CardImageVerifier() {
  const [results, setResults] = useState<ImageVerificationResult[]>([])
  const [isVerifying, setIsVerifying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [totalCards, setTotalCards] = useState(0)
  const [showSuccessful, setShowSuccessful] = useState(true)

  const verifyImages = async () => {
    setIsVerifying(true)
    setProgress(0)

    const cards = getAllCards()
    setTotalCards(cards.length)

    const initialResults: ImageVerificationResult[] = cards.map((card) => ({
      cardId: card.id,
      cardName: card.name,
      firstEndStatus: "loading",
      secondEndStatus: "loading",
      firstEndPath: getCardImagePath(card, "first"),
      secondEndPath: getCardImagePath(card, "second"),
      firstEndFallbackUsed: false,
      secondEndFallbackUsed: false,
    }))

    setResults(initialResults)

    // Process in batches to avoid overwhelming the browser
    const batchSize = 5
    for (let i = 0; i < cards.length; i += batchSize) {
      const batch = cards.slice(i, i + batchSize)

      await Promise.all(
        batch.map(async (card, batchIndex) => {
          const index = i + batchIndex

          // Create a promise that resolves when the image loads or rejects when it fails
          const checkImage = (src: string): Promise<boolean> => {
            return new Promise((resolve) => {
              const img = new window.Image()
              img.onload = () => resolve(true)
              img.onerror = () => resolve(false)
              img.src = src
            })
          }

          // Check first end image
          const firstEndPath = getCardImagePath(card, "first")
          const firstEndSuccess = await checkImage(firstEndPath)

          // Check second end image
          const secondEndPath = getCardImagePath(card, "second")
          const secondEndSuccess = await checkImage(secondEndPath)

          // Update results
          setResults((prev) => {
            const newResults = [...prev]
            newResults[index] = {
              ...newResults[index],
              firstEndStatus: firstEndSuccess ? "success" : "error",
              secondEndStatus: secondEndSuccess ? "success" : "error",
              firstEndPath,
              secondEndPath,
              firstEndFallbackUsed: false,
              secondEndFallbackUsed: false,
            }
            return newResults
          })

          // Update progress
          setProgress((prev) => {
            const newProgress = prev + (1 / cards.length) * 100
            return Math.min(newProgress, 100)
          })
        }),
      )
    }

    setIsVerifying(false)
  }

  // Filter results based on showSuccessful state
  const filteredResults = showSuccessful
    ? results
    : results.filter((r) => r.firstEndStatus === "error" || r.secondEndStatus === "error")

  // Calculate statistics
  const totalVerified = results.filter((r) => r.firstEndStatus !== "loading" && r.secondEndStatus !== "loading").length

  const totalErrors = results.filter((r) => r.firstEndStatus === "error" || r.secondEndStatus === "error").length

  const firstEndErrors = results.filter((r) => r.firstEndStatus === "error").length
  const secondEndErrors = results.filter((r) => r.secondEndStatus === "error").length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Card Image Verification</span>
            <Button onClick={verifyImages} disabled={isVerifying} size="sm">
              <RefreshCw className={`mr-2 h-4 w-4 ${isVerifying ? "animate-spin" : ""}`} />
              {isVerifying ? "Verifying..." : "Verify Images"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isVerifying && (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-sm text-gray-500">
                  Verifying {totalVerified} of {totalCards} cards ({Math.round(progress)}%)
                </p>
              </div>
            )}

            {totalVerified > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-md">
                  <h3 className="font-medium mb-2">Total Cards</h3>
                  <p className="text-2xl font-bold">{totalCards}</p>
                </div>

                <div className="p-4 bg-muted rounded-md">
                  <h3 className="font-medium mb-2">Verified</h3>
                  <p className="text-2xl font-bold">{totalVerified}</p>
                </div>

                <div className={`p-4 rounded-md ${totalErrors > 0 ? "bg-red-900/20" : "bg-green-900/20"}`}>
                  <h3 className="font-medium mb-2">Errors</h3>
                  <p className="text-2xl font-bold">{totalErrors}</p>
                  {totalErrors > 0 && (
                    <div className="text-xs mt-2">
                      <p>First End: {firstEndErrors}</p>
                      <p>Second End: {secondEndErrors}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {totalVerified > 0 && (
              <div className="flex justify-between items-center">
                <input
                  type="checkbox"
                  id="showSuccessful"
                  checked={showSuccessful}
                  onChange={(e) => setShowSuccessful(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="showSuccessful" className="text-sm">
                  Show successful
                </label>
              </div>
            )}

            {totalErrors > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Image Loading Issues Detected</AlertTitle>
                <AlertDescription>
                  {totalErrors} cards have image loading issues. These cards will use fallback displays.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              {filteredResults.map((result) => (
                <div
                  key={result.cardId}
                  className={`p-3 rounded-md border ${
                    result.firstEndStatus === "error" || result.secondEndStatus === "error"
                      ? "bg-red-900/10 border-red-500/30"
                      : "bg-green-900/10 border-green-500/30"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{result.cardName}</h4>
                    <div className="flex space-x-2">
                      <span
                        className={`flex items-center ${
                          result.firstEndStatus === "error" ? "text-red-400" : "text-green-400"
                        }`}
                      >
                        {result.firstEndStatus === "error" ? (
                          <AlertTriangle className="h-4 w-4 mr-1" />
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-1" />
                        )}
                        First
                      </span>
                      <span
                        className={`flex items-center ${
                          result.secondEndStatus === "error" ? "text-red-400" : "text-green-400"
                        }`}
                      >
                        {result.secondEndStatus === "error" ? (
                          <AlertTriangle className="h-4 w-4 mr-1" />
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-1" />
                        )}
                        Second
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="truncate">First: {result.firstEndPath}</p>
                    </div>
                    <div>
                      <p className="truncate">Second: {result.secondEndPath}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
