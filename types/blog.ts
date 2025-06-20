export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  isPublished: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
  featuredImage?: string
  categories: string[]
  tags: string[]
  seoTitle?: string
  seoDescription?: string
  readingTime: number
  viewCount: number
}

export interface BlogResponse {
  posts: BlogPost[]
  total: number
  success: boolean
  error?: string
  timestamp: string
}

export interface User {
  id: string
  email: string
  role: "admin" | "user" | "guest"
  name: string
}
