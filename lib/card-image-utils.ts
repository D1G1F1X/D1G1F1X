/**
 * Utility functions for handling card images
 */

/**
 * Gets the image path for a card based on its ID and optional name
 */
export function getCardImagePath(cardId: string | null, cardName?: string): string {
  if (!cardId) {
    return cardName
      ? `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardName)}`
      : "/placeholder.svg?height=420&width=270"
  }

  // Default element if not specified
  const defaultElement = "spirit"

  try {
    // Parse card ID (format: "NUMBER-SUIT")
    const parts = cardId.split("-")
    if (parts.length < 2) {
      console.warn(`Invalid card ID format: ${cardId}`)
      return `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardId)}`
    }

    const cardNumber = parts[0].padStart(2, "0") // Zero-pad the number
    const cardSuit = parts[1].toLowerCase()

    // Use standardized naming: 0X-suit-element.jpg
    return `/cards/${cardNumber}-${cardSuit}-${defaultElement}.jpg`
  } catch (error) {
    console.error(`Error generating card image path for ${cardId}:`, error)
    return `/placeholder.svg?height=420&width=270&query=Error`
  }
}

/**
 * Generate card image path with specific element
 */
export function getCardImagePathWithElement(cardId: string, element: string): string {
  if (!cardId || !element) {
    return "/placeholder.svg?height=420&width=270"
  }

  try {
    const parts = cardId.split("-")
    if (parts.length < 2) {
      return `/placeholder.svg?height=420&width=270&query=${encodeURIComponent(cardId)}`
    }

    const cardNumber = parts[0].padStart(2, "0") // Zero-pad the number
    const cardSuit = parts[1].toLowerCase()
    const normalizedElement = element.toLowerCase()

    return `/cards/${cardNumber}-${cardSuit}-${normalizedElement}.jpg`
  } catch (error) {
    console.error(`Error generating card image path for ${cardId}-${element}:`, error)
    return "/placeholder.svg?height=420&width=270"
  }
}

/**
 * Extract card information from image filename
 */
export function parseCardImageFilename(filename: string): {
  number: string
  suit: string
  element: string
  isValid: boolean
} {
  const match = filename.match(/^(\d{2})-([a-z]+)-([a-z]+)\.jpg$/i)

  if (match) {
    return {
      number: match[1],
      suit: match[2],
      element: match[3],
      isValid: true,
    }
  }

  return {
    number: "",
    suit: "",
    element: "",
    isValid: false,
  }
}

/**
 * Generate all possible image paths for a card (for fallback support)
 */
export function generateCardImageVariants(cardId: string, element: string): string[] {
  if (!cardId || !element) return []

  try {
    const parts = cardId.split("-")
    if (parts.length < 2) return []

    const originalNumber = parts[0]
    const paddedNumber = originalNumber.padStart(2, "0")
    const suit = parts[1].toLowerCase()
    const normalizedElement = element.toLowerCase()

    const variants: string[] = [
      // Primary: Zero-padded format (new standard)
      `/cards/${paddedNumber}-${suit}-${normalizedElement}.jpg`,
    ]

    // Add legacy format if different from padded
    if (originalNumber !== paddedNumber) {
      variants.push(`/cards/${originalNumber}-${suit}-${normalizedElement}.jpg`)
    }

    // Add alternative formats
    variants.push(
      `/cards/${paddedNumber}${suit}-${normalizedElement}.jpg`,
      `/cards/${cardId.toLowerCase()}-${normalizedElement}.jpg`,
    )

    return variants
  } catch (error) {
    console.error(`Error generating variants for ${cardId}-${element}:`, error)
    return []
  }
}

/**
 * Check if an image path follows the new naming convention
 */
export function isStandardizedImagePath(path: string): boolean {
  const filename = path.split("/").pop() || ""
  return /^\d{2}-[a-z]+-[a-z]+\.jpg$/i.test(filename)
}

/**
 * Convert legacy image path to standardized format
 */
export function standardizeImagePath(path: string): string {
  const filename = path.split("/").pop() || ""
  const match = filename.match(/^(\d{1})-([a-z]+)-([a-z]+)\.jpg$/i)

  if (match) {
    const [, number, suit, element] = match
    const paddedNumber = number.padStart(2, "0")
    return path.replace(filename, `${paddedNumber}-${suit}-${element}.jpg`)
  }

  return path // Return original if already standardized or invalid format
}

/**
 * Batch process image paths to ensure they follow the standard convention
 */
export function standardizeImagePaths(paths: string[]): string[] {
  return paths.map(standardizeImagePath)
}

/**
 * Get image dimensions for a card (standard aspect ratio)
 */
export function getCardImageDimensions(): { width: number; height: number; aspectRatio: string } {
  return {
    width: 270,
    height: 420,
    aspectRatio: "2/3",
  }
}

/**
 * Generate responsive image srcSet for a card
 */
export function generateCardImageSrcSet(cardId: string, element: string): string {
  const basePath = getCardImagePathWithElement(cardId, element)
  const baseUrl = basePath.replace(".jpg", "")

  // For now, return single size - can be enhanced for multiple sizes
  return `${basePath} 1x`
}

/**
 * Validate card image filename format
 */
export function validateCardImageFilename(filename: string): {
  isValid: boolean
  errors: string[]
  suggestions?: string
} {
  const errors: string[] = []

  if (!filename) {
    errors.push("Filename is required")
    return { isValid: false, errors }
  }

  // Check if it matches the standard format
  const standardMatch = filename.match(/^(\d{2})-([a-z]+)-([a-z]+)\.jpg$/i)
  if (standardMatch) {
    return { isValid: true, errors: [] }
  }

  // Check if it's a legacy format that can be converted
  const legacyMatch = filename.match(/^(\d{1})-([a-z]+)-([a-z]+)\.jpg$/i)
  if (legacyMatch) {
    const [, number, suit, element] = legacyMatch
    const suggestion = `${number.padStart(2, "0")}-${suit}-${element}.jpg`
    errors.push("Uses legacy single-digit format")
    return {
      isValid: false,
      errors,
      suggestions: suggestion,
    }
  }

  errors.push("Does not match expected format: 0X-suit-element.jpg")
  return { isValid: false, errors }
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
