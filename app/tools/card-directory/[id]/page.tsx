import CardDetailPageClient from "./CardDetailPageClient"
import { getOracleCards, getOracleCardById } from "@/lib/card-data-access"

export default async function CardDetailPage({ params }: { params: { id: string } }) {
  const initialCardData = await getOracleCardById(params.id)
  const allCards = await getOracleCards() // Fetch all cards for navigation

  return <CardDetailPageClient cardId={params.id} initialCardData={initialCardData} allCards={allCards} />
}
