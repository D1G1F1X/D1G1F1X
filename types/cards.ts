export interface OracleCard {
  id: string
  number: string
  suit: string
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
  synergisticElement: string
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
    endUp: "first" | "second" // This is a runtime property for display, not part of OracleCard itself
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
