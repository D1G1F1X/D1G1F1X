import { NextResponse } from "next/server"
import { getReviews, createReview } from "@/lib/services/review-service"

export async function GET() {
  try {
    const reviews = await getReviews()
    return NextResponse.json(reviews)
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const reviewData = await request.json()
    const result = await createReview(reviewData)
    if (result.success) {
      return NextResponse.json({ message: "Review created successfully", review: result.review }, { status: 201 })
    } else {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}
