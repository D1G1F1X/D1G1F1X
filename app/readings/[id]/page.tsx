import { notFound } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"
import { readingService } from "@/lib/services/reading-service"
import { ReadingDetailView } from "@/components/reading-detail-view"

export default async function ReadingDetailPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient()

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Get the reading
  const reading = await readingService.getReadingById(params.id)

  // If reading not found, return 404
  if (!reading) {
    notFound()
  }

  // Check if the reading is public or belongs to the current user
  const canView = reading.is_public || session?.user.id === reading.user_id

  if (!canView) {
    // Return unauthorized or redirect
    return (
      <div className="container py-10">
        <ReadingDetailView readingId={params.id} />
      </div>
    )
  }

  return (
    <div className="container py-10">
      <ReadingDetailView readingId={params.id} />
    </div>
  )
}
