"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, AlertCircle, CheckCircle } from "lucide-react"
import { getCardImageUrl } from "@/lib/card-image-blob-handler" // Import the centralized function

interface CardImageProps {
  cardId: string
  cardTitle: string
  baseElement: string
  synergisticElement: string
  className?: string
  showStatus?: boolean
  onImageLoad?: (success: boolean) => void
}

interface ImageStatus {
  loaded: boolean
  error: boolean
  url: string | null
}

export function EnhancedCardImage({
  cardId,
  cardTitle,
  baseElement,
  synergisticElement,
  className = "",
  showStatus = false,
  onImageLoad,
}: CardImageProps) {
  const [imageStatus, setImageStatus] = useState<ImageStatus>({
    loaded: false,
    error: false,
    url: null,
  })
  const [isRetrying, setIsRetrying] = useState(false)

  const loadCardImage = async () => {
    setIsRetrying(true)
    setImageStatus({ loaded: false, error: false, url: null }) // Reset status

    try {
      const resolvedUrl = await getCardImageUrl(cardId, baseElement)

      // Verify the resolved URL can actually be loaded by the browser
      const testImage = new Image()
      if (resolvedUrl.startsWith("http")) {
        testImage.crossOrigin = "anonymous"
      }

      await new Promise<void>((resolve, reject) => {
        testImage.onload = () => resolve()
        testImage.onerror = () => reject(new Error(`Failed to load image from resolved URL: ${resolvedUrl}`))
        testImage.src = resolvedUrl
      })

      setImageStatus({
        loaded: true,
        error: false,
        url: resolvedUrl,
      })
      onImageLoad?.(true)
    } catch (error) {
      console.warn(`Failed to load image for ${cardId} after all attempts:`, error)
      setImageStatus({
        loaded: false,
        error: true,
        url: `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardTitle)}`,
      })
      onImageLoad?.(false)
    } finally {
      setIsRetrying(false)
    }
  }

  useEffect(() => {
    loadCardImage()
  }, [cardId, baseElement, synergisticElement]) // Re-run when card data changes

  const handleImageError = () => {
    // This is a fallback for the Image component itself, if the src set fails for some reason
    setImageStatus((prev) => ({
      ...prev,
      error: true,
      url: `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardTitle)}`,
    }))
    onImageLoad?.(false)
  }

  const handleImageLoad = () => {
    // This is for the Image component's onload event, confirming it rendered
    if (!imageStatus.error) {
      // Only set loaded if no prior error was detected
      setImageStatus((prev) => ({ ...prev, loaded: true }))
      onImageLoad?.(true)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden border border-gray-700">
        {imageStatus.url ? (
          <Image
            src={imageStatus.url || "/placeholder.svg"}
            alt={cardTitle}
            fill
            className="object-cover transition-opacity duration-300"
            onError={handleImageError}
            onLoad={handleImageLoad}
            priority={false} // Can be set to true for critical images
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        )}

        {/* Loading overlay */}
        {!imageStatus.loaded && !imageStatus.error && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin text-white" />
          </div>
        )}

        {/* Status indicators */}
        {showStatus && (
          <div className="absolute top-2 right-2">
            {imageStatus.error ? (
              <Badge variant="destructive" className="text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                Missing
              </Badge>
            ) : imageStatus.loaded ? (
              <Badge variant="default" className="text-xs bg-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Loaded
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-xs">
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                Loading
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Retry button for failed images */}
      {imageStatus.error && (
        <div className="mt-2 text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={loadCardImage}
            disabled={isRetrying}
            className="text-xs bg-transparent"
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${isRetrying ? "animate-spin" : ""}`} />
            Retry
          </Button>
        </div>
      )}
    </div>
  )
}

// Hook for batch image loading
export function useCardImageBatch(cards: Array<{ id: string; baseElement: string; synergisticElement: string }>) {
  const [loadingStatus, setLoadingStatus] = useState<Record<string, boolean>>({})
  const [loadedCount, setLoadedCount] = useState(0)
  const [totalCount] = useState(cards.length)

  const handleImageLoad = (cardId: string, success: boolean) => {
    setLoadingStatus((prev) => {
      const newStatus = { ...prev, [cardId]: success }
      const newLoadedCount = Object.values(newStatus).filter(Boolean).length
      setLoadedCount(newLoadedCount)
      return newStatus
    })
  }

  const isAllLoaded = loadedCount === totalCount
  const loadingPercentage = totalCount > 0 ? Math.round((loadedCount / totalCount) * 100) : 0

  return {
    loadingStatus,
    loadedCount,
    totalCount,
    isAllLoaded,
    loadingPercentage,
    handleImageLoad,
  }
}
