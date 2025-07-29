"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, AlertCircle, CheckCircle } from "lucide-react"

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

  const generateLocalImagePaths = (id: string, element: string): string[] => {
    const [numberStr, suitStr] = id.split("-")
    const paddedNumber = numberStr.padStart(2, "0")
    const lowerSuit = suitStr?.toLowerCase() || ""
    const lowerElement = element.toLowerCase()

    return [
      // PRIORITY 1: Non-hyphenated number-suit format (e.g., /cards/01cauldron-air.jpg)
      `/cards/${paddedNumber}${lowerSuit}-${lowerElement}.jpg`,
      `/cards/${paddedNumber}${lowerSuit}-${lowerElement}.jpeg`,

      // PRIORITY 2: Standard hyphenated format (e.g., /cards/01-cauldron-air.jpg)
      `/cards/${paddedNumber}-${lowerSuit}-${lowerElement}.jpg`,
      `/cards/${paddedNumber}-${lowerSuit}-${lowerElement}.jpeg`,

      // Fallback: Non-padded, non-hyphenated number-suit format (e.g., /cards/1cauldron-air.jpg)
      `/cards/${numberStr}${lowerSuit}-${lowerElement}.jpg`,
      `/cards/${numberStr}${lowerSuit}-${lowerElement}.jpeg`,

      // Fallback: Non-padded hyphenated format (e.g., /cards/1-cauldron-air.jpg)
      `/cards/${numberStr}-${lowerSuit}-${lowerElement}.jpg`,
      `/cards/${numberStr}-${lowerSuit}-${lowerElement}.jpeg`,

      // General card ID format (e.g., /cards/1-cauldron.jpg)
      `/cards/${id.toLowerCase()}.jpg`,
      `/cards/${id.toLowerCase()}.jpeg`,
    ]
  }

  const loadCardImage = async () => {
    try {
      setIsRetrying(true)
      setImageStatus({ loaded: false, error: false, url: null })

      let successfulPath: string | null = null
      let apiProvidedUrl: string | null = null

      // PRIORITY 1: Try fetching from the API (blob URLs)
      try {
        const response = await fetch(`/api/blob/card-images?cardId=${cardId}&element=${baseElement}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })

        if (response.ok) {
          const contentType = response.headers.get("content-type")
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json()
            if (data.success && data.imageUrl) {
              apiProvidedUrl = data.imageUrl
            }
          } else {
            // If not JSON, read as text to log for debugging
            const errorText = await response.text()
            console.warn(
              `API response for ${cardId}-${baseElement} was not JSON. Status: ${response.status}, Body: ${errorText.substring(0, 200)}...`,
            )
          }
        } else {
          const errorText = await response.text()
          console.warn(
            `API request failed for ${cardId}-${baseElement}. Status: ${response.status}, Body: ${errorText.substring(0, 200)}...`,
          )
        }
      } catch (apiError) {
        console.warn(`API request failed for ${cardId}-${baseElement}:`, apiError)
      }

      // If API provided a URL, attempt to load it to verify accessibility
      if (apiProvidedUrl) {
        try {
          const testImage = new Image()
          testImage.crossOrigin = "anonymous"
          const imageLoadPromise = new Promise<string>((resolve, reject) => {
            testImage.onload = () => resolve(apiProvidedUrl!)
            testImage.onerror = () => reject(new Error(`API provided image not accessible at ${apiProvidedUrl}`))
            testImage.src = apiProvidedUrl
          })
          successfulPath = await imageLoadPromise // If this succeeds, use it
          if (successfulPath) {
            setImageStatus({
              loaded: true,
              error: false,
              url: successfulPath,
            })
            onImageLoad?.(true)
            return // SUCCESS, return here
          }
        } catch (validationError) {
          console.warn(`API provided URL failed validation for ${cardId}-${baseElement}:`, validationError)
          // Fall through to local paths if API URL is not directly loadable
        }
      }

      // PRIORITY 2: Try local image paths (both new and legacy formats)
      const localImagePaths = generateLocalImagePaths(cardId, baseElement)
      for (const path of localImagePaths) {
        try {
          const testImage = new Image()
          testImage.crossOrigin = "anonymous"
          const imageLoadPromise = new Promise<string>((resolve, reject) => {
            testImage.onload = () => resolve(path)
            testImage.onerror = () => reject(new Error(`Local image not found at ${path}`))
            testImage.src = path
          })
          successfulPath = await imageLoadPromise
          if (successfulPath) {
            console.log(`✅ Found image at: ${successfulPath}`)
            break
          }
        } catch (localError) {
          // Continue to next path
        }
      }

      // If a path was found from local attempts, use it
      if (successfulPath) {
        setImageStatus({
          loaded: true,
          error: false,
          url: successfulPath,
        })
        onImageLoad?.(true)
        return
      }

      // Final fallback if all methods fail
      throw new Error("All image loading methods failed")
    } catch (error) {
      console.warn(`Failed to load image for ${cardId}:`, error)
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
  }, [cardId, baseElement, synergisticElement])

  const handleImageError = () => {
    setImageStatus((prev) => ({
      ...prev,
      error: true,
      url: `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardTitle)}`,
    }))
    onImageLoad?.(false)
  }

  const handleImageLoad = () => {
    if (!imageStatus.error) {
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
            priority={false}
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
