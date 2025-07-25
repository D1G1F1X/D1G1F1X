// Base types for card system
export type CardSuit = "Cauldron" | "Sword" | "Cord" | "Spear" | "Stone"
export type CardElement = "Air" | "Earth" | "Fire" | "Water" | "Spirit"
export type CardOrientation =
  | "Cooking"
  | "Pouring"
  | "Edge First"
  | "Point First"
  | "Knot Before You"
  | "Knot Away"
  | "Shaft First"
  | "Tip First"
  | "Rough Side"
  | "Smooth Side"
  | "Upright" // General upright for cards without specific orientation names
  | "Reversed" // General reversed for cards without specific orientation names

// Symbol interface for card symbols
export interface CardSymbol {
  key: string
  value: string
}

// Main Oracle Card interface
export interface OracleCard {
  id: string
  number: string // Stored as string to handle "0" and potential future non-numeric identifiers
  suit: CardSuit
  fullTitle: string
  symbols: CardSymbol[]
  symbolismBreakdown: string[]
  keyMeanings: string[]
  baseElement: CardElement
  planetInternalInfluence: string
  astrologyExternalDomain: string
  iconSymbol: string
  orientation: CardOrientation
  sacredGeometry: string
  synergisticElement: CardElement
  imagePath?: string // Optional: path to the card image
  compoundMeaning?: boolean // Indicates if it's a compound number with special meaning
}

// Validation result interface
export interface CardValidationResult {
  isValid: boolean
  errors: string[]
  conflicts: string[]
}

// Card metadata interface
export interface CardMetadata {
  suits: string[]
  elements: string[]
  numbers: number[]
  totalCards: number
}

// Filter options interface
export interface CardFilterOptions {
  suit?: string
  element?: string
  number?: string
  query?: string
}

// Sort options type
export type CardSortOption = "number" | "suit" | "title" | "element"

// Card orientation options by suit
export interface CardOrientations {
  Cauldron: ["Cooking", "Pouring"]
  Sword: ["Edge First", "Point First"]
  Cord: ["Knot Before You", "Knot Away"]
  Spear: ["Shaft First", "Tip First"]
  Stone: ["Rough Side", "Smooth Side"]
}

// Reading context interface
export interface ReadingContext {
  cards: OracleCard[]
  question?: string
  spread?: string
  timestamp: Date
}

// Card position in a reading
export interface CardPosition {
  card: OracleCard
  position: number
  orientation: string
  meaning?: string
}

// Complete reading interface
export interface OracleReading {
  id: string
  cards: CardPosition[]
  question?: string
  spread: string
  interpretation?: string
  timestamp: Date
  userId?: string
}

// Export utility types
export type CardId = string
export type CardNumber = string
export type ElementalInfluence = {
  primary: CardElement
  secondary: CardElement
}

// Card statistics interface
export interface CardStats {
  totalCards: number
  cardsBySuit: Record<CardSuit, number>
  cardsByElement: Record<CardElement, number>
  cardsByNumber: Record<string, number>
}

// Search result interface
export interface CardSearchResult {
  cards: OracleCard[]
  totalFound: number
  query: string
  filters: CardFilterOptions
}

// Card collection interface
export interface CardCollection {
  name: string
  description: string
  cards: OracleCard[]
  metadata: CardMetadata
}

// Card reading interface
export interface CardReading {
  id: string
  cards: OracleCard[]
  question?: string
  interpretation?: string
  createdAt: Date
  userId?: string
}

// Card spread interface
export interface CardSpread {
  name: string
  positions: Array<{
    name: string
    description: string
    x: number
    y: number
  }>
  description: string
}

export type CardSymbolKey =
  | "Number"
  | "Suit"
  | "Element (Base)"
  | "Planet (Internal Influence)"
  | "Astrology (External Domain)"
  | "Icon"
  | "Orientation"
  | "Sacred Geometry"
  | "Synergistic Element"
