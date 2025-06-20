import type { Post } from "@/types"

const posts: Post[] = [
  {
    slug: "hello-world",
    title: "Hello World",
    content: "This is my first post.",
    isPublished: true,
  },
  {
    slug: "my-second-post",
    title: "My Second Post",
    content: "This is my second post.",
    isPublished: false,
  },
  {
    slug: "third-post",
    title: "Third Post",
    content: "This is my third post.",
    isPublished: true,
  },
]

// ─── Types ──────────────────────────────────────────────────────────────────────
export interface Page {
  id: string
  slug: string
  title: string
  content: string
  isPublished: boolean
}

// ─── Demo in-memory data (replace with real data anytime) ───────────────────────
export const pairingsData: any = []
export const individualCardData: any = []
export const chaldeanValues: any = {}
export const pythagoreanValues: any = {}
export const compoundNumberMeaningsBriefChaldean: any = {}
export const generalElementMeanings: any = {}

const pages: Page[] = []

// ─── Page helpers ───────────────────────────────────────────────────────────────
export function getPages() {
  return pages.filter((p) => p.isPublished)
}

export function getPageById(id: string) {
  return pages.find((p) => p.id === id) ?? null
}

export function updatePage(id: string, partial: Partial<Page>) {
  const idx = pages.findIndex((p) => p.id === id)
  if (idx !== -1) pages[idx] = { ...pages[idx], ...partial }
  return pages[idx] ?? null
}

// ─── Post helpers (wrap existing functions) ─────────────────────────────────────
export function getPosts(): Post[] {
  return posts.filter((p) => p.isPublished)
}

export function getPost(slug: string) {
  // published first, then draft fallback
  return posts.find((p) => p.slug === slug && p.isPublished) ?? posts.find((p) => p.slug === slug) ?? null
}

export function updatePost(slug: string, partial: Partial<Post>) {
  const idx = posts.findIndex((p) => p.slug === slug)
  if (idx !== -1) posts[idx] = { ...posts[idx], ...partial }
  return posts[idx] ?? null
}

export function deletePost(slug: string) {
  const idx = posts.findIndex((p) => p.slug === slug)
  if (idx !== -1) posts.splice(idx, 1)
  return idx !== -1
}

// Back-compat exports kept for code that still imports them
export { getPosts as getAllPosts }
export { getPost as getPostBySlug }
