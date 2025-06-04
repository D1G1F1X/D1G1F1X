"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts"

const data = [
  {
    name: "Jan",
    revenue: 4000,
    profit: 2400,
    target: 3000,
  },
  {
    name: "Feb",
    revenue: 3000,
    profit: 1398,
    target: 3000,
  },
  {
    name: "Mar",
    revenue: 2000,
    profit: 800,
    target: 3000,
  },
  {
    name: "Apr",
    revenue: 2780,
    profit: 1908,
    target: 3000,
  },
  {
    name: "May",
    revenue: 1890,
    profit: 800,
    target: 3000,
  },
  {
    name: "Jun",
    revenue: 2390,
    profit: 1200,
    target: 3000,
  },
  {
    name: "Jul",
    revenue: 3490,
    profit: 2300,
    target: 3000,
  },
  {
    name: "Aug",
    revenue: 4000,
    profit: 2400,
    target: 3000,
  },
  {
    name: "Sep",
    revenue: 5000,
    profit: 3000,
    target: 3000,
  },
  {
    name: "Oct",
    revenue: 4500,
    profit: 2700,
    target: 3000,
  },
  {
    name: "Nov",
    revenue: 3500,
    profit: 2100,
    target: 3000,
  },
  {
    name: "Dec",
    revenue: 6000,
    profit: 3600,
    target: 3000,
  },
]

export function RevenueMetrics() {
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
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
            formatter={(value: number, name: string) => {
              return [`$${value}`, name.charAt(0).toUpperCase() + name.slice(1)]
            }}
          />
          <Legend />
          <ReferenceLine y={3000} stroke="#f97316" strokeDasharray="3 3" />
          <Bar dataKey="revenue" fill="#8b5cf6" name="Revenue" />
          <Bar dataKey="profit" fill="#22c55e" name="Profit" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
