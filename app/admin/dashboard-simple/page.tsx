import { DashboardShell } from "@/components/admin/dashboard-shell"
import { DashboardStats } from "@/components/admin/dashboard/dashboard-stats"
import { RecentOrders } from "@/components/admin/dashboard/recent-orders"
import { SalesChart } from "@/components/admin/dashboard/sales-chart"
import { UserGrowthChart } from "@/components/admin/dashboard/user-growth-chart"
import { VisitorsChart } from "@/components/admin/dashboard/visitors-chart"
import { ActivityFeed } from "@/components/admin/dashboard/activity-feed"
import { TopProducts } from "@/components/admin/dashboard/top-products"
import { RecentSalesLeads } from "@/components/admin/dashboard/recent-sales-leads"
import { GeographicDistribution } from "@/components/admin/dashboard/geographic-distribution"
import { RevenueMetrics } from "@/components/admin/dashboard/revenue-metrics"

export default function SimpleDashboardPage() {
  return (
    <DashboardShell title="Simple Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <SalesChart className="col-span-4" />
        <RecentSalesLeads className="col-span-3" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <UserGrowthChart className="col-span-4" />
        <RecentOrders className="col-span-3" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <VisitorsChart className="col-span-4" />
        <TopProducts className="col-span-3" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RevenueMetrics className="col-span-4" />
        <GeographicDistribution className="col-span-3" />
      </div>
      <ActivityFeed />
    </DashboardShell>
  )
}
