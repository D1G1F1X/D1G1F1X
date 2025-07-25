"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, ImageIcon, CheckCircle, XCircle, Cloud, HardDrive } from "lucide-react"
import { EnhancedCardImage } from "@/components/enhanced-card-image-handler"
import type { OracleCard } from "@/types/cards"
import { listCardImages, verifyCardImage, getAllCards } from "@/lib/card-image-blob-handler"
import { useToast } from "@/hooks/use-toast"

interface BlobInfo {
  url: string
  pathname: string
  size: number
  uploadedAt: string
  filename: string
}

interface ImageDiagnosticsPageClientProps {
  initialCards: OracleCard[]
  initialBlobImages: BlobInfo[]
}

export function ImageDiagnosticsClientPage({ initialCards, initialBlobImages }: ImageDiagnosticsPageClientProps) {
  const [cards, setCards] = useState<OracleCard[]>(initialCards)
  const [blobImages, setBlobImages] = useState<BlobInfo[]>(initialBlobImages)
  const [loading, setLoading] = useState(false)
  const [verificationResults, setVerificationResults] = useState<any[]>([])
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchAllData = useCallback(async () => {
    setLoading(true)
    try {
      const fetchedCards = await getAllCards()
      const fetchedBlobs = await listCardImages()
      setCards(fetchedCards)
      setBlobImages(fetchedBlobs)
      toast({
        title: "Data Refreshed",
        description: "Card data and blob images reloaded.",
      })
    } catch (error) {
      console.error("Failed to fetch data:", error)
      toast({
        title: "Error",
        description: "Failed to refresh card data or blob images.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  const runImageVerification = async () => {
    setLoading(true)
    setVerificationResults([])
    try {
      const results = []
      for (const card of cards) {
        const filename = `${card.number}-${card.suit.toLowerCase()}-${card.baseElement.toLowerCase()}.jpg`
        const result = await verifyCardImage(filename)
        results.push({
          cardId: card.id,
          filename: filename,
          existsInBlob: result.exists,
          matchesData: result.matchesData,
          error: result.error,
        })
      }
      setVerificationResults(results)
      toast({
        title: "Image Verification Complete",
        description: `Verified ${results.length} card images.`,
      })
    } catch (error) {
      console.error("Failed to run image verification:", error)
      toast({
        title: "Error",
        description: "Failed to run image verification.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCardSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCardId(event.target.value === "none" ? null : event.target.value)
  }

  const selectedDisplayCard = selectedCardId ? cards.find((c) => c.id === selectedCardId) : null

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Image Diagnostics</h1>
      <p className="text-muted-foreground mb-8">This page helps diagnose issues with card image loading and display.</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" /> Blob Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={fetchAllData} disabled={loading} className="w-full mb-4">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                </>
              ) : (
                "Refresh All Data"
              )}
            </Button>
            <p className="text-sm text-muted-foreground mb-2">Total Blobs: {blobImages.length}</p>
            <div className="h-[200px] overflow-y-auto border rounded-md p-2">
              {blobImages.length > 0 ? (
                <ul className="space-y-1">
                  {blobImages.map((blob) => (
                    <li key={blob.pathname} className="flex items-center gap-2 text-xs">
                      <ImageIcon className="h-3 w-3 text-muted-foreground" />
                      {blob.filename}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-muted-foreground text-sm">No blob images found.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" /> Image Verification Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={runImageVerification} disabled={loading} className="w-full mb-4">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                </>
              ) : (
                "Run Image Verification"
              )}
            </Button>
            <div className="h-[250px] overflow-y-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Card ID</TableHead>
                    <TableHead>Filename</TableHead>
                    <TableHead>Exists</TableHead>
                    <TableHead>Matches Data</TableHead>
                    <TableHead>Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verificationResults.length > 0 ? (
                    verificationResults.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-xs">{result.cardId}</TableCell>
                        <TableCell className="text-xs">{result.filename}</TableCell>
                        <TableCell>
                          {result.existsInBlob ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell>
                          {result.matchesData ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-red-500">{result.error || "N/A"}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        Run verification to see results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Individual Card Image Loading</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 items-center">
            <div>
              <Label htmlFor="card-select">Select a Card</Label>
              <select
                id="card-select"
                value={selectedCardId || "none"}
                onChange={handleCardSelect}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="none">-- Select a card --</option>
                {cards.map((card) => (
                  <option key={card.id} value={card.id}>
                    {card.fullTitle} ({card.id})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center items-center min-h-[200px] border rounded-md">
              {selectedDisplayCard ? (
                <EnhancedCardImage
                  cardId={selectedDisplayCard.id}
                  cardTitle={selectedDisplayCard.fullTitle}
                  baseElement={selectedDisplayCard.baseElement}
                  synergisticElement={selectedDisplayCard.synergisticElement}
                  className="max-w-[150px] h-auto"
                  showStatus={true}
                />
              ) : (
                <span className="text-muted-foreground">Select a card to preview its image.</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
