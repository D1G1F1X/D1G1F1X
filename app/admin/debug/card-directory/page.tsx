import { getAllCards, getUniqueSuits, getUniqueElements, getUniqueNumbers } from "@/lib/card-data-access"
import CardDirectoryDebugClient from "./DebugCardDirectoryClient"

export const metadata = {
  title: "Debug Card Directory - Admin",
  description: "Debug and test the card directory functionality.",
}

export default async function DebugCardDirectoryPage() {
  const allCards = await getAllCards()
  const suits = getUniqueSuits(allCards)
  const elements = getUniqueElements(allCards)
  const numbers = getUniqueNumbers(allCards)

  // This component is a server component, so filtering/sorting will happen on the client
  // or via server actions if implemented. For now, we pass all data.
  // The client-side component will handle the interactive filtering/sorting.

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Debug Card Directory</h1>
      <p className="text-muted-foreground mb-8">
        This page allows you to test the card data access, filtering, and sorting logic.
      </p>

      <CardDirectoryDebugClient initialCards={allCards} suits={suits} elements={elements} numbers={numbers} />
    </div>
  )
}
