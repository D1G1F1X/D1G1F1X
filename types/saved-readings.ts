import type { CardProps } from "./cards"

export interface SavedReading {
  id: string
  title: string
  date: string
  question: string
  spreadType: string
  cards: { card: CardProps; endUp: "first" | "second" }[]
  basicReading: string
  advancedReading?: string
  notes?: string
}

export interface ReadingHistoryItem {
  id: string
  date: string
  title: string
  spreadType: string
  cardCount: number
  previewImage: string | undefined
}
