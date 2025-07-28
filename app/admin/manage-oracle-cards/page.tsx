import { OracleCardManager } from "@/components/admin/oracle-card-manager"
import { Separator } from "@/components/ui/separator"

export default function ManageOracleCardsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Oracle Card Management</h2>
          <p className="text-muted-foreground">Manage and edit your Oracle Card data.</p>
        </div>
      </div>

      <Separator />

      <OracleCardManager />
    </div>
  )
}
