import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { StarRating } from "@/components/star-rating"
import { Button } from "@/components/ui/button"
import { Plus, Star } from "lucide-react"
import Link from "next/link"
import { getAllReviews } from "@/lib/services/review-service"

export default async function ReviewsPage() {
  const reviews = await getAllReviews()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-foreground mb-4">Customer Reviews</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Hear what our customers are saying about their NUMO Oracle experience.
        </p>
      </div>

      <div className="flex justify-end mb-8">
        <Link href="/reviews/add">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" /> Write a Review
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-12">
            <p className="text-lg">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="flex flex-col shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl text-primary-foreground">{review.reviewerName}</CardTitle>
                  <StarRating rating={review.rating} />
                </div>
                <CardDescription className="text-muted-foreground">Product: {review.product}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground leading-relaxed line-clamp-4">&quot;{review.comment}&quot;</p>
              </CardContent>
              <div className="p-6 pt-0 flex justify-between items-center text-sm text-muted-foreground">
                <span>{new Date(review.date).toLocaleDateString()}</span>
                {review.status === "Pending" && (
                  <span className="text-yellow-500 flex items-center">
                    <Star className="h-4 w-4 mr-1" /> Pending Approval
                  </span>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      <Separator className="my-12" />

      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-primary-foreground">Your Feedback Matters</h2>
        <p className="text-lg text-muted-foreground">Your reviews help us improve and serve the community better.</p>
        <Button asChild size="lg" variant="outline">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}
