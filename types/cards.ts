export interface CardEnd {
  number: number
  meaning: string
  // shadowAspect?: string // Removed as per request
  // keywords?: string[] // Removed as per request, keyMeanings are used directly
  sacredGeometry?: string
  planet?: string
  astrologicalSign?: string
  icon?: string
  suitOrientation?: string
  baseElement?: string
  dominantElement?: string // Renamed from synergisticElement for consistency with old structure
  expandedMeaning?: string // This might be derived from symbolismBreakdown
  // elementalGuidance is removed as it's not directly structured in the new JSON
}

export interface OracleCard {
  id: string
  number: string // Direct mapping from new JSON's "number" field
  suit: string // Direct mapping from new JSON's "suit" field
  fullTitle: string
  symbols: { key: string; value: string }[]
  symbolismBreakdown: string[]
  keyMeanings: string[]
  baseElement: string
  planetInternalInfluence: string
  astrologyExternalDomain: string
  iconSymbol: string
  orientation: string
  sacredGeometry: string
  synergisticElement: string // Direct mapping from new JSON

  // Removed old backward-compatible fields:
  // name: string
  // element: string
  // type: string
  // description?: string

  firstEnd: CardEnd
  secondEnd: CardEnd
  firstEndImage?: string
  secondEndImage?: string
}

export interface CardCollection {
  id: string
  name: string
  description: string
  cards: OracleCard[]
}

export interface CardReading {
  id: string
  date: string
  question?: string
  cards: {
    card: OracleCard
    position: string
    endUp: "first" | "second"
  }[]
  interpretation?: string
  userId?: string
}

export interface CardSpread {
  id: string
  name: string
  description: string
  positions: {
    name: string
    description: string
  }[]
}
