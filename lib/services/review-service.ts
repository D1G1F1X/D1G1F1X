import { getServerClient } from "@/lib/supabase-server"
import { getClientSide, supabaseAdmin } from "@/lib/supabase"

export type Review = {
  id: string
  user_id: string
  title: string
  content: string
  rating: number
  created_at: string
  updated_at: string
  is_approved: boolean
  reading_type?: string
  admin_response?: string
}

export type ReviewCreate = Omit<Review, "id" | "created_at" | "updated_at" | "is_approved">
export type ReviewUpdate = Partial<Omit<Review, "id" | "user_id" | "created_at" | "updated_at">>

// Server-side review operations
export const reviewService = {
  // Get a review by ID
  async getReviewById(reviewId: string): Promise<Review | null> {
    const supabase = getServerClient()

    const { data, error } = await supabase.from("reviews").select("*").eq("id", reviewId).single()

    if (error) {
      console.error("Error fetching review:", error)
      return null
    }

    return data as Review
  },

  // Get all approved reviews
  async getApprovedReviews(): Promise<Review[]> {
    const supabase = getServerClient()

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching approved reviews:", error)
      return []
    }

    return data as Review[]
  },

  // Get all reviews (admin only)
  async getAllReviews(): Promise<Review[]> {
    const supabase = getServerClient()

    const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching all reviews:", error)
      return []
    }

    return data as Review[]
  },

  // Approve a review (admin only)
  async approveReview(reviewId: string): Promise<Review | null> {
    const supabase = getServerClient()

    const { data, error } = await supabase
      .from("reviews")
      .update({ is_approved: true })
      .eq("id", reviewId)
      .select()
      .single()

    if (error) {
      console.error("Error approving review:", error)
      return null
    }

    return data as Review
  },
}

// Client-side review operations
export const useReviews = () => {
  const supabase = getClientSide()

  return {
    // Get current user's reviews
    async getCurrentUserReviews(): Promise<Review[]> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return []
      }

      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching current user reviews:", error)
        return []
      }

      return data as Review[]
    },

    // Create a new review
    async createReview(review: ReviewCreate): Promise<Review | null> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return null
      }

      // Ensure user_id is set to current user
      const reviewWithUserId = {
        ...review,
        user_id: session.user.id,
      }

      const { data, error } = await supabase.from("reviews").insert(reviewWithUserId).select().single()

      if (error) {
        console.error("Error creating review:", error)
        return null
      }

      return data as Review
    },

    // Update a review
    async updateReview(reviewId: string, updates: ReviewUpdate): Promise<Review | null> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return null
      }

      // First check if the review belongs to the current user
      const { data: review, error: fetchError } = await supabase
        .from("reviews")
        .select("*")
        .eq("id", reviewId)
        .eq("user_id", session.user.id)
        .single()

      if (fetchError || !review) {
        console.error("Error fetching review or review not found:", fetchError)
        return null
      }

      const { data, error } = await supabase.from("reviews").update(updates).eq("id", reviewId).select().single()

      if (error) {
        console.error("Error updating review:", error)
        return null
      }

      return data as Review
    },

    // Delete a review
    async deleteReview(reviewId: string): Promise<boolean> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return false
      }

      // First check if the review belongs to the current user
      const { data: review, error: fetchError } = await supabase
        .from("reviews")
        .select("*")
        .eq("id", reviewId)
        .eq("user_id", session.user.id)
        .single()

      if (fetchError || !review) {
        console.error("Error fetching review or review not found:", fetchError)
        return false
      }

      const { error } = await supabase.from("reviews").delete().eq("id", reviewId)

      if (error) {
        console.error("Error deleting review:", error)
        return false
      }

      return true
    },
  }
}

// Legacy exports for backward compatibility
export async function createReview(review: {
  user_id?: string
  title: string
  content: string
  rating: number
  reading_type?: string
}): Promise<{ success: boolean; id?: string; error?: any }> {
  const supabase = getClientSide()

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      user_id: review.user_id,
      title: review.title,
      content: review.content,
      rating: review.rating,
      is_approved: false, // New reviews are not approved by default
      reading_type: review.reading_type,
    })
    .select("id")
    .single()

  if (error) {
    console.error("Error creating review:", error)
    return { success: false, error }
  }

  return { success: true, id: data?.id }
}

export async function getReviews(
  filters: { status?: string; rating?: number; readingType?: string; sortBy?: string; sortOrder?: string } = {},
): Promise<Review[]> {
  const supabase = getClientSide()

  let query = supabase.from("reviews").select("*")

  // Apply filters
  if (filters.status && filters.status !== "all") {
    query = query.eq("is_approved", filters.status === "approved")
  }
  if (filters.rating) {
    query = query.gte("rating", filters.rating)
  }
  if (filters.readingType) {
    query = query.eq("reading_type", filters.readingType)
  }

  const { data, error } = await query.order(filters.sortBy || "created_at", { ascending: filters.sortOrder === "asc" })

  if (error) {
    console.error("Error fetching reviews:", error)
    return []
  }

  return data || []
}

export async function getApprovedReviews(): Promise<Review[]> {
  return getReviews({ status: "approved" })
}

export async function getReviewStats(): Promise<{ averageRating: number; approvedReviews: number }> {
  const supabase = getClientSide()

  const { data: approvedReviews, error: approvedError } = await supabase
    .from("reviews")
    .select("rating")
    .eq("is_approved", true)

  if (approvedError) {
    console.error("Error fetching approved reviews:", approvedError)
    return { averageRating: 0, approvedReviews: 0 }
  }

  const averageRating =
    approvedReviews?.length > 0
      ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) / approvedReviews.length
      : 0

  return { averageRating, approvedReviews: approvedReviews?.length || 0 }
}

export async function getReviewById(reviewId: string): Promise<Review | null> {
  const supabase = getClientSide()

  const { data, error } = await supabase.from("reviews").select("*").eq("id", reviewId).single()

  if (error) {
    console.error("Error fetching review:", error)
    return null
  }

  return data
}

export async function updateReviewStatus(
  reviewId: string,
  status: "approved" | "rejected",
  adminResponse?: string,
): Promise<Review | null> {
  const supabase = supabaseAdmin

  const { data, error } = await supabase
    .from("reviews")
    .update({ is_approved: status === "approved", admin_response: adminResponse })
    .eq("id", reviewId)
    .select("*")
    .single()

  if (error) {
    console.error("Error updating review status:", error)
    return null
  }

  return data
}

export async function deleteReview(reviewId: string): Promise<boolean> {
  const { error } = await supabaseAdmin.from("reviews").delete().eq("id", reviewId)

  if (error) {
    console.error("Error deleting review:", error)
    return false
  }

  return true
}
