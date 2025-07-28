import masterCardData from "@/data/master-card-data.json"
import type { OracleCard } from "@/types/cards"

export function getAllCards(): OracleCard[] {
  return masterCardData as OracleCard[]
}

export function getCardById(id: string): OracleCard | undefined {
  return (masterCardData as OracleCard[]).find((card) => card.id === id)
}

export function getCardsBySuit(suit: string): OracleCard[] {
  return (masterCardData as OracleCard[]).filter((card) => card.suit === suit)
}

export function getCardsByNumber(number: string): OracleCard[] {
  return (masterCardData as OracleCard[]).filter((card) => card.number === number)
}

export function getCardsByElement(element: string): OracleCard[] {
  return (masterCardData as OracleCard[]).filter(
    (card) => card.baseElement === element || card.synergisticElement === element,
  )
}
