/**
 * Utility functions for handling card images
 */

/**
 * Gets the image path for a card based on its descriptive key or name
 */
export function getCardImagePath(descriptiveKey: string | null, cardName: string): string {
  if (!descriptiveKey) {
    // Fallback to a placeholder if no descriptive key is available
    return `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardName || "oracle card")}`
  }

  // Return the path to the card image
  return `/cards/${descriptiveKey}.jpg`
}

/**
 * Creates a fallback URL for when a card image is not found
 */
export function createCardFallbackUrl(cardName: string): string {
  return `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardName || "oracle card")}`
}

/**
 * Validates if a card image exists
 */
export async function validateCardImage(imagePath: string): Promise<boolean> {
  try {
    const response = await fetch(imagePath, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error(`Error validating image at ${imagePath}:`, error)
    return false
  }
}

/**
 * Gets the element color class for styling
 */
export function getElementColorClass(element: string | undefined): string {
  if (!element) return "bg-gray-500/20 text-gray-400 border-gray-500/30"

  switch (element.toLowerCase()) {
    case "fire":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    case "water":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "air":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case "earth":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "spirit":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

/**
 * Gets the suit icon for display
 */
export function getSuitIcon(suit: string | undefined): string {
  if (!suit) return "✧"

  switch (suit.toLowerCase()) {
    case "cauldron":
      return "🔮"
    case "sword":
      return "⚔️"
    case "spear":
      return "🔱"
    case "stone":
      return "🪨"
    case "cord":
      return "⚝"
    default:
      return "✧"
  }
}
