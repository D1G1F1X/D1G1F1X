import { TrendingUp, Users, Clock, Award } from "lucide-react"

interface Metric {
  label: string
  value: string
  icon: "trending" | "users" | "clock" | "award"
}

interface ProjectMetricsProps {
  metrics: Metric[]
}

const iconMap = {
  trending: TrendingUp,
  users: Users,
  clock: Clock,
  award: Award,
}

export default function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  return (
    <div className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-primary-500/30 transition-all duration-300">
      <h3 className="text-xl font-bold mb-4 text-white">Project Impact</h3>
      <div className="space-y-4">
        {metrics.map((metric, index) => {
          const Icon = iconMap[metric.icon]
          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center bg-primary-500/20 rounded-lg border border-primary-500/30">
                <Icon className="h-5 w-5 text-primary-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{metric.value}</p>
                <p className="text-sm text-gray-400">{metric.label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
