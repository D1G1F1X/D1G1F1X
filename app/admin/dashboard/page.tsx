import { RecentSalesLeads } from "@/components/admin/dashboard/recent-sales-leads"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* ... other components ... */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-3">
        {" "}
        {/* Make it span full width */}
        <CardHeader>
          <CardTitle>Recent Sales Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentSalesLeads />
        </CardContent>
      </Card>
    </div>
  )
}
