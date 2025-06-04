"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, BookOpen, Clock, Filter } from "lucide-react"
import { LibrarySearch } from "@/components/library/library-search"
import { DocumentCard } from "@/components/library/document-card"
import { DocumentViewer } from "@/components/library/document-viewer"
import { AddDocumentForm } from "@/components/library/add-document-form"
import { ReadingList } from "@/components/library/reading-list"
import { useToast } from "@/components/ui/use-toast"
import type { LibraryDocument, LibrarySearchFilters, UserRole } from "@/types/library"

export default function LibraryPage() {
  const [documents, setDocuments] = useState<LibraryDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<LibraryDocument | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showViewer, setShowViewer] = useState(false)
  const [readingListItems, setReadingListItems] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("browse")
  const { toast } = useToast()
  const [userRole, setUserRole] = useState<UserRole | null>(null)

  // Mock user ID and role - in a real app, these would come from authentication
  const userId = "user-123"
  const userRoleMock = "admin" // Possible values: "admin", "user", "guest"

  useEffect(() => {
    fetchDocuments()
    fetchReadingListItems()
    setUserRole(userRoleMock as UserRole)
  }, [])

  const fetchDocuments = async (filters?: LibrarySearchFilters) => {
    setSearchLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters?.query) params.append("query", filters.query)
      if (filters?.author) params.append("author", filters.author)
      if (filters?.category) params.append("category", filters.category)
      if (filters?.fileType) params.append("fileType", filters.fileType)
      if (filters?.isPublic !== undefined) params.append("isPublic", filters.isPublic.toString())

      const response = await fetch(`/api/library/documents?${params}`)
      const result = await response.json()

      if (result.success) {
        setDocuments(result.data)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error fetching documents:", error)
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setSearchLoading(false)
    }
  }

  const fetchReadingListItems = async () => {
    try {
      const response = await fetch(`/api/library/reading-list?userId=${userId}`)
      const result = await response.json()

      if (result.success) {
        setReadingListItems(result.data.map((item: any) => item.documentId))
      }
    } catch (error) {
      console.error("Error fetching reading list:", error)
    }
  }

  const handleSearch = (filters: LibrarySearchFilters) => {
    fetchDocuments(filters)
  }

  const handleViewDocument = (document: LibraryDocument) => {
    setSelectedDocument(document)
    setShowViewer(true)
  }

  const handleAddToReadingList = async (document: LibraryDocument) => {
    try {
      const response = await fetch("/api/library/reading-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          documentId: document.id,
          status: "to_read",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setReadingListItems((prev) => [...prev, document.id])
        toast({
          title: "Success",
          description: "Added to reading list",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Error adding to reading list:", error)
      toast({
        title: "Error",
        description: "Failed to add to reading list",
        variant: "destructive",
      })
    }
  }

  const handleRemoveFromReadingList = async (document: LibraryDocument) => {
    try {
      // Find the reading list item ID
      const response = await fetch(`/api/library/reading-list?userId=${userId}`)
      const result = await response.json()

      if (result.success) {
        const item = result.data.find((item: any) => item.documentId === document.id)
        if (item) {
          const deleteResponse = await fetch(`/api/library/reading-list/${item.id}`, {
            method: "DELETE",
          })

          const deleteResult = await deleteResponse.json()

          if (deleteResult.success) {
            setReadingListItems((prev) => prev.filter((id) => id !== document.id))
            toast({
              title: "Success",
              description: "Removed from reading list",
            })
          } else {
            throw new Error(deleteResult.error)
          }
        }
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

  const handleDocumentAdded = (document: LibraryDocument) => {
    setDocuments((prev) => [document, ...prev])
  }

  const stats = {
    total: documents.length,
    inReadingList: readingListItems.length,
    categories: [...new Set(documents.map((doc) => doc.category).filter(Boolean))].length,
  }

  const canAddDocuments = userRole === "admin" || userRole === "user"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">NUMO Oracle Library</h1>
            <p className="text-gray-400">Discover and manage your spiritual and divination resources</p>
          </div>
          {canAddDocuments && (
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Document
            </Button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-black/30 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-400" />
                <span className="text-2xl font-bold">{stats.total}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-black/30 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">In Reading List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span className="text-2xl font-bold">{stats.inReadingList}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-black/30 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-green-400" />
                <span className="text-2xl font-bold">{stats.categories}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Library</TabsTrigger>
            <TabsTrigger value="reading-list">My Reading List</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <LibrarySearch onSearch={handleSearch} loading={searchLoading} />

            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No documents found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your search criteria or add new documents.</p>
                {canAddDocuments && (
                  <Button onClick={() => setShowAddForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Document
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((document) => (
                  <DocumentCard
                    key={document.id}
                    document={document}
                    onView={handleViewDocument}
                    onAddToReadingList={handleAddToReadingList}
                    onRemoveFromReadingList={handleRemoveFromReadingList}
                    isInReadingList={readingListItems.includes(document.id)}
                    canAdd={canAddDocuments}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reading-list">
            <ReadingList userId={userId} onViewDocument={handleViewDocument} />
          </TabsContent>
        </Tabs>
      </div>

      <DocumentViewer
        document={selectedDocument}
        open={showViewer}
        onClose={() => setShowViewer(false)}
        onAddToReadingList={handleAddToReadingList}
        onRemoveFromReadingList={handleRemoveFromReadingList}
        isInReadingList={selectedDocument ? readingListItems.includes(selectedDocument.id) : false}
        canAdd={canAddDocuments}
      />

      {canAddDocuments && (
        <AddDocumentForm
          open={showAddForm}
          onClose={() => setShowAddForm(false)}
          onDocumentAdded={handleDocumentAdded}
        />
      )}
    </div>
  )
}
