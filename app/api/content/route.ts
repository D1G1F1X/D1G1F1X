import { NextResponse } from "next/server"

// Mock database for content
let pages = [
  {
    id: "landing",
    slug: "landing",
    title: "The NUMO Oracle Card Deck",
    subtitle: "BY KRAFTWERK NUMEROLOGY",
    description: "Discover the ancient wisdom of numerology combined with oracle card readings",
    content: "Welcome to the NUMO Oracle experience. Our unique deck combines numerology with elemental wisdom.",
    sections: [
      {
        id: "hero",
        title: "Discover Your Path",
        content: "Unlock the secrets of the universe with our mystical oracle cards",
        isActive: true,
      },
      {
        id: "features",
        title: "Oracle Tools",
        content: "Card Simulator, Numerology Calculator, Card Library",
        isActive: true,
      },
      {
        id: "testimonials",
        title: "What Our Users Say",
        content: "The NUMO Oracle has transformed my spiritual practice. The insights are incredibly accurate!",
        isActive: true,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

let posts = [
  {
    id: "1",
    title: "Understanding Numerology",
    slug: "understanding-numerology",
    content: "Numerology is the study of numbers and their energetic influence on our lives...",
    excerpt: "Learn the basics of numerology and how it can transform your understanding of life.",
    author: "Admin",
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const slug = searchParams.get("slug")

  if (type === "page" && slug) {
    const page = pages.find((p) => p.slug === slug)
    return NextResponse.json({ page })
  }

  if (type === "pages") {
    return NextResponse.json({ pages })
  }

  if (type === "post" && slug) {
    const post = posts.find((p) => p.slug === slug)
    return NextResponse.json({ post })
  }

  if (type === "posts") {
    return NextResponse.json({ posts })
  }

  return NextResponse.json({ pages, posts })
}

export async function POST(request: Request) {
  const body = await request.json()

  if (body.type === "page") {
    const { page } = body
    const existingIndex = pages.findIndex((p) => p.id === page.id)

    if (existingIndex >= 0) {
      pages[existingIndex] = {
        ...page,
        updatedAt: new Date().toISOString(),
      }
    } else {
      pages.push({
        ...page,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }

    return NextResponse.json({ success: true, page: pages.find((p) => p.id === page.id) })
  }

  if (body.type === "post") {
    const { post } = body
    const existingIndex = posts.findIndex((p) => p.id === post.id)

    if (existingIndex >= 0) {
      posts[existingIndex] = {
        ...post,
        updatedAt: new Date().toISOString(),
      }
    } else {
      posts.push({
        ...post,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }

    return NextResponse.json({ success: true, post: posts.find((p) => p.id === post.id) })
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const id = searchParams.get("id")

  if (!type || !id) {
    return NextResponse.json({ error: "Missing type or id" }, { status: 400 })
  }

  if (type === "page") {
    pages = pages.filter((p) => p.id !== id)
    return NextResponse.json({ success: true })
  }

  if (type === "post") {
    posts = posts.filter((p) => p.id !== id)
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 })
}
