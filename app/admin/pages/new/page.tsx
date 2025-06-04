import { DashboardShell } from "@/components/admin/dashboard-shell"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { PageEditor } from "@/components/admin/page-editor"

export default function NewPagePage() {
  const emptyPage = {
    id: "",
    slug: "",
    title: "",
    subtitle: "",
    description: "",
    content: "",
    sections: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublished: false,
  }

  return (
    <DashboardShell>
      <ProtectedRoute>
        <PageEditor page={emptyPage} isNew={true} />
      </ProtectedRoute>
    </DashboardShell>
  )
}
