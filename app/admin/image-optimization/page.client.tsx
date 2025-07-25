"use client"

import { TableCell } from "@/components/ui/table"

import { TableBody } from "@/components/ui/table"

import { TableHead } from "@/components/ui/table"

import { TableRow } from "@/components/ui/table"

import { TableHeader } from "@/components/ui/table"

import { Table } from "@/components/ui/table"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, ImageIcon, MaximizeIcon as Optimize, Loader2, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { listCardImages } from "@/lib/card-image-blob-handler"

interface BlobInfo {
  url: string
  pathname: string
  size: number
  uploadedAt: string
  filename: string
}

export function ImageOptimizationClientPage() {
  const [blobList, setBlobList] = useState<BlobInfo[]>([])
  const [loadingBlobs, setLoadingBlobs] = useState(false)
  const [optimizationProgress, setOptimizationProgress] = useState(0)
  const [optimizing, setOptimizing] = useState(false)
  const [optimizationResults, setOptimizationResults] = useState<any[]>([])
  const { toast } = useToast()

  const fetchBlobList = useCallback(async () => {
    setLoadingBlobs(true)
    try {
      const blobs = await listCardImages()
      setBlobList(blobs)
      toast({
        title: "Blob List Fetched",
        description: `Found ${blobs.length} blobs.`,
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

  const handleOptimizeAllImages = async () => {
    setOptimizing(true)
    setOptimizationProgress(0)
    setOptimizationResults([])
    const results = []

    try {
      for (let i = 0; i < blobList.length; i++) {
        const blob = blobList[i]
        try {
          // Simulate optimization or call actual optimization API
          // For a real scenario, `optimizeImage` would likely be a server action or API route
          // that fetches the image, processes it, and re-uploads/replaces it.
          // This is a placeholder for client-side simulation.
          await new Promise((resolve) => setTimeout(resolve, 200)) // Simulate network delay
          const optimizedSize = blob.size * 0.8 // Simulate 20% reduction
          results.push({
            filename: blob.filename,
            status: "success",
            originalSize: blob.size,
            optimizedSize: optimizedSize,
            message: `Optimized from ${(blob.size / 1024).toFixed(2)}KB to ${(optimizedSize / 1024).toFixed(2)}KB`,
          })
        } catch (error) {
          console.error(`Failed to optimize ${blob.filename}:`, error)
          results.push({
            filename: blob.filename,
            status: "error",
            originalSize: blob.size,
            optimizedSize: blob.size,
            message: `Optimization failed: ${error instanceof Error ? error.message : String(error)}`,
          })
        }
        setOptimizationProgress(Math.floor(((i + 1) / blobList.length) * 100))
      }
      setOptimizationResults(results)
      toast({
        title: "Optimization Complete",
        description: `Processed ${results.length} images.`,
      })
    } catch (error) {
      console.error("Error during batch optimization:", error)
      toast({
        title: "Error",
        description: "An error occurred during batch optimization.",
        variant: "destructive",
      })
    } finally {
      setOptimizing(false)
      setOptimizationProgress(0)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Image Optimization</h1>
      <p className="text-muted-foreground mb-8">
        Tools for optimizing and managing image assets stored in Vercel Blob.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Optimize className="h-5 w-5" /> Batch Optimize Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Note</AlertTitle>
              <AlertDescription>
                This feature simulates image optimization. In a production environment, this would involve server-side
                processing and re-uploading.
              </AlertDescription>
            </Alert>
            <Button onClick={handleOptimizeAllImages} disabled={optimizing || blobList.length === 0} className="w-full">
              {optimizing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Optimizing ({optimizationProgress}%)
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-4 w-4" /> Optimize All Images ({blobList.length})
                </>
              )}
            </Button>
            {optimizing && <Progress value={optimizationProgress} className="w-full mt-4" />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" /> Optimization Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] overflow-y-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Filename</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {optimizationResults.length > 0 ? (
                    optimizationResults.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-xs">{result.filename}</TableCell>
                        <TableCell>
                          {result.status === "success" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell className="text-xs">{result.message}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        Run optimization to see results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
