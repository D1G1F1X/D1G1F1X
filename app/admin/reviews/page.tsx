"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarRating } from "@/components/star-rating"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { Search } from "lucide-react"
import type { ReviewFilterOptions } from "@/types/reviews"
import { DataTable } from "./data-table"
import { columns } from "./columns"

async function getReviews(): Promise<any[]> {
  // Replace with your actual API call to fetch reviews
  // This is mock data for demonstration purposes
  return [
    {
      id: "rev001",
      product: "Deluxe Oracle Deck",
      reviewerName: "Emma Stone",
      rating: 5,
      comment: "Absolutely beautiful deck, the artwork is stunning and the insights are profound. Highly recommend!",
      date: "2024-07-22",
      status: "Published",
    },
    {
      id: "rev002",
      product: "Beginner's Guidebook",
      reviewerName: "Liam Green",
      rating: 4,
      comment:
        "Very helpful for beginners, easy to understand. Some sections could be more detailed, but overall great.",
      date: "2024-07-20",
      status: "Pending",
    },
    {
      id: "rev003",
      product: "Elemental Dice Set",
      reviewerName: "Olivia Blue",
      rating: 5,
      comment: "Fun and insightful! Adds a unique twist to my daily readings.",
      date: "2024-07-18",
      status: "Published",
    },
    {
      id: "rev004",
      product: "Personalized Numerology Report",
      reviewerName: "Noah White",
      rating: 3,
      comment: "The report was okay, but I expected more personalized depth based on my birth time.",
      date: "2024-07-15",
      status: "Published",
    },
    {
      id: "rev005",
      product: "Deluxe Oracle Deck",
      reviewerName: "Sophia Black",
      rating: 5,
      comment: "This deck resonates so deeply with me. The quality is exceptional and the energy is pure.",
      date: "2024-07-10",
      status: "Published",
    },
  ]
}

export default async function AdminReviewsPage() {
  const reviews = await getReviews()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<ReviewFilterOptions>({
    status: "all",
    sortBy: "date",
    sortOrder: "desc",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReview, setSelectedReview] = useState<any | null>(null)
  const [responseDialogOpen, setResponseDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [adminResponse, setAdminResponse] = useState("")

  useEffect(() => {
    setLoading(false)
  }, [])

  const handleUpdateStatus = async (id: string, status: "approved" | "rejected", response?: string) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, adminResponse: response }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(`Failed to update review: ${errorData.error || res.statusText}`)
      }

      toast({
        title: `Review ${status}`,
        description: `The review has been ${status} successfully.`,
      })

      // Fetch reviews again if needed
    } catch (error) {
      console.error("Update status error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update review status",
        variant: "destructive",
      })
    }
  }

  const handleDeleteReview = async (id: string) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Failed to delete review")

      toast({
        title: "Review deleted",
        description: "The review has been permanently deleted.",
      })

      // Fetch reviews again if needed
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive",
      })
    }
  }

  const openResponseDialog = (review: any) => {
    setSelectedReview(review)
    setAdminResponse(review.adminResponse || "")
    setResponseDialogOpen(true)
  }

  const openDeleteDialog = (review: any) => {
    setSelectedReview(review)
    setDeleteDialogOpen(true)
  }

  const handleResponseSubmit = () => {
    if (!selectedReview) return

    handleUpdateStatus(selectedReview.id, "rejected", adminResponse)
    setResponseDialogOpen(false)
  }

  const handleDeleteConfirm = () => {
    if (!selectedReview) return

    handleDeleteReview(selectedReview.id)
    setDeleteDialogOpen(false)
  }

  const filteredReviews = reviews.filter((review: any) => {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()
    return (
      review.reviewerName.toLowerCase().includes(searchLower) ||
      review.product.toLowerCase().includes(searchLower) ||
      review.comment.toLowerCase().includes(searchLower)
    )
  })

  const pendingCount = reviews.filter((r: any) => r.status === "Pending").length
  const approvedCount = reviews.filter((r: any) => r.status === "Published").length
  const rejectedCount = reviews.filter((r: any) => r.status === "Rejected").length

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Manage Reviews</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <Select
            value={filters.sortBy}
            onValueChange={(value) => setFilters({ ...filters, sortBy: value as "date" | "rating" })}
          >
            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters.sortOrder}
            onValueChange={(value) => setFilters({ ...filters, sortOrder: value as "asc" | "desc" })}
          >
            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="desc">Newest first</SelectItem>
              <SelectItem value="asc">Oldest first</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-500">{pendingCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-500">{approvedCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-500">{rejectedCount}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="all"
        className="w-full"
        onValueChange={(value) => setFilters({ ...filters, status: value as any })}
      >
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">
            All
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-gray-700">
            Pending
          </TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-gray-700">
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-gray-700">
            Rejected
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <DataTable data={filteredReviews} columns={columns} />
        </TabsContent>
        <TabsContent value="pending" className="mt-6">
          <DataTable data={filteredReviews.filter((r: any) => r.status === "Pending")} columns={columns} />
        </TabsContent>
        <TabsContent value="approved" className="mt-6">
          <DataTable data={filteredReviews.filter((r: any) => r.status === "Published")} columns={columns} />
        </TabsContent>
        <TabsContent value="rejected" className="mt-6">
          <DataTable data={filteredReviews.filter((r: any) => r.status === "Rejected")} columns={columns} />
        </TabsContent>
      </Tabs>

      {/* Response Dialog */}
      <Dialog open={responseDialogOpen} onOpenChange={setResponseDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Respond to Review</DialogTitle>
            <DialogDescription className="text-gray-400">
              Add a response explaining why this review is being rejected.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedReview && (
              <div className="bg-gray-900 p-4 rounded-md">
                <p className="font-medium text-purple-400">{selectedReview.reviewerName}</p>
                <div className="flex items-center my-1">
                  <StarRating rating={selectedReview.rating} size="sm" />
                </div>
                <p className="text-gray-300 italic">"{selectedReview.comment}"</p>
              </div>
            )}
            <Textarea
              value={adminResponse}
              onChange={(e) => setAdminResponse(e.target.value)}
              placeholder="Enter your response..."
              className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResponseDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleResponseSubmit} className="bg-red-600 hover:bg-red-700">
              Reject with Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete the review.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
