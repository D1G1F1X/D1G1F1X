"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  placeholderClassName?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
  quality?: number
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
  loadingStrategy?: "lazy" | "eager" | "progressive"
  placeholderSrc?: string
  threshold?: number
  rootMargin?: string
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  placeholderClassName,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  quality = 75,
  blurDataURL,
  onLoad,
  onError,
  loadingStrategy = "lazy",
  placeholderSrc = "/placeholder.svg",
  threshold = 0.1,
  rootMargin = "200px",
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [imageSrc, setImageSrc] = useState(loadingStrategy === "progressive" ? placeholderSrc : src)
  const { ref, hasIntersected } = useIntersectionObserver({ threshold, rootMargin })

  // If priority is true, we don't need to lazy load
  const shouldLazyLoad = !priority && loadingStrategy !== "eager"

  // Handle progressive loading strategy
  useEffect(() => {
    if (loadingStrategy === "progressive" && hasIntersected && !loaded && !error) {
      if (typeof window !== "undefined" && typeof window.Image !== "undefined") {
        const img = new window.Image()
        img.src = src
        img.onload = () => {
          setImageSrc(src)
          setLoaded(true)
        }
        img.onerror = () => {
          setError(true)
          setImageSrc(placeholderSrc)
        }
      } else {
        setError(true)
        setImageSrc(placeholderSrc)
        console.warn("window.Image is not available, progressive loading skipped.")
      }
    }
  }, [hasIntersected, loadingStrategy, loaded, error, src, placeholderSrc])

  // Handle image load event
  const handleLoad = () => {
    setLoaded(true)
    if (onLoad) onLoad()
  }

  // Handle image error event
  const handleError = () => {
    setError(true)
    if (onError) onError()
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
          src={loadingStrategy === "progressive" ? imageSrc : src}
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
          {...props}
        />
      ) : (
        <div
          className={cn("bg-muted animate-pulse", fill ? "w-full h-full" : "", placeholderClassName)}
          style={!fill && width && height ? { width: `${width}px`, height: `${height}px` } : undefined}
        />
      )}
    </div>
  )
}
