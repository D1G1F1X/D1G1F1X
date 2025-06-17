"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw, ImageIcon, AlertTriangle, CheckCircle, Upload } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

interface BlobImage {
  pathname: string
  url: string
  size: number
  uploadedAt: string
}

interface ValidationResult {
  cardId: string
  elements: string[]
  foundImages: string[]
  missingImages: string[]
}

interface ValidationSummary {
  totalRequired: number
  totalFound: number
  totalMissing: number
  completionPercentage: number
}

export default function BlobManagerPage() {
  const [images, setImages] = useState<BlobImage[]>([])
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([])
  const [validationSummary, setValidationSummary] = useState<ValidationSummary | null>(null)
  const [missingImages, setMissingImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const loadBlobImages = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/blob/card-images")
      const data = await response.json()

      if (data.success) {
        setImages(data.blobs)
      } else {
        console.error("Failed to load blob images:", data.error)
      }
    } catch (error) {
      console.error("Error loading blob images:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const validateCardImages = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/blob/validate-cards")
      const data = await response.json()

      if (data.success) {
        setValidationResults(data.validationResults)
        setValidationSummary(data.summary)
        setMissingImages(data.missingImages)
      } else {
        console.error("Failed to validate card images:", data.error)
      }
    } catch (error) {
      console.error("Error validating card images:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadBlobImages()
    validateCardImages()
  }, [])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blob Storage Manager</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage NUMO Oracle card images in blob storage</p>
        </div>
        <Button onClick={() => window.location.reload()} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
          <TabsTrigger value="images">All Images</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Images</CardTitle>
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{images.length}</div>
                <p className="text-xs text-muted-foreground">Images in blob storage</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {validationSummary ? `${validationSummary.completionPercentage}%` : "Loading..."}
                </div>
                <p className="text-xs text-muted-foreground">Required cards with images</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Missing Images</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{missingImages.length}</div>
                <p className="text-xs text-muted-foreground">Cards without images</p>
              </CardContent>
            </Card>
          </div>

          {validationSummary && validationSummary.completionPercentage < 100 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {missingImages.length} card images are missing. Check the Validation tab for details.
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Recent Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {images.slice(0, 12).map((image, index) => (
                  <div key={index} className="space-y-2">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden border">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.pathname}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=200&width=150"
                        }}
                      />
                    </div>
                    <div className="text-xs">
                      <p className="font-medium truncate">{image.pathname.split("/").pop()}</p>
                      <p className="text-gray-500">{formatFileSize(image.size)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Image Validation</CardTitle>
              <div className="flex gap-2">
                <Button onClick={validateCardImages} disabled={isLoading} size="sm">
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                  Revalidate
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {validationSummary && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="font-semibold mb-2">Validation Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Required:</span>
                      <span className="ml-2 font-medium">{validationSummary.totalRequired}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Found:</span>
                      <span className="ml-2 font-medium text-green-600">{validationSummary.totalFound}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Missing:</span>
                      <span className="ml-2 font-medium text-red-600">{validationSummary.totalMissing}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Complete:</span>
                      <span className="ml-2 font-medium">{validationSummary.completionPercentage}%</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {validationResults.map((result, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{result.cardId}</h4>
                      <div className="flex gap-2">
                        {result.foundImages.length > 0 && (
                          <Badge variant="outline" className="text-green-600">
                            {result.foundImages.length} found
                          </Badge>
                        )}
                        {result.missingImages.length > 0 && (
                          <Badge variant="outline" className="text-red-600">
                            {result.missingImages.length} missing
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="text-sm space-y-1">
                      <p>
                        <span className="text-gray-600 dark:text-gray-400">Elements:</span> {result.elements.join(", ")}
                      </p>

                      {result.foundImages.length > 0 && (
                        <p>
                          <span className="text-green-600">Found:</span> {result.foundImages.join(", ")}
                        </p>
                      )}

                      {result.missingImages.length > 0 && (
                        <p>
                          <span className="text-red-600">Missing:</span> {result.missingImages.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Images ({images.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.pathname}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=200&width=150"
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-sm truncate">{image.pathname.split("/").pop()}</p>
                      <p className="text-xs text-gray-500">Size: {formatFileSize(image.size)}</p>
                      <p className="text-xs text-gray-500">Uploaded: {formatDate(image.uploadedAt)}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => window.open(image.url, "_blank")}
                      >
                        View Full Size
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Image Upload</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Upload functionality would be implemented here using Vercel Blob upload API
                </p>
                <Button disabled>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Images (Coming Soon)
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
