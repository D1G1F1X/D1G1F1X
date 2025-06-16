"use client"

import Image from "next/image"
import { getCardImagePath as getActualCardImagePath } from "@/lib/card-data-access" // Import the correct path generator
import { getElementColorClass, getSuitIcon } from "@/lib/card-image-utils" // Keep these for fallback styling
import type { OracleCard } from "@/types/cards"
import { useState, useEffect } from "react"

interface EnhancedCardImageProps {
  card: OracleCard // Pass the full card object
  endUp: "first" | "second" // Indicate which element to use for the path
  className?: string
  onImageLoad?: (success: boolean) => void
}

export function EnhancedCardImage({ card, endUp, className, onImageLoad }: EnhancedCardImageProps) {
  const [hasError, setHasError] = useState(false)
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null)

  useEffect(() => {
    setHasError(false) // Reset error state on card change
    const path = getActualCardImagePath(card, endUp)
    setCurrentImageSrc(path)
  }, [card, endUp])

  const handleImageError = () => {
    setHasError(true)
    if (onImageLoad) {
      onImageLoad(false)
    }
  }

  const handleImageLoad = () => {
    if (onImageLoad) {
      onImageLoad(true)
    }
  }

  // Fallback content if image fails to load
  if (hasError || !currentImageSrc) {
    const elementToUse = endUp === "first" ? card.baseElement : card.synergisticElement
    const elementColorClass = getElementColorClass(elementToUse)
    const elementSymbol = getSuitIcon(card.suit) // Using getSuitIcon for a generic symbol, or could create a new getElementSymbol in card-image-utils

    return (
      <div
        className={`w-full h-full ${elementColorClass.split(" ").slice(0, 2).join(" ")} flex flex-col items-center justify-center p-4 ${className}`}
      >
        <div className="text-center mb-2 text-sm font-medium text-white">{card.fullTitle}</div>
        <div className="w-24 h-24 my-4 rounded-full bg-gray-800/50 border border-gray-300/30 flex items-center justify-center">
          <span className={elementColorClass.split(" ").slice(2).join(" ") + " text-4xl"}>{elementSymbol}</span>
        </div>
        <div className="text-xs text-center text-white/80 mt-2">
          {card.suit} • {elementToUse}
        </div>
        <div className="text-lg font-bold text-white mt-2">{card.number}</div>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Image
        src={currentImageSrc || "/placeholder.svg"}
        alt={`${card.fullTitle} - ${endUp === "first" ? "Base Element" : "Synergistic Element"}`}
        fill
        className="object-cover"
        onError={handleImageError}
        onLoad={handleImageLoad}
        priority
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center">
        <div className="text-xs font-medium text-white">{card.fullTitle}</div>
        <div className="text-xs text-gray-300">
          {card.number} • {card.baseElement}
        </div>
      </div>
    </div>
  )
}
