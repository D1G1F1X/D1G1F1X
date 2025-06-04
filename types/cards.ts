export interface CardEnd {
  number: number
  meaning: string
  shadowAspect: string
  keywords: string[]
  sacredGeometry: string
  planet: string
  astrologicalSign: string
  elementalAffinity: string
  suitOrientation?: string
  baseElement?: string
  dominantElement?: string
  icon?: string
}

export interface OracleCard {
  id: string
  name: string
  element: string
  type: string
  firstEnd: CardEnd
  secondEnd: CardEnd
  firstEndImage: string
  secondEndImage: string
}

export interface CardDataset {
  version: string
  lastUpdated: string
  source: string
  cards: OracleCard[]
}

export type CardProps = OracleCard
export type CardData = OracleCard
