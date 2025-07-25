import TestCardImagesClientPage from "./TestCardImagesClientPage"
import { getAllCards } from "@/lib/card-data-access"

export const metadata = {
  title: "Test Card Images - Admin",
  description: "Test card image loading and display.",
}

export default async function TestCardImagesPage() {
  const allCards = await getAllCards()

  return <TestCardImagesClientPage initialCards={allCards} />
}
