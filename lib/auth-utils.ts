import type { NextRequest } from "next/server"
import { getServerClient } from "@/lib/supabase/server" // Ensure this is the server client
import { cookies } from "next/headers"

export type UserRole = "admin" | "member" | "user"

export interface User {
  id: string
  email: string
  role: UserRole
}

// Get user from request
export const getUserFromRequest = async (request: NextRequest): Promise<User | null> => {
  // Try to get from session cookie
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie?.value) {
    return null
  }

  try {
    const session = JSON.parse(decodeURIComponent(sessionCookie.value))

    if (!session.user?.id) {
      return null
    }

    // Get user role from database
    const role = await getUserRole(session.user.id)

    return {
      id: session.user.id,
      email: session.user.email,
      role,
    }
  } catch (error) {
    console.error("Error parsing session cookie:", error)
    return null
  }
}

// Get user role from database
export const getUserRole = async (userId: string): Promise<UserRole> => {
  const supabase = getServerClient() // Use the server client here
  // Check if user is an admin
  const { data: adminData } = await supabase.from("admins").select("id").eq("user_id", userId).single()

  if (adminData) {
    return "admin"
  }

  // Check if user is a member
  const { data: userData } = await supabase.from("users").select("membership_level").eq("id", userId).single()

  if (userData && userData.membership_level && userData.membership_level !== "free") {
    return "member"
  }

  return "user"
}

// Check if user has admin role
export const isAdmin = async (userId: string): Promise<boolean> => {
  const role = await getUserRole(userId)
  return role === "admin"
}

// Check if user has member role
export const isMember = async (userId: string): Promise<boolean> => {
  const role = await getUserRole(userId)
  return role === "member" || role === "admin"
}
