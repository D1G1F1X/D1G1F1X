"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2, Loader2 } from "lucide-react"
import {
  getPageList,
  createPageContent,
  updatePageContent,
  deletePageContent,
  getPageContent,
} from "@/lib/enhanced-content" // Using enhanced-content
import type { ContentItem } from "@/lib/enhanced-content" // Assuming ContentItem type is exported

export default function PagesPageClient() {
  const [pages, setPages] = useState<ContentItem[]>([])
  const [newPageTitle, setNewPageTitle] = useState("")
  const [newPageSlug, setNewPageSlug] = useState("")
  const [newPageContent, setNewPageContent] = useState("")
  const [editingPage, setEditingPage] = useState<ContentItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchPages = async () => {
    setLoading(true)
    try {
      const pageList = await getPageList()
      setPages(pageList as ContentItem[]) // Cast to ContentItem[] as getPageList returns Picked type
    } catch (error) {
      console.error("Failed to fetch pages:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPages()
  }, [])

  const handleCreatePage = async () => {
    if (!newPageTitle.trim() || !newPageSlug.trim() || !newPageContent.trim()) return
    setLoading(true)
    try {
      await createPageContent({
        title: newPageTitle.trim(),
        slug: newPageSlug.trim(),
        content: newPageContent.trim(),
        type: "page",
        status: "draft", // Default status
      })
      setNewPageTitle("")
      setNewPageSlug("")
      setNewPageContent("")
      setIsDialogOpen(false)
      fetchPages()
    } catch (error) {
      console.error("Failed to create page:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePage = async () => {
    if (!editingPage || !editingPage.title.trim() || !editingPage.slug.trim() || !editingPage.content.trim()) return
    setLoading(true)
    try {
      await updatePageContent(editingPage.id, {
        title: editingPage.title.trim(),
        slug: editingPage.slug.trim(),
        content: editingPage.content.trim(),
        status: editingPage.status,
      })
      setEditingPage(null)
      setIsDialogOpen(false)
      fetchPages()
    } catch (error) {
      console.error("Failed to update page:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePage = async (pageId: string) => {
    if (!confirm("Are you sure you want to delete this page? This action cannot be undone.")) return
    setLoading(true)
    try {
      await deletePageContent(pageId)
      fetchPages()
    } catch (error) {
      console.error("Failed to delete page:", error)
    } finally {
      setLoading(false)
    }
  }

  const openEditDialog = async (page: ContentItem) => {
    setLoading(true)
    try {
      // Fetch full content for editing as getPageList might return partial data
      const fullPageData = await getPageContent(page.slug)
      if (fullPageData) {
        setEditingPage(fullPageData)
        setIsDialogOpen(true)
      } else {
        console.error("Failed to load full page data for editing.")
      }
    } catch (error) {
      console.error("Error opening edit dialog:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-lg text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        Loading pages...
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Page Management</h1>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Website Pages</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingPage(null)
                  setNewPageTitle("")
                  setNewPageSlug("")
                  setNewPageContent("")
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Page
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingPage ? "Edit Page" : "Create New Page"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={editingPage ? editingPage.title : newPageTitle}
                    onChange={(e) =>
                      editingPage
                        ? setEditingPage({ ...editingPage, title: e.target.value })
                        : setNewPageTitle(e.target.value)
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="slug" className="text-right">
                    Slug
                  </Label>
                  <Input
                    id="slug"
                    value={editingPage ? editingPage.slug : newPageSlug}
                    onChange={(e) =>
                      editingPage
                        ? setEditingPage({ ...editingPage, slug: e.target.value })
                        : setNewPageSlug(e.target.value)
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="content" className="text-right pt-2">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    value={editingPage ? editingPage.content : newPageContent}
                    onChange={(e) =>
                      editingPage
                        ? setEditingPage({ ...editingPage, content: e.target.value })
                        : setNewPageContent(e.target.value)
                    }
                    className="col-span-3 min-h-[150px]"
                  />
                </div>
                {editingPage && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <select
                      id="status"
                      value={editingPage.status}
                      onChange={(e) =>
                        setEditingPage({ ...editingPage, status: e.target.value as "draft" | "published" })
                      }
                      className="col-span-3 p-2 border rounded-md"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button onClick={editingPage ? handleUpdatePage : handleCreatePage} disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {editingPage ? "Save Changes" : "Create Page"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {pages.length === 0 ? (
            <p className="text-muted-foreground">No pages created yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>{page.slug}</TableCell>
                    <TableCell>{page.status}</TableCell>
                    <TableCell>{new Date(page.updated_at || page.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openEditDialog(page)} className="mr-2">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeletePage(page.id)}>
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
