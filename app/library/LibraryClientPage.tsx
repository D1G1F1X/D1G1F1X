"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentCard } from "@/components/library/document-card"
import { ReadingList } from "@/components/library/reading-list"
import { LibrarySearch } from "@/components/library/library-search"
import { PlusCircle, BookOpen, List, Loader2, AlertCircle } from "lucide-react"
import { getDocuments, getReadingLists } from "@/lib/services/library-service" // Assuming these functions exist
import type { Document, ReadingList as ReadingListType } from "@/types/library" // Assuming types are defined
import { useToast } from "@/components/ui/use-toast"
import { AddDocumentForm } from "@/components/library/add-document-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function LibraryClientPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [readingLists, setReadingLists] = useState<ReadingListType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const fetchLibraryData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [fetchedDocuments, fetchedReadingLists] = await Promise.all([getDocuments(), getReadingLists()])
      setDocuments(fetchedDocuments)
      setReadingLists(fetchedReadingLists)
    } catch (err) {
      setError("Failed to load library data. Please try again later.")
      console.error("Error fetching library data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLibraryData()
  }, [])

  const handleDocumentAdded = () => {
    toast({
      title: "Document Added",
      description: "Your new document has been successfully added to the library.",
    })
    fetchLibraryData() // Refresh data
  }

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const filteredReadingLists = readingLists.filter(
    (list) =>
      list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      list.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
        <p className="ml-4 text-lg text-gray-400">Loading library...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center text-red-500">
        <AlertCircle className="mr-2 h-6 w-6" />
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-50">The NUMO Library</h1>
      <p className="mb-12 text-center text-lg text-gray-300">
        A curated collection of documents and reading lists to deepen your understanding of numerology and oracle
        wisdom.
      </p>

      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <LibrarySearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Document</DialogTitle>
            </DialogHeader>
            <AddDocumentForm onDocumentAdded={handleDocumentAdded} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="documents">
            <BookOpen className="mr-2 h-4 w-4" /> Documents
          </TabsTrigger>
          <TabsTrigger value="reading-lists">
            <List className="mr-2 h-4 w-4" /> Reading Lists
          </TabsTrigger>
        </TabsList>
        <TabsContent value="documents" className="mt-6">
          <h2 className="mb-4 text-2xl font-semibold text-gray-50">All Documents</h2>
          {filteredDocuments.length === 0 ? (
            <p className="text-center text-gray-400">No documents found matching your search.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDocuments.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="reading-lists" className="mt-6">
          <h2 className="mb-4 text-2xl font-semibold text-gray-50">My Reading Lists</h2>
          {filteredReadingLists.length === 0 ? (
            <p className="text-center text-gray-400">No reading lists found matching your search.</p>
          ) : (
            <ReadingList readingLists={filteredReadingLists} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
