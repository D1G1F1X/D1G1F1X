import type { OracleCard } from "@/types/cards" // Assuming OracleCard type is defined here
import masterCardData from "@/data/master-card-data.json"

/**
 * Provides centralized access to the master Oracle Card data.
 * This function ensures that the data is always loaded from the JSON file.
 */
export function getAllCards(): OracleCard[] {
  // The JSON import directly provides the data.
  // No additional fetching or parsing is needed here.
  return masterCardData as OracleCard[]
}

/**
 * Retrieves a single Oracle Card by its ID.
 * @param id The ID of the card (e.g., "1-Cauldron", "6-9-Spirit").
 * @returns The OracleCard object if found, otherwise undefined.
 */
export function getCardById(id: string): OracleCard | undefined {
  return masterCardData.find((card) => card.id === id)
}

/**
 * Retrieves cards by a specific suit.
 * @param suit The suit of the cards (e.g., "Cauldron", "Sword").
 * @returns An array of OracleCard objects matching the suit.
 */
export function getCardsBySuit(suit: string): OracleCard[] {
  const lowerCaseSuit = suit.toLowerCase()
  return masterCardData.filter((card) => card.suit.toLowerCase() === lowerCaseSuit)
}

/**
 * Retrieves cards by a specific base element.
 * @param element The base element of the cards (e.g., "Fire", "Water").
 * @returns An array of OracleCard objects matching the element.
 */
export function getCardsByBaseElement(element: string): OracleCard[] {
  const lowerCaseElement = element.toLowerCase()
  return masterCardData.filter((card) => card.baseElement.toLowerCase() === lowerCaseElement)
}

/**
 * Retrieves cards by a specific synergistic element.
 * @param element The synergistic element of the cards.
 * @returns An array of OracleCard objects matching the synergistic element.
 */
export function getCardsBySynergisticElement(element: string): OracleCard[] {
  const lowerCaseElement = element.toLowerCase()
  return masterCardData.filter((card) => card.synergisticElement.toLowerCase() === lowerCaseElement)
}

/**
 * Searches for cards based on a query string across multiple fields.
 * @param query The search string.
 * @returns An array of OracleCard objects that match the query.
 */
export function searchCards(query: string): OracleCard[] {
  const lowerCaseQuery = query.toLowerCase()
  return masterCardData.filter(
    (card) =>
      card.fullTitle.toLowerCase().includes(lowerCaseQuery) ||
      card.suit.toLowerCase().includes(lowerCaseQuery) ||
      card.baseElement.toLowerCase().includes(lowerCaseQuery) ||
      card.synergisticElement.toLowerCase().includes(lowerCaseQuery) ||
      card.keyMeanings.some((meaning) => meaning.toLowerCase().includes(lowerCaseQuery)) ||
      card.symbolismBreakdown.some((breakdown) => breakdown.toLowerCase().includes(lowerCaseQuery)),
  )
}

/**
 * Returns a random subset of cards from the deck.
 * @param count The number of random cards to return.
 * @returns An array of random OracleCard objects.
 */
export function getRandomCards(count: number): OracleCard[] {
  const shuffled = [...masterCardData].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
