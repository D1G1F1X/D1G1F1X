"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, Upload, Trash2, List, RefreshCw, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface BlobFile {
  pathname: string
  url: string
  size: number
  uploadedAt: string
}

export default function BlobManagerPage() {
  const [files, setFiles] = useState<BlobFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const fetchBlobs = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/blob/list-cards")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.success) {
        setFiles(data.files)
      } else {
        setError(data.error || "Failed to fetch blobs.")
      }
    } catch (err: any) {
      setError(err.message || "An unknown error occurred while fetching blobs.")
      console.error("Error fetching blobs:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlobs()
  }, [])

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
        description: "Please choose a file to upload.",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast({
          title: "Upload Successful",
          description: `File ${selectedFile.name} uploaded to ${data.url}`,
          variant: "default",
        })
        setSelectedFile(null)
        fetchBlobs() // Refresh the list
      } else {
        throw new Error(data.error || "Failed to upload file.")
      }
    } catch (err: any) {
      toast({
        title: "Upload Failed",
        description: err.message || "An error occurred during upload.",
        variant: "destructive",
      })
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteAllBlobs = async () => {
    if (!confirm("Are you sure you want to delete ALL card images from blob storage? This action cannot be undone.")) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/admin/delete-card-blobs", {
        method: "POST",
      })
      const data = await response.json()
      if (response.ok && data.success) {
        toast({
          title: "Deletion Successful",
          description: "All card images have been deleted from blob storage.",
          variant: "default",
        })
        fetchBlobs() // Refresh the list
      } else {
        throw new Error(data.error || "Failed to delete blobs.")
      }
    } catch (err: any) {
      toast({
        title: "Deletion Failed",
        description: err.message || "An error occurred during deletion.",
        variant: "destructive",
      })
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Vercel Blob Storage Manager</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Blob</CardTitle>
            <CardDescription>Upload a new file to your Vercel Blob Storage.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Select File</Label>
                <Input id="file-upload" type="file" onChange={handleFileChange} />
              </div>
              <Button onClick={handleUpload} disabled={uploading || !selectedFile}>
                {uploading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" /> Upload
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blob List</CardTitle>
            <CardDescription>Currently stored blobs (card images only).</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : files.length === 0 ? (
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>No Blobs Found</AlertTitle>
                <AlertDescription>There are no card images in your blob storage.</AlertDescription>
              </Alert>
            ) : (
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <ul className="space-y-2">
                  {files.map((file) => (
                    <li key={file.pathname} className="flex items-center justify-between text-sm">
                      <a href={file.url} target="_blank" rel="noopener noreferrer" className="truncate hover:underline">
                        {file.pathname}
                      </a>
                      <span className="text-gray-500">{(file.size / 1024).toFixed(2)} KB</span>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            )}
            <div className="mt-4 flex justify-end">
              <Button onClick={fetchBlobs} variant="outline" size="sm" className="mr-2 bg-transparent">
                <List className="mr-2 h-4 w-4" /> Refresh List
              </Button>
              <Button
                onClick={handleDeleteAllBlobs}
                variant="destructive"
                size="sm"
                disabled={files.length === 0 || loading}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete All Card Blobs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Blob Diagnostics</CardTitle>
          <CardDescription>Quick links to related blob management tools.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Button onClick={() => (window.location.href = "/admin/blob-diagnostics")}>
              <RefreshCw className="mr-2 h-4 w-4" /> Run Diagnostics
            </Button>
            <Button onClick={() => (window.location.href = "/admin/verify-card-images")}>
              <CheckCircle className="mr-2 h-4 w-4" /> Verify Card Images
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
