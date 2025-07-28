import masterCardData from "@/data/master-card-data.json"
import type { OracleCard } from "@/types/cards"

// Singleton for image paths
let _imagePaths: Record<string, string> = {}

/**
 * Initializes the image paths. This should be called once, e.g., in a layout or a top-level component.
 * @param paths The image paths data.
 */
export function initializeImagePaths(paths: Record<string, string>) {
  _imagePaths = paths
}

/**
 * Utility functions for accessing card data consistently across the application
 * Directly uses the master card data structure.
 */

// Cast the imported JSON data to the OracleCard array type
const allCards: OracleCard[] = masterCardData as OracleCard[]

/**
 * Gets all available cards from the master deck.
 */
export function getCardData(): OracleCard[] {
  return allCards
}

/**
 * Gets a card by its ID from the master deck.
 */
export function getCardById(id: string): OracleCard | undefined {
  return allCards.find((card) => card.id === id)
}

/**
 * Gets cards filtered by element (either base or synergistic).
 */
export function getCardsByElement(element: string): OracleCard[] {
  return allCards.filter(
    (card) =>
      card.baseElement?.toLowerCase() === element.toLowerCase() ||
      card.synergisticElement?.toLowerCase() === element.toLowerCase(),
  )
}

/**
 * Gets cards filtered by suit.
 */
export function getCardsBySuit(suit: string): OracleCard[] {
  return allCards.filter((card) => card.suit?.toLowerCase() === suit.toLowerCase())
}

/**
 * Gets a random selection of cards.
 */
export function getRandomCards(count: number): OracleCard[] {
  const shuffled = [...allCards].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

/**
 * Gets the image path for a card based on its number, suit, and element.
 * It first tries to find a blob URL from the initialized imagePaths, then falls back to a local path.
 * The 'end' parameter determines whether to use the baseElement or synergisticElement for the path.
 * This function is synchronous.
 */
export function getCardImagePath(card: OracleCard, end: "first" | "second"): string {
  if (!card) return "/placeholder.svg"

  const numberStr = card.number?.toString().padStart(2, "0") || "00"
  const suitStr = card.suit?.toLowerCase() || "unknown"
  const elementStr =
    end === "first" ? card.baseElement?.toLowerCase() || "spirit" : card.synergisticElement?.toLowerCase() || "spirit"

  // Construct the descriptive key used in card-image-paths.json
  // Example: "01cauldron-spirit.jpg"
  const descriptiveKey = `${numberStr}${suitStr}-${elementStr}.jpg`

  // If blob URL is found in the initialized paths, use it
  if (_imagePaths[descriptiveKey]) {
    return _imagePaths[descriptiveKey]
  }

  // Fallback to local path if blob URL not found
  // Example: "/cards/01-cauldron-spirit.jpg"
  return `/cards/${numberStr}-${suitStr}-${elementStr}.jpg`
}

/**
 * Gets a card by its number (returns the actual numerical value, not derived).
 */
export function getCardByNumber(number: string | number): OracleCard | undefined {
  const numStr = number.toString()
  return allCards.find((card) => card.number === numStr)
}

/**
 * Gets the numerical value of a card as an integer.
 * FIXED: This function was potentially causing issues by doing complex calculations.
 * Now it simply parses the number field directly.
 */
export function getCardNumericalValue(card: OracleCard): number {
  if (!card || !card.number) return 0
  return Number.parseInt(card.number, 10)
}

/**
 * Gets the base element of a card.
 */
export function getBaseElement(card: OracleCard): string | undefined {
  return card?.baseElement
}

/**
 * Gets the synergistic element of a card.
 */
export function getSynergisticElement(card: OracleCard): string | undefined {
  return card?.synergisticElement
}

/**
 * Gets all symbolism breakdown entries for a card.
 */
export function getCardSymbolismBreakdown(card: OracleCard): string[] {
  return card?.symbolismBreakdown || []
}

/**
 * Gets a specific symbol value by key from the 'symbols' array.
 * FIXED: This function was potentially returning incorrect number values.
 */
export function getSymbolValue(card: OracleCard, key: string): string | undefined {
  if (!card || !card.symbols) return undefined
  const symbolEntry = card.symbols.find((s) => s.key === key)
  return symbolEntry ? symbolEntry.value : undefined
}

/**
 * Gets all unique suits from the cards.
 */
export function getAllSuits(): string[] {
  const suits = new Set(allCards.map((card) => card.suit).filter(Boolean))
  return Array.from(suits).sort()
}

/**
 * Gets all unique elements from the cards.
 */
export function getAllElements(): string[] {
  const elements = new Set([
    ...allCards.map((card) => card.baseElement).filter(Boolean),
    ...allCards.map((card) => card.synergisticElement).filter(Boolean),
  ])
  return Array.from(elements).sort()
}

/**
 * Validates that a card's number matches its intended numerical value.
 */
export function validateCardNumber(card: OracleCard): boolean {
  if (!card || !card.number) return false

  // Extract the expected number from the card ID (e.g., "5-Sword" should have number "5")
  const expectedNumber = card.id.split("-")[0]
  return card.number === expectedNumber
}

/**
 * Check data integrity (placeholder for actual validation logic).
 * This function now primarily checks for missing critical fields and validates card numbers.
 */
export function checkDataIntegrity() {
  const issues: string[] = []

  allCards.forEach((card) => {
    if (!card.id) issues.push(`Card missing ID: ${JSON.stringify(card)}`)
    if (!card.number) issues.push(`Card ${card.id} missing number`)
    if (!card.suit) issues.push(`Card ${card.id} missing suit`)
    if (!card.fullTitle) issues.push(`Card ${card.id} missing fullTitle`)
    if (!card.baseElement) issues.push(`Card ${card.id} missing baseElement`)
    if (!card.synergisticElement) issues.push(`Card ${card.id} missing synergisticElement`)
    if (!card.keyMeanings || card.keyMeanings.length === 0) issues.push(`Card ${card.id} missing keyMeanings`)
    if (!card.symbolismBreakdown || card.symbolismBreakdown.length === 0)
      issues.push(`Card ${card.id} missing symbolismBreakdown`)
    if (!card.symbols || card.symbols.length === 0) issues.push(`Card ${card.id} missing symbols array`)

    // Validate that the card number matches its ID
    if (!validateCardNumber(card)) {
      issues.push(`Card ${card.id} has incorrect number value: expected ${card.id.split("-")[0]}, got ${card.number}`)
    }
  })

  return issues
}

/**
 * Gets cards in numerical order (0-9).
 */
export function getCardsInNumericalOrder(): OracleCard[] {
  return [...allCards].sort((a, b) => {
    const numA = getCardNumericalValue(a)
    const numB = getCardNumericalValue(b)
    return numA - numB
  })
}

/**
 * Gets cards by their numerical value range.
 */
export function getCardsByNumberRange(min: number, max: number): OracleCard[] {
  return allCards.filter((card) => {
    const num = getCardNumericalValue(card)
    return num >= min && num <= max
  })
}
