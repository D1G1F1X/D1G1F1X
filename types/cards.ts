export type CardSuit = "Cauldron" | "Sword" | "Cord" | "Spear" | "Stone"
export type CardElement = "Spirit" | "Water" | "Earth" | "Air" | "Fire"

export interface CardSymbol {
  key: string
  value: string
}

export interface Symbol {
  key: string
  value: string
}

export interface OracleCard {
  id: string
  number: string
  suit: CardSuit
  fullTitle: string
  symbols: Symbol[]
  symbolismBreakdown: string[]
  keyMeanings: string[]
  baseElement: CardElement
  planetInternalInfluence: string // Matches source data: "Planet (Internal Influence)"
  astrologyExternalDomain: string // Matches source data: "Astrology (External Domain)"
  iconSymbol: string
  orientation: string
  sacredGeometry: string
  synergisticElement: CardElement
  imagePath?: string // Optional, for client-side image handling
}

// Alias CardData to OracleCard for consistency with existing functions
export type CardData = OracleCard
