"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, UploadCloud, List, Trash2, Loader2, AlertTriangle, Eye, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import { getCardData } from "@/lib/card-data-access" // Assuming this gives all card metadata
import {
  listAllCardBlobs,
  uploadCardBlob,
  deleteCardBlob,
  type BlobEntry,
  verifyBlobIntegrity,
} from "@/lib/card-image-blob-handler" // Assuming these are external now
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"

interface VerificationResult {
  filename: string
  exists: boolean
  url?: string
  error?: string
  expectedPath?: string
}

export default function BlobManagerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [blobList, setBlobList] = useState<BlobEntry[]>([])
  const [isLoadingBlobs, setIsLoadingBlobs] = useState(false)
  const [selectedCardId, setSelectedCardId] = useState("")
  const [selectedElement, setSelectedElement] = useState("spirit")
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [bulkVerificationProgress, setBulkVerificationProgress] = useState(0)
  const [bulkVerificationResults, setBulkVerificationResults] = useState<VerificationResult[]>([])
  const [isBulkVerifying, setIsBulkVerifying] = useState(false)
  const [showOnlyMissing, setShowOnlyMissing] = useState(false)
  const [showOnlyVerified, setShowOnlyVerified] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    fetchBlobList()
  }, [])

  const fetchBlobList = async () => {
    setIsLoadingBlobs(true)
    try {
      const { blobs, error } = await listAllCardBlobs()
      if (error) {
        toast({
          title: "Error Listing Blobs",
          description: error,
          variant: "destructive",
        })
        console.error("Error listing blobs:", error)
        setBlobList([])
      } else {
        setBlobList(blobs)
        toast({
          title: "Blob List Updated",
          description: `${blobs.length} blobs loaded successfully.`,
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to fetch blob list: ${error.message}`,
        variant: "destructive",
      })
      console.error("Failed to fetch blob list:", error)
    } finally {
      setIsLoadingBlobs(false)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    } else {
      setSelectedFile(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an image file to upload.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const filename = selectedFile.name
      const fileType = selectedFile.type
      const blobPath = `cards/${filename}`

      const { success, url, error } = await uploadCardBlob(selectedFile, blobPath, fileType, (progress) => {
        setUploadProgress(progress)
      })

      if (success && url) {
        toast({
          title: "Upload Successful",
          description: `File "${filename}" uploaded to ${url}`,
        })
        setSelectedFile(null)
        fetchBlobList() // Refresh the list of blobs
      } else {
        throw new Error(error || "Unknown upload error")
      }
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      })
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDelete = async (pathname: string) => {
    if (!window.confirm(`Are you sure you want to delete ${pathname}?`)) {
      return
    }
    try {
      const { success, error } = await deleteCardBlob(pathname)
      if (success) {
        toast({
          title: "Deletion Successful",
          description: `File "${pathname}" deleted.`,
        })
        fetchBlobList()
      } else {
        throw new Error(error || "Unknown deletion error")
      }
    } catch (error: any) {
      toast({
        title: "Deletion Failed",
        description: error.message,
        variant: "destructive",
      })
      console.error("Deletion error:", error)
    }
  }

  const handleVerifySingle = async () => {
    if (!selectedCardId) {
      toast({
        title: "Missing Card ID",
        description: "Please enter a Card ID to verify.",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)
    setVerificationResult(null)
    try {
      const result = await verifyBlobIntegrity({ cardId: selectedCardId, element: selectedElement })
      setVerificationResult(result)
      toast({
        title: "Verification Complete",
        description: result.exists ? "Image found and valid!" : "Image not found or invalid.",
        variant: result.exists ? "default" : "destructive",
      })
    } catch (error: any) {
      toast({
        title: "Verification Error",
        description: error.message,
        variant: "destructive",
      })
      console.error("Verification error:", error)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleBulkVerify = async () => {
    setIsBulkVerifying(true)
    setBulkVerificationProgress(0)
    setBulkVerificationResults([])

    const allCards = getCardData() // Get all card metadata
    const verificationPromises: Promise<VerificationResult>[] = []
    let processedCount = 0

    const updateProgress = () => {
      processedCount++
      setBulkVerificationProgress(Math.round((processedCount / allCards.length) * 100))
    }

    for (const card of allCards) {
      const elements = [card.baseElement, card.synergisticElement]
      for (const element of elements) {
        verificationPromises.push(
          verifyBlobIntegrity({ cardId: card.id, element: element as string }).then((result) => {
            updateProgress()
            return result
          }),
        )
      }
    }

    const results = await Promise.all(verificationPromises)
    setBulkVerificationResults(results)
    setIsBulkVerifying(false)
    toast({
      title: "Bulk Verification Complete",
      description: `Checked ${results.length} potential images.`,
    })
  }

  const filteredBulkResults = bulkVerificationResults.filter((result) => {
    if (showOnlyMissing && result.exists) return false
    if (showOnlyVerified && !result.exists) return false
    return true
  })

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Vercel Blob Storage Manager</h1>

      <Tabs defaultValue="upload">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="list">List Blobs</TabsTrigger>
          <TabsTrigger value="verify">Verify Images</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadCloud className="h-5 w-5" /> Upload Card Image
              </CardTitle>
              <CardDescription>Upload a new card image to your Vercel Blob storage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="picture">Image File</Label>
                <Input id="picture" type="file" onChange={handleFileChange} disabled={isUploading} />
              </div>
              <Button onClick={handleUpload} disabled={isUploading || !selectedFile}>
                {isUploading ? <Loader2 className="animate-spin mr-2" /> : <UploadCloud className="mr-2" />}
                {isUploading ? `Uploading ${uploadProgress}%` : "Upload File"}
              </Button>
              {isUploading && <Progress value={uploadProgress} className="w-full" />}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List className="h-5 w-5" /> Current Blobs
              </CardTitle>
              <CardDescription>View and manage files currently in your blob storage.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={fetchBlobList} disabled={isLoadingBlobs} className="mb-4">
                {isLoadingBlobs ? <Loader2 className="animate-spin mr-2" /> : <RefreshCw className="mr-2" />}
                {isLoadingBlobs ? "Loading..." : "Refresh List"}
              </Button>
              {isLoadingBlobs ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="animate-spin h-8 w-8 text-primary" />
                </div>
              ) : (
                <ScrollArea className="h-[400px] w-full rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Filename</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Last Modified</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blobList.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            No blobs found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        blobList.map((blob) => (
                          <TableRow key={blob.url}>
                            <TableCell className="font-medium">{blob.pathname.split("/").pop()}</TableCell>
                            <TableCell>{(blob.size / 1024).toFixed(2)} KB</TableCell>
                            <TableCell>{new Date(blob.uploadedAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="mr-2 bg-transparent">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Image Preview: {blob.pathname.split("/").pop()}</DialogTitle>
                                    <DialogDescription>
                                      <Image
                                        src={blob.url || "/placeholder.svg"}
                                        alt={blob.pathname.split("/").pop() || "Image Preview"}
                                        width={400}
                                        height={600}
                                        className="object-contain w-full h-auto"
                                      />
                                      <p className="mt-2 text-sm text-gray-500 break-all">{blob.url}</p>
                                    </DialogDescription>
                                  </DialogHeader>
                                </DialogContent>
                              </Dialog>
                              <Button variant="destructive" size="sm" onClick={() => handleDelete(blob.pathname)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verify">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" /> Verify Card Images
              </CardTitle>
              <CardDescription>
                Verify if specific card images exist and conform to naming conventions in your blob storage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cardId">Card ID (e.g., 0-Cauldron)</Label>
                  <Input
                    id="cardId"
                    value={selectedCardId}
                    onChange={(e) => setSelectedCardId(e.target.value)}
                    placeholder="e.g., 0-Cauldron"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="element">Element (e.g., Spirit)</Label>
                  <Input
                    id="element"
                    value={selectedElement}
                    onChange={(e) => setSelectedElement(e.target.value)}
                    placeholder="e.g., Spirit, Fire"
                  />
                </div>
              </div>
              <Button onClick={handleVerifySingle} disabled={isVerifying || !selectedCardId}>
                {isVerifying ? <Loader2 className="animate-spin mr-2" /> : <CheckCircle className="mr-2" />}
                {isVerifying ? "Verifying..." : "Verify Single Image"}
              </Button>

              {verificationResult && (
                <div className="p-4 rounded-md border flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{verificationResult.filename}</p>
                    <p className="text-sm text-gray-500">
                      Status:{" "}
                      {verificationResult.exists ? (
                        <span className="text-green-500">Found</span>
                      ) : (
                        <span className="text-red-500">Missing</span>
                      )}
                    </p>
                    {verificationResult.error && (
                      <p className="text-sm text-red-500">Error: {verificationResult.error}</p>
                    )}
                    {verificationResult.url && (
                      <p className="text-sm text-gray-500 break-all">URL: {verificationResult.url}</p>
                    )}
                    {verificationResult.expectedPath && (
                      <p className="text-sm text-gray-500 break-all">Expected: {verificationResult.expectedPath}</p>
                    )}
                  </div>
                  {verificationResult.exists && verificationResult.url && (
                    <Image
                      src={verificationResult.url || "/placeholder.svg"}
                      alt={verificationResult.filename}
                      width={60}
                      height={90}
                      className="object-cover rounded"
                    />
                  )}
                </div>
              )}

              <div className="border-t pt-6 mt-6 space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">Bulk Verification</h3>
                <Button onClick={handleBulkVerify} disabled={isBulkVerifying}>
                  {isBulkVerifying ? <Loader2 className="animate-spin mr-2" /> : <RefreshCw className="mr-2" />}
                  {isBulkVerifying ? `Verifying All Cards ${bulkVerificationProgress}%` : "Run Bulk Verification"}
                </Button>
                {isBulkVerifying && <Progress value={bulkVerificationProgress} className="w-full" />}

                {bulkVerificationResults.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="show-missing"
                        checked={showOnlyMissing}
                        onCheckedChange={setShowOnlyMissing}
                        disabled={showOnlyVerified}
                      />
                      <Label htmlFor="show-missing">Show only missing</Label>
                      <Switch
                        id="show-verified"
                        checked={showOnlyVerified}
                        onCheckedChange={setShowOnlyVerified}
                        disabled={showOnlyMissing}
                      />
                      <Label htmlFor="show-verified">Show only verified</Label>
                    </div>

                    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                      {filteredBulkResults.map((result, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2 p-2 border rounded-md">
                          {result.exists ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="font-medium text-sm">
                            {result.filename}
                            {result.exists && result.url && (
                              <a
                                href={result.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-blue-500 hover:underline"
                              >
                                <Eye className="inline-block h-4 w-4" /> View
                              </a>
                            )}
                          </span>
                          {result.error && (
                            <span className="text-red-500 text-xs flex items-center ml-auto">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              {result.error}
                            </span>
                          )}
                        </div>
                      ))}
                      {filteredBulkResults.length === 0 && (
                        <p className="text-center text-gray-500">No results to display based on filters.</p>
                      )}
                    </ScrollArea>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
