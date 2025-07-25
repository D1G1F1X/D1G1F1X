import { getAllOracleCards } from "@/lib/card-data-access"
import { CardSimulatorPageClient } from "./CardSimulatorPageClient"

export default async function CardSimulatorPage() {
  const allCards = getAllOracleCards()

  // Extract unique suits, elements, and numbers for filters
  const suits = Array.from(new Set(allCards.map((card) => card.suit))).sort()
  const elements = Array.from(new Set(allCards.map((card) => card.baseElement))).sort()
  const numbers = Array.from(new Set(allCards.map((card) => card.number))).sort((a, b) => {
    const numA = Number.parseInt(a)
    const numB = Number.parseInt(b)
    return numA - numB
  })

  return <CardSimulatorPageClient allCards={allCards} suits={suits} elements={elements} numbers={numbers} />
}
