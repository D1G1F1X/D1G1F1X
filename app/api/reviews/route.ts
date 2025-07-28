import { type NextRequest, NextResponse } from "next/server"
import { createReview, getReviews } from "@/lib/services/review-service"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status") as any
    const rating = searchParams.get("rating") ? Number.parseInt(searchParams.get("rating")!) : undefined
    const readingType = searchParams.get("readingType")
    const sortBy = searchParams.get("sortBy") as any
    const sortOrder = searchParams.get("sortOrder") as any

    const filters = {
      status,
      rating,
      readingType,
      sortBy,
      sortOrder,
    }

    const reviews = await getReviews(filters)
    return NextResponse.json(reviews)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Basic validation
    if (!data.userName || !data.rating || !data.comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get current user if logged in
    const currentUser = await getCurrentUser()

    // Create the review
    const review = await createReview({
      ...data,
      userId: currentUser?.id,
    })

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}
