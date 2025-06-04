import comprehensiveCardData from "../data/comprehensive-card-data.json"
import type { OracleCard } from "@/types/cards"
import masterDeckCardsData from "@/data/master-deck-cards.json" // Direct import of the JSON file

/**
 * Utility functions for accessing card data consistently across the application
 */

/**
 * Gets all available cards from the master deck.
 */
export function getAllCards(): OracleCard[] {
  // Type assertion to ensure the imported JSON matches OracleCard[]
  return masterDeckCardsData as OracleCard[]
}

/**
 * Gets a card by its ID from the master deck.
 */
export function getCardById(id: string): OracleCard | undefined {
  const allCards = getAllCards()
  return allCards.find((card) => card.id === id)
}

/**
 * Gets cards filtered by element
 */
export function getCardsByElement(element: string): OracleCard[] {
  const allCards = getAllCards()
  return allCards.filter((card) => card.element.toLowerCase() === element.toLowerCase())
}

/**
 * Gets cards filtered by type
 */
export function getCardsByType(type: string): OracleCard[] {
  const allCards = getAllCards()
  return allCards.filter((card) => card.type.toLowerCase() === type.toLowerCase())
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
  return end === "first" ? card.firstEndImage : card.secondEndImage
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
  return comprehensiveCardData
}

/**
 * Gets a card by its number
 */
export function getCardByNumber(number: number) {
  return comprehensiveCardData[number.toString()]
}

/**
 * Gets the elemental influence of a card by number and element
 */
export function getElementalInfluence(number: number, element: string) {
  const card = getCardByNumber(number)
  if (!card || !card.elements || !card.elements[element]) {
    return null
  }
  return card.elements[element]
}

/**
 * Gets the base element of a card by number
 */
export function getBaseElement(number: number) {
  const card = getCardByNumber(number)
  if (!card || !card.elements) {
    return null
  }

  // Find the element that has baseElementNote property
  for (const [element, data] of Object.entries(card.elements)) {
    if (data.baseElementNote) {
      return element
    }
  }

  return null
}

// Add more utility functions as needed
