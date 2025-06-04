"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ImageDebugHelperProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export function ImageDebugHelper({ src, alt, width = 400, height = 200, className }: ImageDebugHelperProps) {
  const [imageStatus, setImageStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    setImageStatus("loading")
    setErrorMessage("")
  }, [src])

  return (
    <div className="relative">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onLoad={() => setImageStatus("success")}
        onError={(e) => {
          setImageStatus("error")
          setErrorMessage(`Failed to load: ${src}`)
          console.error(`Image load error for ${src}:`, e)
        }}
      />
      {imageStatus === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="text-white text-sm">Loading...</div>
        </div>
      )}
      {imageStatus === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/50">
          <div className="text-white text-xs text-center p-2">
            <p>Failed to load image</p>
            <p className="mt-1">{src}</p>
          </div>
        </div>
      )}
    </div>
  )
}
