import { NextResponse } from "next/server"
import { getReviewById, updateReview, deleteReview } from "@/lib/services/review-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const review = await getReviewById(params.id)
    if (review) {
      return NextResponse.json(review)
    } else {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }
  } catch (error) {
    console.error(`Error fetching review ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch review" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedData = await request.json()
    const result = await updateReview(params.id, updatedData)
    if (result.success) {
      return NextResponse.json({ message: "Review updated successfully" })
    } else {
      return NextResponse.json({ error: result.message }, { status: 404 })
    }
  } catch (error) {
    console.error(`Error updating review ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await deleteReview(params.id)
    if (result.success) {
      return NextResponse.json({ message: "Review deleted successfully" })
    } else {
      return NextResponse.json({ error: result.message }, { status: 404 })
    }
  } catch (error) {
    console.error(`Error deleting review ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 })
  }
}
