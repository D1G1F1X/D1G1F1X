"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface UserGrowthChartProps {
  timeRange?: string
}

export function UserGrowthChart({ timeRange = "30d" }: UserGrowthChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For this demo, we'll generate mock data based on the time range

    const generateData = () => {
      const result = []
      let days = 30
      let interval = "day"

      switch (timeRange) {
        case "7d":
          days = 7
          interval = "day"
          break
        case "30d":
          days = 30
          interval = "day"
          break
        case "90d":
          days = 12
          interval = "week"
          break
        case "1y":
          days = 12
          interval = "month"
          break
      }

      // Generate data based on interval
      const now = new Date()
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now)
        let label = ""

        if (interval === "day") {
          date.setDate(date.getDate() - i)
          label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        } else if (interval === "week") {
          date.setDate(date.getDate() - i * 7)
          label = `Week ${days - i}`
        } else if (interval === "month") {
          date.setMonth(date.getMonth() - i)
          label = date.toLocaleDateString("en-US", { month: "short" })
        }

        // Generate random values with growth trend
        const baseValue = 20 + (days - i) * 2 + Math.random() * 15

        result.push({
          name: label,
          newUsers: Math.round(baseValue),
          activeUsers: Math.round(baseValue * (2 + Math.random())),
        })
      }

      return result
    }

    setData(generateData())
  }, [timeRange])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis
          dataKey="name"
          stroke="rgba(255,255,255,0.5)"
          tick={{ fill: "rgba(255,255,255,0.5)" }}
          tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
        />
        <YAxis
          stroke="rgba(255,255,255,0.5)"
          tick={{ fill: "rgba(255,255,255,0.5)" }}
          tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(23, 23, 23, 0.9)",
            border: "1px solid rgba(139, 92, 246, 0.5)",
            borderRadius: "6px",
            color: "white",
          }}
        />
        <Legend />
        <Bar dataKey="newUsers" fill="#8b5cf6" name="New Users" />
        <Bar dataKey="activeUsers" fill="#06b6d4" name="Active Users" />
      </BarChart>
    </ResponsiveContainer>
  )
}
