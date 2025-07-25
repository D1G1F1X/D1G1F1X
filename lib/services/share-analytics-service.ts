/**
 * Share Analytics Service
 * Tracks and analyzes social sharing activity across platforms
 */

import { kv } from "@vercel/kv"

export interface ShareEvent {
  id: string
  platform: string
  contentType: string // 'reading', 'report', 'card', etc.
  contentId?: string
  url: string
  userId?: string
  timestamp: string
  referrer?: string
  userAgent?: string
  successful: boolean
  metadata?: Record<string, any>
}

export interface ShareStats {
  totalShares: number
  platformBreakdown: Record<string, number>
  topContent: Array<{ id: string; type: string; shares: number }>
  timeDistribution: Record<string, number> // hour of day
  dailyTrends: Record<string, number> // date string
  conversionRate?: number // if we can track clicks/views
}

export interface ShareAnalyticsOptions {
  anonymizeIp?: boolean
  trackUserAgent?: boolean
  trackReferrer?: boolean
  sampleRate?: number // 0-1, percentage of events to track
}

export interface ShareAnalyticsData {
  totalShares: number
  sharesByPlatform: { name: string; value: number }[]
  sharesOverTime: { date: string; shares: number }[]
  topSharedReadings: { title: string; shares: number }[]
}

/**
 * Records a share event in the analytics system
 */
export async function recordShareEvent(event: Omit<ShareEvent, "id" | "timestamp">): Promise<string> {
  try {
    const id = crypto.randomUUID()
    const timestamp = new Date().toISOString()

    const shareEvent: ShareEvent = {
      id,
      timestamp,
      ...event,
    }

    // Store in KV store
    await kv.lpush("share_events", JSON.stringify(shareEvent))

    // Increment platform counter
    await kv.hincrby("share_platforms", event.platform, 1)

    // Increment content type counter
    await kv.hincrby("share_content_types", event.contentType, 1)

    // Track by hour of day (for time distribution analysis)
    const hour = new Date().getHours()
    await kv.hincrby("share_hours", hour.toString(), 1)

    // Track by date (for trend analysis)
    const date = new Date().toISOString().split("T")[0]
    await kv.hincrby("share_dates", date, 1)

    // If we have a contentId, track shares for that specific content
    if (event.contentId) {
      await kv.hincrby(`content_shares:${event.contentType}`, event.contentId, 1)
    }

    // If we have a userId, track their sharing activity
    if (event.userId) {
      await kv.lpush(`user:${event.userId}:shares`, JSON.stringify(shareEvent))
      await kv.hincrby("user_share_counts", event.userId, 1)
    }

    return id
  } catch (error) {
    console.error("Error recording share event:", error)
    return ""
  }
}

/**
 * Records a click on a shared link
 */
export async function recordShareClick(shareId: string, metadata: Record<string, any> = {}): Promise<boolean> {
  try {
    if (!shareId) return false

    const clickEvent = {
      id: crypto.randomUUID(),
      shareId,
      timestamp: new Date().toISOString(),
      ...metadata,
    }

    // Store click event
    await kv.lpush(`share:${shareId}:clicks`, JSON.stringify(clickEvent))

    // Increment click counter
    await kv.hincrby("share_clicks", shareId, 1)

    return true
  } catch (error) {
    console.error("Error recording share click:", error)
    return false
  }
}

/**
 * Gets sharing statistics for a specific time period
 */
export async function getShareStats(
  startDate?: string,
  endDate?: string,
  platform?: string,
  contentType?: string,
): Promise<ShareStats> {
  try {
    // Default to all-time stats if no dates provided
    const start = startDate ? new Date(startDate) : new Date(0)
    const end = endDate ? new Date(endDate) : new Date()

    // Get all share events
    const allShareEvents: ShareEvent[] = await kv
      .lrange("share_events", 0, -1)
      .then((events) => events.map((e) => JSON.parse(e as string)))
      .catch(() => [])

    // Filter by date range and optional filters
    const filteredEvents = allShareEvents.filter((event) => {
      const eventDate = new Date(event.timestamp)
      const matchesDateRange = eventDate >= start && eventDate <= end
      const matchesPlatform = platform ? event.platform === platform : true
      const matchesContentType = contentType ? event.contentType === contentType : true

      return matchesDateRange && matchesPlatform && matchesContentType
    })

    // Calculate platform breakdown
    const platformBreakdown: Record<string, number> = {}
    filteredEvents.forEach((event) => {
      platformBreakdown[event.platform] = (platformBreakdown[event.platform] || 0) + 1
    })

    // Calculate time distribution (hour of day)
    const timeDistribution: Record<string, number> = {}
    filteredEvents.forEach((event) => {
      const hour = new Date(event.timestamp).getHours()
      timeDistribution[hour] = (timeDistribution[hour] || 0) + 1
    })

    // Calculate daily trends
    const dailyTrends: Record<string, number> = {}
    filteredEvents.forEach((event) => {
      const date = event.timestamp.split("T")[0]
      dailyTrends[date] = (dailyTrends[date] || 0) + 1
    })

    // Find top shared content
    const contentShares: Record<string, { id: string; type: string; shares: number }> = {}
    filteredEvents.forEach((event) => {
      if (event.contentId) {
        const key = `${event.contentType}:${event.contentId}`
        if (!contentShares[key]) {
          contentShares[key] = { id: event.contentId, type: event.contentType, shares: 0 }
        }
        contentShares[key].shares++
      }
    })

    const topContent = Object.values(contentShares)
      .sort((a, b) => b.shares - a.shares)
      .slice(0, 10)

    return {
      totalShares: filteredEvents.length,
      platformBreakdown,
      topContent,
      timeDistribution,
      dailyTrends,
    }
  } catch (error) {
    console.error("Error getting share stats:", error)
    return {
      totalShares: 0,
      platformBreakdown: {},
      topContent: [],
      timeDistribution: {},
      dailyTrends: {},
    }
  }
}

