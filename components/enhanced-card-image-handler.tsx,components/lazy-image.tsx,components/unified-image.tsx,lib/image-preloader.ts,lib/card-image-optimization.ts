"use client"

\`\`\`typescript
import NextImage from "next/image"

interface EnhancedCardImageHandlerProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  style?: React.CSSProperties
  onLoadingComplete?: () => void
}

const EnhancedCardImageHandler: React.FC<EnhancedCardImageHandlerProps> = ({
  src,
  alt,
  width,
  height,
  priority,
  className,
  style,
  onLoadingComplete,
}) => {
  const handleImageLoad = () => {
    if (onLoadingComplete) {
      onLoadingComplete()
    }
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={style}
      onLoadingComplete={handleImageLoad}
    />
  )
}

export default EnhancedCardImageHandler
\`\`\`

\`\`\`typescript
import { useState } from "react"
import NextImage from "next/image"

interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  style?: React.CSSProperties
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, width, height, className, style }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isLoaded ? "" : "loading"}`}
      style={{
        ...style,
        transition: "opacity 0.5s ease-in-out",
        opacity: isLoaded ? 1 : 0,
      }}
      onLoadingComplete={handleImageLoad}
    />
  )
}

export default LazyImage;
\`\`\`

\`\`\`typescript
// components/unified-image.tsx
import type React from "react"
import NextImage from "next/image"

interface UnifiedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  style?: React.CSSProperties
  loading?: "lazy" | "eager"
}

const UnifiedImage: React.FC<UnifiedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority,
  className,
  style,
  loading = "lazy",
}) => {
  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={style}
      loading={loading}
    />
  )
}

export default UnifiedImage;
\`\`\`

\`\`\`typescript
// lib/image-preloader.ts
export const preloadImage = (imageUrl: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.src = imageUrl
    img.onload = () => resolve()
    img.onerror = (error) => reject(error)
  })
}
\`\`\`

\`\`\`typescript
// lib/card-image-optimization.ts
export const optimizeCardImage = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.src = imageUrl
    img.onload = () => {
      // Simulate image optimization (replace with actual optimization logic)
      const optimizedImageUrl = imageUrl.replace("original", "optimized")
      resolve(optimizedImageUrl)
    }
    img.onerror = (error) => reject(error)
  })
}
\`\`\`
