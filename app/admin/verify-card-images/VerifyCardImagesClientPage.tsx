"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { verifyCardImage } from "@/lib/card-image-blob-handler"
import type { OracleCard } from "@/types/cards"
import { useToast } from "@/hooks/use-toast"

interface VerifyCardImagesClientPageProps {
  initialCards: OracleCard[]
}

export function VerifyCardImagesClientPage({ initialCards }: VerifyCardImagesClientPageProps) {
  const [verificationResults, setVerificationResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const runVerification = async () => {
    setLoading(true)
    setVerificationResults([])
    try {
      const results = []
      for (const card of initialCards) {
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

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Verify Card Images</h1>
      <p className="text-muted-foreground mb-8">
        This page verifies if all expected card images exist in blob storage.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Image Verification Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={runVerification} disabled={loading} className="w-full mb-4">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
              </>
            ) : (
              "Run Image Verification"
            )}
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Card ID</TableHead>
                <TableHead>Filename</TableHead>
                <TableHead>Exists in Blob</TableHead>
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
        </CardContent>
      </Card>
    </div>
  )
}
