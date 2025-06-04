import { Suspense } from "react"
import { CardDataEditor } from "@/components/admin/card-data-editor"
import { DashboardShell } from "@/components/admin/dashboard-shell"

export const metadata = {
  title: "Card Data Editor",
  description: "Manage NUMO Oracle card data",
}

export default function CardDataEditorPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Card Data Editor</h1>
      </div>
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Edit the NUMO Oracle card data in JSON format or using the visual editor.
        </p>
        <Suspense fallback={<div>Loading card data editor...</div>}>
          <CardDataEditor />
        </Suspense>
      </div>
    </DashboardShell>
  )
}
