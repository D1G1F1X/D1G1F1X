export type DocumentVisibility = "public" | "members-only" | "admin-only"
export type DocumentStatus = "to_read" | "reading" | "completed"
export type FileType = "pdf" | "txt" | "epub"

export interface LibraryDocument {
  id: string
  title: string
  author: string
  isbn?: string
  description?: string
  fileType: FileType
  fileUrl: string
  fileSize?: number
  coverImageUrl?: string
  category?: string
  tags?: string[]
  pageCount?: number
  publicationDate?: string
  language?: string
  visibility: DocumentVisibility
  createdAt: string
  updatedAt: string
}

export interface ReadingListItem {
  id: string
  userId: string
  documentId: string
  document?: LibraryDocument
  status: DocumentStatus
  progress: number
  notes?: string
  rating?: number
  addedAt: string
  completedAt?: string
}

export interface ReadingSession {
  id: string
  userId: string
  documentId: string
  sessionStart: string
  sessionEnd?: string
  pagesRead: number
  notes?: string
}

export interface LibraryStats {
  totalDocuments: number
  publicDocuments: number
  membersOnlyDocuments: number
  adminOnlyDocuments: number
  mostPopularCategory?: string
  mostReadDocument?: LibraryDocument
}

export interface UserLibraryStats {
  totalRead: number
  inProgress: number
  toRead: number
  averageRating: number
  favoriteCategory?: string
  readingTime: number // in minutes
}
