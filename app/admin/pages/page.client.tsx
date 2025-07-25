"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2, FileText, Search } from "lucide-react"
import Link from "next/link"
import { getContents, deleteContent } from "@/lib/enhanced-content" // Assuming these functions exist
import type { ContentItem } from "@/lib/enhanced-content"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect, useCallback } from "react"
import { Loader2 } from "lucide-react"

function PagesPageClient() {
  const [pages, setPages] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const fetchPages = useCallback(async () => {
    setLoading(true)
    try {
      const fetchedPages = await getContents("page") // Fetch only items of type 'page'
      setPages(fetchedPages)
      toast({
        title: "Pages Loaded",
        description: `Successfully loaded ${fetchedPages.length} pages.`,
      })
    } catch (error) {
      console.error("Failed to fetch pages:", error)
      toast({
        title: "Error",
        description: "Failed to load pages.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchPages()
  }, [fetchPages])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) {
      return
    }
    try {
      await deleteContent(id) // Call API to delete content
      toast({
        title: "Page Deleted",
        description: "Page has been successfully deleted.",
      })
      fetchPages() // Refresh the list
    } catch (error) {
      console.error("Failed to delete page:", error)
      toast({
        title: "Error",
        description: "Failed to delete page.",
        variant: "destructive",
      })
    }
  }

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Page Management</h1>
        <Button asChild>
          <Link href="/admin/pages/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Page
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> All Pages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search-pages">Search Pages</Label>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-pages"
                placeholder="Search by title or slug..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading pages...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPages.length > 0 ? (
                  filteredPages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell>{page.slug}</TableCell>
                      <TableCell>{page.published ? "Yes" : "No"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/pages/${page.id}`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(page.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No pages found.
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

export default PagesPageClient
