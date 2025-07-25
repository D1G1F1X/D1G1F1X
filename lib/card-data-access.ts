import type { OracleCard, CardSymbolKey } from "@/types/cards"
import { numoNumberDefinitions } from "@/data/numo-definitions"

/**
 * Retrieves a specific symbol value from an OracleCard based on its key.
 * This function is designed to safely access nested properties or properties
 * that might be represented differently across card data.
 *
 * @param card The OracleCard object.
 * @param key The key of the symbol to retrieve (e.g., "Orientation", "Planet (Internal Influence)").
 * @returns The string value of the symbol, or undefined if not found.
 */
export function getSymbolValue(card: OracleCard, key: CardSymbolKey): string | undefined {
  // Direct access for common top-level properties
  switch (key) {
    case "Number":
      return card.number?.toString()
    case "Suit":
      return card.suit
    case "Element (Base)":
      return card.baseElement
    case "Planet (Internal Influence)":
      return card.planetInternalInfluence
    case "Astrology (External Domain)":
      return card.astrologyExternalDomain
    case "Icon":
      return card.iconSymbol
    case "Orientation":
      return card.orientation
    case "Sacred Geometry":
      return card.sacredGeometry
    case "Synergistic Element":
      return card.synergisticElement
    default:
      // For other keys, iterate through the 'symbols' array if it exists
      if (card.symbols && Array.isArray(card.symbols)) {
        const symbolEntry = card.symbols.find((s) => s.key === key)
        return symbolEntry?.value
      }
      return undefined
  }
}

/**
 * Fetches comprehensive data for a specific card by its ID.
 * This function combines the base card data with its detailed numerology definitions.
 *
 * @param cardId The ID of the card to fetch.
 * @returns The comprehensive OracleCard object, or undefined if not found.
 */
export function getComprehensiveCardData(cardId: string): OracleCard | undefined {
  const card = numoNumberDefinitions.find((c) => c.id === cardId)
  if (!card) {
    return undefined
  }

  // Optionally, enrich the card with numerology report if it has a number and is relevant
  // This part is illustrative and might need adjustment based on how numerology is linked to cards
  // For now, we'll just return the card as is, assuming numoNumberDefinitions already has all needed data.
  return card as OracleCard // Cast to OracleCard as numoNumberDefinitions items are OracleCard-like
}

/**
 * Retrieves all available Oracle Cards with their comprehensive data.
 * @returns An array of OracleCard objects.
 */
export function getAllOracleCards(): OracleCard[] {
  return numoNumberDefinitions as OracleCard[]
}

/**
 * Retrieves a specific card by its full title.
 * @param fullTitle The full title of the card.
 * @returns The OracleCard object, or undefined if not found.
 */
export function getCardByFullTitle(fullTitle: string): OracleCard | undefined {
  return numoNumberDefinitions.find((card) => card.fullTitle === fullTitle) as OracleCard | undefined
}

/**
 * Retrieves a specific card by its number and suit.
 * @param number The number of the card.
 * @param suit The suit of the card.
 * @returns The OracleCard object, or undefined if not found.
 */
export function getCardByNumberAndSuit(number: string, suit: string): OracleCard | undefined {
  return numoNumberDefinitions.find((card) => card.number === number && card.suit === suit) as OracleCard | undefined
}

export function filterCards(
  cards: OracleCard[],
  filters: { suit?: string; element?: string; number?: string; query?: string },
): OracleCard[] {
  return cards.filter((card) => {
    const matchesSuit = filters.suit ? card.suit === filters.suit : true
    const matchesElement = filters.element ? card.baseElement === filters.element : true
    const matchesNumber = filters.number ? card.number === filters.number : true
    const matchesQuery = filters.query
      ? card.fullTitle.toLowerCase().includes(filters.query.toLowerCase()) ||
        card.keyMeanings?.some((m) => m.toLowerCase().includes(filters.query!.toLowerCase())) ||
        card.symbolismBreakdown?.some((s) => s.toLowerCase().includes(filters.query!.toLowerCase()))
      : true
    return matchesSuit && matchesElement && matchesNumber && matchesQuery
  })
}

export type CardSortOption = "number" | "fullTitle" | "suit" | "baseElement"

export function sortCards(cards: OracleCard[], sortBy: CardSortOption): OracleCard[] {
  return [...cards].sort((a, b) => {
    if (sortBy === "number") {
      return Number.parseInt(a.number || "0") - Number.parseInt(b.number || "0")
    }
    if (sortBy === "fullTitle") {
      return a.fullTitle.localeCompare(b.fullTitle)
    }
    if (sortBy === "suit") {
      return a.suit.localeCompare(b.suit)
    }
    if (sortBy === "baseElement") {
      return a.baseElement.localeCompare(b.baseElement)
    }
    return 0
  })
}
