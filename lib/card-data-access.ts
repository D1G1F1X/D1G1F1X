import masterCardData from "@/data/master-card-data.json"
import type { OracleCard } from "@/types/cards"

/**
 * Utility functions for accessing card data consistently across the application
 */

/**
 * Gets all available cards from the master deck.
 */
export function getAllCards(): OracleCard[] {
  // Transform the data to ensure compatibility with existing components
  return (masterCardData as any[]).map(transformCardData)
}

/**
 * Transform the new card data format to be compatible with existing components
 */
function transformCardData(card: any): OracleCard {
  if (!card) {
    console.warn("Attempted to transform undefined or null card data")
    return createDefaultCard()
  }

  try {
    // Helper to extract value from symbols array
    const getSymbolValueByKey = (key: string) => card.symbols?.find((s: any) => s.key === key)?.value || "Unknown"

    // Helper to extract meaning from symbolismBreakdown based on a keyword
    const extractMeaningFromBreakdown = (breakdown: string[], keyword: string) => {
      const line = breakdown.find((line) => line.includes(keyword))
      return line ? line.split(": ")[1] : "No meaning available"
    }

    return {
      id: card.id || generateUniqueId(),
      number: card.number || "0", // Direct mapping from new JSON
      suit: card.suit || "Unknown", // Direct mapping from new JSON
      fullTitle: card.fullTitle || "Unknown Card", // Direct mapping from new JSON
      symbols: card.symbols || [], // Direct mapping from new JSON
      symbolismBreakdown: card.symbolismBreakdown || [], // Direct mapping from new JSON
      keyMeanings: card.keyMeanings || [], // Direct mapping from new JSON
      baseElement: card.baseElement || "Spirit", // Direct mapping from new JSON
      planetInternalInfluence: card.planetInternalInfluence || "Unknown", // Direct mapping from new JSON
      astrologyExternalDomain: card.astrologyExternalDomain || "Unknown", // Direct mapping from new JSON
      iconSymbol: card.iconSymbol || "Unknown", // Direct mapping from new JSON
      orientation: card.orientation || "Unknown", // Direct mapping from new JSON
      sacredGeometry: card.sacredGeometry || "Unknown", // Direct mapping from new JSON
      synergisticElement: card.synergisticElement || "Spirit", // Direct mapping from new JSON

      firstEnd: {
        number: Number(card.number) || 0,
        meaning: card.keyMeanings?.[0] || "No meaning available",
        // shadowAspect removed
        // keywords removed, using keyMeanings directly
        sacredGeometry: card.sacredGeometry || "Unknown",
        planet: card.planetInternalInfluence?.split(" – ")[0] || "Unknown", // Extract just the planet name
        astrologicalSign: card.astrologyExternalDomain?.split(" – ")[0] || "Unknown", // Extract just the sign name
        icon: card.iconSymbol || "Unknown",
        suitOrientation: card.orientation || "Unknown",
        baseElement: card.baseElement || "Spirit",
        dominantElement: card.synergisticElement || "Spirit", // Using synergisticElement as dominant
        expandedMeaning: extractMeaningFromBreakdown(card.symbolismBreakdown || [], "Number"), // Example of deriving expanded meaning
      },
      secondEnd: {
        number: Number(card.number) || 0, // Assuming second end also uses the same number
        meaning: card.keyMeanings?.[2] || "No meaning available",
        // shadowAspect removed
        // keywords removed, using keyMeanings directly
        sacredGeometry: card.sacredGeometry || "Unknown",
        planet: card.planetInternalInfluence?.split(" – ")[0] || "Unknown",
        astrologicalSign: card.astrologyExternalDomain?.split(" – ")[0] || "Unknown",
        icon: card.iconSymbol || "Unknown",
        suitOrientation: card.orientation || "Unknown",
        baseElement: card.baseElement || "Spirit",
        dominantElement: card.synergisticElement || "Spirit",
        expandedMeaning: extractMeaningFromBreakdown(card.symbolismBreakdown || [], "Synergistic Element"), // Example of deriving expanded meaning
      },
      firstEndImage: constructImagePath(card, "first"),
      secondEndImage: constructImagePath(card, "second"),
    }
  } catch (error) {
    console.error("Error transforming card data:", error, card)
    return createDefaultCard(card.id)
  }
}

