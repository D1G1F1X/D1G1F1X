"use client"

import { TableCell } from "@/components/ui/table"

import { TableBody } from "@/components/ui/table"

import { TableHead } from "@/components/ui/table"

import { TableRow } from "@/components/ui/table"

import { TableHeader } from "@/components/ui/table"

import { Table } from "@/components/ui/table"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle, XCircle, Upload, RefreshCw } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { OracleCard } from "@/types/cards"
import { getCardData } from "@/lib/card-data-access" // Assuming this fetches card data
import { verifyImage } from "@/lib/image-processor" // Assuming this service exists for image verification
import { upload } from "@vercel/blob" // Assuming Vercel Blob upload function

interface ImageVerificationResult {
  cardId: string
  imageUrl: string
  exists: boolean
  verified: boolean
  message: string
}

export default function TestCardImagesClientPage() {
  const [allCards, setAllCards] = useState<OracleCard[]>([])
  const [verificationResults, setVerificationResults] = useState<ImageVerificationResult[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadCardId, setUploadCardId] = useState("")

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true)
      try {
        const cards = await getCardData()
        setAllCards(cards)
      } catch (error) {
        console.error("Failed to fetch card data:", error)
        toast({
          title: "Error",
          description: "Failed to load card data for testing.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchCards()
  }, [])

  const handleVerifyAllImages = async () => {
    setLoading(true)
    const results: ImageVerificationResult[] = []
    for (const card of allCards) {
      try {
        const verification = await verifyImage(card.imageUrl) // Call the backend API
        results.push({
          cardId: card.id,
          imageUrl: card.imageUrl,
          exists: verification.exists,
          verified: verification.verified,
          message: verification.message,
        })
      } catch (error) {
        console.error(`Error verifying image for ${card.id}:`, error)
        results.push({
          cardId: card.id,
          imageUrl: card.imageUrl,
          exists: false,
          verified: false,
          message: `Verification failed: ${error.message}`,
        })
      }
    }
    setVerificationResults(results)
    setLoading(false)
    toast({
      title: "Verification Complete",
      description: `Verified ${results.length} card images.`,
    })
  }

  const handleFileUpload = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!selectedFile || !uploadCardId) {
      toast({
        title: "Missing Information",
        description: "Please select a file and enter a Card ID.",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    try {
      // Assuming the blob path should be public/cards/{cardId}.jpg or similar
      // You might need a more sophisticated naming convention based on your card data structure
      const filename = `cards/${uploadCardId}.jpg` // Example: public/cards/01-cauldron-fire.jpg
      const blob = await upload(filename, selectedFile, {
        access: "public",
        handleUploadUrl: "/api/blob/card-images", // Your custom API route for handling uploads
      })

      toast({
        title: "Upload Successful",
        description: `Image uploaded for ${uploadCardId}: ${blob.url}`,
      })
      setSelectedFile(null)
      setUploadCardId("")
      // Optionally re-fetch card data or update state to reflect new image
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Upload Failed",
        description: `Failed to upload image: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Card Image Test & Upload</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Verify All Card Images</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Click the button below to verify the existence and integrity of all card images referenced in your data.
          </p>
          <Button onClick={handleVerifyAllImages} disabled={loading || allCards.length === 0}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            {loading ? "Verifying..." : "Verify All Images"}
          </Button>

          {verificationResults.length > 0 && (
            <div className="mt-6 max-h-[400px] overflow-y-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Card ID</TableHead>
                    <TableHead>Image URL</TableHead>
                    <TableHead>Exists</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verificationResults.map((result) => (
                    <TableRow key={result.cardId}>
                      <TableCell className="font-medium">{result.cardId}</TableCell>
                      <TableCell className="text-xs truncate max-w-[200px]">{result.imageUrl}</TableCell>
                      <TableCell>
                        {result.exists ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell>
                        {result.verified ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{result.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload New Card Image</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFileUpload} className="space-y-4">
            <div>
              <Label htmlFor="cardId">Card ID</Label>
              <Input
                id="cardId"
                placeholder="e.g., 01-cauldron-fire"
                value={uploadCardId}
                onChange={(e) => setUploadCardId(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="imageFile">Image File</Label>
              <Input
                id="imageFile"
                type="file"
                accept="image/jpeg,image/png"
                onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                required
              />
            </div>
            <Button type="submit" disabled={uploading}>
              {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
