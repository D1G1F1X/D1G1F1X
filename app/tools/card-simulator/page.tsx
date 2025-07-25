import { CardSimulatorPageClient } from "./CardSimulatorPageClient"
import { getAllOracleCards } from "@/lib/card-data-access" // Corrected import

export default async function CardSimulatorPage() {
  const allCards = getAllOracleCards()

  // Extract unique suits, elements, and numbers for filters
  const suits = Array.from(new Set(allCards.map((card) => card.suit))).sort()
  const elements = Array.from(new Set(allCards.map((card) => card.baseElement))).sort()
  const numbers = Array.from(new Set(allCards.map((card) => card.number))).sort((a, b) => {
    const numA = Number.parseInt(a, 10)
    const numB = Number.parseInt(b, 10)
    return numA - numB
  })

  return <CardSimulatorPageClient allCards={allCards} suits={suits} elements={elements} numbers={numbers} />
}
