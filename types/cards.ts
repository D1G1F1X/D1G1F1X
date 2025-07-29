/**
 * Defines the suits of the Oracle cards.
 */
export type CardSuit = "Cauldron" | "Sword" | "Spear" | "Stone" | "Cord"

/**
 * Defines the elements of the Oracle cards.
 */
export type CardElement = "Fire" | "Water" | "Air" | "Earth" | "Spirit"

/**
 * Represents a single symbol entry within an Oracle card's data.
 */
export interface Symbol {
  key: string
  value: string
}

/**
 * Defines the comprehensive structure for an Oracle Card, including all its symbolic meanings and properties.
 */
export interface OracleCard {
  id: string // Unique identifier, e.g., "0-Cauldron"
  number: string // Numerical value as a string, e.g., "0", "1", "9"
  suit: CardSuit // The suit of the card, e.g., "Cauldron", "Sword"
  fullTitle: string // Full title of the card, e.g., "0 Cauldron – The Cauldron of Creation"
  symbols: Symbol[] // Array of key-value pairs for various symbols
  symbolismBreakdown: string[] // Detailed breakdown of each symbol's meaning
  keyMeanings: string[] // Concise key meanings/interpretations
  baseElement: CardElement // The primary elemental association
  planetInternalInfluence: string // Planetary influence
  astrologyExternalDomain: string // Astrological domain
  iconSymbol: string // A symbolic icon string (e.g., "Pentagram", "Delta")
  orientation: string // The orientation of the card/icon, e.g., "Cooking", "Point First"
  sacredGeometry: string // Sacred geometry associated with the card
  synergisticElement: CardElement // The secondary, synergistic elemental association
  imagePath?: string // Optional: path to the card image (will be resolved dynamically)
  imageFileName?: string // Add this line
}

/**
 * Alias for OracleCard, used for clarity in different contexts.
 */
export type CardData = OracleCard

/**
 * Defines the structure for a card reading.
 */
export interface Reading {
  id: string
  question: string
  cards: OracleCard[] // The cards drawn for this reading
  reading: string // The AI-generated or manual interpretation
  spreadType: string // e.g., "single", "three", "five"
  fullName?: string
  birthPlace?: string
  date: string // ISO string of the reading date
  isFavorite: boolean
}
