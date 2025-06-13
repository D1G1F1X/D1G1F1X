import type { Metadata } from "next"
import CardDetailPageClient from "./CardDetailPageClient"

interface CardDetailPageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Card Detail - NUMO Oracle",
  description: "Detailed information about a specific NUMO Oracle card.",
}

export default function CardDetailPage({ params }: CardDetailPageProps) {
  return <CardDetailPageClient params={params} />
}
