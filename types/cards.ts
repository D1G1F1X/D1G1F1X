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
  baseElement: CardElement // This will be derived from suit as per the rule
  planetExternalDomain: string // Renamed from planetInternalInfluence
  astrologyInternalInfluence: string // Renamed from astrologyExternalDomain
  iconSymbol: string
  orientation: string
  sacredGeometry: string
  synergisticElement: CardElement
  imagePath?: string // Optional, for client-side image handling
}

// Alias CardData to OracleCard for consistency with existing functions
export type CardData = OracleCard
