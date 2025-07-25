import CardDirectoryPageClient from "./CardDirectoryPageClient"
import { getOracleCards, getUniqueSuits, getUniqueElements, getUniqueNumbers } from "@/lib/card-data-access"

export default async function CardDirectoryPage() {
  const initialCards = await getOracleCards()
  const suits = getUniqueSuits(initialCards)
  const elements = getUniqueElements(initialCards)
  const numbers = getUniqueNumbers(initialCards)

  return <CardDirectoryPageClient initialCards={initialCards} suits={suits} elements={elements} numbers={numbers} />
}
