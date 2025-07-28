import { DashboardShell } from "@/components/admin/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function CardDataEditorLoading() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Card Data Editor</h1>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    </DashboardShell>
  )
}
