"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, Upload, Trash2, Loader2, Cloud } from "lucide-react"
import { listCardImages, uploadCardImage, deleteCardBlob } from "@/lib/card-image-blob-handler"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface BlobInfo {
  url: string
  pathname: string
  size: number
  uploadedAt: string
  filename: string
}

export function BlobManagerPageClient() {
  const [blobList, setBlobList] = useState<BlobInfo[]>([])
  const [loadingBlobs, setLoadingBlobs] = useState(false)
  const [fileToUpload, setFileToUpload] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [totalBlobSize, setTotalBlobSize] = useState(0)
  const { toast } = useToast()

  const fetchBlobList = useCallback(async () => {
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
  }, [toast])

  useEffect(() => {
    fetchBlobList()
  }, [fetchBlobList])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileToUpload(event.target.files[0])
    } else {
      setFileToUpload(null)
    }
  }

  const handleUpload = async () => {
    if (!fileToUpload) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      const result = await uploadCardImage(fileToUpload, (progressEvent) => {
        if (progressEvent.total) {
          setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total))
        }
      })
      toast({
        title: "Upload Successful",
        description: `File ${result.pathname} uploaded successfully!`,
      })
      setFileToUpload(null)
      fetchBlobList() // Refresh the list
    } catch (error) {
      console.error("Failed to upload file:", error)
      toast({
        title: "Error",
        description: `Failed to upload file: ${error instanceof Error ? error.message : String(error)}.`,
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDeleteBlob = async (pathname: string) => {
    if (!confirm(`Are you sure you want to delete ${pathname}? This action is irreversible.`)) {
      return
    }
    setLoadingBlobs(true) // Use general loading for list refresh after delete
    try {
      await deleteCardBlob(pathname)
      toast({
        title: "Blob Deleted",
        description: `Successfully deleted ${pathname}.`,
      })
      fetchBlobList() // Refresh the list
    } catch (error) {
      console.error("Failed to delete blob:", error)
      toast({
        title: "Error",
        description: `Failed to delete blob: ${error instanceof Error ? error.message : String(error)}.`,
        variant: "destructive",
      })
    } finally {
      setLoadingBlobs(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Vercel Blob Storage Manager</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upload Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" /> Upload New Card Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Naming Convention</AlertTitle>
              <AlertDescription>
                Please name files as `[number]-[suit]-[baseElement].jpg` (e.g., `01-cauldron-fire.jpg`).
              </AlertDescription>
            </Alert>
            <div className="grid gap-4">
              <Label htmlFor="file-upload">Select Image File</Label>
              <Input id="file-upload" type="file" accept="image/jpeg, image/png" onChange={handleFileChange} />
              {fileToUpload && <p className="text-sm text-muted-foreground">Selected: {fileToUpload.name}</p>}
              <Button onClick={handleUpload} disabled={uploading || !fileToUpload}>
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading ({uploadProgress}%)
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" /> Upload Image
                  </>
                )}
              </Button>
              {uploading && <Progress value={uploadProgress} className="w-full mt-2" />}
            </div>
          </CardContent>
        </Card>

        {/* Blob List Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" /> Existing Card Images
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
            <ScrollArea className="h-[400px] w-full rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Preview</TableHead>
                    <TableHead>Filename</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blobList.map((blob) => (
                    <TableRow key={blob.pathname}>
                      <TableCell>
                        <Image
                          src={blob.url || "/placeholder.svg"}
                          alt={blob.filename}
                          width={50}
                          height={50}
                          className="object-cover rounded-sm"
                        />
                      </TableCell>
                      <TableCell className="text-xs">{blob.filename}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteBlob(blob.pathname)}
                          disabled={loadingBlobs}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {blobList.length === 0 && !loadingBlobs && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No images found in blob storage.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
