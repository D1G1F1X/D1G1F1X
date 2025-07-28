import { ReadingEditForm } from "@/components/reading-edit-form"
import { notFound } from "next/navigation"
import { getReadingById } from "@/lib/services/reading-service"

interface ReadingEditPageProps {
  params: {
    id: string
  }
}

export default async function ReadingEditPage({ params }: ReadingEditPageProps) {
  const reading = await getReadingById(params.id)

  if (!reading) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ReadingEditForm initialReading={reading} />
    </div>
  )
}
