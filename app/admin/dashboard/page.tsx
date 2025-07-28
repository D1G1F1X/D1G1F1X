import { DashboardShell } from "@/components/admin/dashboard-shell"
import { DashboardStats } from "@/components/admin/dashboard/dashboard-stats"
import { SalesChart } from "@/components/admin/dashboard/sales-chart"
import { UserGrowthChart } from "@/components/admin/dashboard/user-growth-chart"
import { RecentOrders } from "@/components/admin/dashboard/recent-orders"
import { TopProducts } from "@/components/admin/dashboard/top-products"
import { ActivityFeed } from "@/components/admin/dashboard/activity-feed"
import { RevenueMetrics } from "@/components/admin/dashboard/revenue-metrics"
import { GeographicDistribution } from "@/components/admin/dashboard/geographic-distribution"
import { RecentSalesLeads } from "@/components/admin/dashboard/recent-sales-leads"
import { EmailServiceMonitor } from "@/components/admin/email-service-monitor"
import { Separator } from "@/components/ui/separator"

export default function AdminDashboardPage() {
  return (
    <DashboardShell className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <DashboardStats />
      <div className="grid gap-6 lg:grid-cols-2">
        <SalesChart />
        <UserGrowthChart />
        <RevenueMetrics />
        <GeographicDistribution />
        <EmailServiceMonitor />
        <RecentSalesLeads />
      </div>
      <Separator className="my-6" />
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentOrders />
        <TopProducts />
        <ActivityFeed />
      </div>
    </DashboardShell>
  )
}