/**
 * Construct image path with proper formatting
 */
function constructImagePath(card: any, end: "first" | "second"): string {
  if (!card) return "/placeholder.svg"

  const number = card.number || "00"
  const suit = card.suit?.toLowerCase() || "unknown"
  const element =
    end === "first" ? card.baseElement?.toLowerCase() || "spirit" : card.synergisticElement?.toLowerCase() || "spirit"

  return `/cards/${number}${suit}-${element}.jpg`
}

/**
 * Create a default card for error cases
 */
function createDefaultCard(id?: string): OracleCard {
  return {
    id: id || generateUniqueId(),
    number: "0",
    suit: "Unknown",
    fullTitle: "Unknown Card",
    symbols: [],
    symbolismBreakdown: [],
    keyMeanings: [],
    baseElement: "Spirit",
    planetInternalInfluence: "Unknown",
    astrologyExternalDomain: "Unknown",
    iconSymbol: "Unknown",
    orientation: "Unknown",
    sacredGeometry: "Unknown",
    synergisticElement: "Spirit",
    firstEnd: {
      number: 0,
      meaning: "No meaning available",
      // shadowAspect removed
      // keywords removed
      sacredGeometry: "Unknown",
      planet: "Unknown",
      astrologicalSign: "Unknown",
      icon: "Unknown",
      suitOrientation: "Unknown",
      baseElement: "Unknown",
      dominantElement: "Unknown",
    },
    secondEnd: {
      number: 0,
      meaning: "No meaning available",
      // shadowAspect removed
      // keywords removed
      sacredGeometry: "Unknown",
      planet: "Unknown",
      astrologicalSign: "Unknown",
      icon: "Unknown",
      suitOrientation: "Unknown",
      baseElement: "Unknown",
      dominantElement: "Unknown",
    },
    firstEndImage: "/placeholder.svg",
    secondEndImage: "/placeholder.svg",
  }
}

/**
 * Generate a unique ID for cards that don't have one
 */
