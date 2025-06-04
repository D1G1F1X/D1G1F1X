import { getClientSide, supabaseAdmin } from "@/lib/supabase"

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
  preferences: Record<string, any> | null
}

export async function getUserProfile(userId: string): Promise<Profile | null> {
  const supabase = getClientSide()

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return data
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<Profile>,
): Promise<{ success: boolean; error?: any }> {
  const supabase = getClientSide()

  const { error } = await supabase.from("profiles").update(updates).eq("id", userId)

  if (error) {
    console.error("Error updating user profile:", error)
    return { success: false, error }
  }

  return { success: true }
}

export async function getUserPreferences(userId: string): Promise<Record<string, any> | null> {
  const supabase = getClientSide()

  const { data, error } = await supabase.from("user_preferences").select("*").eq("user_id", userId).single()

  if (error) {
    console.error("Error fetching user preferences:", error)
    return null
  }

  return data
}

export async function updateUserPreferences(
  userId: string,
  preferences: Record<string, any>,
): Promise<{ success: boolean; error?: any }> {
  const supabase = getClientSide()

  const { error } = await supabase.from("user_preferences").update(preferences).eq("user_id", userId)

  if (error) {
    console.error("Error updating user preferences:", error)
    return { success: false, error }
  }

  return { success: true }
}

// Admin functions (require service role key)
export async function getAllUsers(): Promise<Profile[]> {
  const { data, error } = await supabaseAdmin.from("profiles").select("*")

  if (error) {
    console.error("Error fetching all users:", error)
    return []
  }

  return data || []
}

export async function deleteUserById(userId: string): Promise<{ success: boolean; error?: any }> {
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)

  if (error) {
    console.error("Error deleting user:", error)
    return { success: false, error }
  }

  return { success: true }
}
