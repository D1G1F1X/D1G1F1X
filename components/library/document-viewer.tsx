"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Heart, HeartOff, BookOpen, User, Calendar, Hash, Tag, FileText, ExternalLink } from "lucide-react"
import Image from "next/image"
import type { LibraryDocument } from "@/types/library"

interface DocumentViewerProps {
  document: LibraryDocument | null
  open: boolean
  onClose: () => void
  onAddToReadingList?: (document: LibraryDocument) => void
  onRemoveFromReadingList?: (document: LibraryDocument) => void
  isInReadingList?: boolean
  canAdd?: boolean
}

export function DocumentViewer({
  document,
  open,
  onClose,
  onAddToReadingList,
  onRemoveFromReadingList,
  isInReadingList = false,
  canAdd = true,
}: DocumentViewerProps) {
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (document) {
      setImageError(false)
    }
  }, [document])

  if (!document) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl">Document not found</DialogTitle>
          </DialogHeader>
          <div className="py-8 text-center">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300">
              The requested document could not be found or you don't have permission to view it.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return "📄"
      case "txt":
        return "📝"
      default:
        return "📄"
    }
  }

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "txt":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl">{document.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-gray-700 mb-4">
              {document.coverImageUrl && !imageError ? (
                <Image
                  src={document.coverImageUrl || "/placeholder.svg"}
                  alt={`Cover of ${document.title}`}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Button onClick={() => window.open(document.fileUrl, "_blank")} className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button onClick={() => window.open(document.fileUrl, "_blank")} variant="outline">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>

              {canAdd &&
                (isInReadingList ? (
                  <Button
                    variant="outline"
                    onClick={() => onRemoveFromReadingList?.(document)}
                    className="w-full text-red-400 hover:text-red-300"
                  >
                    <HeartOff className="h-4 w-4 mr-2" />
                    Remove from Reading List
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => onAddToReadingList?.(document)}
                    className="w-full text-green-400 hover:text-green-300"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Reading List
                  </Button>
                ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-300">{document.description || "No description available."}</p>
                </div>

                {document.author && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Author</h3>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{document.author}</span>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-2">File Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getFileTypeColor(document.fileType)}>
                        {getFileTypeIcon(document.fileType)} {document.fileType.toUpperCase()}
                      </Badge>
                      {document.fileSize && (
                        <span className="text-sm text-gray-400">
                          ({(document.fileSize / 1024 / 1024).toFixed(1)} MB)
                        </span>
                      )}
                    </div>
                    {document.pageCount && (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">{document.pageCount} pages</span>
                      </div>
                    )}
                  </div>
                </div>

                {document.tags && document.tags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {document.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="metadata" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {document.isbn && (
                    <div>
                      <h4 className="font-medium text-gray-400 mb-1">ISBN</h4>
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">{document.isbn}</span>
                      </div>
                    </div>
                  )}

                  {document.category && (
                    <div>
                      <h4 className="font-medium text-gray-400 mb-1">Category</h4>
                      <Badge variant="outline">{document.category}</Badge>
                    </div>
                  )}

                  {document.publicationDate && (
                    <div>
                      <h4 className="font-medium text-gray-400 mb-1">Publication Date</h4>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">{new Date(document.publicationDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}

                  {document.language && (
                    <div>
                      <h4 className="font-medium text-gray-400 mb-1">Language</h4>
                      <span className="text-gray-300">{document.language.toUpperCase()}</span>
                    </div>
                  )}

                  {document.createdAt && (
                    <div>
                      <h4 className="font-medium text-gray-400 mb-1">Added</h4>
                      <span className="text-gray-300">{new Date(document.createdAt).toLocaleDateString()}</span>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium text-gray-400 mb-1">Visibility</h4>
                    <Badge variant={document.isPublic ? "default" : "secondary"}>
                      {document.isPublic ? "Public" : "Private"}
                    </Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
