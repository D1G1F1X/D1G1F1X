import { ReadingEditForm } from "@/components/reading-edit-form"

export default function EditReadingPage({ params }: { params: { id: string } }) {
  return <ReadingEditForm readingId={params.id} />
}
