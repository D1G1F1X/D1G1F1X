"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export interface BlurImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
  quality?: number
  onLoad?: () => void
  onError?: () => void
}

export function BlurImage({
  src,
  alt,
  width,
  height,
  className,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  quality = 75,
  onLoad,
  onError,
  ...props
}: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Generate a tiny placeholder URL
  const placeholderUrl = `${src}?quality=10&width=50`

  // Handle image load event
  const handleLoad = () => {
    setIsLoading(false)
    if (onLoad) onLoad()
  }

  // Handle image error event
  const handleError = () => {
    setIsLoading(false)
    setError(true)
    if (onError) onError()
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <Image
          src={placeholderUrl || "/placeholder.svg"}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          className={cn(
            "transition-opacity duration-300 absolute inset-0 scale-110 blur-lg",
            fill ? "w-full h-full" : "",
          )}
          sizes={sizes}
          quality={10}
          fill={fill}
          priority={true}
        />
      )}
      <Image
        src={error ? "/placeholder.svg" : src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={cn(
          "transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100",
          fill ? "w-full h-full" : "",
        )}
        sizes={sizes}
        quality={quality}
        fill={fill}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        {...props}
      />
    </div>
  )
}
