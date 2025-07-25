import { EditPagePageClient } from "./EditPagePageClient"
import { getContentById } from "@/lib/enhanced-content" // Assuming this function exists

export const metadata = {
  title: "Edit Page - Admin",
  description: "Edit an existing page.",
}

export default async function EditPagePage({ params }: { params: { id: string } }) {
  const pageId = params.id
  const pageContent = await getContentById(pageId) // Fetch page content based on ID

  if (!pageContent) {
    return <div>Page not found.</div> // Handle case where page doesn't exist
  }

  return <EditPagePageClient initialContent={pageContent} />
}
