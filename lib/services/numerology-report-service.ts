import { getClientSide } from "@/lib/supabase"

export interface SavedNumerologyReport {
  id?: string
  user_id: string
  birth_name: string
  current_name?: string
  nicknames?: string
  birth_date: string
  life_path_number: number
  destiny_number: number
  soul_urge_number: number
  personality_number: number
  birthday_number: number
  maturity_number: number
  balance_number?: number
  challenge_numbers: number[]
  pinnacle_numbers: number[]
  personal_year: number
  personal_month: number
  personal_day: number
  karmic_lessons: number[]
  hidden_passion_number: number
  expression_number?: number
  bridge_number?: number
  report_title?: string
  notes?: string
  is_public: boolean
  created_at?: string
  updated_at?: string
}

export const numerologyReportService = {
  // Save a numerology report
  async saveReport(report: SavedNumerologyReport): Promise<{ success: boolean; id?: string; error?: any }> {
    const supabase = getClientSide()

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return { success: false, error: "User not authenticated" }
      }

      const reportData = {
        ...report,
        user_id: session.user.id,
        updated_at: new Date().toISOString(),
      }

      if (report.id) {
        // Update existing report
        const { data, error } = await supabase
          .from("numerology_reports")
          .update(reportData)
          .eq("id", report.id)
          .eq("user_id", session.user.id)
          .select()
          .single()

        if (error) {
          console.error("Error updating numerology report:", error)
          return { success: false, error }
        }

        return { success: true, id: data.id }
      } else {
        // Create new report
        const { data, error } = await supabase
          .from("numerology_reports")
          .insert({
            ...reportData,
            created_at: new Date().toISOString(),
          })
          .select()
          .single()

        if (error) {
          console.error("Error creating numerology report:", error)
          return { success: false, error }
        }

        return { success: true, id: data.id }
      }
    } catch (error) {
      console.error("Error saving numerology report:", error)
      return { success: false, error }
    }
  },

  // Get user's saved reports
  async getUserReports(userId: string): Promise<SavedNumerologyReport[]> {
    const supabase = getClientSide()

    try {
      const { data, error } = await supabase
        .from("numerology_reports")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false })

      if (error) {
        console.error("Error fetching user numerology reports:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error fetching user numerology reports:", error)
      return []
    }
  },

  // Get a specific report by ID
  async getReportById(reportId: string): Promise<SavedNumerologyReport | null> {
    const supabase = getClientSide()

    try {
      const { data, error } = await supabase.from("numerology_reports").select("*").eq("id", reportId).single()

      if (error) {
        console.error("Error fetching numerology report:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error fetching numerology report:", error)
      return null
    }
  },

  // Delete a report
  async deleteReport(reportId: string, userId: string): Promise<{ success: boolean; error?: any }> {
    const supabase = getClientSide()

    try {
      const { error } = await supabase.from("numerology_reports").delete().eq("id", reportId).eq("user_id", userId)

      if (error) {
        console.error("Error deleting numerology report:", error)
        return { success: false, error }
      }

      return { success: true }
    } catch (error) {
      console.error("Error deleting numerology report:", error)
      return { success: false, error }
    }
  },

  // Get public reports
  async getPublicReports(limit = 10): Promise<SavedNumerologyReport[]> {
    const supabase = getClientSide()

    try {
      const { data, error } = await supabase
        .from("numerology_reports")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .limit(limit)

      if (error) {
        console.error("Error fetching public numerology reports:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error fetching public numerology reports:", error)
      return []
    }
  },
}
