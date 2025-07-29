// lib/card-data-access.ts
import type { OracleCard, CardData, CardSuit, CardElement } from "@/types/cards"
// Directly import the JSON data. Next.js handles large JSON files efficiently
// when imported this way in the App Router environment.
import masterCardData from "@/data/master-card-data.json"

/**
 * Retrieves all Oracle Cards from the master data.
 * @returns An array of all OracleCard objects.
 */
export function getAllCards(): OracleCard[] {
  // Cast the imported JSON data to the OracleCard array type
  return masterCardData as OracleCard[]
}

/**
 * Retrieves a single Oracle Card by its unique ID.
 * @param id The unique ID of the card (e.g., "0-Cauldron").
 * @returns The OracleCard object if found, otherwise undefined.
 */
export function getCardById(id: string): OracleCard | undefined {
  return getAllCards().find((card) => card.id === id)
}

/**
 * Retrieves all Oracle Card data. This is an alias for getAllCards.
 * @returns An array of all CardData objects.
 */
export function getAllCardData(): CardData[] {
  return masterCardData as CardData[]
}

/**
 * Retrieves a single Oracle Card by its unique ID. This is an alias for getCardById.
 * @param id The unique ID of the card (e.g., "0-Cauldron").
 * @returns The CardData object if found, otherwise undefined.
 */
export function getCardDataById(id: string): CardData | undefined {
  return getAllCardData().find((card) => card.id === id)
}

/**
 * Retrieves Oracle Cards by their suit.
 * @param suit The suit of the cards (e.g., "Cauldron").
 * @returns An array of CardData objects matching the suit.
 */
export function getCardsBySuit(suit: CardSuit): CardData[] {
  return masterCardData.filter((card) => card.suit === suit) as CardData[]
}

/**
 * Retrieves Oracle Cards by their base element.
 * @param element The base element of the cards (e.g., "Fire").
 * @returns An array of CardData objects matching the element.
 */
export function getCardsByElement(element: CardElement): CardData[] {
  return masterCardData.filter((card) => card.baseElement === element) as CardData[]
}

/**
 * Retrieves a single Oracle Card by its number and suit.
 * @param number The number of the card (e.g., "0").
 * @param suit The suit of the card (e.g., "Cauldron").
 * @returns The CardData object if found, otherwise undefined.
 */
export function getCardByNumberAndSuit(number: string, suit: CardSuit): CardData | undefined {
  return masterCardData.find((card) => card.number === number && card.suit === suit) as CardData | undefined
}

/**
 * Generates the image file name for a given card and synergistic element.
 * @param card The OracleCard object.
 * @param synergisticElement The synergistic element for the image.
 * @returns The image file name (e.g., "00cauldron-fire.jpg").
 */
export function getCardImageName(card: CardData, synergisticElement: CardElement): string {
  const number = card.number.padStart(2, "0")
  const suit = card.suit.toLowerCase()
  const element = synergisticElement.toLowerCase()
  return `${number}${suit}-${element}.jpg`
}

/**
 * Generates the full image path for a given card and synergistic element.
 * @param card The OracleCard object.
 * @param synergisticElement The synergistic element for the image.
 * @returns The full image path (e.g., "/cards/00cauldron-fire.jpg").
 */
export function getCardImagePath(card: CardData, synergisticElement: CardElement): string {
  const imageName = getCardImageName(card, synergisticElement)
  return `/cards/${imageName}`
}

/**
 * Retrieves all possible card image paths based on master data and elements.
 * @returns An array of all possible card image paths.
 */
export function getCardImagePaths(): string[] {
  const paths: string[] = []
  masterCardData.forEach((card) => {
    const elements: CardElement[] = ["Air", "Earth", "Fire", "Spirit", "Water"]
    elements.forEach((element) => {
      paths.push(getCardImagePath(card as CardData, element))
    })
  })
  return paths
}

/**
 * Retrieves all possible card image paths for a specific card ID.
 * @param cardId The ID of the card.
 * @returns An array of image paths for the specified card.
 */
export function getCardImagePathsForCard(cardId: string): string[] {
  const card = getCardDataById(cardId)
  if (!card) {
    return []
  }
  const paths: string[] = []
  const elements: CardElement[] = ["Air", "Earth", "Fire", "Spirit", "Water"]
  elements.forEach((element) => {
    paths.push(getCardImagePath(card, element))
  })
  return paths
}
