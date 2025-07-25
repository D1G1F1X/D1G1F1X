import { getCardData, getUniqueSuits, getUniqueElements, getUniqueNumbers } from "@/lib/card-data-access"
import { CardSimulatorPageClient } from "./CardSimulatorPageClient"

export default async function CardSimulatorPage() {
  const allCards = await getCardData()
  const suits = getUniqueSuits(allCards)
  const elements = getUniqueElements(allCards)
  const numbers = getUniqueNumbers(allCards)

  return <CardSimulatorPageClient allCards={allCards} suits={suits} elements={elements} numbers={numbers} />
}
