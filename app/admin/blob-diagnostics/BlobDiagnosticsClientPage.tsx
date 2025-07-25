"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, CheckCircle, XCircle, Loader2, Cloud, HardDrive } from "lucide-react"
import { listCardImages, verifyCardImage, deleteCardBlob } from "@/lib/card-image-blob-handler"
import { getAllCards } from "@/lib/card-data-access"
import type { OracleCard } from "@/types/cards"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

interface BlobInfo {
  url: string
  pathname: string
  size: number
  uploadedAt: string
  filename: string
}

interface VerificationResult {
  filename: string
  exists: boolean
  matchesData: boolean
  error?: string
}

export function BlobDiagnosticsClientPage() {
  const [blobList, setBlobList] = useState<BlobInfo[]>([])
  const [verificationResults, setVerificationResults] = useState<VerificationResult[]>([])
  const [loadingBlobs, setLoadingBlobs] = useState(false)
  const [loadingVerification, setLoadingVerification] = useState(false)
  const [blobToDelete, setBlobToDelete] = useState("")
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [totalBlobSize, setTotalBlobSize] = useState(0)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    fetchBlobList()
  }, [])

  const fetchBlobList = async () => {
    setLoadingBlobs(true)
    try {
      const blobs = await listCardImages()
      setBlobList(blobs)
      const totalSize = blobs.reduce((sum, blob) => sum + blob.size, 0)
      setTotalBlobSize(totalSize)
      toast({
        title: "Blob List Fetched",
        description: `Found ${blobs.length} blobs. Total size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB.`,
      })
    } catch (error) {
      console.error("Failed to fetch blob list:", error)
      toast({
        title: "Error",
        description: "Failed to fetch blob list.",
        variant: "destructive",
      })
    } finally {
      setLoadingBlobs(false)
    }
  }

  const runVerification = async () => {
    setLoadingVerification(true)
    setVerificationResults([])
    setProgress(0)
    try {
      const allCards: OracleCard[] = await getAllCards()
      const results: VerificationResult[] = []
      let completed = 0

      for (const card of allCards) {
        const filename = `${card.number}-${card.suit.toLowerCase()}-${card.baseElement.toLowerCase()}.jpg`
        const result = await verifyCardImage(filename)
        results.push({
          filename: filename,
          exists: result.exists,
          matchesData: result.matchesData,
          error: result.error,
        })
        completed++
        setProgress(Math.floor((completed / allCards.length) * 100))
      }
      setVerificationResults(results)
      toast({
        title: "Verification Complete",
        description: `Verified ${results.length} card images.`,
      })
    } catch (error) {
      console.error("Failed to run verification:", error)
      toast({
        title: "Error",
        description: "Failed to run verification.",
        variant: "destructive",
      })
    } finally {
      setLoadingVerification(false)
      setProgress(0)
    }
  }

  const handleDeleteBlob = async () => {
    if (!blobToDelete) {
      toast({
        title: "Error",
        description: "Please enter a blob pathname to delete.",
        variant: "destructive",
      })
      return
    }
    setDeleteLoading(true)
    try {
      await deleteCardBlob(blobToDelete)
      toast({
        title: "Blob Deleted",
        description: `Successfully deleted ${blobToDelete}.`,
      })
      setBlobToDelete("")
      fetchBlobList() // Refresh the list
    } catch (error) {
      console.error("Failed to delete blob:", error)
      toast({
        title: "Error",
        description: `Failed to delete blob: ${error instanceof Error ? error.message : String(error)}.`,
        variant: "destructive",
      })
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Blob Storage Diagnostics</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Blob List Card */}
        <Card className="col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" /> Blob List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={fetchBlobList} disabled={loadingBlobs} className="w-full mb-4">
              {loadingBlobs ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                </>
              ) : (
                "Refresh Blob List"
              )}
            </Button>
            {blobList.length > 0 && (
              <div className="mb-4 text-sm text-muted-foreground">
                Total Blobs: {blobList.length} | Total Size: {(totalBlobSize / (1024 * 1024)).toFixed(2)} MB
              </div>
            )}
            <ScrollArea className="h-[300px] w-full rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filename</TableHead>
                    <TableHead className="text-right">Size (KB)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blobList.map((blob) => (
                    <TableRow key={blob.pathname}>
                      <TableCell className="text-xs">{blob.filename}</TableCell>
                      <TableCell className="text-right text-xs">{(blob.size / 1024).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  {blobList.length === 0 && !loadingBlobs && (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center text-muted-foreground">
                        No blobs found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Verification Card */}
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" /> Image Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={runVerification} disabled={loadingVerification} className="w-full mb-4">
              {loadingVerification ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                </>
              ) : (
                "Run Image Verification"
              )}
            </Button>
            {loadingVerification && (
              <div className="mb-4">
                <Progress value={progress} className="w-full" />
                <p className="text-center text-sm text-muted-foreground mt-2">{progress}% Complete</p>
              </div>
            )}
            <ScrollArea className="h-[300px] w-full rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filename</TableHead>
                    <TableHead>Exists</TableHead>
                    <TableHead>Matches Data</TableHead>
                    <TableHead>Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verificationResults.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-xs">{result.filename}</TableCell>
                      <TableCell>
                        {result.exists ? (
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
                  ))}
                  {verificationResults.length === 0 && !loadingVerification && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        Run verification to see results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Manual Blob Deletion Card */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" /> Manual Blob Deletion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>Deleting blobs is irreversible. Ensure you have the correct pathname.</AlertDescription>
            </Alert>
            <div className="grid gap-4">
              <Label htmlFor="blob-pathname">Blob Pathname (e.g., `cards/01-cauldron-fire.jpg`)</Label>
              <Input
                id="blob-pathname"
                placeholder="Enter full blob pathname to delete"
                value={blobToDelete}
                onChange={(e) => setBlobToDelete(e.target.value)}
              />
              <Button onClick={handleDeleteBlob} disabled={deleteLoading} variant="destructive">
                {deleteLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...
                  </>
                ) : (
                  "Delete Blob"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
