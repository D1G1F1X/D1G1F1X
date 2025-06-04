"use client"

import { useState, useEffect } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface VisitorsChartProps {
  timeRange?: string
}

export function VisitorsChart({ timeRange = "30d" }: VisitorsChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // In a real app, this would fetch data from an API
    // For this demo, we'll generate mock data based on the time range

    const generateData = () => {
      const result = []
      let days = 30

      switch (timeRange) {
        case "7d":
          days = 7
          break
        case "30d":
          days = 30
          break
        case "90d":
          days = 90
          break
        case "1y":
          days = 365
          break
      }

      // Generate daily data
      const now = new Date()
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)

        // Generate random values with some trend
        const baseVisitors = 1000 + Math.random() * 500
        const weekday = date.getDay()
        const weekendFactor = weekday === 0 || weekday === 6 ? 0.8 : 1

        result.push({
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          visitors: Math.round(baseVisitors * weekendFactor),
          pageViews: Math.round(baseVisitors * weekendFactor * (2 + Math.random())),
        })
      }

      return result
    }

    setData(generateData())
  }, [timeRange])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
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
          dataKey="date"
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
        <Area type="monotone" dataKey="pageViews" stackId="1" stroke="#8b5cf6" fill="rgba(139, 92, 246, 0.2)" />
        <Area type="monotone" dataKey="visitors" stackId="2" stroke="#06b6d4" fill="rgba(6, 182, 212, 0.2)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
