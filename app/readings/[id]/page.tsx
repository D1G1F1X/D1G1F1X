import { ReadingDetailView } from "@/components/reading-detail-view"
import { notFound } from "next/navigation"
import { getReadingById } from "@/lib/services/reading-service"

interface ReadingDetailPageProps {
  params: {
    id: string
  }
}

export default async function ReadingDetailPage({ params }: ReadingDetailPageProps) {
  const reading = await getReadingById(params.id)

  if (!reading) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ReadingDetailView reading={reading} />
    </div>
  )
}
