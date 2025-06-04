"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CreditCard, DollarSign, Users } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend: {
    value: number
    label: string
  }
}

const StatsCard = ({ title, value, description, icon, trend }: StatsCardProps) => {
  const isPositive = trend.value >= 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className={`mt-2 text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Revenue"
        value="$45,231.89"
        description="Monthly revenue"
        icon={<DollarSign className="h-4 w-4 text-purple-600" />}
        trend={{ value: 12.5, label: "from last month" }}
      />
      <StatsCard
        title="Subscriptions"
        value="2,350"
        description="Active members"
        icon={<Users className="h-4 w-4 text-purple-600" />}
        trend={{ value: 5.2, label: "new this month" }}
      />
      <StatsCard
        title="Sales"
        value="12,234"
        description="Total transactions"
        icon={<CreditCard className="h-4 w-4 text-purple-600" />}
        trend={{ value: 8.4, label: "from last month" }}
      />
      <StatsCard
        title="Active Users"
        value="573"
        description="Currently online"
        icon={<Activity className="h-4 w-4 text-purple-600" />}
        trend={{ value: -2.5, label: "from last hour" }}
      />
    </div>
  )
}
