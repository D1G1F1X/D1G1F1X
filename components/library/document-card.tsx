"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { LibraryDocument, DocumentVisibility } from "@/types/library"
import { BookOpen, BookmarkPlus, Star, Calendar } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

interface DocumentCardProps {
  document: LibraryDocument
  isInReadingList?: boolean
  onAddToReadingList?: (documentId: string) => Promise<void>
  isAdmin?: boolean
  onEdit?: (document: LibraryDocument) => void
  onDelete?: (documentId: string) => void
}

export function DocumentCard({
  document,
  isInReadingList = false,
  onAddToReadingList,
  isAdmin = false,
  onEdit,
  onDelete,
}: DocumentCardProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToReadingList = async () => {
    if (!onAddToReadingList) return

    setIsLoading(true)
    try {
      await onAddToReadingList(document.id)
      toast({
        title: "Added to reading list",
        description: `${document.title} has been added to your reading list.`,
        variant: "default",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add to reading list",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getVisibilityBadge = (visibility: DocumentVisibility) => {
    switch (visibility) {
      case "public":
        return <Badge variant="outline">Public</Badge>
      case "members-only":
        return <Badge variant="secondary">Members Only</Badge>
      case "admin-only":
        return <Badge variant="destructive">Admin Only</Badge>
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-2">{document.title}</CardTitle>
          {getVisibilityBadge(document.visibility)}
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <div className="aspect-[2/3] relative mb-3 bg-muted rounded-md overflow-hidden">
          {document.coverImageUrl ? (
            <img
              src={document.coverImageUrl || "/placeholder.svg"}
              alt={`Cover for ${document.title}`}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <BookOpen className="h-12 w-12 text-muted-foreground opacity-50" />
            </div>
          )}
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-medium">Author: {document.author}</p>
          {document.isbn && <p>ISBN: {document.isbn}</p>}
          {document.category && (
            <div>
              <Badge variant="outline" className="mr-1">
                {document.category}
              </Badge>
            </div>
          )}
          {document.tags && document.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {document.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {document.publicationDate && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{new Date(document.publicationDate).toLocaleDateString()}</span>
            </div>
          )}
          {document.pageCount && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{document.pageCount} pages</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex flex-col gap-2">
        <div className="w-full flex gap-2">
          <Button asChild className="flex-1">
            <Link href={`/library/${document.id}`}>
              <BookOpen className="mr-2 h-4 w-4" />
              View
            </Link>
          </Button>

          {onAddToReadingList && !isInReadingList && (
            <Button variant="outline" className="flex-1" onClick={handleAddToReadingList} disabled={isLoading}>
              <BookmarkPlus className="mr-2 h-4 w-4" />
              Add to List
            </Button>
          )}

          {isInReadingList && (
            <Button variant="secondary" className="flex-1" disabled>
              <Star className="mr-2 h-4 w-4" />
              In List
            </Button>
          )}
        </div>

        {isAdmin && (
          <div className="w-full flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => onEdit && onEdit(document)}>
              Edit
            </Button>
            <Button variant="destructive" className="flex-1" onClick={() => onDelete && onDelete(document.id)}>
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
