import type React from "react"

/**
 * Gets the image path for a card based on its ID and element
 * Uses the existing naming convention in the project
 */
export function getCardImagePath(cardId: string, element: string): string {
  if (!cardId) return "/placeholder.svg"

  // Normalize element name to lowercase
  const normalizedElement = element ? element.toLowerCase() : "spirit"

  // Format: /cards/01cauldron-fire.jpg
  try {
    // Extract the card number and suit from the ID
    // Card IDs are typically in the format "01cauldron-fire"
    const cardNumber = cardId.match(/^\d+/)?.[0] || ""
    const cardSuit = cardId.replace(/^\d+/, "").split("-")[0] || ""

    if (!cardNumber || !cardSuit) {
      console.warn(`Invalid card ID format: ${cardId}`)
      return `/placeholder.svg?height=420&width=270&query=Card ${cardId}`
    }

    // Construct the path
    return `/cards/${cardNumber}${cardSuit}-${normalizedElement}.jpg`
  } catch (error) {
    console.error(`Error generating card image path for ${cardId}:`, error)
    return `/placeholder.svg?height=420&width=270&query=Error loading card ${cardId}`
  }
}

/**
 * Creates a fallback image URL for when a card image fails to load
 */
export function getCardFallbackUrl(card: any): string {
  if (!card) return "/placeholder.svg?height=280&width=180&query=card"

  let queryText = ""

  if (typeof card === "string") {
    queryText = card
  } else if (card.name) {
    queryText = `${card.name} card`
  } else if (card.type && card.element) {
    queryText = `${card.type} of ${card.element}`
  } else {
    queryText = "oracle card"
  }

  return `/placeholder.svg?height=280&width=180&query=${encodeURIComponent(queryText)}`
}

/**
 * Handles image loading errors by providing a fallback
 */
export function handleCardImageError(event: React.SyntheticEvent<HTMLImageElement, Event>, card: any): void {
  const img = event.currentTarget
  const cardName = card?.name || "Unknown Card"
  const element = card?.elements ? Object.keys(card.elements)[0] : "spirit"

  console.warn(`Failed to load image for card: ${cardName} (${element})`)

  // Set a placeholder image
  img.src = `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardName)}`

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

export async function verifyCardImage(cardId: string): Promise<boolean> {
  const imagePath = getCardImagePath(cardId)

  try {
    const response = await fetch(imagePath, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error(`Failed to verify card image for ${cardId}:`, error)
    return false
  }
}
