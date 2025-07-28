"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StarRating } from "@/components/star-rating"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Send } from "lucide-react"
import { useRouter } from "next/navigation"
import { createReview } from "@/lib/services/review-service"

export default function AddReviewPage() {
  const [productName, setProductName] = useState("")
  const [reviewerName, setReviewerName] = useState("")
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!productName || !reviewerName || rating === 0 || !comment) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select a rating.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      const newReview = {
        product: productName,
        reviewerName,
        rating,
        comment,
        date: new Date().toISOString(),
        status: "Pending", // Reviews typically start as pending for moderation
      }

      const result = await createReview(newReview)

      if (result) {
        toast({
          title: "Review Submitted!",
          description: "Thank you for your feedback. Your review is awaiting moderation.",
          variant: "default",
        })
        // Clear form
        setProductName("")
        setReviewerName("")
        setRating(0)
        setComment("")
        router.push("/reviews") // Redirect to reviews page or a confirmation page
      } else {
        throw new Error("Failed to create review.")
      }
    } catch (error: any) {
      console.error("Error submitting review:", error)
      toast({
        title: "Submission Failed",
        description: error.message || "An error occurred while submitting your review. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary-foreground">Add Your Review</CardTitle>
          <CardDescription className="text-muted-foreground">
            Share your experience with our products and services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="productName">Product/Service Name</Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g., Deluxe Oracle Deck, Numerology Reading"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviewerName">Your Name</Label>
              <Input
                id="reviewerName"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="e.g., Jane Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Your Rating</Label>
              <StarRating rating={rating} onRatingChange={setRating} />
              {rating === 0 && <p className="text-sm text-red-500">Please select a star rating.</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Your Review</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your detailed review here..."
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Submit Review
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
