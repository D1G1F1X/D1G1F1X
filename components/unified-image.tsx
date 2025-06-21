"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export interface UnifiedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
  quality?: number
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
  fallbackSrc?: string
  loadingStrategy?: "lazy" | "eager" | "progressive" | "blur"
  placeholderSrc?: string
  threshold?: number
  rootMargin?: string
  unoptimized?: boolean
}

export function UnifiedImage({
  src,
  alt,
  width,
  height,
  className,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  quality = 75,
  blurDataURL,
  onLoad,
  onError,
  fallbackSrc = "/placeholder.svg",
  loadingStrategy = "lazy",
  placeholderSrc = "/placeholder.svg",
  threshold = 0.1,
  rootMargin = "200px",
  unoptimized = false,
  ...props
}: UnifiedImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [imageSrc, setImageSrc] = useState(
    loadingStrategy === "progressive" || loadingStrategy === "blur" ? placeholderSrc : src,
  )
  const { ref, hasIntersected } = useIntersectionObserver({ threshold, rootMargin })

  // If priority is true, we don't need to lazy load
  const shouldLazyLoad = !priority && loadingStrategy !== "eager"

  // Normalize image path if it's a relative path
  useEffect(() => {
    if (src && typeof src === "string") {
      // Keep the original src if it's an external URL or blob
      if (src.startsWith("http") || src.includes("blob") || src.includes("data:")) {
        setImageSrc(loadingStrategy === "progressive" || loadingStrategy === "blur" ? placeholderSrc : src)
      } else {
        // Ensure the path starts with a slash for internal images
        const normalizedSrc = src.startsWith("/") ? src : `/${src}`
        setImageSrc(loadingStrategy === "progressive" || loadingStrategy === "blur" ? placeholderSrc : normalizedSrc)
      }
    }
  }, [src, loadingStrategy, placeholderSrc])

  // Handle progressive loading strategy
  useEffect(() => {
    if ((loadingStrategy === "progressive" || loadingStrategy === "blur") && hasIntersected && !loaded && !error) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setImageSrc(src)
        setLoaded(true)
      }
      img.onerror = () => {
        setError(true)
        setImageSrc(fallbackSrc)
      }
    }
  }, [hasIntersected, loadingStrategy, loaded, error, src, fallbackSrc])

  // Handle image load event
  const handleLoad = () => {
    setLoaded(true)
    if (onLoad) onLoad()
  }

  // Handle image error event
  const handleError = () => {
    setError(true)
    setImageSrc(fallbackSrc)
    if (onError) onError()
  }

  // For external URLs or blob URLs, use regular img tag
  if (imageSrc && (imageSrc.startsWith("http") || imageSrc.includes("blob") || imageSrc.includes("data:"))) {
    return (
      <img
        src={error ? fallbackSrc : imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn("transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0", className)}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    )
  }

  // Determine what to render
  const renderImage = priority || !shouldLazyLoad || hasIntersected

  return (
    <div
      ref={shouldLazyLoad ? ref : undefined}
      className={cn("relative overflow-hidden", fill ? "w-full h-full" : "", className)}
      style={!fill && width && height ? { width: `${width}px`, height: `${height}px` } : undefined}
    >
      {renderImage ? (
        <Image
          src={error ? fallbackSrc : imageSrc}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          className={cn("transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0", className)}
          sizes={sizes}
          quality={quality}
          fill={fill}
          onLoad={handleLoad}
          onError={handleError}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          loading={priority ? "eager" : "lazy"}
          unoptimized={unoptimized}
          {...props}
        />
      ) : (
        <div
          className={cn("bg-muted animate-pulse", fill ? "w-full h-full" : "", className)}
          style={!fill && width && height ? { width: `${width}px`, height: `${height}px` } : undefined}
        />
      )}
    </div>
  )
}
