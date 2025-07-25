"use client"

import { CardDescription } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
  Loader2,
  Users,
  TrendingUp,
} from "lucide-react"
import { getShareAnalytics } from "@/lib/services/share-analytics-service" // Import the new export
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table"

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

interface ShareAnalyticsData {
  totalShares: number
  sharesByPlatform: { name: string; value: number }[]
  sharesOverTime: { date: string; shares: number }[]
  topSharedReadings: { title: string; shares: number }[]
}

export function ShareAnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<ShareAnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({})
  const [platform, setPlatform] = useState<string>("all") // Updated default value
  const [contentType, setContentType] = useState<string>("all") // Updated default value
  const [topUsers, setTopUsers] = useState<Array<{ userId: string; shares: number }>>([])
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getShareAnalytics({
          startDate: dateRange.start?.toISOString(),
          endDate: dateRange.end?.toISOString(),
          platform,
          contentType,
        })
        setAnalyticsData(data)
      } catch (err) {
        console.error("Failed to fetch share analytics:", err)
        setError("Failed to load analytics data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [dateRange, platform, contentType])

  const chartConfig = {
    shares: {
      label: "Shares",
      color: "hsl(var(--chart-1))",
    },
    platform: {
      label: "Platform",
    },
    date: {
      label: "Date",
    },
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-lg text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        Loading share analytics...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-lg text-destructive">{error}</div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-lg text-muted-foreground">
        No analytics data available.
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Share Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalShares}</div>
            <p className="text-xs text-muted-foreground">Overall shares across all platforms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Shares per User</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                analyticsData.totalShares /
                (analyticsData.sharesOverTime.length > 0 ? analyticsData.sharesOverTime.length : 1)
              ).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Approximation based on data points</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Share Growth (Last 30 Days)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.sharesOverTime.length > 1
                ? (
                    ((analyticsData.sharesOverTime[analyticsData.sharesOverTime.length - 1].shares -
                      analyticsData.sharesOverTime[0].shares) /
                      analyticsData.sharesOverTime[0].shares) *
                    100
                  ).toFixed(2) + "%"
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Percentage change</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Shares by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={analyticsData.sharesByPlatform}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={80}
                  strokeWidth={2}
                  fill="var(--color-shares)"
                >
                  {analyticsData.sharesByPlatform.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        PLATFORM_COLORS[entry.name as keyof typeof PLATFORM_COLORS] ||
                        `#${Math.floor(Math.random() * 16777215).toString(16)}`
                      }
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shares Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <LineChart
                accessibilityLayer
                data={analyticsData.sharesOverTime}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  }
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line dataKey="shares" type="monotone" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Shared Readings</CardTitle>
        </CardHeader>
        <CardContent>
          {analyticsData.topSharedReadings.length === 0 ? (
            <p className="text-muted-foreground">No readings have been shared yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reading Title</TableHead>
                  <TableHead className="text-right">Shares</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyticsData.topSharedReadings.map((reading, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{reading.title}</TableCell>
                    <TableCell className="text-right">{reading.shares}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Share Analytics</h2>
          <p className="text-muted-foreground">Track and analyze how users share content from your site</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={() => console.log("Export functionality not implemented")}>
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
            onChange={(date) => setDateRange({ ...dateRange, start: date })}
            placeholderText="Start date"
            className="w-full sm:w-40"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">&nbsp;</label>
          <DatePicker
            selected={dateRange.end}
            onChange={(date) => setDateRange({ ...dateRange, end: date })}
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
          <Button onClick={() => window.location.reload()}>Apply Filters</Button>
        </div>
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
                <LineChart data={analyticsData.sharesOverTime} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="shares" name="Shares" stroke="#8884d8" activeDot={{ r: 8 }} />
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
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie
                      data={analyticsData.sharesByPlatform}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData.sharesByPlatform.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            PLATFORM_COLORS[entry.name as keyof typeof PLATFORM_COLORS] ||
                            `#${Math.floor(Math.random() * 16777215).toString(16)}`
                          }
                        />
                      ))}
                    </Pie>
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
                  <BarChart data={analyticsData.sharesOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="shares" name="Shares" fill="#8884d8" />
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
                {analyticsData.sharesByPlatform
                  .sort((a, b) => b.value - a.value)
                  .map((entry, index) => (
                    <div key={entry.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getPlatformIcon(entry.name)}
                          <span className="font-medium">{entry.name}</span>
                        </div>
                        <span>{entry.value.toLocaleString()} shares</span>
                      </div>
                      <Progress
                        value={(entry.value / analyticsData.totalShares) * 100}
                        className="h-2"
                        style={
                          {
                            backgroundColor:
                              `${PLATFORM_COLORS[entry.name as keyof typeof PLATFORM_COLORS]}20` || "#f0f0f0",
                            "--progress-color":
                              PLATFORM_COLORS[entry.name as keyof typeof PLATFORM_COLORS] || "#8884d8",
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
                  data={analyticsData.sharesByPlatform}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Shares" fill="#8884d8">
                    {analyticsData.sharesByPlatform.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          PLATFORM_COLORS[entry.name as keyof typeof PLATFORM_COLORS] ||
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
                {analyticsData.topSharedReadings.map((reading, index) => (
                  <div key={reading.title} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">
                          {index + 1}
                        </Badge>
                        <div>
                          <div className="font-medium truncate" title={reading.title}>
                            {reading.title.length > 30 ? reading.title.substring(0, 30) + "..." : reading.title}
                          </div>
                          <div className="text-xs text-muted-foreground">{getContentTypeName("reading")}</div>
                        </div>
                      </div>
                      <span>{reading.shares.toLocaleString()} shares</span>
                    </div>
                    <Progress
                      value={(reading.shares / analyticsData.topSharedReadings[0].shares) * 100}
                      className="h-2"
                    />
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
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={analyticsData.topSharedReadings.reduce(
                      (acc, reading) => {
                        const existingType = acc.find((item) => item.type === "reading")
                        if (existingType) {
                          existingType.value += reading.shares
                        } else {
                          acc.push({
                            name: getContentTypeName("reading"),
                            type: "reading",
                            value: reading.shares,
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
                    {analyticsData.topSharedReadings
                      .reduce(
                        (acc, reading) => {
                          const existingType = acc.find((item) => item.type === "reading")
                          if (existingType) {
                            existingType.value += reading.shares
                          } else {
                            acc.push({
                              name: getContentTypeName("reading"),
                              type: "reading",
                              value: reading.shares,
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
    </div>
  )
}
