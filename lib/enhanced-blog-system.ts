import type { Post } from "@/lib/content"

export interface BlogUser {
  id: string
  email: string
  role: "admin" | "user" | "guest"
  name: string
}

export interface BlogSystemConfig {
  postsPerPage: number
  carouselPostsCount: number
  enableComments: boolean
  enableSEO: boolean
}

export class EnhancedBlogSystem {
  private config: BlogSystemConfig
  private currentUser: BlogUser | null = null

  constructor(config: BlogSystemConfig) {
    this.config = config
  }

  /**
   * Safely load all posts from the content module.
   * Works whether the module exports `getAllPosts()` or a `posts` array.
   */
  private async loadAllPosts(): Promise<Post[]> {
    const mod = await import("@/lib/content")
    if (typeof mod.getAllPosts === "function") {
      return await mod.getAllPosts()
    }
    // Fallback: static array export
    if (Array.isArray(mod.posts)) {
      return mod.posts
    }
    console.error("Content module did not provide posts.")
    return []
  }

  setCurrentUser(user: BlogUser | null) {
    this.currentUser = user
  }

  getCurrentUser(): BlogUser | null {
    return this.currentUser
  }

  canViewPost(post: Post): boolean {
    if (!post.isPublished) {
      return this.currentUser?.role === "admin"
    }
    return true
  }

  canEditPost(): boolean {
    return this.currentUser?.role === "admin"
  }

  canCreatePost(): boolean {
    return this.currentUser?.role === "admin"
  }

  validatePost(post: Partial<Post>): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!post.title?.trim()) {
      errors.push("Title is required")
    }

    if (!post.content?.trim()) {
      errors.push("Content is required")
    }

    if (!post.slug?.trim()) {
      errors.push("Slug is required")
    }

    if (!post.excerpt?.trim()) {
      errors.push("Excerpt is required")
    }

    if (!post.author?.trim()) {
      errors.push("Author is required")
    }

    // SEO validation
    if (post.title && post.title.length > 60) {
      errors.push("Title should be under 60 characters for SEO")
    }

    if (post.excerpt && post.excerpt.length > 160) {
      errors.push("Excerpt should be under 160 characters for SEO")
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  generateSEOMetadata(post: Post) {
    return {
      title: post.title,
      description: post.excerpt,
      keywords: post.tags?.join(", ") || "",
      author: post.author,
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      section: post.categories?.[0] || "Blog",
      tags: post.tags || [],
    }
  }

  async fetchPosts(
    options: {
      limit?: number
      offset?: number
      category?: string
      tag?: string
      published?: boolean
    } = {},
  ): Promise<{ posts: Post[]; total: number; hasMore: boolean }> {
    try {
      let posts = await this.loadAllPosts()

      // Apply filters
      if (options.category) {
        posts = posts.filter((post) =>
          post.categories?.some((cat) => cat.toLowerCase().includes(options.category!.toLowerCase())),
        )
      }

      if (options.tag) {
        posts = posts.filter((post) => post.tags?.some((tag) => tag.toLowerCase().includes(options.tag!.toLowerCase())))
      }

      if (options.published !== undefined) {
        posts = posts.filter((post) => post.isPublished === options.published)
      }

      // Filter based on user permissions
      posts = posts.filter((post) => this.canViewPost(post))

      const total = posts.length
      const offset = options.offset || 0
      const limit = options.limit || this.config.postsPerPage

      const paginatedPosts = posts.slice(offset, offset + limit)
      const hasMore = offset + limit < total

      return {
        posts: paginatedPosts,
        total,
        hasMore,
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
      return { posts: [], total: 0, hasMore: false }
    }
  }

  async getCarouselPosts(): Promise<Post[]> {
    try {
      const result = await this.fetchPosts({
        limit: this.config.carouselPostsCount,
        published: true,
      })
      return result.posts
    } catch (error) {
      console.error("Error fetching carousel posts:", error)
      return []
    }
  }

  async getFeaturedPosts(count = 3): Promise<Post[]> {
    try {
      const result = await this.fetchPosts({
        limit: count,
        published: true,
      })
      return result.posts.filter((post) => post.featuredImage)
    } catch (error) {
      console.error("Error fetching featured posts:", error)
      return []
    }
  }

  async getRelatedPosts(currentPost: Post, count = 3): Promise<Post[]> {
    try {
      const allPosts = await this.loadAllPosts()

      const relatedPosts = allPosts
        .filter((post) => post.id !== currentPost.id && post.isPublished && this.canViewPost(post))
        .filter((post) => {
          // Find posts with similar categories or tags
          const hasCommonCategory = post.categories?.some((cat) => currentPost.categories?.includes(cat))
          const hasCommonTag = post.tags?.some((tag) => currentPost.tags?.includes(tag))
          return hasCommonCategory || hasCommonTag
        })
        .slice(0, count)

      return relatedPosts
    } catch (error) {
      console.error("Error fetching related posts:", error)
      return []
    }
  }
}

// Default configuration
export const defaultBlogConfig: BlogSystemConfig = {
  postsPerPage: 10,
  carouselPostsCount: 5,
  enableComments: false,
  enableSEO: true,
}

// Singleton instance
export const blogSystem = new EnhancedBlogSystem(defaultBlogConfig)
