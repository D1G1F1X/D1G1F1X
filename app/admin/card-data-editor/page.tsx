import { OracleCardManager } from "@/components/admin/oracle-card-manager"
import { getAllCards, getUniqueSuits, getUniqueElements, getUniqueNumbers } from "@/lib/card-data-access"

export const metadata = {
  title: "Card Data Editor - Admin",
  description: "Edit and manage oracle card data.",
}

export default async function CardDataEditorPage() {
  const allCards = await getAllCards()
  const suits = getUniqueSuits(allCards)
  const elements = getUniqueElements(allCards)
  const numbers = getUniqueNumbers(allCards)

  return <OracleCardManager initialCards={allCards} suits={suits} elements={elements} numbers={numbers} />
}
