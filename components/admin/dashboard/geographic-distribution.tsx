"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "North America", value: 42 },
  { name: "Europe", value: 28 },
  { name: "Asia", value: 18 },
  { name: "South America", value: 7 },
  { name: "Africa", value: 3 },
  { name: "Oceania", value: 2 },
]

const COLORS = ["#8b5cf6", "#06b6d4", "#22c55e", "#eab308", "#ef4444", "#ec4899"]

export function GeographicDistribution() {
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value}%`, "Users"]}
            contentStyle={{
              backgroundColor: "rgba(23, 23, 23, 0.9)",
              border: "1px solid rgba(139, 92, 246, 0.5)",
              borderRadius: "6px",
              color: "white",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
