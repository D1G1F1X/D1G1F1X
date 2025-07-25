import { VerifyCardImagesClientPage } from "./VerifyCardImagesClientPage"
import { getAllCards } from "@/lib/card-data-access"

export const metadata = {
  title: "Verify Card Images - Admin",
  description: "Verify if all expected card images exist in blob storage.",
}

export default async function VerifyCardImagesPage() {
  const allCards = await getAllCards()

  return <VerifyCardImagesClientPage initialCards={allCards} />
}
