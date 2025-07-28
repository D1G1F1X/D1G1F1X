export interface OracleCard {
  id: string
  number: string
  suit: string
  fullTitle: string
  name: string
  pair: string
  description: string
  numberMeaning: string
  sacredGeometryName: string
  sacredGeometryMeaning: string
  centerIconName: string
  centerIconMeaning: string
  planetName: string
  planetMeaning: string
  astroSignName: string
  astroSignMeaning: string
  elements: Record<string, { influence: string; guidance: string; baseElementNote?: boolean }>
  keywords?: string[]
  baseElement: string
  synergisticElement: string
  iconSymbol: string
  keyMeanings: string[]
  symbolismBreakdown: string[]
  orientation?: string
  sacredGeometry?: string
  planetInternalInfluence?: string
  astrologyExternalDomain?: string
  symbols: { key: string; value: string }[]
}

export interface CardSpread {
  id: string
  name: string
  description: string
  numCards: number
  layout: { x: number; y: number; label: string }[]
}

export interface CardReading {
  id: string
  userId: string
  spreadId: string
  timestamp: string
  cards: {
    cardId: string
    position: number
    label: string
    meaning: string
  }[]
  readingText: string
  title?: string
  notes?: string
  isPublic?: boolean
  shareUrl?: string
}

export interface CardImagePaths {
  [key: string]: string // e.g., "01cauldron-fire.jpg": "https://blob.vercel-storage.com/..."
}
