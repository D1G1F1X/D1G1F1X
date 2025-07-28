"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Loader2, CheckCircle, AlertTriangle, ImageIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { getAllCardData } from "@/lib/card-data-access"
import { verifyCardImage, getCardImagePath } from "@/lib/card-image-utils"
import type { OracleCard } from "@/types/cards"

interface ImageVerificationResult {
  cardId: string
  element: string
  imagePath: string
  exists: boolean
  message?: string
}

export default function VerifyCardImagesPage() {
  const [verificationResults, setVerificationResults] = useState<ImageVerificationResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const runVerification = async () => {
    setIsLoading(true)
    setVerificationResults([])
    setLastChecked(null)
    setProgress(0)

    const allCards = getAllCardData() as OracleCard[]
    const tempResults: ImageVerificationResult[] = []
    let processedCount = 0

    for (const card of allCards) {
      // Check base element image
      const baseImagePath = getCardImagePath(card, "first")
      const baseExists = await verifyCardImage(baseImagePath)
      tempResults.push({
        cardId: card.id,
        element: card.baseElement,
        imagePath: baseImagePath,
        exists: baseExists,
        message: baseExists ? "Image found" : "Image NOT found",
      })
      processedCount++
      setProgress(Math.round((processedCount / (allCards.length * 2)) * 100))

      // Check synergistic element image if different
      if (card.baseElement !== card.synergisticElement) {
        const synergisticImagePath = getCardImagePath(card, "second")
        const synergisticExists = await verifyCardImage(synergisticImagePath)
        tempResults.push({
          cardId: card.id,
          element: card.synergisticElement,
          imagePath: synergisticImagePath,
          exists: synergisticExists,
          message: synergisticExists ? "Image found" : "Image NOT found",
        })
        processedCount++
        setProgress(Math.round((processedCount / (allCards.length * 2)) * 100))
      }
    }

    setVerificationResults(tempResults)
    setLastChecked(new Date())
    setIsLoading(false)

    const missingCount = tempResults.filter((r) => !r.exists).length
    toast({
      title: "Verification Complete",
      description: missingCount > 0 ? `${missingCount} images are missing.` : "All images verified successfully!",
      variant: missingCount > 0 ? "destructive" : "default",
    })
  }

  useEffect(() => {
    runVerification()
  }, [])

  const missingImages = verificationResults.filter((r) => !r.exists)

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Verify Card Images (Legacy)</h1>
          <p className="text-muted-foreground">
            Verify the existence of all Oracle Card images based on naming conventions.
          </p>
        </div>
        <Button onClick={runVerification} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ImageIcon className="mr-2 h-4 w-4" />}
          {isLoading ? "Verifying..." : "Run Verification Now"}
        </Button>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Verification Results</CardTitle>
          <CardDescription>
            {lastChecked ? (
              <span>Last run: {lastChecked.toLocaleString()}</span>
            ) : (
              <span>Running initial verification...</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-48">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-lg text-muted-foreground">Checking all card images...</p>
              <Progress value={progress} className="w-2/3 mt-4" />
            </div>
          ) : missingImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-green-500">
              <CheckCircle className="h-16 w-16 mb-4" />
              <p className="text-xl font-semibold">All images are present!</p>
              <p className="text-muted-foreground">Your card images are correctly linked.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center text-red-500">
                <AlertTriangle className="h-6 w-6 mr-2" />
                <p className="text-lg font-semibold">{missingImages.length} missing image(s) found!</p>
              </div>
              <ScrollArea className="h-64 w-full rounded-md border p-4">
                <ul className="list-disc pl-5 space-y-2">
                  {missingImages.map((result, index) => (
                    <li key={index} className="text-sm text-red-400">
                      <strong>Card:</strong> {result.cardId} ({result.element}) - Expected Path:{" "}
                      <span className="break-all">{result.imagePath}</span>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
