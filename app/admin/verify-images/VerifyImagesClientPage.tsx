"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { verifyAllBlobs, verifyBlob } from "@/lib/verified-blob-handler" // Assuming these services exist

interface BlobVerificationResult {
  pathname: string
  url: string
  exists: boolean
  verified: boolean
  message: string
}

export default function VerifyImagesClientPage() {
  const [verificationResults, setVerificationResults] = useState<BlobVerificationResult[]>([])
  const [loading, setLoading] = useState(false)

  const handleVerifyAllImages = async () => {
    setLoading(true)
    try {
      const results = await verifyAllBlobs() // Call the backend API to verify all blobs
      setVerificationResults(results)
      toast({
        title: "Verification Complete",
        description: `Verified ${results.length} images.`,
      })
    } catch (error) {
      console.error("Error verifying all images:", error)
      toast({
        title: "Verification Failed",
        description: `Failed to verify images: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Optional: Function to verify a single image if needed
  const handleVerifySingleImage = async (pathname: string) => {
    setLoading(true)
    try {
      const result = await verifyBlob(pathname)
      setVerificationResults((prev) => {
        const existingIndex = prev.findIndex((r) => r.pathname === pathname)
        if (existingIndex > -1) {
          const newResults = [...prev]
          newResults[existingIndex] = result
          return newResults
        }
        return [...prev, result]
      })
      toast({
        title: "Single Image Verified",
        description: `Verification for ${pathname} complete.`,
      })
    } catch (error) {
      console.error(`Error verifying image ${pathname}:`, error)
      toast({
        title: "Verification Failed",
        description: `Failed to verify ${pathname}: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Image Verification Dashboard</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Verify All Blob Storage Images</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            This tool checks the existence and integrity of all images stored in your Vercel Blob Storage.
          </p>
          <Button onClick={handleVerifyAllImages} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            {loading ? "Verifying..." : "Verify All Images"}
          </Button>

          {verificationResults.length > 0 && (
            <div className="mt-6 max-h-[600px] overflow-y-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pathname</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Exists</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Message</TableHead>
                    {/* <TableHead className="text-right">Actions</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verificationResults.map((result) => (
                    <TableRow key={result.pathname}>
                      <TableCell className="font-medium">{result.pathname}</TableCell>
                      <TableCell className="text-xs truncate max-w-[200px]">
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {result.url}
                        </a>
                      </TableCell>
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
                      {/* <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVerifySingleImage(result.pathname)}
                          disabled={loading}
                        >
                          <RefreshCw className="h-4 w-4" />
                          <span className="sr-only">Re-verify</span>
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
