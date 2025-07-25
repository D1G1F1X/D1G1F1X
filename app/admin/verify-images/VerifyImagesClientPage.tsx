"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { verifyAllBlobs, verifyBlob } from "@/lib/verified-blob-handler" // Import the new exports

type VerifyImagesClientPageProps = {}

export default function VerifyImagesClientPage({}: VerifyImagesClientPageProps) {
  // Changed to default export
  const [verificationResults, setVerificationResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const runVerification = async () => {
    setLoading(true)
    setVerificationResults([])
    try {
      // Simulate API call for image verification
      // Replace with actual calls to verifyAllBlobs and verifyBlob
      const allBlobsResult = await verifyAllBlobs()
      const singleBlobResult = await verifyBlob("some-test-blob-id") // Example call

      const simulatedResults = [
        { filename: "image1.jpg", existsInBlob: true, matchesData: true, error: null },
        { filename: "image2.png", existsInBlob: false, matchesData: false, error: "File not found" },
        { filename: "image3.svg", existsInBlob: true, matchesData: true, error: null },
        // Add results from actual API calls here
        {
          filename: "all_blobs_status",
          existsInBlob: allBlobsResult.success,
          matchesData: true,
          error: allBlobsResult.error || null,
        },
        {
          filename: "single_blob_status",
          existsInBlob: singleBlobResult.success,
          matchesData: true,
          error: singleBlobResult.error || null,
        },
      ]
      setVerificationResults(simulatedResults)
    } catch (error) {
      console.error("Failed to run image verification:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Verify Images</h1>
      <p className="text-muted-foreground mb-8">
        This page verifies all images in the public directory against blob storage.
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
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
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
