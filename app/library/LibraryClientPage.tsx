"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, BookOpen, Search, Clock, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { getAllReadings, updateReading, deleteReading, type Reading } from "@/lib/services/reading-service"
import { getAllDocuments, updateDocument, deleteDocument, type Document } from "@/lib/services/library-service"
import { format } from "date-fns"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { OracleCard } from "@/types/cards"
import Image from "next/image"
import { getCardImagePath } from "@/lib/card-data-access"

export function LibraryClientPage() {
  const [activeTab, setActiveTab] = useState("readings")
  const [readings, setReadings] = useState<Reading[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [loadingReadings, setLoadingReadings] = useState(true)
  const [loadingDocuments, setLoadingDocuments] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingReading, setEditingReading] = useState<Reading | null>(null)
  const [editingDocument, setEditingDocument] = useState<Document | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchReadings()
    fetchDocuments()
  }, [])

  const fetchReadings = async () => {
    setLoadingReadings(true)
    try {
      const fetchedReadings = await getAllReadings()
      setReadings(fetchedReadings)
    } catch (error) {
      console.error("Failed to fetch readings:", error)
      toast({
        title: "Error",
        description: "Failed to load your readings.",
        variant: "destructive",
      })
    } finally {
      setLoadingReadings(false)
    }
  }

  const fetchDocuments = async () => {
    setLoadingDocuments(true)
    try {
      const fetchedDocuments = await getAllDocuments()
      setDocuments(fetchedDocuments)
    } catch (error) {
      console.error("Failed to fetch documents:", error)
      toast({
        title: "Error",
        description: "Failed to load library documents.",
        variant: "destructive",
      })
    } finally {
      setLoadingDocuments(false)
    }
  }

  const handleReadingEdit = (reading: Reading) => {
    setEditingReading(reading)
  }

  const handleReadingSave = async () => {
    if (!editingReading) return
    try {
      await updateReading(editingReading.id, editingReading)
      toast({ title: "Reading Updated", description: "Your reading has been saved." })
      setEditingReading(null)
      fetchReadings() // Refresh list
    } catch (error) {
      console.error("Failed to save reading:", error)
      toast({ title: "Error", description: "Failed to save reading.", variant: "destructive" })
    }
  }

  const handleReadingDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this reading?")) {
      try {
        await deleteReading(id)
        toast({ title: "Reading Deleted", description: "Your reading has been removed." })
        fetchReadings() // Refresh list
      } catch (error) {
        console.error("Failed to delete reading:", error)
        toast({ title: "Error", description: "Failed to delete reading.", variant: "destructive" })
      }
    }
  }

  const handleDocumentEdit = (document: Document) => {
    setEditingDocument(document)
  }

  const handleDocumentSave = async () => {
    if (!editingDocument) return
    try {
      await updateDocument(editingDocument.id, editingDocument)
      toast({ title: "Document Updated", description: "The document has been saved." })
      setEditingDocument(null)
      fetchDocuments() // Refresh list
    } catch (error) {
      console.error("Failed to save document:", error)
      toast({ title: "Error", description: "Failed to save document.", variant: "destructive" })
    }
  }

  const handleDocumentDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        await deleteDocument(id)
        toast({ title: "Document Deleted", description: "The document has been removed." })
        fetchDocuments() // Refresh list
      } catch (error) {
        console.error("Failed to delete document:", error)
        toast({ title: "Error", description: "Failed to delete document.", variant: "destructive" })
      }
    }
  }

  const filteredReadings = readings.filter(
    (reading) =>
      reading.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reading.reading.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reading.cards.some((card) => card.fullTitle.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getCardImage = (card: OracleCard) => {
    // Use the getCardImagePath from lib/card-data-access.ts
    return getCardImagePath(card, "first") // Assuming "first" for base element image
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-foreground mb-4">Your Personal Library</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Access your saved readings, explore insightful documents, and deepen your spiritual journey.
        </p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search readings or documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="readings">My Readings</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <TabsContent value="readings" className="mt-0">
        {loadingReadings ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : filteredReadings.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg mb-4">No readings found. Start your first reading today!</p>
            <Link href="/tools/card-simulator">
              <Button>Generate New Reading</Button>
            </Link>
          </div>
        ) : (
          <ScrollArea className="h-[600px] rounded-md border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {filteredReadings.map((reading) => (
                <Card key={reading.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{reading.question}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      {format(new Date(reading.date), "PPP")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {reading.cards.map((card) => (
                        <div key={card.id} className="relative w-16 h-24 rounded-sm overflow-hidden border">
                          <Image
                            src={getCardImage(card) || "/placeholder.svg"}
                            alt={card.fullTitle}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-4">{reading.reading}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Link href={`/readings/${reading.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => handleReadingEdit(reading)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleReadingDelete(reading.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </TabsContent>

      <TabsContent value="documents" className="mt-0">
        {loadingDocuments ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg mb-4">No documents found in your library.</p>
            <Link href="/admin/library/add-document">
              <Button>Add New Document</Button>
            </Link>
          </div>
        ) : (
          <ScrollArea className="h-[600px] rounded-md border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{doc.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-sm">
                      <BookOpen className="h-4 w-4" />
                      {doc.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-4">{doc.excerpt || doc.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Link href={`/library/documents/${doc.id}`}>
                      <Button variant="outline" size="sm">
                        Read
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => handleDocumentEdit(doc)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDocumentDelete(doc.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </TabsContent>

      {/* Reading Edit Dialog */}
      {editingReading && (
        <Dialog open={!!editingReading} onOpenChange={() => setEditingReading(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Reading</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-question">Question</Label>
                <Input
                  id="edit-question"
                  value={editingReading.question}
                  onChange={(e) => setEditingReading({ ...editingReading, question: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-reading">Reading Content</Label>
                <Textarea
                  id="edit-reading"
                  value={editingReading.reading}
                  onChange={(e) => setEditingReading({ ...editingReading, reading: e.target.value })}
                  rows={10}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-favorite"
                  checked={editingReading.isFavorite}
                  onCheckedChange={(checked: boolean) => setEditingReading({ ...editingReading, isFavorite: checked })}
                />
                <Label htmlFor="edit-favorite">Mark as Favorite</Label>
              </div>
              <Button onClick={handleReadingSave}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Document Edit Dialog */}
      {editingDocument && (
        <Dialog open={!!editingDocument} onOpenChange={() => setEditingDocument(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-doc-title">Title</Label>
                <Input
                  id="edit-doc-title"
                  value={editingDocument.title}
                  onChange={(e) => setEditingDocument({ ...editingDocument, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-doc-category">Category</Label>
                <Input
                  id="edit-doc-category"
                  value={editingDocument.category}
                  onChange={(e) => setEditingDocument({ ...editingDocument, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-doc-content">Content</Label>
                <Textarea
                  id="edit-doc-content"
                  value={editingDocument.content}
                  onChange={(e) => setEditingDocument({ ...editingDocument, content: e.target.value })}
                  rows={15}
                />
              </div>
              <Button onClick={handleDocumentSave}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
