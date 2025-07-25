"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import type { ShareStats } from "@/lib/services/share-analytics-service"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  Share2,
  BarChart2,
  PieChartIcon,
  Clock,
  RefreshCw,
  Download,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
  Smartphone,
  Copy,
  ExternalLink,
} from "lucide-react"
import { getShareAnalytics } from "@/lib/services/share-analytics-service" // Import the new export

// Platform colors for charts
const PLATFORM_COLORS = {
  facebook: "#1877F2",
  twitter: "#1DA1F2",
  linkedin: "#0A66C2",
  pinterest: "#E60023",
  whatsapp: "#25D366",
  telegram: "#0088cc",
  email: "#B8B8B8",
  copy: "#6E6E6E",
  native: "#000000",
}

// Platform icons
const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "facebook":
      return <Facebook className="h-4 w-4" />
    case "twitter":
      return <Twitter className="h-4 w-4" />
    case "linkedin":
      return <Linkedin className="h-4 w-4" />
    case "whatsapp":
      return <MessageCircle className="h-4 w-4" />
    case "telegram":
      return <Send className="h-4 w-4" />
    case "email":
      return <Mail className="h-4 w-4" />
    case "copy":
      return <Copy className="h-4 w-4" />
    case "native":
      return <Smartphone className="h-4 w-4" />
    default:
      return <ExternalLink className="h-4 w-4" />
  }
}

// Get platform name
const getPlatformName = (platform: string) => {
  const names: Record<string, string> = {
    facebook: "Facebook",
    twitter: "Twitter",
    linkedin: "LinkedIn",
    pinterest: "Pinterest",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    email: "Email",
    copy: "Copy Link",
    native: "Native Share",
  }
  return names[platform] || platform
}

// Get content type name
const getContentTypeName = (type: string) => {
  const names: Record<string, string> = {
    reading: "Card Reading",
    report: "Numerology Report",
    card: "Card",
    tool: "Tool Result",
    blog: "Blog Post",
    page: "Page",
  }
  return names[type] || type
}

