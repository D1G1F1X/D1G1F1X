export interface OracleCard {
  id: string
  number: string // Changed from number to string to match JSON data
  suit: string
  fullTitle: string
  name: string // Added name as it's used in OracleCardManager
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
  baseElement?: string // Added to match data structure
  synergisticElement?: string // Added to match data structure
  iconSymbol?: string // Added to match data structure
  keyMeanings: string[] // Added to match data structure
  symbolismBreakdown: string[] // Added to match data structure
  orientation?: string // Added to match data structure
  sacredGeometry?: string // Added to match data structure
  planetInternalInfluence?: string // Added to match data structure
  astrologyExternalDomain?: string // Added to match data structure
}
