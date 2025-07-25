"use client"

import { BarChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    <Card>
      <CardHeader>
        <CardTitle>Revenue Metrics</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
\
