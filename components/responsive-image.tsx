"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
  quality?: number
  fill?: boolean
  fallbackSrc?: string
  onLoad?: () => void
  onError?: () => void
}

export function ResponsiveImage({
  src,
  alt,
  className,
  width,
  height,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  quality = 80,
  fill = false,
  fallbackSrc = "/placeholder.svg",
  onLoad,
  onError,
  ...props
}: ResponsiveImageProps) {
  const [error, setError] = useState(false)

  // Handle image load error
  const handleError = () => {
    setError(true)
    if (onError) onError()
  }

  // Handle successful load
  const handleLoad = () => {
    if (onLoad) onLoad()
  }

  return (
    <Image
      src={error ? fallbackSrc : src}
      alt={alt}
      width={fill ? undefined : width || 300}
      height={fill ? undefined : height}
      className={cn("transition-opacity duration-300", className)}
      sizes={sizes}
      priority={priority}
      quality={quality}
      fill={fill}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  )
}
