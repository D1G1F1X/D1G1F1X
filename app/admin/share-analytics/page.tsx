import { ShareAnalyticsDashboard } from "@/components/admin/share-analytics-dashboard"
import { Separator } from "@/components/ui/separator"

export default function AdminShareAnalyticsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Share Analytics</h2>
          <p className="text-muted-foreground">Monitor how your content is shared across platforms.</p>
        </div>
      </div>

      <Separator />

      <ShareAnalyticsDashboard />
    </div>
  )
}
