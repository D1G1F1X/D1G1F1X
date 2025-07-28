"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, CheckCircle, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ImageVerificationResult {
  cardId: string
  baseElement: string
  synergisticElement: string
  baseImageExists: boolean
  synergisticImageExists: boolean
  baseImageUrl?: string
  synergisticImageUrl?: string
  baseImageError?: string
  synergisticImageError?: string
}

export default function VerifyCardImagesPage() {
  const [verificationResults, setVerificationResults] = useState<ImageVerificationResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const runVerification = async () => {
    setLoading(true)
    setError(null)
    setVerificationResults([])
    try {
      const response = await fetch("/api/blob/validate-cards")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.success) {
        setVerificationResults(data.results)
        toast({
          title: "Verification Complete",
          description: `Checked ${data.results.length} cards.`,
          variant: "default",
        })
      } else {
        setError(data.error || "Failed to verify images.")
        toast({
          title: "Verification Failed",
          description: data.error || "An error occurred during verification.",
          variant: "destructive",
        })
      }
    } catch (err: any) {
      setError(err.message || "An unknown error occurred during verification.")
      toast({
        title: "Verification Failed",
        description: err.message || "An unknown error occurred.",
        variant: "destructive",
      })
      console.error("Error during image verification:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runVerification()
  }, [])

  const missingImages = verificationResults.filter(
    (result) => !result.baseImageExists || !result.synergisticImageExists,
  )

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Verify Card Images</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Run Image Verification</CardTitle>
          <CardDescription>Checks if all expected card images exist in Vercel Blob Storage.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={runVerification} disabled={loading}>
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Verifying...
              </>
            ) : (
              "Run Verification"
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Verification Report</CardTitle>
          <CardDescription>
            {loading
              ? "Loading verification results..."
              : missingImages.length === 0
                ? "All expected card images are present in blob storage."
                : `Found ${missingImages.length} card(s) with missing images.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : missingImages.length === 0 ? (
            <Alert className="border-green-500/50 text-green-400">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>All Images Present!</AlertTitle>
              <AlertDescription>All card images were successfully verified in blob storage.</AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Missing Images Found!</AlertTitle>
              <AlertDescription>
                <p className="mb-2">The following card images are missing or inaccessible:</p>
                <ScrollArea className="h-[300px] rounded-md border p-4">
                  <ul className="list-disc pl-5">
                    {missingImages.map((result, index) => (
                      <li key={index} className="mb-2 text-sm">
                        <strong>Card ID:</strong> {result.cardId}
                        <ul className="list-circle pl-5">
                          {!result.baseImageExists && (
                            <li>
                              Base Element ({result.baseElement}): Missing or Error (
                              {result.baseImageError || "Unknown"})
                              {result.baseImageUrl && (
                                <span className="ml-2 text-gray-500">
                                  (Expected:{" "}
                                  <a
                                    href={result.baseImageUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                  >
                                    {result.baseImageUrl}
                                  </a>
                                  )
                                </span>
                              )}
                            </li>
                          )}
                          {!result.synergisticImageExists && (
                            <li>
                              Synergistic Element ({result.synergisticElement}): Missing or Error (
                              {result.synergisticImageError || "Unknown"})
                              {result.synergisticImageUrl && (
                                <span className="ml-2 text-gray-500">
                                  (Expected:{" "}
                                  <a
                                    href={result.synergisticImageUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline"
                                  >
                                    {result.synergisticImageUrl}
                                  </a>
                                  )
                                </span>
                              )}
                            </li>
                          )}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
                <p className="mt-4 text-sm">
                  Please upload the missing images to your Vercel Blob Storage. You can use the{" "}
                  <Button
                    variant="link"
                    className="h-auto p-0 text-sm"
                    onClick={() => (window.location.href = "/admin/blob-manager")}
                  >
                    Blob Manager
                  </Button>{" "}
                  to upload files.
                </p>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
