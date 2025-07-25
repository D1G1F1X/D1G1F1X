"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2, BookOpen, FileText, Search } from "lucide-react"
import Link from "next/link"
import { LibraryService } from "@/lib/services/library-service" // Import LibraryService
import type { LibraryDocument } from "@/types/library" // Import LibraryDocument type
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect, useCallback } from "react"
import { Loader2 } from "lucide-react"

export default function LibraryManagementPageClient() {
  // Changed to default export
  const [documents, setDocuments] = useState<LibraryDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const fetchDocuments = useCallback(async () => {
    setLoading(true)
    try {
      const fetchedDocs = await LibraryService.getAllDocuments() // Use LibraryService
      setDocuments(fetchedDocs)
      toast({
        title: "Documents Loaded",
        description: `Successfully loaded ${fetchedDocs.length} documents.`,
      })
    } catch (error) {
      console.error("Failed to fetch documents:", error)
      toast({
        title: "Error",
        description: "Failed to load documents. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document?")) {
      return
    }
    try {
      const success = await LibraryService.deleteDocument(id) // Use LibraryService
      if (success) {
        toast({
          title: "Document Deleted",
          description: "Document has been successfully deleted.",
        })
        fetchDocuments() // Refresh the list
      } else {
        toast({
          title: "Deletion Failed",
          description: "Failed to delete document.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to delete document:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred during deletion.",
        variant: "destructive",
      })
    }
  }

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.author?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Library Management</h1>
        <Button asChild>
          <Link href="/admin/library/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Document
          </Link>
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> Library Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Manage uploaded documents and files associated with the library.
          </p>
          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/admin/library/files">Go to Files Manager</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" /> All Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search-documents">Search Documents</Label>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-documents"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading documents...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>File Type</TableHead>
                  <TableHead>Public</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.title}</TableCell>
                      <TableCell>{doc.author}</TableCell>
                      <TableCell>{doc.fileType}</TableCell>
                      <TableCell>{doc.isPublic ? "Yes" : "No"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/library/${doc.id}`}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(doc.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No documents found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Add New Document</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Use the dedicated "Add New Document" page for full functionality.
            </p>
            <Button asChild className="w-full">
              <Link href="/admin/library/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Document
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
