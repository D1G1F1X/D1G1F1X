import { requireAuth } from "@/lib/auth"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { FileManager } from "@/components/admin/file-manager"

export default async function FilesPage() {
  await requireAuth()

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">File Manager</h1>
        </div>

        <FileManager />
      </div>
    </DashboardShell>
  )
}
