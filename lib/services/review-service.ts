import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import type { Review } from "@/types/reviews"

export async function getReviews(): Promise<Review[]> {
  const supabase = createServerClient(cookies())
  const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false })
  if (error) {
    console.error("Error fetching reviews:", error)
    return []
  }
  return data || []
}

export async function getReviewById(id: string): Promise<Review | null> {
  const supabase = createServerClient(cookies())
  const { data, error } = await supabase.from("reviews").select("*").eq("id", id).single()
  if (error) {
    console.error(`Error fetching review with ID ${id}:`, error)
    return null
  }
  return data
}

export async function createReview(review: Omit<Review, "id" | "created_at" | "updated_at">): Promise<Review | null> {
  const supabase = createServerClient(cookies())
  const { data, error } = await supabase.from("reviews").insert(review).select().single()
  if (error) {
    console.error("Error creating review:", error)
    return null
  }
  return data
}

export async function updateReview(id: string, updates: Partial<Review>): Promise<Review | null> {
  const supabase = createServerClient(cookies())
  const { data, error } = await supabase.from("reviews").update(updates).eq("id", id).select().single()
  if (error) {
    console.error(`Error updating review with ID ${id}:`, error)
    return null
  }
  return data
}

export async function updateReviewStatus(
  id: string,
  status: "pending" | "approved" | "rejected",
): Promise<Review | null> {
  const supabase = createServerClient(cookies())
  const { data, error } = await supabase.from("reviews").update({ status }).eq("id", id).select().single()
  if (error) {
    console.error(`Error updating review status for ID ${id}:`, error)
    return null
  }
  return data
}

export async function deleteReview(id: string): Promise<boolean> {
  const supabase = createServerClient(cookies())
  const { error } = await supabase.from("reviews").delete().eq("id", id)
  if (error) {
    console.error(`Error deleting review with ID ${id}:`, error)
    return false
  }
  return true
}
