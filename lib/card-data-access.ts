import type { OracleCard, CardSortOption } from "@/types/cards"
import { listCardImages } from "@/lib/card-image-blob-handler"
import rawCardData from "@/data/numo-oracle-card-data.json" // Directly import JSON data
import { getSymbolValue } from "./numerology" // Corrected import path

// Convert the JSON data to OracleCard objects and enrich with image URLs
const processCardData = async (rawData: any[]): Promise<OracleCard[]> => {
  const cardImages = await listCardImages()

  return rawData.map((card) => {
    // Add safety checks for required properties
    const suit = card.suit || "unknown"
    const baseElement = card.baseElement || "spirit"
    const number = card.number || "0"

    // Find the corresponding image URL from blob storage
    const cardImage = cardImages.find((img) => img.filename.includes(card.id))
    // Fallback to a local path if no blob image is found
    const imageUrl = cardImage?.url || `/public/cards/${number}-${suit.toLowerCase()}-${baseElement.toLowerCase()}.jpg`

    return {
      id: card.id || `${number}-${suit}`,
      number: number,
      suit: suit,
      fullTitle: card.fullTitle || `${number} ${suit}`,
      symbols: card.symbols || [],
      symbolismBreakdown: card.symbolismBreakdown || [],
      keyMeanings: card.keyMeanings || [],
      baseElement: baseElement,
      planetInternalInfluence: card.planetInternalInfluence || "unknown",
      astrologyExternalDomain: card.astrologyExternalDomain || "unknown",
      iconSymbol: card.iconSymbol || "unknown",
      orientation: card.orientation || "unknown",
      sacredGeometry: card.sacredGeometry || "unknown",
      synergisticElement: card.synergisticElement || "unknown",
      imageUrl: imageUrl,
      numberMeaning: card.numberMeaning || "No meaning provided.", // Added from numo-definitions structure
      keywords: card.keywords || [], // Added from numo-definitions structure
    }
  })
}

// This function is now a server-side function
export const getCardData = async (): Promise<OracleCard[]> => {
  try {
    const processedCards = await processCardData(rawCardData)
    return processedCards
  } catch (error) {
    console.error("Error loading card data:", error)
    return []
  }
}

// Alias for getCardData to satisfy getOracleCards export
export const getOracleCards = getCardData

// Export getAllCards as an alias for getCardData
export const getAllCards = getCardData

// This function is now a server-side function
export const getCardById = async (id: string): Promise<OracleCard | undefined> => {
  const cards = await getCardData() // Fetch all cards on the server
  return cards.find((card) => card.id === id)
}

// Alias for getCardById to satisfy getCardById export
export const getOracleCardById = getCardById

/**
 * Generates the primary standardized image path for a card.
 * Format: {number_padded}-{suit_lowercase}-{element_lowercase}.jpg
 * Example: 01-cauldron-spirit.jpg
 */
export function getCardImagePath(cardId: string, element: string): string {
  const [number, suit] = cardId.split("-")
  const paddedNumber = number.padStart(2, "0")
  const lowerSuit = suit?.toLowerCase() || ""
  const lowerElement = element.toLowerCase()
  return `${paddedNumber}-${lowerSuit}-${lowerElement}.jpg`
}

// These functions now accept cards as an argument, making them pure and usable on client if data is passed
export const getUniqueSuits = (cards: OracleCard[]): string[] => {
  const suits = new Set<string>()
  cards.forEach((card) => suits.add(card.suit))
  return Array.from(suits).sort()
}

export const getUniqueElements = (cards: OracleCard[]): string[] => {
  const elements = new Set<string>()
  cards.forEach((card) => {
    elements.add(card.baseElement)
    if (card.synergisticElement) {
      elements.add(card.synergisticElement)
    }
  })
  return Array.from(elements).sort()
}

export const getUniqueNumbers = (cards: OracleCard[]): string[] => {
  const numbers = new Set<string>()
  cards.forEach((card) => numbers.add(card.number))
  return Array.from(numbers).sort((a, b) => Number.parseInt(a) - Number.parseInt(b))
}

interface FilterOptions {
  suit?: string
  element?: string
  number?: string
  query?: string
}

export const filterCards = (cards: OracleCard[], options: FilterOptions): OracleCard[] => {
  return cards.filter((card) => {
    const matchesSuit = !options.suit || card.suit.toLowerCase() === options.suit.toLowerCase()
    const matchesElement =
      !options.element ||
      card.baseElement.toLowerCase() === options.element.toLowerCase() ||
      card.synergisticElement.toLowerCase() === options.element.toLowerCase()
    const matchesNumber = !options.number || card.number === options.number
    const matchesQuery =
      !options.query ||
      card.fullTitle.toLowerCase().includes(options.query.toLowerCase()) ||
      card.keyMeanings.some((meaning) => meaning.toLowerCase().includes(options.query!.toLowerCase())) ||
      card.symbolismBreakdown.some((symbol) => symbol.toLowerCase().includes(options.query!.toLowerCase()))

    return matchesSuit && matchesElement && matchesNumber && matchesQuery
  })
}

export const sortCards = (cards: OracleCard[], sortBy: CardSortOption): OracleCard[] => {
  return [...cards].sort((a, b) => {
    if (sortBy === "number") {
      return Number.parseInt(a.number) - Number.parseInt(b.number)
    } else if (sortBy === "suit") {
      return a.suit.localeCompare(b.suit)
    } else if (sortBy === "title") {
      return a.fullTitle.localeCompare(b.fullTitle)
    } else if (sortBy === "element") {
      return a.baseElement.localeCompare(b.baseElement)
    }
    return 0
  })
}

export const debugCardLoading = (cards: OracleCard[]): number => {
  // This function is intended for debugging purposes to confirm card loading.
  // It returns the number of cards currently loaded.
  return cards.length
}

// Re-export getSymbolValue from numerology.ts to satisfy the missing export error
export { getSymbolValue }
