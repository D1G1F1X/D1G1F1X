import masterCardData from "@/data/master-card-data.json"
import type { OracleCard } from "@/types/cards"

// Convert the imported array to properly typed OracleCard objects
const allCards: OracleCard[] = Array.isArray(masterCardData)
  ? masterCardData.map((card: any) => ({
      ...card,
      id: card.id || `${String(card.number).padStart(2, "0")}-${card.suit}`,
      number: card.number || "0",
      suit: card.suit || "Unknown",
      fullTitle: card.fullTitle || `${card.number} ${card.suit}`,
      baseElement: card.baseElement || "Spirit",
      synergisticElement: card.synergisticElement || "Spirit",
      iconSymbol: card.iconSymbol || "Unknown",
      orientation: card.orientation || "Balanced",
      sacredGeometry: card.sacredGeometry || "Circle",
      keyMeanings: Array.isArray(card.keyMeanings) ? card.keyMeanings : ["Guidance and wisdom"],
      symbols: Array.isArray(card.symbols) ? card.symbols : [],
      symbolismBreakdown: Array.isArray(card.symbolismBreakdown) ? card.symbolismBreakdown : [],
      planetInternalInfluence: card.planetInternalInfluence || "Universal guidance",
      astrologyExternalDomain: card.astrologyExternalDomain || "All signs",
    }))
  : [] // Fallback to an empty array if masterCardData is not an array

/**
 * Get all oracle cards
 */
export function getAllCards(): OracleCard[] {
  return allCards
}

/**
 * Get a specific card by ID
 */
export function getCardById(id: string): OracleCard | undefined {
  return allCards.find((card) => card.id === id)
}

/**
 * Get cards by suit
 */
export function getCardsBySuit(suit: string): OracleCard[] {
  return allCards.filter((card) => card.suit.toLowerCase() === suit.toLowerCase())
}

/**
 * Get cards by element (base or synergistic)
 */
export function getCardsByElement(element: string): OracleCard[] {
  return allCards.filter(
    (card) =>
      card.baseElement.toLowerCase() === element.toLowerCase() ||
      card.synergisticElement.toLowerCase() === element.toLowerCase(),
  )
}

/**
 * Get a random card
 */
export function getRandomCard(): OracleCard {
  const randomIndex = Math.floor(Math.random() * allCards.length)
  return allCards[randomIndex]
}

/**
 * Get multiple random cards
 */
export function getRandomCards(count: number): OracleCard[] {
  const shuffled = [...allCards].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, allCards.length))
}

/**
 * Search cards by title, meaning, or other text content
 */
export function searchCards(query: string): OracleCard[] {
  const lowerQuery = query.toLowerCase()
  return allCards.filter(
    (card) =>
      card.fullTitle.toLowerCase().includes(lowerQuery) ||
      card.keyMeanings.some((meaning) => meaning.toLowerCase().includes(lowerQuery)) ||
      card.suit.toLowerCase().includes(lowerQuery) ||
      card.baseElement.toLowerCase().includes(lowerQuery) ||
      card.synergisticElement.toLowerCase().includes(lowerQuery) ||
      card.symbolismBreakdown.some((breakdown) => breakdown.toLowerCase().includes(lowerQuery)),
  )
}

/**
 * Get all unique suits
 */
export function getAllSuits(): string[] {
  const suits = new Set(allCards.map((card) => card.suit))
  return Array.from(suits).sort()
}

/**
 * Get all unique elements
 */
export function getAllElements(): string[] {
  const elements = new Set([
    ...allCards.map((card) => card.baseElement),
    ...allCards.map((card) => card.synergisticElement),
  ])
  return Array.from(elements).sort()
}

/**
 * Get card statistics
 */
export function getCardStats(): {
  totalCards: number
  suitCounts: Record<string, number>
  elementCounts: Record<string, number>
} {
  const suitCounts: Record<string, number> = {}
  const elementCounts: Record<string, number> = {}

  allCards.forEach((card) => {
    // Count suits
    suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1

    // Count elements
    elementCounts[card.baseElement] = (elementCounts[card.baseElement] || 0) + 1
    if (card.synergisticElement !== card.baseElement) {
      elementCounts[card.synergisticElement] = (elementCounts[card.synergisticElement] || 0) + 1
    }
  })

  return {
    totalCards: allCards.length,
    suitCounts,
    elementCounts,
  }
}

/**
 * Get a symbol value by key from a card
 */
export function getSymbolValue(card: OracleCard, key: string): string | undefined {
  const symbol = card.symbols?.find((s) => s.key === key)
  return symbol?.value
}

/**
 * Enhanced card image path generation with fallback support
 */
export function getCardImagePath(card: OracleCard): string {
  // Generate image path based on card properties with zero-padded numbers
  const cardNumber = String(card.number).padStart(2, "0")
  const suit = card.suit.toLowerCase()
  const element = card.baseElement.toLowerCase()

  // Primary path with zero-padded format
  const primaryPath = `/cards/${cardNumber}-${suit}-${element}.jpg`

  // Fallback paths for backward compatibility
  const fallbackPaths = [
    `/cards/${card.number}-${suit}-${element}.jpg`, // Original single-digit format
    `/cards/${cardNumber}${suit}-${element}.jpg`, // No hyphen format
    `/cards/${card.id.toLowerCase()}-${element}.jpg`,
    `/cards/${card.id.toLowerCase()}.jpg`,
  ]

  // Return the primary path (component will handle fallbacks)
  return primaryPath
}

/**
 * Get all possible image paths for a card (for validation/checking)
 */
export function getAllPossibleImagePaths(card: OracleCard): string[] {
  const cardNumber = String(card.number).padStart(2, "0")
  const suit = card.suit.toLowerCase()
  const baseElement = card.baseElement.toLowerCase()
  const synergisticElement = card.synergisticElement.toLowerCase()

  const paths: string[] = [][
    // For both base and synergistic elements
    (baseElement, synergisticElement)
  ].forEach((element) => {
    if (element) {
      paths.push(
        `/cards/${cardNumber}-${suit}-${element}.jpg`, // Zero-padded format
        `/cards/${card.number}-${suit}-${element}.jpg`, // Single-digit format
        `/cards/${cardNumber}${suit}-${element}.jpg`, // No hyphen format
        `/cards/${card.id.toLowerCase()}-${element}.jpg`,
      )
    }
  })

  return [...new Set(paths)] // Remove duplicates
}

/**
 * Get all card data (alias for getAllCards)
 */
export function getCardData(): OracleCard[] {
  return getAllCards()
}

/**
 * Check data integrity (placeholder for actual validation logic)
 */
export function checkDataIntegrity(): { isValid: boolean; errors: string[] } {
  // In a real application, this would perform thorough validation
  // For now, it's a placeholder to satisfy the export requirement
  return { isValid: true, errors: [] }
}

/**
 * Get comprehensive card data (can be an alias or combine data)
 */
export function getComprehensiveCardData(): OracleCard[] {
  // Since masterCardData is now the single source of truth,
  // getComprehensiveCardData can simply return allCards.
  return allCards
}