export function ShareAnalyticsDashboard() {
  // Changed to named export
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<ShareStats | null>(null)
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({})
  const [platform, setPlatform] = useState<string>("all") // Updated default value
  const [contentType, setContentType] = useState<string>("all") // Updated default value
  const [topUsers, setTopUsers] = useState<Array<{ userId: string; shares: number }>>([])
  const [activeTab, setActiveTab] = useState("overview")

  // Fetch share stats
  const fetchStats = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await getShareAnalytics({
        // Use the imported function
        startDate: dateRange.start?.toISOString(),
        endDate: dateRange.end?.toISOString(),
        platform,
        contentType,
      })
      setStats(data.stats)
      setTopUsers(data.topUsers || [])
    } catch (err) {
      console.error("Error fetching share analytics:", err)
      setError("Failed to load share analytics. Please try again.")

      // For demo purposes, generate mock data
      generateMockData()
    } finally {
      setLoading(false)
    }
  }

  // Generate mock data for demonstration
  const generateMockData = () => {
    const platforms = ["facebook", "twitter", "linkedin", "whatsapp", "telegram", "email", "copy", "native"]
    const contentTypes = ["reading", "report", "card", "tool", "blog", "page"]

    // Generate platform breakdown
    const platformBreakdown: Record<string, number> = {}
    platforms.forEach((platform) => {
      platformBreakdown[platform] = Math.floor(Math.random() * 100) + 1
    })

    // Generate time distribution
    const timeDistribution: Record<string, number> = {}
    for (let i = 0; i < 24; i++) {
      timeDistribution[i] = Math.floor(Math.random() * 50) + 1
    }

    // Generate daily trends
    const dailyTrends: Record<string, number> = {}
    const today = new Date()
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateString = date.toISOString().split("T")[0]
      dailyTrends[dateString] = Math.floor(Math.random() * 30) + 1
    }

    // Generate top content
    const topContent = []
    for (let i = 0; i < 10; i++) {
      const contentType = contentTypes[Math.floor(Math.random() * contentTypes.length)]
      topContent.push({
        id: `content-${i + 1}`,
        type: contentType,
        shares: Math.floor(Math.random() * 50) + 1,
      })
    }

    // Set mock stats
    setStats({
      totalShares: Object.values(platformBreakdown).reduce((sum, val) => sum + val, 0),
      platformBreakdown,
      topContent,
      timeDistribution,
      dailyTrends,
    })

    // Generate top users
    const mockTopUsers = []
    for (let i = 0; i < 10; i++) {
      mockTopUsers.push({
        userId: `user-${i + 1}`,
        shares: Math.floor(Math.random() * 50) + 1,
      })
    }
    setTopUsers(mockTopUsers)
  }

  // Load stats on initial render
  useEffect(() => {
    fetchStats()
  }, [])

  // Format platform breakdown data for charts
  const getPlatformChartData = () => {
    if (!stats?.platformBreakdown) return []

    return Object.entries(stats.platformBreakdown).map(([platform, count]) => ({
      name: getPlatformName(platform),
      value: count,
      platform,
    }))
  }

  // Format time distribution data for charts
  const getTimeChartData = () => {
    if (!stats?.timeDistribution) return []

    return Object.entries(stats.timeDistribution)
      .map(([hour, count]) => ({
        hour: `${hour}:00`,
        count,
      }))
      .sort((a, b) => Number.parseInt(a.hour) - Number.parseInt(b.hour))
  }

  // Format daily trends data for charts
  const getDailyTrendsData = () => {
    if (!stats?.dailyTrends) return []

    return Object.entries(stats.dailyTrends)
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
  }

  // Handle date range change
  const handleDateRangeChange = (range: { start?: Date; end?: Date }) => {
    setDateRange(range)
  }

  // Handle refresh button click
  const handleRefresh = () => {
    fetchStats()
  }

  // Handle export button click
  const handleExport = () => {
    if (!stats) return

    // Create CSV content
    let csv = "data:text/csv;charset=utf-8,"

    // Add total shares
    csv += "Total Shares," + stats.totalShares + "\n\n"

    // Add platform breakdown
    csv += "Platform,Shares\n"
    Object.entries(stats.platformBreakdown).forEach(([platform, count]) => {
      csv += `${getPlatformName(platform)},${count}\n`
    })
    csv += "\n"

    // Add top content
    csv += "Content ID,Content Type,Shares\n"
    stats.topContent.forEach((content) => {
      csv += `${content.id},${getContentTypeName(content.type)},${content.shares}\n`
    })
    csv += "\n"

    // Add time distribution
    csv += "Hour,Shares\n"
    Object.entries(stats.timeDistribution).forEach(([hour, count]) => {
      csv += `${hour}:00,${count}\n`
    })
    csv += "\n"

    // Add daily trends
    csv += "Date,Shares\n"
    Object.entries(stats.dailyTrends).forEach(([date, count]) => {
      csv += `${date},${count}\n`
    })

    // Create download link
    const encodedUri = encodeURI(csv)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "share-analytics.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Render loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-80" />
      </div>
    )
  }

  // Render error state
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Share Analytics</h2>
          <p className="text-muted-foreground">Track and analyze how users share content from your site</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Date Range</label>
          <DatePicker
            selected={dateRange.start}
            onChange={(date) => handleDateRangeChange({ ...dateRange, start: date })}
            placeholderText="Start date"
            className="w-full sm:w-40"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">&nbsp;</label>
          <DatePicker
            selected={dateRange.end}
            onChange={(date) => handleDateRangeChange({ ...dateRange, end: date })}
            placeholderText="End date"
            className="w-full sm:w-40"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Platform</label>
          <Select value={platform} onValueChange={(value) => setPlatform(value)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="All platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All platforms</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="telegram">Telegram</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="copy">Copy Link</SelectItem>
              <SelectItem value="native">Native Share</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Content Type</label>
          <Select value={contentType} onValueChange={(value) => setContentType(value)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="All content" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All content</SelectItem>
              <SelectItem value="reading">Card Reading</SelectItem>
              <SelectItem value="report">Numerology Report</SelectItem>
              <SelectItem value="card">Card</SelectItem>
              <SelectItem value="tool">Tool Result</SelectItem>
              <SelectItem value="blog">Blog Post</SelectItem>
              <SelectItem value="page">Page</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2 mt-auto">
          <Button onClick={fetchStats}>Apply Filters</Button>
        </div>
      </div>

      {stats && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalShares.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Across all platforms and content types</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Platform</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {Object.entries(stats.platformBreakdown).length > 0 ? (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">
                        {getPlatformName(Object.entries(stats.platformBreakdown).sort((a, b) => b[1] - a[1])[0][0])}
                      </div>
                      {getPlatformIcon(Object.entries(stats.platformBreakdown).sort((a, b) => b[1] - a[1])[0][0])}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {Object.entries(stats.platformBreakdown)
                        .sort((a, b) => b[1] - a[1])[0][1]
                        .toLocaleString()}{" "}
                      shares
                    </p>
                  </>
                ) : (
                  <div className="text-muted-foreground">No data available</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Peak Sharing Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {Object.entries(stats.timeDistribution).length > 0 ? (
                  <>
                    <div className="text-2xl font-bold">
                      {Object.entries(stats.timeDistribution).sort((a, b) => b[1] - a[1])[0][0]}:00
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {Object.entries(stats.timeDistribution)
                        .sort((a, b) => b[1] - a[1])[0][1]
                        .toLocaleString()}{" "}
                      shares during this hour
                    </p>
                  </>
                ) : (
                  <div className="text-muted-foreground">No data available</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Most Shared Content</CardTitle>
                <PieChartIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {stats.topContent.length > 0 ? (
                  <>
                    <div className="text-2xl font-bold truncate" title={stats.topContent[0].id}>
                      {stats.topContent[0].id.length > 15
                        ? stats.topContent[0].id.substring(0, 15) + "..."
                        : stats.topContent[0].id}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{getContentTypeName(stats.topContent[0].type)}</Badge>
                      <p className="text-xs text-muted-foreground">
                        {stats.topContent[0].shares.toLocaleString()} shares
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-muted-foreground">No data available</div>
                )}
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Sharing Activity</CardTitle>
                  <CardDescription>Number of shares per day over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getDailyTrendsData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="count" name="Shares" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Distribution</CardTitle>
                    <CardDescription>Share of total shares by platform</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getPlatformChartData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getPlatformChartData().map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                PLATFORM_COLORS[entry.platform as keyof typeof PLATFORM_COLORS] ||
                                `#${Math.floor(Math.random() * 16777215).toString(16)}`
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sharing by Time of Day</CardTitle>
                    <CardDescription>When users are most active in sharing</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getTimeChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" name="Shares" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="platforms" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Comparison</CardTitle>
                  <CardDescription>Detailed breakdown of shares by platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(stats.platformBreakdown)
                      .sort((a, b) => b[1] - a[1])
                      .map(([platform, count]) => (
                        <div key={platform} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getPlatformIcon(platform)}
                              <span className="font-medium">{getPlatformName(platform)}</span>
                            </div>
                            <span>{count.toLocaleString()} shares</span>
                          </div>
                          <Progress
                            value={(count / stats.totalShares) * 100}
                            className="h-2"
                            style={
                              {
                                backgroundColor:
                                  `${PLATFORM_COLORS[platform as keyof typeof PLATFORM_COLORS]}20` || "#f0f0f0",
                                "--progress-color":
                                  PLATFORM_COLORS[platform as keyof typeof PLATFORM_COLORS] || "#8884d8",
                              } as any
                            }
                          />
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                  <CardDescription>Comparison of platforms by share volume</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getPlatformChartData()}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Shares" fill="#8884d8">
                        {getPlatformChartData().map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              PLATFORM_COLORS[entry.platform as keyof typeof PLATFORM_COLORS] ||
                              `#${Math.floor(Math.random() * 16777215).toString(16)}`
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Shared Content</CardTitle>
                  <CardDescription>Most popular content by share count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.topContent.map((content, index) => (
                      <div key={content.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-2">
                            <Badge variant="outline" className="mt-0.5">
                              {index + 1}
                            </Badge>
                            <div>
                              <div className="font-medium truncate" title={content.id}>
                                {content.id.length > 30 ? content.id.substring(0, 30) + "..." : content.id}
                              </div>
                              <div className="text-xs text-muted-foreground">{getContentTypeName(content.type)}</div>
                            </div>
                          </div>
                          <span>{content.shares.toLocaleString()} shares</span>
                        </div>
                        <Progress value={(content.shares / stats.topContent[0].shares) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Type Distribution</CardTitle>
                  <CardDescription>Share of total shares by content type</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.topContent.reduce(
                          (acc, content) => {
                            const existingType = acc.find((item) => item.type === content.type)
                            if (existingType) {
                              existingType.value += content.shares
                            } else {
                              acc.push({
                                name: getContentTypeName(content.type),
                                type: content.type,
                                value: content.shares,
                              })
                            }
                            return acc
                          },
                          [] as Array<{ name: string; type: string; value: number }>,
                        )}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {stats.topContent
                          .reduce(
                            (acc, content) => {
                              const existingType = acc.find((item) => item.type === content.type)
                              if (existingType) {
                                existingType.value += content.shares
                              } else {
                                acc.push({
                                  name: getContentTypeName(content.type),
                                  type: content.type,
                                  value: content.shares,
                                })
                              }
                              return acc
                            },
                            [] as Array<{ name: string; type: string; value: number }>,
                          )
                          .map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                          ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Sharing Users</CardTitle>
                  <CardDescription>Users who share content most frequently</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topUsers.map((user, index) => (
                      <div key={user.userId} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-2">
                            <Badge variant="outline" className="mt-0.5">
                              {index + 1}
                            </Badge>
                            <div>
                              <div className="font-medium">{user.userId}</div>
                              <div className="text-xs text-muted-foreground">User ID</div>
                            </div>
                          </div>
                          <span>{user.shares.toLocaleString()} shares</span>
                        </div>
                        <Progress value={(user.shares / topUsers[0].shares) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>Distribution of sharing activity among users</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topUsers.map((user) => ({
                        name: user.userId.length > 10 ? user.userId.substring(0, 10) + "..." : user.userId,
                        shares: user.shares,
                      }))}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="shares" name="Shares" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
