"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star, CheckCircle, XCircle, Search, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getReviews, updateReviewStatus, deleteReview } from "@/lib/services/review-service" // Assuming these exist
import type { Review } from "@/types/reviews"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect, useCallback } from "react"
import { Loader2 } from "lucide-react"

function ReviewsClientPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const fetchReviews = useCallback(async () => {
    setLoading(true)
    try {
      const fetchedReviews = await getReviews()
      setReviews(fetchedReviews)
      toast({
        title: "Reviews Loaded",
        description: `Successfully loaded ${fetchedReviews.length} reviews.`,
      })
    } catch (error) {
      console.error("Failed to fetch reviews:", error)
      toast({
        title: "Error",
        description: "Failed to load reviews.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  const handleUpdateStatus = async (id: string, newStatus: "pending" | "approved" | "rejected") => {
    try {
      await updateReviewStatus(id, newStatus)
      toast({
        title: "Review Status Updated",
        description: `Review ${id} status changed to ${newStatus}.`,
      })
      fetchReviews() // Refresh the list
    } catch (error) {
      console.error("Failed to update review status:", error)
      toast({
        title: "Error",
        description: "Failed to update review status.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) {
      return
    }
    try {
      await deleteReview(id)
      toast({
        title: "Review Deleted",
        description: "Review has been successfully deleted.",
      })
      fetchReviews() // Refresh the list
    } catch (error) {
      console.error("Failed to delete review:", error)
      toast({
        title: "Error",
        description: "Failed to delete review.",
        variant: "destructive",
      })
    }
  }

  const filteredReviews = reviews.filter(
    (review) =>
      review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Review Management</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" /> All Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search-reviews">Search Reviews</Label>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-reviews"
                placeholder="Search by product, reviewer, or comment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading reviews...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium">{review.productName}</TableCell>
                      <TableCell>{review.reviewerName}</TableCell>
                      <TableCell>
                        {review.rating} <Star className="inline-block h-4 w-4 text-yellow-500 align-text-top" />
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{review.comment}</TableCell>
                      <TableCell>
                        {review.status === "approved" && <Badge variant="success">Approved</Badge>}
                        {review.status === "pending" && <Badge variant="secondary">Pending</Badge>}
                        {review.status === "rejected" && <Badge variant="destructive">Rejected</Badge>}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {review.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleUpdateStatus(review.id, "approved")}
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span className="sr-only">Approve</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleUpdateStatus(review.id, "rejected")}
                              >
                                <XCircle className="h-4 w-4" />
                                <span className="sr-only">Reject</span>
                              </Button>
                            </>
                          )}
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(review.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No reviews found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
