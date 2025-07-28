import { DashboardShell } from "@/components/admin/dashboard-shell"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { getPageById } from "@/lib/content"
import { notFound } from "next/navigation"
import { PageEditor } from "@/components/admin/page-editor"

export const dynamic = "force-dynamic"

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditPagePage({ params }: PageProps) {
  const page = await getPageById(params.id)

  if (!page) {
    notFound()
  }

  return (
    <DashboardShell>
      <ProtectedRoute>
        <PageEditor page={page} />
      </ProtectedRoute>
    </DashboardShell>
  )
}