function generateUniqueId(): string {
  return `card-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Gets a card by its ID from the master deck.
 */
export function getCardById(id: string): OracleCard | undefined {
  const masterCard = (masterCardData as any[]).find((card) => card.id === id)
  return masterCard ? transformCardData(masterCard) : undefined
}

/**
 * Gets cards filtered by element
 */
export function getCardsByElement(element: string): OracleCard[] {
  const allCards = getAllCards()
  return allCards.filter(
    (card) =>
      card.baseElement?.toLowerCase() === element.toLowerCase() ||
      card.synergisticElement?.toLowerCase() === element.toLowerCase(),
  )
}

/**
 * Gets cards filtered by type
 */
export function getCardsByType(type: string): OracleCard[] {
  const allCards = getAllCards()
  return allCards.filter((card) => card.suit?.toLowerCase() === type.toLowerCase())
}

/**
 * Gets a random selection of cards
 */
export function getRandomCards(count: number): OracleCard[] {
  const allCards = getAllCards()
  const shuffled = [...allCards].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

/**
 * Gets the image path for a card
 */
export function getCardImagePath(card: OracleCard, end: "first" | "second"): string {
  if (!card) return "/placeholder.svg"

  if (end === "first") {
    return card.firstEndImage || constructImagePath(card, "first")
  } else {
    return card.secondEndImage || constructImagePath(card, "second")
  }
}

/**
 * Gets the card end data
 */
export function getCardEnd(card: OracleCard, end: "first" | "second") {
  return end === "first" ? card.firstEnd : card.secondEnd
}

/**
 * Gets comprehensive card data
 */
export function getComprehensiveCardData() {
  return masterCardData
}

/**
 * Gets a card by its number
 */
export function getCardByNumber(number: string | number) {
  const numStr = number.toString()
  return (masterCardData as any[]).find((card) => card.number === numStr)
}

/**
 * Gets the base element of a card
 */
export function getBaseElement(card: any): string | undefined {
  return card?.baseElement
}

/**
 * Gets the synergistic element of a card
 */
export function getSynergisticElement(card: any): string | undefined {
  return card?.synergisticElement
}

/**
 * Gets all symbols for a card
 */
export function getCardSymbols(card: any) {
  return card?.symbolismBreakdown || []
}

/**
 * Gets a specific symbol value by key
 */
export function getSymbolValue(card: any, key: string): string | undefined {
  if (!card) return undefined

  // The new JSON has a 'symbols' array, so we can look up values there
  const symbolEntry = card.symbols?.find((s: any) => s.key === key)
  if (symbolEntry) return symbolEntry.value

  // Fallback to old keys if needed, though new structure is preferred
  // These fallbacks are now less critical as symbols array is primary
  if (key === "sacredGeometry") return card?.sacredGeometry
  if (key === "planet") return card?.planetInternalInfluence
  if (key === "astrology") return card?.astrologyExternalDomain

  return undefined
}

/**
 * Gets all unique suits from the cards
 */
export function getAllSuits(): string[] {
  const suits = new Set(masterCardData.map((card: any) => card.suit).filter(Boolean))
  return Array.from(suits).sort()
}

/**
 * Gets all unique elements from the cards
 */
export function getAllElements(): string[] {
  const elements = new Set([
    ...masterCardData.map((card: any) => card.baseElement).filter(Boolean),
    ...masterCardData.map((card: any) => card.synergisticElement).filter(Boolean),
  ])
  return Array.from(elements).sort()
}

/**
 * Check data integrity between master data and transformed data
 */
export function checkDataIntegrity() {
  const masterData = masterCardData as any[]
  const transformedData = getAllCards()

  const issues: string[] = []

  // Check for cards in transformed data that don't exist in master data
  transformedData.forEach((card) => {
    const masterCard = masterData.find((m) => m.id === card.id)
    if (!masterCard) {
      issues.push(`Card ${card.id} exists in transformed data but not in master data`)
      return
    }

    // Check various properties for consistency with the new master data structure
    if (card.fullTitle !== masterCard.fullTitle) {
      issues.push(`Card ${card.id} fullTitle mismatch: ${card.fullTitle} vs ${masterCard.fullTitle}`)
    }

    if (card.baseElement !== masterCard.baseElement) {
      issues.push(`Card ${card.id} baseElement mismatch: ${card.baseElement} vs ${masterCard.baseElement}`)
    }

    // Check keyMeanings array length and first/third elements (as they are used for meaning)
    if (!card.keyMeanings || card.keyMeanings.length < 4) {
      issues.push(`Card ${card.id} has insufficient keyMeanings (expected at least 4)`)
    } else {
      if (card.keyMeanings?.[0] !== (masterCard.keyMeanings?.[0] || "No meaning available")) {
        issues.push(`Card ${card.id} first keyMeaning mismatch`)
      }
      if (card.keyMeanings?.[2] !== (masterCard.keyMeanings?.[2] || "No meaning available")) {
        issues.push(`Card ${card.id} third keyMeaning mismatch`)
      }
    }

    // Check if symbolismBreakdown is correctly mapped
    if (JSON.stringify(card.symbolismBreakdown) !== JSON.stringify(masterCard.symbolismBreakdown)) {
      issues.push(`Card ${card.id} symbolismBreakdown mismatch`)
    }

    // Check if symbols array is correctly mapped
    if (JSON.stringify(card.symbols) !== JSON.stringify(masterCard.symbols)) {
      issues.push(`Card ${card.id} symbols array mismatch`)
    }
  })

  // Check for cards in master data that don't exist in transformed data
  masterData.forEach((masterCard) => {
    const card = transformedData.find((c) => c.id === masterCard.id)
    if (!card) {
      issues.push(`Card ${masterCard.id} exists in master data but not in transformed data`)
    }
  })

  return issues
}
