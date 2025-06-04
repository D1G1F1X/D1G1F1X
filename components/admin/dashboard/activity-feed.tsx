"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

interface ActivityItem {
  icon: React.ReactNode
  title: string
  description: string
  date: string
}

const activityItems: ActivityItem[] = [
  {
    icon: <Activity className="h-4 w-4 text-purple-600" />,
    title: "New User Registration",
    description: "5 new users registered in the last 24 hours.",
    date: "1 day ago",
  },
  {
    icon: <Activity className="h-4 w-4 text-green-600" />,
    title: "Payment Received",
    description: "Payment of $129.00 received from customer #1234.",
    date: "5 hours ago",
  },
  {
    icon: <Activity className="h-4 w-4 text-amber-600" />,
    title: "Low Stock Alert",
    description: 'Product "NUMOracle Deck" is running low on stock (5 remaining).',
    date: "2 days ago",
  },
  {
    icon: <Activity className="h-4 w-4 text-blue-600" />,
    title: "New Blog Post Published",
    description: 'New blog post "Understanding Numerology" published.',
    date: "3 days ago",
  },
  {
    icon: <Activity className="h-4 w-4 text-purple-600" />,
    title: "New Reading Request",
    description: "New reading request received from customer #5678.",
    date: "1 hour ago",
  },
]

export function ActivityFeed() {
  return (
    <div className="space-y-4">
      {activityItems.map((item, index) => (
        <Card key={index} className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              {item.icon}
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            </div>
            <div className="text-xs text-muted-foreground">{item.date}</div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
