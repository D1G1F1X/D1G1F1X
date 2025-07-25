"use client"

import type React from "react"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"
import { useState } from "react"

interface EnhancedCardImageProps extends React.ComponentProps<typeof Image> {
  cardId: string
  cardTitle: string
  baseElement: string
  synergisticElement?: string
  className?: string
  showStatus?: boolean
}

export function EnhancedCardImage({
  cardId,
  cardTitle,
  baseElement,
  synergisticElement,
  className,
  showStatus = false,
  ...props
}: EnhancedCardImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Construct the image URL based on the card properties
  // This assumes a naming convention like: {number}-{suit}-{element}.jpg
  // For example, "01-cauldron-fire.jpg"
  // We need to parse cardId to get number and suit if not directly available
  const [numberPart, suitPart] = cardId.split("-")
  const formattedNumber = numberPart.padStart(2, "0")
  const formattedSuit = suitPart?.toLowerCase() || "unknown"
  const formattedBaseElement = baseElement.toLowerCase()

  // Prioritize the base element image
  let imageUrl = `/public/cards/${formattedNumber}-${formattedSuit}-${formattedBaseElement}.jpg`

  // If the base element image fails, try the synergistic element if it's different
  const handleImageError = () => {
    setImageError(true)
    if (synergisticElement && synergisticElement.toLowerCase() !== formattedBaseElement) {
      // Attempt to load with synergistic element if base element fails
      imageUrl = `/public/cards/${formattedNumber}-${formattedSuit}-${synergisticElement.toLowerCase()}.jpg`
    } else {
      // Fallback to a generic placeholder if all specific images fail
      imageUrl = "/placeholder.svg?height=360&width=270&text=Card+Image+Not+Found"
    }
  }

  return (
    <div
      className={cn(
        "relative w-[270px] h-[360px] rounded-lg overflow-hidden shadow-lg",
        "flex items-center justify-center bg-gray-200 dark:bg-gray-800",
        className,
      )}
    >
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
          <Sparkles className="h-8 w-8 animate-pulse" />
        </div>
      )}
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={cardTitle}
        width={270}
        height={360}
        className={cn(
          "object-cover transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0",
          imageError && "hidden", // Hide if there's a permanent error
        )}
        onLoad={() => setImageLoaded(true)}
        onError={handleImageError}
        priority // Prioritize loading for better UX
        {...props}
      />
      {imageError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-center p-4">
          <p className="font-semibold">Image Load Error</p>
          <p className="text-sm">Could not load image for {cardTitle}.</p>
          {showStatus && (
            <p className="text-xs mt-2">
              Attempted: {formattedNumber}-{formattedSuit}-{formattedBaseElement}.jpg
              {synergisticElement && synergisticElement.toLowerCase() !== formattedBaseElement && (
                <>
                  <br />
                  Fallback: {formattedNumber}-{formattedSuit}-{synergisticElement.toLowerCase()}.jpg
                </>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