/**
 * Gets user sharing statistics
 */
export async function getUserShareStats(userId: string): Promise<{
  totalShares: number
  platformBreakdown: Record<string, number>
  contentTypeBreakdown: Record<string, number>
}> {
  try {
    if (!userId) throw new Error("User ID is required")

    // Get user's share events
    const userShares: ShareEvent[] = await kv
      .lrange(`user:${userId}:shares`, 0, -1)
      .then((events) => events.map((e) => JSON.parse(e as string)))
      .catch(() => [])

    // Calculate platform breakdown
    const platformBreakdown: Record<string, number> = {}
    userShares.forEach((event) => {
      platformBreakdown[event.platform] = (platformBreakdown[event.platform] || 0) + 1
    })

    // Calculate content type breakdown
    const contentTypeBreakdown: Record<string, number> = {}
    userShares.forEach((event) => {
      contentTypeBreakdown[event.contentType] = (contentTypeBreakdown[event.contentType] || 0) + 1
    })

    return {
      totalShares: userShares.length,
      platformBreakdown,
      contentTypeBreakdown,
    }
  } catch (error) {
    console.error("Error getting user share stats:", error)
    return {
      totalShares: 0,
      platformBreakdown: {},
      contentTypeBreakdown: {},
    }
  }
}

/**
 * Gets the most active sharing users
 */
export async function getTopSharingUsers(limit = 10): Promise<Array<{ userId: string; shares: number }>> {
  try {
    // Get all user share counts
    const userShareCounts = (await kv.hgetall("user_share_counts")) as Record<string, number>

    // Convert to array and sort
    return Object.entries(userShareCounts)
      .map(([userId, shares]) => ({ userId, shares: Number(shares) }))
      .sort((a, b) => b.shares - a.shares)
      .slice(0, limit)
  } catch (error) {
    console.error("Error getting top sharing users:", error)
    return []
  }
}

/**
 * Clears all share analytics data (admin only)
 */
export async function clearShareAnalytics(): Promise<boolean> {
  try {
    // Delete all share analytics keys
    await kv.del("share_events")
    await kv.del("share_platforms")
    await kv.del("share_content_types")
    await kv.del("share_hours")
    await kv.del("share_dates")
    await kv.del("share_clicks")
    await kv.del("user_share_counts")

    // Note: This doesn't delete user-specific share lists or content-specific share counts
    // Those would need to be handled separately if needed

    return true
  } catch (error) {
    console.error("Error clearing share analytics:", error)
    return false
  }
}

/**
 * Retrieves comprehensive share analytics data.
 * This is a mock implementation. In a real application, this data would come from a database
 * where share events are logged.
 * @returns A promise that resolves to ShareAnalyticsData.
 */
export async function getShareAnalytics(): Promise<ShareAnalyticsData> {
  // Simulate fetching data from a database or analytics service
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay

  const mockData: ShareAnalyticsData = {
    totalShares: 1250,
    sharesByPlatform: [
      { name: "Facebook", value: 400 },
      { name: "Twitter", value: 300 },
      { name: "WhatsApp", value: 250 },
      { name: "Email", value: 150 },
      { name: "LinkedIn", value: 100 },
      { name: "Other", value: 50 },
    ],
    sharesOverTime: [
      { date: "2024-07-01", shares: 20 },
      { date: "2024-07-02", shares: 25 },
      { date: "2024-07-03", shares: 30 },
      { date: "2024-07-04", shares: 35 },
      { date: "2024-07-05", shares: 40 },
      { date: "2024-07-06", shares: 45 },
      { date: "2024-07-07", shares: 50 },
      { date: "2024-07-08", shares: 55 },
      { date: "2024-07-09", shares: 60 },
      { date: "2024-07-10", shares: 65 },
      { date: "2024-07-11", shares: 70 },
      { date: "2024-07-12", shares: 75 },
      { date: "2024-07-13", shares: 80 },
      { date: "2024-07-14", shares: 85 },
      { date: "2024-07-15", shares: 90 },
    ],
    topSharedReadings: [
      { title: "Your Life Path Unveiled", shares: 120 },
      { title: "Daily Oracle Insight", shares: 95 },
      { title: "Relationship Compatibility Reading", shares: 80 },
      { title: "Career Path Numerology", shares: 70 },
      { title: "Spiritual Growth Reading", shares: 60 },
    ],
  }

  return mockData
}

/**
 * Logs a share event.
 * In a real application, this would save the share event to a database.
 * @param platform The platform where the share occurred (e.g., "Facebook", "Twitter").
 * @param readingId The ID of the reading that was shared.
 * @param userId The ID of the user who shared (optional).
 */
export async function logShareEvent(platform: string, readingId: string, userId?: string): Promise<void> {
  console.log(`Share event logged: Platform=${platform}, ReadingId=${readingId}, UserId=${userId || "N/A"}`)
  // Here you would typically insert a record into a 'share_events' table in your database.
  // Example (pseudo-code for Supabase):
  // const supabase = createServerClient(cookies());
  // await supabase.from('share_events').insert({ platform, reading_id: readingId, user_id: userId });
}

// Export the share analytics service
const shareAnalyticsService = {
  recordShareEvent,
  recordShareClick,
  getShareStats,
  getUserShareStats,
  getTopSharingUsers,
  clearShareAnalytics,
  getShareAnalytics,
  logShareEvent,
}

export default shareAnalyticsService
