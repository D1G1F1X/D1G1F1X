"use client"

import { useState, useEffect, Suspense } from "react"
import { useToast } from "@/components/ui/use-toast"
import type { LibraryDocument, LibrarySearchFilters, UserRole } from "@/types/library"
import LibraryResourceGrid from "@/components/library-resource-grid" // Assuming this component exists
import HeroSection from "@/components/hero-section" // Import HeroSection

export default function LibraryClientPage() {
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
    <div className="relative min-h-screen bg-black">
      <HeroSection
        title="NUMO Oracle Library"
        description="Access a comprehensive collection of resources, guides, and articles."
        backgroundImage="/open-book-knowledge.png"
      />
      <div className="container mx-auto py-8">
        <Suspense fallback={<div className="text-center py-20 text-white">Loading library resources...</div>}>
          {/* Assuming LibraryResourceGrid component exists */}
          <LibraryResourceGrid />
        </Suspense>
      </div>
    </div>
  )
}
