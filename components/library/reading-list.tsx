"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Clock, CheckCircle, Trash2, Edit, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { UserReadingListItem, LibraryDocument } from "@/types/library"

interface ReadingListProps {
  userId: string
  onViewDocument?: (document: LibraryDocument) => void
}

export function ReadingList({ userId, onViewDocument }: ReadingListProps) {
  const [readingList, setReadingList] = useState<UserReadingListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<UserReadingListItem>>({})
  const { toast } = useToast()

  useEffect(() => {
    fetchReadingList()
  }, [userId])

  const fetchReadingList = async () => {
    try {
      const response = await fetch(`/api/library/reading-list?userId=${userId}`)
      const result = await response.json()

      if (result.success) {
        setReadingList(result.data)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error fetching reading list:", error)
      toast({
        title: "Error",
        description: "Failed to load reading list",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateReadingListItem = async (id: string, updates: Partial<UserReadingListItem>) => {
    try {
      const response = await fetch(`/api/library/reading-list/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      })

      const result = await response.json()

      if (result.success) {
        setReadingList((prev) => prev.map((item) => (item.id === id ? { ...item, ...result.data } : item)))
        toast({
          title: "Success",
          description: "Reading list updated",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error updating reading list item:", error)
      toast({
        title: "Error",
        description: "Failed to update reading list",
        variant: "destructive",
      })
    }
  }

  const removeFromReadingList = async (id: string) => {
    try {
      const response = await fetch(`/api/library/reading-list/${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        setReadingList((prev) => prev.filter((item) => item.id !== id))
        toast({
          title: "Success",
          description: "Removed from reading list",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error removing from reading list:", error)
      toast({
        title: "Error",
        description: "Failed to remove from reading list",
        variant: "destructive",
      })
    }
  }

  const startEditing = (item: UserReadingListItem) => {
    setEditingItem(item.id)
    setEditData({
      status: item.status,
      progress: item.progress,
      notes: item.notes,
      rating: item.rating,
    })
  }

  const saveEdit = async () => {
    if (!editingItem) return

    await updateReadingListItem(editingItem, editData)
    setEditingItem(null)
    setEditData({})
  }

  const cancelEdit = () => {
    setEditingItem(null)
    setEditData({})
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "to_read":
        return <Clock className="h-4 w-4" />
      case "reading":
        return <BookOpen className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "to_read":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      case "reading":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const groupedItems = {
    to_read: readingList.filter((item) => item.status === "to_read"),
    reading: readingList.filter((item) => item.status === "reading"),
    completed: readingList.filter((item) => item.status === "completed"),
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (readingList.length === 0) {
    return (
      <div className="text-center py-8">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No books in your reading list</h3>
        <p className="text-gray-400">Start adding books to track your reading progress!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedItems).map(([status, items]) => (
        <div key={status}>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            {getStatusIcon(status)}
            {status === "to_read" ? "To Read" : status === "reading" ? "Currently Reading" : "Completed"}
            <Badge variant="secondary">{items.length}</Badge>
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {items.map((item) => (
              <Card key={item.id} className="bg-black/30 border-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.document?.title}</CardTitle>
                      {item.document?.author && <p className="text-sm text-gray-400">{item.document.author}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(item.status)}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1 capitalize">{item.status.replace("_", " ")}</span>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {editingItem === item.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Status</label>
                          <Select
                            value={editData.status || "to_read"}
                            onValueChange={(value) => setEditData((prev) => ({ ...prev, status: value as any }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="to_read">To Read</SelectItem>
                              <SelectItem value="reading">Reading</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Progress (%)</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={editData.progress || 0}
                            onChange={(e) =>
                              setEditData((prev) => ({ ...prev, progress: Number.parseInt(e.target.value) || 0 }))
                            }
                            className="w-full px-3 py-2 bg-black/50 border border-gray-700 rounded-md"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Rating (1-5)</label>
                        <Select
                          value={editData.rating?.toString() || "0"}
                          onValueChange={(value) =>
                            setEditData((prev) => ({ ...prev, rating: value ? Number.parseInt(value) : undefined }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="No rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">No rating</SelectItem>
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <SelectItem key={rating} value={rating.toString()}>
                                {"★".repeat(rating)} {rating}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Notes</label>
                        <Textarea
                          value={editData.notes || ""}
                          onChange={(e) => setEditData((prev) => ({ ...prev, notes: e.target.value }))}
                          placeholder="Add your notes..."
                          rows={3}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={saveEdit} size="sm">
                          Save
                        </Button>
                        <Button onClick={cancelEdit} variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {item.status === "reading" && (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{item.progress}%</span>
                          </div>
                          <Progress value={item.progress} className="h-2" />
                        </div>
                      )}

                      {item.rating && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">Rating:</span>
                          <div className="flex items-center">
                            {"★".repeat(item.rating)}
                            <span className="ml-1 text-sm text-gray-400">({item.rating}/5)</span>
                          </div>
                        </div>
                      )}

                      {item.notes && (
                        <div>
                          <span className="text-sm text-gray-400">Notes:</span>
                          <p className="text-sm text-gray-300 mt-1">{item.notes}</p>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => item.document && onViewDocument?.(item.document)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => startEditing(item)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromReadingList(item.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
