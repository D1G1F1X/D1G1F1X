"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { normalizeImagePath } from "@/lib/image-utils"
import { AlertTriangle } from "lucide-react"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fallbackSrc?: string
  unoptimized?: boolean
  onError?: () => void
}

export default function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = "",
  priority = false,
  fallbackSrc = "/placeholder.svg",
  unoptimized = false,
  onError,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Only run in browser
    if (typeof window !== "undefined") {
      const normalizedSrc = normalizeImagePath(src)
      setImgSrc(normalizedSrc)
      setIsLoading(true)
      setHasError(false)

      // For card images, verify they exist first
      if (normalizedSrc.includes("/cards/") && !normalizedSrc.startsWith("http")) {
        fetch(`/api/verify-image?path=${encodeURIComponent(normalizedSrc)}`)
          .then((res) => res.json())
          .then((data) => {
            if (!data.exists) {
              console.warn(`Image does not exist: ${normalizedSrc}`)
              handleError()
            }
          })
          .catch((err) => {
            console.error("Error verifying image:", err)
          })
      }
    }
  }, [src])

  const handleError = () => {
    console.warn(`Image failed to load: ${src}`)
    setHasError(true)

    // Create a more descriptive fallback
    const descriptiveFallback = fallbackSrc.includes("placeholder.svg")
      ? `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(alt)}`
      : fallbackSrc

    setImgSrc(descriptiveFallback)

    if (onError) {
      onError()
    }
  }

  // For blob URLs and external URLs, use regular img tag
  if (imgSrc && (imgSrc.startsWith("http") || imgSrc.includes("blob.vercel") || imgSrc.includes("vercel-storage"))) {
    return (
      <img
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? "animate-pulse bg-gray-800" : ""}`}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
      />
    )
  }

  return (
    <>
      {imgSrc && (
        <Image
          src={imgSrc || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={`${className} ${isLoading ? "animate-pulse bg-gray-800" : ""}`}
          priority={priority}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
          unoptimized={unoptimized}
        />
      )}
      {hasError && (
        <div
          className="flex flex-col items-center justify-center bg-gray-900 rounded-md text-center p-2"
          style={{ width, height }}
        >
          <AlertTriangle className="h-6 w-6 text-yellow-500 mb-2" />
          <span className="text-xs text-gray-400">{alt}</span>
        </div>
      )}
    </>
  )
}
