import { NextResponse } from "next/server"
import { getReviewById, updateReview, deleteReview } from "@/lib/services/review-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const review = await getReviewById(params.id)
    if (review) {
      return NextResponse.json(review)
    } else {
      return NextResponse.json({ message: "Review not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error fetching review:", error)
    return NextResponse.json({ error: "Failed to fetch review" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedData = await request.json()
    const updatedReview = await updateReview(params.id, updatedData)
    if (updatedReview) {
      return NextResponse.json(updatedReview)
    } else {
      return NextResponse.json({ message: "Review not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error updating review:", error)
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const deleted = await deleteReview(params.id)
    if (deleted) {
      return NextResponse.json({ message: "Review deleted successfully" })
    } else {
      return NextResponse.json({ message: "Review not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error deleting review:", error)
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 })
  }
}
