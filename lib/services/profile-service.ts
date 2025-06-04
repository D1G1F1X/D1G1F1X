import { getServerClient } from "@/lib/supabase-server"
import { getClientSide } from "@/lib/supabase"

export type Profile = {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  website: string | null
  email: string | null
  birth_date: string | null
  created_at: string
  updated_at: string
  preferences: Record<string, any>
}

export type ProfileUpdate = Partial<Omit<Profile, "id" | "created_at" | "updated_at">>

// Server-side profile operations
export const profileService = {
  // Get a profile by user ID
  async getProfileById(userId: string): Promise<Profile | null> {
    const supabase = getServerClient()

    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) {
      console.error("Error fetching profile:", error)
      return null
    }

    return data as Profile
  },

  // Update a profile
  async updateProfile(userId: string, profile: ProfileUpdate): Promise<Profile | null> {
    const supabase = getServerClient()

    const { data, error } = await supabase.from("profiles").update(profile).eq("id", userId).select().single()

    if (error) {
      console.error("Error updating profile:", error)
      return null
    }

    return data as Profile
  },

  // Get all profiles (admin only)
  async getAllProfiles(): Promise<Profile[]> {
    const supabase = getServerClient()

    const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching profiles:", error)
      return []
    }

    return data as Profile[]
  },
}

// Client-side profile operations
export const useProfile = () => {
  const supabase = getClientSide()

  return {
    // Get current user's profile
    async getCurrentProfile(): Promise<Profile | null> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return null
      }

      const { data, error } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

      if (error) {
        console.error("Error fetching current profile:", error)
        return null
      }

      return data as Profile
    },

    // Update current user's profile
    async updateCurrentProfile(profile: ProfileUpdate): Promise<Profile | null> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return null
      }

      const { data, error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", session.user.id)
        .select()
        .single()

      if (error) {
        console.error("Error updating current profile:", error)
        return null
      }

      return data as Profile
    },

    // Upload avatar
    async uploadAvatar(file: File): Promise<string | null> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return null
      }

      const fileExt = file.name.split(".").pop()
      const fileName = `${session.user.id}-${Date.now()}.${fileExt}`

      const { error } = await supabase.storage.from("avatars").upload(fileName, file)

      if (error) {
        console.error("Error uploading avatar:", error)
        return null
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName)

      // Update profile with new avatar URL
      await this.updateCurrentProfile({ avatar_url: data.publicUrl })

      return data.publicUrl
    },
  }
}
