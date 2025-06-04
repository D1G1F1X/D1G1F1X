"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { LibraryDocument } from "@/types/library"

interface AddDocumentFormProps {
  open: boolean
  onClose: () => void
  onDocumentAdded: (document: LibraryDocument) => void
}

export function AddDocumentForm({ open, onClose, onDocumentAdded }: AddDocumentFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [isbn, setIsbn] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [fileType, setFileType] = useState<"pdf" | "txt">("pdf")
  const [fileUrl, setFileUrl] = useState("")
  const [coverImageUrl, setCoverImageUrl] = useState("")
  const [pageCount, setPageCount] = useState("")
  const [publicationDate, setPublicationDate] = useState<Date | undefined>()
  const [language, setLanguage] = useState("en")
  const [isPublic, setIsPublic] = useState(true)
  const [fileSize, setFileSize] = useState("")

  const resetForm = () => {
    setTitle("")
    setAuthor("")
    setIsbn("")
    setDescription("")
    setCategory("")
    setTags("")
    setFileType("pdf")
    setFileUrl("")
    setCoverImageUrl("")
    setPageCount("")
    setPublicationDate(undefined)
    setLanguage("en")
    setIsPublic(true)
    setFileSize("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      const documentData = {
        title,
        author,
        isbn,
        description,
        category,
        tags: tagsArray,
        fileType,
        fileUrl,
        coverImageUrl,
        pageCount: pageCount ? Number.parseInt(pageCount) : undefined,
        publicationDate: publicationDate?.toISOString(),
        language,
        isPublic,
        fileSize: fileSize ? Number.parseInt(fileSize) : undefined,
      }

      const response = await fetch("/api/library/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(documentData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "Document added successfully",
        })
        onDocumentAdded(result.data)
        resetForm()
        onClose()
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      console.error("Error adding document:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to add document",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !isLoading && !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Document</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="author">Author</Label>
                <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} disabled={isLoading} />
              </div>

              <div>
                <Label htmlFor="isbn">ISBN</Label>
                <Input id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} disabled={isLoading} />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} disabled={isLoading} />
              </div>

              <div>
                <Label htmlFor="fileType">File Type *</Label>
                <Select
                  value={fileType}
                  onValueChange={(value: "pdf" | "txt") => setFileType(value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select file type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="txt">TXT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="fileUrl">File URL *</Label>
                <Input
                  id="fileUrl"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="coverImageUrl">Cover Image URL</Label>
                <Input
                  id="coverImageUrl"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="pageCount">Page Count</Label>
                <Input
                  id="pageCount"
                  type="number"
                  min="1"
                  value={pageCount}
                  onChange={(e) => setPageCount(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="fileSize">File Size (in bytes)</Label>
                <Input
                  id="fileSize"
                  type="number"
                  min="1"
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="publicationDate">Publication Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !publicationDate && "text-muted-foreground",
                      )}
                      disabled={isLoading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {publicationDate ? format(publicationDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={publicationDate} onSelect={setPublicationDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage} disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                    <SelectItem value="pt">Portuguese</SelectItem>
                    <SelectItem value="ru">Russian</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="isPublic" checked={isPublic} onCheckedChange={setIsPublic} disabled={isLoading} />
                <Label htmlFor="isPublic">Public document</Label>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Document"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
