import { getAllOracleCards, getUniqueCardProperties } from "@/lib/card-data-access"
import { CardSimulatorPageClient } from "./CardSimulatorPageClient"

export default async function CardSimulatorPage() {
  const allCards = await getAllOracleCards()
  const { suits, elements, numbers } = getUniqueCardProperties(allCards)

  return <CardSimulatorPageClient allCards={allCards} suits={suits} elements={elements} numbers={numbers} />
}
