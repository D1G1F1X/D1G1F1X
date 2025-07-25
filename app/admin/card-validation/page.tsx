import { CardDataValidator } from "@/components/admin/card-data-validator"
import { getAllCards } from "@/lib/card-data-access"

export const metadata = {
  title: "Card Data Validation - Admin",
  description: "Validate the integrity of oracle card data.",
}

export default async function CardValidationPage() {
  const allCards = await getAllCards()
  return <CardDataValidator initialCards={allCards} />
}
