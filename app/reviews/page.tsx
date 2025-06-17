import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StarRating } from "@/components/star-rating"
import { getApprovedReviews, getReviewStats } from "@/lib/services/review-service"

export const dynamic = "force-dynamic" // Added to force dynamic rendering

export const metadata: Metadata = {
  title: "NUMO ORACLE | Customer Reviews",
  description: "Read what others are saying about their NUMO ORACLE reading experiences",
}

export default async function ReviewsPage() {
  // Ensure reviews is always an array
  const reviews = (await getApprovedReviews()) || []
  const stats = (await getReviewStats()) || { averageRating: 0, approvedReviews: 0 } // Provide default for stats

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-white">Customer </span>
          <span className="text-purple-400">Reviews</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Discover what others are saying about their experiences with NUMO ORACLE readings
        </p>
      </div>

      {/* Stats Summary */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-purple-400 mb-2">{stats.averageRating.toFixed(1)}</p>
            <div className="flex justify-center mb-2">
              <StarRating rating={Math.round(stats.averageRating)} size="sm" />
            </div>
            <p className="text-gray-300">Average Rating</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-purple-400 mb-2">{stats.approvedReviews}</p>
            <p className="text-gray-300">Verified Reviews</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-purple-400 mb-2">95%</p>
            <p className="text-gray-300">Would Recommend</p>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-white">{review.title}</CardTitle>
                  <p className="text-sm text-gray-400">{review.readingType}</p>
                </div>
                <StarRating rating={review.rating} size="sm" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 italic">"{review.comment}"</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
              <p className="font-medium text-purple-400">{review.userName}</p>
              <p className="text-sm text-gray-400">{review.date}</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Add Review CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4 text-white">Share Your Experience</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Have you had a reading with NUMO ORACLE? We'd love to hear about your experience!
        </p>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/reviews/add">Write a Review</Link>
        </Button>
      </div>
    </main>
  )
}
