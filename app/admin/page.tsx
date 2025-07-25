import { DashboardShell } from "@/components/admin/dashboard-shell"
import { DashboardStats } from "@/components/admin/dashboard/dashboard-stats"
import { SalesChart } from "@/components/admin/dashboard/sales-chart"
import { UserGrowthChart } from "@/components/admin/dashboard/user-growth-chart"
import { RecentOrders } from "@/components/admin/dashboard/recent-orders"
import { TopProducts } from "@/components/admin/dashboard/top-products"
import { RevenueMetrics } from "@/components/admin/dashboard/revenue-metrics"
import { GeographicDistribution } from "@/components/admin/dashboard/geographic-distribution"
import { ActivityFeed } from "@/components/admin/dashboard/activity-feed"
import { RecentSalesLeads } from "@/components/admin/dashboard/recent-sales-leads"
import { VisitorsChart } from "@/components/admin/dashboard/visitors-chart"

export const metadata = {
  title: "Admin Dashboard",
  description: "Comprehensive dashboard for site administration.",
}

export default function AdminDashboardPage() {
  return (
    <DashboardShell>
      <DashboardStats />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <SalesChart className="col-span-4" />
        <RecentSalesLeads className="col-span-3" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <UserGrowthChart className="col-span-4" />
        <RecentOrders className="col-span-3" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RevenueMetrics className="col-span-4" />
        <TopProducts className="col-span-3" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <GeographicDistribution className="col-span-4" />
        <ActivityFeed className="col-span-3" />
      </div>
      <div className="grid gap-4 md:grid-cols-1">
        <VisitorsChart />
      </div>
    </DashboardShell>
  )
}
