"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, CheckCircle, XCircle, Cloud, Loader2, AlertTriangle, Info } from "lucide-react"
import {
  testBlobStorageConnection,
  getVerifiedImageMetrics,
  clearVerifiedImageCache,
  preloadVerifiedCardImages,
} from "@/lib/verified-blob-handler" // Assuming these are external now
import type { OracleCard } from "@/types/cards"
import { getAllCardData } from "@/lib/card-data-access"

interface BlobStatus {
  urlAccessible: boolean
  imagesFound: number
  sampleImageAccessible: boolean
  averageResponseTime: number
  error?: string
}

interface ImageMetrics {
  cache: {
    totalImages: number
    verifiedImages: number
    cacheAge: number
    totalSize: number
  }
  performance: {
    totalRequests: number
    successfulLoads: number
    failedLoads: number
    averageLoadTime: number
    cacheHits: number
    networkRequests: number
  }
  errors: Array<{ key: string; error: string; attempts: number }>
}

export default function BlobDiagnosticsPage() {
  const [blobStatus, setBlobStatus] = useState<BlobStatus | null>(null)
  const [metrics, setMetrics] = useState<ImageMetrics | null>(null)
  const [loadingTest, setLoadingTest] = useState(false)
  const [loadingPreload, setLoadingPreload] = useState(false)
  const [preloadProgress, setPreloadProgress] = useState(0)
  const [preloadMessage, setPreloadMessage] = useState("")
  const [preloadDetails, setPreloadDetails] = useState({ loaded: 0, failed: 0, total: 0, time: 0 })
  const [allCards, setAllCards] = useState<OracleCard[]>([])

  useEffect(() => {
    setAllCards(getAllCardData() as OracleCard[])
    runTests()
    fetchMetrics()
  }, [])

  const runTests = async () => {
    setLoadingTest(true)
    setBlobStatus(null)
    try {
      const result = await testBlobStorageConnection()
      setBlobStatus(result.details)
      if (!result.success) {
        console.error("Blob test failed:", result.error)
      }
    } catch (error: any) {
      console.error("Error running blob test:", error)
      setBlobStatus({
        urlAccessible: false,
        imagesFound: 0,
        sampleImageAccessible: false,
        averageResponseTime: 0,
        error: error.message || "Unknown error",
      })
    } finally {
      setLoadingTest(false)
    }
  }

  const fetchMetrics = () => {
    try {
      const currentMetrics = getVerifiedImageMetrics()
      setMetrics(currentMetrics)
    } catch (error) {
      console.error("Error fetching metrics:", error)
    }
  }

  const handleClearCache = () => {
    clearVerifiedImageCache()
    fetchMetrics()
  }

  const handlePreloadAllImages = async () => {
    setLoadingPreload(true)
    setPreloadProgress(0)
    setPreloadMessage("Starting preload...")
    setPreloadDetails({ loaded: 0, failed: 0, total: 0, time: 0 })

    try {
      const cardIds = allCards.map((card) => card.id)
      const elements = [...new Set(allCards.flatMap((card) => [card.baseElement, card.synergisticElement]))]

      const result = await preloadVerifiedCardImages(cardIds, elements, (loaded, total, failed) => {
        setPreloadProgress(Math.round((loaded / total) * 100))
        setPreloadMessage(`Preloading ${loaded}/${total} images...`)
        setPreloadDetails((prev) => ({ ...prev, loaded, total, failed }))
      })

      setPreloadMessage(`Preload complete: ${result.loaded} loaded, ${result.failed} failed.`)
      setPreloadDetails({
        loaded: result.loaded,
        failed: result.failed,
        total: result.loaded + result.failed,
        time: result.totalTime,
      })
      fetchMetrics() // Refresh metrics after preload
    } catch (error: any) {
      console.error("Error during preload:", error)
      setPreloadMessage(`Preload failed: ${error.message}`)
    } finally {
      setLoadingPreload(false)
    }
  }

  const renderStatusBadge = (condition: boolean) =>
    condition ? (
      <Badge className="bg-green-500 hover:bg-green-600">
        <CheckCircle className="h-3 w-3 mr-1" /> OK
      </Badge>
    ) : (
      <Badge variant="destructive">
        <XCircle className="h-3 w-3 mr-1" /> Fail
      </Badge>
    )

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Vercel Blob Storage Diagnostics</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" /> Blob Connection Test
          </CardTitle>
          <CardDescription>Verify direct connection and access to Vercel Blob storage.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={runTests} disabled={loadingTest}>
            {loadingTest ? <Loader2 className="animate-spin mr-2" /> : <RefreshCw className="mr-2" />}
            {loadingTest ? "Running Test..." : "Run Connection Test"}
          </Button>
          {blobStatus && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                URL Accessible: {renderStatusBadge(blobStatus.urlAccessible)}
              </div>
              <div className="flex items-center gap-2">
                Images Found:{" "}
                {blobStatus.imagesFound > 0 ? (
                  <Badge className="bg-green-500 hover:bg-green-600">{blobStatus.imagesFound} Found</Badge>
                ) : (
                  <Badge variant="destructive">0 Found</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                Sample Image Accessible: {renderStatusBadge(blobStatus.sampleImageAccessible)}
              </div>
              <div className="flex items-center gap-2">
                Average Response Time: <Badge variant="secondary">{blobStatus.averageResponseTime} ms</Badge>
              </div>
              {blobStatus.error && (
                <div className="flex items-center gap-2 text-red-500">
                  <AlertTriangle className="h-4 w-4" /> Error: {blobStatus.error}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" /> Image Cache Metrics
          </CardTitle>
          <CardDescription>Monitor the performance and state of the in-memory image cache.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={fetchMetrics}>
            <RefreshCw className="mr-2" /> Refresh Metrics
          </Button>
          <Button onClick={handleClearCache} variant="outline" className="ml-2 bg-transparent">
            Clear Cache
          </Button>
          {metrics && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Cache State</h3>
                <p>
                  Total Images in Cache: <Badge>{metrics.cache.totalImages}</Badge>
                </p>
                <p>
                  Verified Images: <Badge>{metrics.cache.verifiedImages}</Badge>
                </p>
                <p>
                  Cache Age: <Badge>{(metrics.cache.cacheAge / 1000 / 60).toFixed(1)} minutes</Badge>
                </p>
                <p>
                  Total Cache Size: <Badge>{(metrics.cache.totalSize / 1024 / 1024).toFixed(2)} MB</Badge>
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Performance</h3>
                <p>
                  Total Requests: <Badge>{metrics.performance.totalRequests}</Badge>
                </p>
                <p>
                  Successful Loads: <Badge>{metrics.performance.successfulLoads}</Badge>
                </p>
                <p>
                  Failed Loads: <Badge>{metrics.performance.failedLoads}</Badge>
                </p>
                <p>
                  Average Load Time: <Badge>{metrics.performance.averageLoadTime.toFixed(2)} ms</Badge>
                </p>
                <p>
                  Cache Hits: <Badge>{metrics.performance.cacheHits}</Badge>
                </p>
                <p>
                  Network Requests: <Badge>{metrics.performance.networkRequests}</Badge>
                </p>
              </div>
              {metrics.errors.length > 0 && (
                <div className="md:col-span-2">
                  <h3 className="font-semibold mb-2 text-red-500">Errors in Cache ({metrics.errors.length})</h3>
                  <ScrollArea className="h-40 w-full rounded-md border p-4">
                    {metrics.errors.map((err, index) => (
                      <p key={index} className="text-sm text-red-400">
                        <strong>{err.key}:</strong> {err.error} (Attempts: {err.attempts})
                      </p>
                    ))}
                  </ScrollArea>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" /> Preload All Card Images
          </CardTitle>
          <CardDescription>
            Attempt to preload all card images from blob storage to warm the cache. There are {allCards.length * 2}{" "}
            theoretical image paths.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handlePreloadAllImages} disabled={loadingPreload}>
            {loadingPreload ? <Loader2 className="animate-spin mr-2" /> : <RefreshCw className="mr-2" />}
            {loadingPreload ? `Preloading ${preloadProgress}%...` : "Preload All Images"}
          </Button>
          {loadingPreload && <Progress value={preloadProgress} className="w-full mt-2" />}
          {preloadMessage && <p className="text-sm text-gray-400">{preloadMessage}</p>}
          {preloadDetails.total > 0 && (
            <p className="text-sm text-gray-400">
              Loaded: {preloadDetails.loaded}, Failed: {preloadDetails.failed}, Total: {preloadDetails.total} (Time:{" "}
              {preloadDetails.time}ms)
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
