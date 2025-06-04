import { getServerClient } from "@/lib/supabase-server"
import { getClientSide } from "@/lib/supabase"

export interface Reading {
  id: string
  userId?: string
  question: string
  cards: any[]
  reading: string
  spreadType: string
  date: string
  isFavorite: boolean
  isPublic?: boolean
}

// Server-side reading operations
export const readingService = {
  // Get a reading by ID
  async getReadingById(readingId: string): Promise<Reading | null> {
    const supabase = getServerClient()

    const { data, error } = await supabase.from("readings").select("*").eq("id", readingId).single()

    if (error) {
      console.error("Error fetching reading:", error)
      return null
    }

    // Increment view count
    await supabase
      .from("readings")
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq("id", readingId)

    return data as Reading
  },

  // Get all public readings
  async getPublicReadings(limit = 10, offset = 0): Promise<Reading[]> {
    const supabase = getServerClient()

    const { data, error } = await supabase
      .from("readings")
      .select("*")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error("Error fetching public readings:", error)
      return []
    }

    return data as Reading[]
  },

  // Get popular readings
  async getPopularReadings(limit = 10): Promise<Reading[]> {
    const supabase = getServerClient()

    const { data, error } = await supabase
      .from("readings")
      .select("*")
      .eq("is_public", true)
      .order("view_count", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching popular readings:", error)
      return []
    }

    return data as Reading[]
  },

  // Get readings by user ID
  async getReadingsByUserId(userId: string): Promise<Reading[]> {
    const supabase = getServerClient()

    const { data, error } = await supabase
      .from("readings")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching user readings:", error)
      return []
    }

    return data as Reading[]
  },
}

// Client-side reading operations
export const useReadings = () => {
  const supabase = getClientSide()

  return {
    // Get current user's readings
    async getCurrentUserReadings(): Promise<Reading[]> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return []
      }

      const { data, error } = await supabase
        .from("readings")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching current user readings:", error)
        return []
      }

      return data as Reading[]
    },

    // Create a new reading
    async createReading(reading: Reading): Promise<Reading | null> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return null
      }

      // Ensure user_id is set to current user
      const readingWithUserId = {
        ...reading,
        userId: session.user.id,
      }

      const { data, error } = await supabase.from("readings").insert(readingWithUserId).select().single()

      if (error) {
        console.error("Error creating reading:", error)
        return null
      }

      return data as Reading
    },

    // Update a reading
    async updateReading(readingId: string, updates: Partial<Reading>): Promise<Reading | null> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return null
      }

      // First check if the reading belongs to the current user
      const { data: reading, error: fetchError } = await supabase
        .from("readings")
        .select("*")
        .eq("id", readingId)
        .eq("user_id", session.user.id)
        .single()

      if (fetchError || !reading) {
        console.error("Error fetching reading or reading not found:", fetchError)
        return null
      }

      const { data, error } = await supabase.from("readings").update(updates).eq("id", readingId).select().single()

      if (error) {
        console.error("Error updating reading:", error)
        return null
      }

      return data as Reading
    },

    // Delete a reading
    async deleteReading(readingId: string): Promise<boolean> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return false
      }

      // First check if the reading belongs to the current user
      const { data: reading, error: fetchError } = await supabase
        .from("readings")
        .select("*")
        .eq("id", readingId)
        .eq("user_id", session.user.id)
        .single()

      if (fetchError || !reading) {
        console.error("Error fetching reading or reading not found:", fetchError)
        return false
      }

      const { error } = await supabase.from("readings").delete().eq("id", readingId)

      if (error) {
        console.error("Error deleting reading:", error)
        return false
      }

      return true
    },
  }
}

// Legacy exports for backward compatibility
export async function saveReading(reading: Reading): Promise<void> {
  try {
    if (typeof window !== "undefined") {
      const existingReadings = JSON.parse(localStorage.getItem("numoReadings") || "[]")
      existingReadings.push(reading)
      localStorage.setItem("numoReadings", JSON.stringify(existingReadings))
    }
  } catch (error) {
    console.error("Error saving reading:", error)
    throw new Error("Failed to save reading")
  }
}

export async function getUserReadings(userId: string): Promise<Reading[]> {
  try {
    if (typeof window !== "undefined") {
      const readings = JSON.parse(localStorage.getItem("numoReadings") || "[]")
      return readings.filter((reading: Reading) => reading.userId === userId)
    }
    return []
  } catch (error) {
    console.error("Error getting user readings:", error)
    return []
  }
}

export async function getPublicReadings(): Promise<Reading[]> {
  try {
    if (typeof window !== "undefined") {
      const readings = JSON.parse(localStorage.getItem("numoReadings") || "[]")
      return readings.filter((reading: Reading) => reading.isPublic === true)
    }
    return []
  } catch (error) {
    console.error("Error getting public readings:", error)
    return []
  }
}

export async function deleteReading(readingId: string): Promise<void> {
  try {
    if (typeof window !== "undefined") {
      const readings = JSON.parse(localStorage.getItem("numoReadings") || "[]")
      const updatedReadings = readings.filter((reading: Reading) => reading.id !== readingId)
      localStorage.setItem("numoReadings", JSON.stringify(updatedReadings))
    }
  } catch (error) {
    console.error("Error deleting reading:", error)
    throw new Error("Failed to delete reading")
  }
}

export async function updateReading(readingId: string, updates: Partial<Reading>): Promise<void> {
  try {
    if (typeof window !== "undefined") {
      const readings = JSON.parse(localStorage.getItem("numoReadings") || "[]")
      const updatedReadings = readings.map((reading: Reading) =>
        reading.id === readingId ? { ...reading, ...updates } : reading,
      )
      localStorage.setItem("numoReadings", JSON.stringify(updatedReadings))
    }
  } catch (error) {
    console.error("Error updating reading:", error)
    throw new Error("Failed to update reading")
  }
}
