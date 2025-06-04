"use client"

import { useState, useEffect } from "react"

interface ClientImageProps {
  src: string | null
  alt: string
  fallbackSrc: string
  className?: string
}

export function ClientImage({ src, alt, fallbackSrc, className }: ClientImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null)

  useEffect(() => {
    // Only set the image source if it's not empty
    if (src && src.trim() !== "") {
      setImgSrc(src)
    } else {
      // Use fallback for empty strings
      setImgSrc(fallbackSrc)
    }
  }, [src, fallbackSrc])

  return (
    <img
      src={imgSrc || "/images/blog/generated/spiritual-significance-cauldron-symbol.png"}
      alt={alt}
      className={className}
      onError={() => {
        const ultimateFallback = "/images/blog/generated/spiritual-significance-cauldron-symbol.png"
        // If the current imgSrc is not the prop fallbackSrc (and prop fallbackSrc exists), try the prop fallbackSrc.
        if (imgSrc !== fallbackSrc && fallbackSrc && fallbackSrc.trim() !== "") {
          setImgSrc(fallbackSrc)
        }
        // Else, if the current imgSrc is not the ultimate fallback, try the ultimate fallback.
        else if (imgSrc !== ultimateFallback) {
          setImgSrc(ultimateFallback)
        }
        // If the ultimate fallback itself fails, imgSrc will be ultimateFallback,
        // and this handler won't call setImgSrc again, preventing a loop.
        // The browser will then show its broken image icon for the ultimateFallback.
      }}
    />
  )
}
