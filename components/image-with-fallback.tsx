"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string>(typeof src === "string" ? src : fallbackSrc)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    // Reset error state when src changes
    setError(false)
    setImgSrc(typeof src === "string" ? src : fallbackSrc)
  }, [src, fallbackSrc])

  return (
    <Image
      {...rest}
      src={error ? fallbackSrc : imgSrc}
      alt={alt}
      onError={() => {
        setError(true)
        setImgSrc(fallbackSrc)
      }}
    />
  )
}
