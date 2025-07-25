import { getAllOracleCards, getUniqueSuits, getUniqueElements, getUniqueNumbers } from "@/lib/card-data-access"
import CardDirectoryPageClient from "./CardDirectoryPageClient"

export default async function CardDirectoryPage() {
  const initialCards = getAllOracleCards() // Corrected to use getAllOracleCards
  const suits = getUniqueSuits(initialCards)
  const elements = getUniqueElements(initialCards)
  const numbers = getUniqueNumbers(initialCards)

  return <CardDirectoryPageClient initialCards={initialCards} suits={suits} elements={elements} numbers={numbers} />
}
