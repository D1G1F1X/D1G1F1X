import { NextResponse } from "next/server"
import { getAllReviews, createReview } from "@/lib/services/review-service"

export async function GET() {
  try {
    const reviews = await getAllReviews()
    return NextResponse.json(reviews)
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const reviewData = await request.json()
    const newReview = await createReview(reviewData)
    return NextResponse.json(newReview, { status: 201 })
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}
