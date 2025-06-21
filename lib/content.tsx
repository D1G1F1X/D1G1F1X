/// lib/content.tsx

// ----------- Types -----------
export type Post = {
  id: string
  title: string
  slug: string
  content: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
  featuredImage?: string
}

export type Page = {
  id: string
  title: string
  slug: string
  content: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
  featuredImage?: string
}

// ----------- Posts (mock) -----------
export const posts: Post[] = [
  {
    id: "hello-world",
    title: "Hello World",
    slug: "hello-world",
    content: "## Hello World\n\nThis is my first post!",
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featuredImage: undefined,
  },
  {
    id: "my-second-post",
    title: "My Second Post",
    slug: "my-second-post",
    content: "## My Second Post\n\nThis is my second post!",
    isPublished: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featuredImage: undefined,
  },
]

// ----------- Pages (mock) -----------
export const pages: Page[] = [
  {
    id: "about",
    title: "About NUMO",
    slug: "about-numo",
    content: "## About NUMO\n\nThis is a placeholder page. Replace this content as needed.",
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featuredImage: undefined,
  },
]

// ----------- Helpers -----------
function getAllPosts(options: { includeUnpublished?: boolean } = {}) {
  const { includeUnpublished = false } = options
  return includeUnpublished ? [...posts] : posts.filter((p) => p.isPublished)
}

// -------- Posts helpers (aliases required by other modules) --------
export function getPosts(options: { includeUnpublished?: boolean } = {}) {
  return getAllPosts(options) // alias to the existing implementation
}

export function getPost(id: string) {
  return posts.find((p) => p.id === id)
}

export function updatePost(updated: Post) {
  const i = posts.findIndex((p) => p.id === updated.id)
  if (i !== -1) {
    posts[i] = { ...posts[i], ...updated, updatedAt: new Date().toISOString() }
    return posts[i]
  }
  posts.push(updated)
  return updated
}

export function deletePost(id: string) {
  const i = posts.findIndex((p) => p.id === id)
  if (i !== -1) {
    return posts.splice(i, 1)[0]
  }
  return undefined
}

// -------- Pages helpers (new) --------
export function getPages(options: { includeUnpublished?: boolean } = {}) {
  const { includeUnpublished = false } = options
  return includeUnpublished ? [...pages] : pages.filter((p) => p.isPublished)
}

export function getPageById(id: string) {
  return pages.find((p) => p.id === id)
}

export function updatePage(updated: Page) {
  const i = pages.findIndex((p) => p.id === updated.id)
  if (i !== -1) {
    pages[i] = { ...pages[i], ...updated, updatedAt: new Date().toISOString() }
    return pages[i]
  }
  pages.push(updated)
  return updated
}
