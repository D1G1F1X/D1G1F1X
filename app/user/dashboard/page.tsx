import { ReadingDashboard } from "@/components/user/reading-dashboard"
import { ReadingStatistics } from "@/components/user/reading-statistics"

export default function UserDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <ReadingStatistics />
      <ReadingDashboard />
    </div>
  )
}
