"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2, BookOpen, Loader2, BarChart } from "lucide-react"
import {
  getAllReadingLists,
  createReadingList,
  updateReadingList,
  deleteReadingList,
  getLibraryStats,
} from "@/lib/services/library-service"
import type { ReadingList } from "@/types/library"
import { useAuth } from "@/contexts/auth-context" // Assuming you have an auth context to get user ID

export default function LibraryManagementPageClient() {
  const { user } = useAuth()
  const userId = user?.id // Get user ID from auth context
  const [readingLists, setReadingLists] = useState<ReadingList[]>([])
  const [stats, setStats] = useState({ totalDocuments: 0, totalReadingLists: 0, totalSessions: 0 })
  const [newListName, setNewListName] = useState("")
  const [newListDescription, setNewListDescription] = useState("")
  const [editingList, setEditingList] = useState<ReadingList | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchReadingLists = async () => {
    if (!userId) return
    setLoading(true)
    try {
      const lists = await getAllReadingLists(userId)
      setReadingLists(lists)
      const libraryStats = await getLibraryStats(userId)
      setStats(libraryStats)
    } catch (error) {
      console.error("Failed to fetch reading lists or stats:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReadingLists()
  }, [userId])

  const handleCreateList = async () => {
    if (!userId || !newListName.trim()) return
    setLoading(true)
    try {
      await createReadingList(userId, newListName.trim(), newListDescription.trim())
      setNewListName("")
      setNewListDescription("")
      setIsDialogOpen(false)
      fetchReadingLists()
    } catch (error) {
      console.error("Failed to create reading list:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateList = async () => {
    if (!editingList || !editingList.title.trim()) return
    setLoading(true)
    try {
      await updateReadingList(editingList.id, {
        title: editingList.title.trim(),
        description: editingList.description?.trim(),
      })
      setEditingList(null)
      setIsDialogOpen(false)
      fetchReadingLists()
    } catch (error) {
      console.error("Failed to update reading list:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteList = async (listId: string) => {
    if (!confirm("Are you sure you want to delete this reading list? This action cannot be undone.")) return
    setLoading(true)
    try {
      await deleteReadingList(listId)
      fetchReadingLists()
    } catch (error) {
      console.error("Failed to delete reading list:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-lg text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        Loading library management...
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Library Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDocuments}</div>
            <p className="text-xs text-muted-foreground">Available in the library</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reading Lists</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReadingLists}</div>
            <p className="text-xs text-muted-foreground">Created by users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reading Sessions</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSessions}</div>
            <p className="text-xs text-muted-foreground">Across all lists</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Reading Lists</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingList(null)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Create New List
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingList ? "Edit Reading List" : "Create New Reading List"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="name"
                    value={editingList ? editingList.title : newListName}
                    onChange={(e) =>
                      editingList
                        ? setEditingList({ ...editingList, title: e.target.value })
                        : setNewListName(e.target.value)
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={editingList ? editingList.description || "" : newListDescription}
                    onChange={(e) =>
                      editingList
                        ? setEditingList({ ...editingList, description: e.target.value })
                        : setNewListDescription(e.target.value)
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={editingList ? handleUpdateList : handleCreateList} disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {editingList ? "Save Changes" : "Create List"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {readingLists.length === 0 ? (
            <p className="text-muted-foreground">No reading lists created yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {readingLists.map((list) => (
                  <TableRow key={list.id}>
                    <TableCell className="font-medium">{list.title}</TableCell>
                    <TableCell>{list.description || "N/A"}</TableCell>
                    <TableCell>{new Date(list.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingList(list)
                          setIsDialogOpen(true)
                        }}
                        className="mr-2"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteList(list.id)}>
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
