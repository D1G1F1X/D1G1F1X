export interface Review {
  id: string
  userId?: string
  userName: string
  userEmail?: string
  rating: number
  title: string
  comment: string
  readingType?: string
  date: string
  status: "pending" | "approved" | "rejected"
  adminResponse?: string
  metadata?: {
    readingId?: string
    productId?: string
    verified?: boolean
    [key: string]: any
  }
}

export interface ReviewFormData {
  userName: string
  userEmail: string
  rating: number
  title: string
  comment: string
  readingType?: string
}

export interface ReviewFilterOptions {
  status?: "all" | "pending" | "approved" | "rejected"
  rating?: number
  readingType?: string
  sortBy?: "date" | "rating"
  sortOrder?: "asc" | "desc"
}
