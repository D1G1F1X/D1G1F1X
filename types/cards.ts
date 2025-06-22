interface Symbol {
  key: string
  value: string
}

export interface OracleCard {
  id: string
  number: string
  suit: string
  fullTitle: string
  symbols: Symbol[]
  symbolismBreakdown: string[]
  keyMeanings: string[]
  baseElement: string
  planetInternalInfluence: string
  astrologyExternalDomain: string
  iconSymbol: string
  orientation: string
  sacredGeometry: string
  synergisticElement: string
  imagePath?: string // For storing the resolved image URL
  imageFileName?: string // Add this line
}
