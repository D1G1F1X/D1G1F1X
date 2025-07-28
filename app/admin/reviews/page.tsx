import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle, XCircle, Trash2, Star } from "lucide-react"

export default function AdminReviewsPage() {
  const reviews = [
    {
      id: "rev1",
      product: "Deluxe Oracle Deck",
      rating: 5,
      author: "User123",
      date: "2023-10-25",
      status: "Approved",
      comment: "Absolutely love this deck! The artwork is stunning and the readings are so insightful.",
    },
    {
      id: "rev2",
      product: "Numerology Report",
      rating: 4,
      author: "MysticMaven",
      date: "2023-10-24",
      status: "Pending",
      comment: "Very accurate report, but I wish it had more details on career path.",
    },
    {
      id: "rev3",
      product: "Elemental Dice Set",
      rating: 2,
      author: "DiceRoller",
      date: "2023-10-23",
      status: "Rejected",
      comment: "Dice are too small and hard to read. Disappointed.",
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Review Management</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Reviews</CardTitle>
          <CardDescription>Find reviews by product, author, or status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search reviews..." className="pl-9" />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
          <CardDescription>Manage customer reviews for your products.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Product</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Rating</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Author</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Comment</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {reviews.map((review) => (
                  <tr key={review.id}>
                    <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-200">{review.product}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">{review.author}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">{review.date}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          review.status === "Approved"
                            ? "bg-green-500/20 text-green-400"
                            : review.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {review.status}
                      </span>
                    </td>
                    <td className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2 text-sm text-gray-300">
                      {review.comment}
                    </td>
                    <td className="flex justify-end space-x-2 whitespace-nowrap px-4 py-2 text-sm">
                      {review.status !== "Approved" && (
                        <Button variant="outline" size="sm">
                          <CheckCircle className="h-4 w-4" />
                          <span className="sr-only">Approve</span>
                        </Button>
                      )}
                      {review.status !== "Rejected" && (
                        <Button variant="outline" size="sm">
                          <XCircle className="h-4 w-4" />
                          <span className="sr-only">Reject</span>
                        </Button>
                      )}
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
