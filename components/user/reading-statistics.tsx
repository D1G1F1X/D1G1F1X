"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Calendar, Star, Eye } from "lucide-react"

interface ReadingStats {
  totalReadings: number
  favoriteReadings: number
  spreadTypeData: Array<{ name: string; count: number }>
  monthlyData: Array<{ month: string; readings: number }>
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"]

export function ReadingStatistics() {
  const [stats, setStats] = useState<ReadingStats>({
    totalReadings: 0,
    favoriteReadings: 0,
    spreadTypeData: [],
    monthlyData: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStatistics()
  }, [])

  const loadStatistics = () => {
    try {
      if (typeof window !== "undefined") {
        const savedReadings = localStorage.getItem("numoReadings")
        if (savedReadings) {
          const readings = JSON.parse(savedReadings)

          // Calculate basic stats
          const totalReadings = readings.length
          const favoriteReadings = readings.filter((r: any) => r.isFavorite).length

          // Calculate spread type distribution
          const spreadTypes: { [key: string]: number } = {}
          readings.forEach((reading: any) => {
            spreadTypes[reading.spreadType] = (spreadTypes[reading.spreadType] || 0) + 1
          })

          const spreadTypeData = Object.entries(spreadTypes).map(([name, count]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            count,
          }))

          // Calculate monthly data (last 6 months)
          const monthlyData: { [key: string]: number } = {}
          const now = new Date()
          for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
            const monthKey = date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
            monthlyData[monthKey] = 0
          }

          readings.forEach((reading: any) => {
            const readingDate = new Date(reading.date)
            const monthKey = readingDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
            if (monthlyData.hasOwnProperty(monthKey)) {
              monthlyData[monthKey]++
            }
          })

          const monthlyDataArray = Object.entries(monthlyData).map(([month, readings]) => ({
            month,
            readings,
          }))

          setStats({
            totalReadings,
            favoriteReadings,
            spreadTypeData,
            monthlyData: monthlyDataArray,
          })
        }
      }
    } catch (error) {
      console.error("Error loading statistics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Readings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReadings}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorite Readings</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.favoriteReadings}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalReadings > 0 ? Math.round((stats.favoriteReadings / stats.totalReadings) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Used Spread</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.spreadTypeData.length > 0
                ? stats.spreadTypeData.reduce((prev, current) => (prev.count > current.count ? prev : current)).name
                : "None"}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.spreadTypeData.length > 0
                ? `${stats.spreadTypeData.reduce((prev, current) => (prev.count > current.count ? prev : current)).count} times`
                : "No data"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.monthlyData.length > 0 ? stats.monthlyData[stats.monthlyData.length - 1].readings : 0}
            </div>
            <p className="text-xs text-muted-foreground">Readings this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      {stats.totalReadings > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Activity</CardTitle>
              <CardDescription>Your reading activity over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="readings" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Spread Type Distribution</CardTitle>
              <CardDescription>Your preferred reading types</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.spreadTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {stats.spreadTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
