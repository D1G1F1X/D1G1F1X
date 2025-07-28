import type React from "react"
/**
 * Utility functions for handling card images
 */
import type { OracleCard } from "@/types/cards"

/**
 * Gets the image path for a card based on its number, suit, and element.
 * This function is primarily for internal use within card-image-utils
 * and for generating fallback paths. The main image resolution for components
 * should now come from `lib/card-data-access.ts`.
 */
export function getCardImagePath(card: OracleCard, end: "first" | "second"): string {
  if (!card) return "/placeholder.svg"

  const numberStr = card.number?.toString().padStart(2, "0") || "00"
  const suitStr = card.suit?.toLowerCase() || "unknown"
  const elementStr =
    end === "first" ? card.baseElement?.toLowerCase() || "spirit" : card.synergisticElement?.toLowerCase() || "spirit"

  // This function now only returns the local path, as the blob resolution
  // is handled by `getCardImagePath` in `lib/card-data-access.ts`
  return `/cards/${numberStr}-${suitStr}-${elementStr}.jpg`
}

/**
 * Creates a fallback image URL for when a card image fails to load
 */
export function getCardFallbackUrl(card: any): string {
  if (!card) return "/placeholder.svg?height=280&width=180"

  let queryText = ""

  if (typeof card === "string") {
    queryText = card
  } else if (card.fullTitle) {
    queryText = `${card.fullTitle} card`
  } else if (card.name) {
    queryText = `${card.name} card`
  } else if (card.suit && card.baseElement) {
    queryText = `${card.suit} of ${card.baseElement}`
  } else {
    queryText = "oracle card"
  }

  return `/placeholder.svg?height=280&width=180&query=${encodeURIComponent(queryText)}`
}

/**
 * Handles image loading errors by providing a fallback
 */
export function handleCardImageError(event: React.SyntheticEvent<HTMLImageElement, Event>, card: OracleCard): void {
  const img = event.currentTarget
  const cardName = card?.fullTitle || card?.name || "Unknown Card"
  const element = card?.baseElement || "spirit"

  console.warn(`Failed to load image for card: ${cardName} (${element})`)

  // Set a placeholder image
  img.src = getCardFallbackUrl(card)

  // Add a class to indicate error
  img.classList.add("image-load-error")
}

/**
 * Preloads common card images to improve user experience
 */
export function preloadCommonCardImages(): void {
  if (typeof window === "undefined") return

  const commonElements = ["fire", "water", "air", "earth", "spirit"]
  const commonTypes = ["cauldron", "sword", "spear", "stone", "cord"]

  // Preload a subset of common cards
  for (const type of commonTypes) {
    for (const element of commonElements) {
      const img = new Image()
      img.src = `/cards/01${type}-${element}.jpg`
    }
  }
}

/**
 * Gets the Tailwind CSS classes for an element's color.
 */
export function getElementColor(element: string) {
  switch (element?.toLowerCase()) {
    case "earth":
      return "bg-green-900/20 border-green-500/30 text-green-300"
    case "water":
      return "bg-blue-900/20 border-blue-500/30 text-blue-300"
    case "fire":
      return "bg-red-900/20 border-red-500/30 text-red-300"
    case "air":
      return "bg-yellow-900/20 border-yellow-500/30 text-yellow-300"
    case "spirit":
      return "bg-purple-900/20 border-purple-500/30 text-purple-300"
    default:
      return "bg-gray-900/20 border-gray-500/30 text-gray-300"
  }
}

/**
 * Gets a symbolic icon for a given suit.
 */
export function getSuitIcon(suit: string) {
  switch (suit?.toLowerCase()) {
    case "cauldron":
      return "⚗️" // Alchemical symbol for distillation/cauldron
    case "sword":
      return "⚔️" // Crossed swords
    case "spear":
      return "🔱" // Trident/spear
    case "stone":
      return "🪨" // Rock/stone
    case "cord":
      return "➰" // Loop/knot
    default:
      return "✨" // Sparkle for unknown
  }
}

/**
 * Gets a symbolic icon for a given element.
 */
export function getElementSymbol(element: string) {
  switch (element?.toLowerCase()) {
    case "earth":
      return "⊕" // Earth symbol
    case "water":
      return "≈" // Water waves
    case "fire":
      return "△" // Fire triangle
    case "air":
      return "≋" // Air waves
    case "spirit":
      return "✧" // Star/sparkle
    default:
      return "★" // Generic star
  }
}

// This function is not directly used in the current context but kept for completeness
export async function verifyCardImage(cardId: string): Promise<boolean> {
  const imagePath = `/cards/${cardId}.jpg`
  try {
    const response = await fetch(imagePath, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error(`Failed to verify card image for ${cardId}:`, error)
    return false
  }
}
