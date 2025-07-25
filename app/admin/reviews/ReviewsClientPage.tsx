"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, XCircle, Trash2, Star } from "lucide-react"
import { getReviews, updateReviewStatus, deleteReview } from "@/lib/services/review-service"
import type { Review } from "@/types/reviews"

export default function ReviewsClientPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const fetchedReviews = await getReviews()
      setReviews(fetchedReviews)
    } catch (error) {
      console.error("Failed to fetch reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const handleUpdateStatus = async (reviewId: string, newStatus: "pending" | "approved" | "rejected") => {
    setLoading(true)
    try {
      await updateReviewStatus(reviewId, newStatus)
      fetchReviews() // Re-fetch to get updated list
    } catch (error) {
      console.error("Failed to update review status:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review? This action cannot be undone.")) return
    setLoading(true)
    try {
      await deleteReview(reviewId)
      fetchReviews() // Re-fetch to get updated list
    } catch (error) {
      console.error("Failed to delete review:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-lg text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        Loading reviews...
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Review Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <p className="text-muted-foreground">No reviews found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.product_id}</TableCell>{" "}
                    {/* Assuming product_id is a readable identifier */}
                    <TableCell>{review.user_id}</TableCell> {/* Assuming user_id is a readable identifier */}
                    <TableCell>
                      <div className="flex items-center">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        {Array.from({ length: 5 - review.rating }).map((_, i) => (
                          <Star key={i + review.rating} className="h-4 w-4 text-muted-foreground" />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate">{review.comment}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          review.status === "approved"
                            ? "default"
                            : review.status === "rejected"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(review.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      {review.status !== "approved" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateStatus(review.id, "approved")}
                          className="mr-2"
                          disabled={loading}
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="sr-only">Approve</span>
                        </Button>
                      )}
                      {review.status !== "rejected" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateStatus(review.id, "rejected")}
                          className="mr-2"
                          disabled={loading}
                        >
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Reject</span>
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteReview(review.id)}
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
