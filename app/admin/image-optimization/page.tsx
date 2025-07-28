"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  XCircle,
  Loader2,
  MaximizeIcon as Optimize,
  ImageIcon,
  Download,
  RefreshCw,
  AlertTriangle,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  testImageOptimizationService,
  optimizeImage,
  type ImageOptimizationResult,
  type ImageOptimizationStatus,
} from "@/lib/image-optimization" // Assuming these are external now
import { getAllCardData, getCardImagePath } from "@/lib/card-data-access"
import type { OracleCard } from "@/types/cards"

export default function ImageOptimizationPage() {
  const [serviceStatus, setServiceStatus] = useState<ImageOptimizationStatus | null>(null)
  const [isTestingService, setIsTestingService] = useState(false)
  const [optimizationQueue, setOptimizationQueue] = useState<OracleCard[]>([])
  const [optimizationResults, setOptimizationResults] = useState<ImageOptimizationResult[]>([])
  const [optimizationProgress, setOptimizationProgress] = useState(0)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    runServiceTest()
  }, [])

  const runServiceTest = async () => {
    setIsTestingService(true)
    setServiceStatus(null)
    try {
      const status = await testImageOptimizationService()
      setServiceStatus(status)
      if (!status.isAvailable) {
        toast({
          title: "Service Unavailable",
          description: status.error || "Image optimization service is not responding.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Service Test Failed",
        description: error.message,
        variant: "destructive",
      })
      console.error("Image optimization service test failed:", error)
    } finally {
      setIsTestingService(false)
    }
  }

  const prepareOptimizationQueue = () => {
    const allCards = getAllCardData() as OracleCard[]
    const cardsToOptimize: OracleCard[] = []

    // For simplicity, add each card's base and synergistic element image to the queue
    allCards.forEach((card) => {
      cardsToOptimize.push({ ...card, imagePath: getCardImagePath(card, "first") })
      if (card.baseElement !== card.synergisticElement) {
        cardsToOptimize.push({ ...card, imagePath: getCardImagePath(card, "second") })
      }
    })

    setOptimizationQueue(cardsToOptimize)
    setOptimizationResults([])
    setOptimizationProgress(0)
    toast({
      title: "Queue Prepared",
      description: `${cardsToOptimize.length} images added to optimization queue.`,
    })
  }

  const startOptimization = async () => {
    if (optimizationQueue.length === 0) {
      toast({
        title: "Queue Empty",
        description: "Please prepare the optimization queue first.",
        variant: "destructive",
      })
      return
    }
    if (!serviceStatus?.isAvailable) {
      toast({
        title: "Service Unavailable",
        description: "Image optimization service is not available. Please check diagnostics.",
        variant: "destructive",
      })
      return
    }

    setIsOptimizing(true)
    setOptimizationResults([])
    setOptimizationProgress(0)

    const results: ImageOptimizationResult[] = []
    let processedCount = 0

    for (const card of optimizationQueue) {
      try {
        if (!card.imagePath) {
          results.push({
            originalUrl: "N/A",
            optimizedUrl: "",
            status: "failed",
            message: "No image path found for card",
            originalSize: 0,
            optimizedSize: 0,
            compressionRatio: 0,
          })
          continue
        }

        // For optimization, we need the *actual* source URL, not just the local path.
        // This is a simplification, in a real app you'd fetch the blob URL directly here.
        // For now, let's assume getCardImagePath gives us something fetchable.
        const sourceUrl = card.imagePath

        const result = await optimizeImage(sourceUrl)
        results.push(result)
        if (result.status === "success") {
          toast({
            title: "Optimization Success",
            description: `Optimized ${card.fullTitle} (${result.compressionRatio.toFixed(1)}% reduction)`,
            variant: "success",
            duration: 1500,
          })
        } else {
          toast({
            title: "Optimization Failed",
            description: `Failed to optimize ${card.fullTitle}: ${result.message}`,
            variant: "destructive",
            duration: 2000,
          })
        }
      } catch (error: any) {
        console.error(`Error optimizing image for ${card.fullTitle}:`, error)
        results.push({
          originalUrl: card.imagePath || "unknown",
          optimizedUrl: "",
          status: "failed",
          message: error.message || "Unknown optimization error",
          originalSize: 0,
          optimizedSize: 0,
          compressionRatio: 0,
        })
        toast({
          title: "Optimization Error",
          description: `An unexpected error occurred during optimization for ${card.fullTitle}.`,
          variant: "destructive",
          duration: 2000,
        })
      } finally {
        processedCount++
        setOptimizationProgress(Math.round((processedCount / optimizationQueue.length) * 100))
        setOptimizationResults([...results]) // Update results dynamically
      }
    }

    setIsOptimizing(false)
    toast({
      title: "Optimization Complete",
      description: `Finished optimizing ${results.length} images.`,
    })
  }

  const totalOptimized = optimizationResults.filter((r) => r.status === "success").length
  const totalFailed = optimizationResults.filter((r) => r.status === "failed").length

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Image Optimization</h1>
          <p className="text-muted-foreground">Tools for optimizing card image assets for better performance.</p>
        </div>
        <Button onClick={runServiceTest} disabled={isTestingService}>
          {isTestingService ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          {isTestingService ? "Testing Service..." : "Test Service Connection"}
        </Button>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" /> Optimization Service Status
          </CardTitle>
          <CardDescription>Current status of the image optimization microservice.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {serviceStatus ? (
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                Service Available:{" "}
                {serviceStatus.isAvailable ? (
                  <span className="text-green-500 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" /> Yes
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center">
                    <XCircle className="h-4 w-4 mr-1" /> No
                  </span>
                )}
              </p>
              {serviceStatus.message && <p className="text-sm text-muted-foreground">{serviceStatus.message}</p>}
              {serviceStatus.error && (
                <p className="text-sm text-red-400 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" /> Error: {serviceStatus.error}
                </p>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">Run test to check service status.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Optimize className="h-5 w-5" /> Optimize Card Images
          </CardTitle>
          <CardDescription>Run bulk optimization on your card image assets.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={prepareOptimizationQueue} disabled={isOptimizing}>
              Prepare Optimization Queue ({optimizationQueue.length} images)
            </Button>
            <Button
              onClick={startOptimization}
              disabled={isOptimizing || optimizationQueue.length === 0 || !serviceStatus?.isAvailable}
            >
              {isOptimizing ? <Loader2 className="animate-spin mr-2" /> : <Optimize className="mr-2" />}
              {isOptimizing ? `Optimizing ${optimizationProgress}%` : "Start Optimization"}
            </Button>
          </div>
          {isOptimizing && <Progress value={optimizationProgress} className="w-full mt-2" />}

          {optimizationResults.length > 0 && (
            <div className="space-y-4 mt-4">
              <h3 className="text-lg font-semibold">Optimization Summary</h3>
              <p>Total Processed: {optimizationResults.length}</p>
              <p className="text-green-500">Successful: {totalOptimized}</p>
              <p className="text-red-500">Failed: {totalFailed}</p>
              <ScrollArea className="h-64 w-full rounded-md border p-4">
                {optimizationResults.map((result, index) => (
                  <div key={index} className="flex items-center gap-3 mb-2 p-2 border rounded-md">
                    {result.status === "success" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div className="flex-grow">
                      <p className="font-semibold text-sm">
                        Original: {result.originalUrl.split("/").pop()}
                        {result.originalSize ? ` (${(result.originalSize / 1024).toFixed(2)} KB)` : ""}
                      </p>
                      {result.status === "success" ? (
                        <>
                          <p className="text-xs text-muted-foreground break-all">
                            Optimized: {result.optimizedUrl.split("/").pop()} {(result.optimizedSize / 1024).toFixed(2)}{" "}
                            KB
                          </p>
                          <p className="text-xs text-green-400">Compression: {result.compressionRatio.toFixed(1)}%</p>
                          <a
                            href={result.optimizedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline text-xs flex items-center"
                          >
                            <Download className="h-3 w-3 mr-1" /> Download Optimized
                          </a>
                        </>
                      ) : (
                        <p className="text-xs text-red-400">Error: {result.message}</p>
                      )}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
