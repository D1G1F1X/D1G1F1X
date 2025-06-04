"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarRating } from "@/components/star-rating"
import { toast } from "@/components/ui/use-toast"

export default function AddReviewPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    rating: 5,
    title: "",
    comment: "",
    readingType: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.userName || !formData.title || !formData.comment) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit review")
      }

      toast({
        title: "Review submitted",
        description: "Thank you for your feedback! Your review has been submitted for approval.",
      })

      router.push("/reviews")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your review. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          <span className="text-white">Share Your </span>
          <span className="text-purple-400">Experience</span>
        </h1>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Submit a Review</CardTitle>
            <CardDescription className="text-gray-400">
              Your feedback helps others discover the power of NUMO ORACLE readings
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="userName" className="text-gray-300">
                  Your Name *
                </Label>
                <Input
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userEmail" className="text-gray-300">
                  Email Address
                </Label>
                <Input
                  id="userEmail"
                  name="userEmail"
                  type="email"
                  value={formData.userEmail}
                  onChange={handleChange}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="(Optional - will not be displayed publicly)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="readingType" className="text-gray-300">
                  Reading Type
                </Label>
                <Select
                  value={formData.readingType}
                  onValueChange={(value) => handleSelectChange("readingType", value)}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select a reading type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="Essential Guidance">Essential Guidance</SelectItem>
                    <SelectItem value="Deep Insight Journey">Deep Insight Journey</SelectItem>
                    <SelectItem value="Spiritual Alignment">Spiritual Alignment</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Your Rating *</Label>
                <StarRating rating={formData.rating} onRatingChange={handleRatingChange} editable />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">
                  Review Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Summarize your experience"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment" className="text-gray-300">
                  Your Review *
                </Label>
                <Textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  className="bg-gray-700 border-gray-600 text-white min-h-[150px]"
                  placeholder="Share details about your experience to help others"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>All reviews are moderated before being published.</p>
          <p>By submitting a review, you agree to our terms and conditions.</p>
        </div>
      </div>
    </main>
  )
}
