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
  suit: string
  fullTitle: string
  symbols: { key: string; value: string }[]
  symbolismBreakdown: string[]
  keyMeanings: string[]
  baseElement: string
  planetExternalDomain: string // Planet now represents external domain
  astrologyInternalInfluence: string // Astrology now represents internal influence
  iconSymbol: string
  orientation: string
  sacredGeometry: string
  synergisticElement: string
  imagePath?: string // Optional, for client-side image handling
}

// Alias CardData to OracleCard for consistency with existing functions
export type CardData = OracleCard
