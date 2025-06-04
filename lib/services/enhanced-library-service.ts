import { supabase } from "@/lib/supabase"
import type { LibraryDocument, ReadingListItem, ReadingSession, LibraryStats, UserLibraryStats } from "@/types/library"
import { getUserRole } from "@/lib/auth-utils"

// Helper function to check if user has access to a document
export const hasDocumentAccess = async (documentId: string, userId?: string): Promise<boolean> => {
  const { data: document, error } = await supabase
    .from("library_documents")
    .select("visibility")
    .eq("id", documentId)
    .single()

  if (error || !document) return false

  // Public documents are accessible to everyone
  if (document.visibility === "public") return true

  // If not public and no user, deny access
  if (!userId) return false

  // Check user role for members-only or admin-only documents
  const userRole = await getUserRole(userId)

  if (document.visibility === "members-only" && (userRole === "member" || userRole === "admin")) {
    return true
  }

  if (document.visibility === "admin-only" && userRole === "admin") {
    return true
  }

  return false
}

// Get documents with role-based filtering
export const getDocuments = async (
  userId?: string,
  search?: string,
  category?: string,
  limit = 20,
  offset = 0,
): Promise<{ documents: LibraryDocument[]; count: number }> => {
  let query = supabase.from("library_documents").select("*", { count: "exact" })

  // Apply search filter if provided
  if (search) {
    query = query.or(
      `title.ilike.%${search}%,author.ilike.%${search}%,isbn.ilike.%${search}%,description.ilike.%${search}%`,
    )
  }

  // Apply category filter if provided
  if (category) {
    query = query.eq("category", category)
  }

  // Apply role-based visibility filtering
  if (!userId) {
    // Public users can only see public documents
    query = query.eq("visibility", "public")
  } else {
    const userRole = await getUserRole(userId)

    if (userRole === "admin") {
      // Admins can see all documents
    } else if (userRole === "member") {
      // Members can see public and members-only documents
      query = query.in("visibility", ["public", "members-only"])
    } else {
      // Default users can only see public documents
      query = query.eq("visibility", "public")
    }
  }

  // Apply pagination
  query = query.range(offset, offset + limit - 1).order("createdAt", { ascending: false })

  const { data, error, count } = await query

  if (error) {
    console.error("Error fetching documents:", error)
    return { documents: [], count: 0 }
  }

  return {
    documents: data as LibraryDocument[],
    count: count || 0,
  }
}

// Get a single document with access control
export const getDocument = async (documentId: string, userId?: string): Promise<LibraryDocument | null> => {
  const hasAccess = await hasDocumentAccess(documentId, userId)

  if (!hasAccess) {
    return null
  }

  const { data, error } = await supabase.from("library_documents").select("*").eq("id", documentId).single()

  if (error || !data) {
    console.error("Error fetching document:", error)
    return null
  }

  return data as LibraryDocument
}

// Create a new document (admin only)
export const createDocument = async (
  document: Omit<LibraryDocument, "id" | "createdAt" | "updatedAt">,
  userId: string,
): Promise<LibraryDocument | null> => {
  const userRole = await getUserRole(userId)

  if (userRole !== "admin") {
    throw new Error("Unauthorized: Only admins can create documents")
  }

  const now = new Date().toISOString()

  const { data, error } = await supabase
    .from("library_documents")
    .insert({
      ...document,
      createdAt: now,
      updatedAt: now,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating document:", error)
    return null
  }

  return data as LibraryDocument
}

// Update a document (admin only)
export const updateDocument = async (
  documentId: string,
  updates: Partial<LibraryDocument>,
  userId: string,
): Promise<LibraryDocument | null> => {
  const userRole = await getUserRole(userId)

  if (userRole !== "admin") {
    throw new Error("Unauthorized: Only admins can update documents")
  }

  const { data, error } = await supabase
    .from("library_documents")
    .update({
      ...updates,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", documentId)
    .select()
    .single()

  if (error) {
    console.error("Error updating document:", error)
    return null
  }

  return data as LibraryDocument
}

// Delete a document (admin only)
export const deleteDocument = async (documentId: string, userId: string): Promise<boolean> => {
  const userRole = await getUserRole(userId)

  if (userRole !== "admin") {
    throw new Error("Unauthorized: Only admins can delete documents")
  }

  // First, delete all reading list entries for this document
  await supabase.from("user_reading_lists").delete().eq("document_id", documentId)

  // Then delete the document
  const { error } = await supabase.from("library_documents").delete().eq("id", documentId)

  if (error) {
    console.error("Error deleting document:", error)
    return false
  }

  return true
}

// Get user's reading list
export const getUserReadingList = async (userId: string): Promise<ReadingListItem[]> => {
  const { data, error } = await supabase
    .from("user_reading_lists")
    .select(`
      *,
      document:document_id(*)
    `)
    .eq("user_id", userId)

  if (error) {
    console.error("Error fetching reading list:", error)
    return []
  }

  return data.map((item) => ({
    id: item.id,
    userId: item.user_id,
    documentId: item.document_id,
    document: item.document as LibraryDocument,
    status: item.status,
    progress: item.progress,
    notes: item.notes,
    rating: item.rating,
    addedAt: item.added_at,
    completedAt: item.completed_at,
  }))
}

// Add document to reading list
export const addToReadingList = async (userId: string, documentId: string): Promise<ReadingListItem | null> => {
  // Check if user has access to the document
  const hasAccess = await hasDocumentAccess(documentId, userId)

  if (!hasAccess) {
    throw new Error("Unauthorized: You do not have access to this document")
  }

  // Check if already in reading list
  const { data: existing } = await supabase
    .from("user_reading_lists")
    .select("id")
    .eq("user_id", userId)
    .eq("document_id", documentId)
    .single()

  if (existing) {
    throw new Error("Document already in reading list")
  }

  const now = new Date().toISOString()

  const { data, error } = await supabase
    .from("user_reading_lists")
    .insert({
      user_id: userId,
      document_id: documentId,
      status: "to_read",
      progress: 0,
      added_at: now,
    })
    .select()
    .single()

  if (error) {
    console.error("Error adding to reading list:", error)
    return null
  }

  return {
    id: data.id,
    userId: data.user_id,
    documentId: data.document_id,
    status: data.status,
    progress: data.progress,
    addedAt: data.added_at,
  }
}

// Update reading list item
export const updateReadingListItem = async (
  itemId: string,
  updates: Partial<ReadingListItem>,
  userId: string,
): Promise<ReadingListItem | null> => {
  // Check if the item belongs to the user
  const { data: existing } = await supabase
    .from("user_reading_lists")
    .select("id")
    .eq("id", itemId)
    .eq("user_id", userId)
    .single()

  if (!existing) {
    throw new Error("Unauthorized: This reading list item does not belong to you")
  }

  const { data, error } = await supabase
    .from("user_reading_lists")
    .update({
      status: updates.status,
      progress: updates.progress,
      notes: updates.notes,
      rating: updates.rating,
      completed_at: updates.status === "completed" ? new Date().toISOString() : updates.completedAt,
    })
    .eq("id", itemId)
    .select()
    .single()

  if (error) {
    console.error("Error updating reading list item:", error)
    return null
  }

  return {
    id: data.id,
    userId: data.user_id,
    documentId: data.document_id,
    status: data.status,
    progress: data.progress,
    notes: data.notes,
    rating: data.rating,
    addedAt: data.added_at,
    completedAt: data.completed_at,
  }
}

// Remove from reading list
export const removeFromReadingList = async (itemId: string, userId: string): Promise<boolean> => {
  // Check if the item belongs to the user
  const { data: existing } = await supabase
    .from("user_reading_lists")
    .select("id")
    .eq("id", itemId)
    .eq("user_id", userId)
    .single()

  if (!existing) {
    throw new Error("Unauthorized: This reading list item does not belong to you")
  }

  const { error } = await supabase.from("user_reading_lists").delete().eq("id", itemId)

  if (error) {
    console.error("Error removing from reading list:", error)
    return false
  }

  return true
}

// Record a reading session
export const recordReadingSession = async (
  userId: string,
  documentId: string,
  pagesRead: number,
  notes?: string,
): Promise<ReadingSession | null> => {
  // Check if user has access to the document
  const hasAccess = await hasDocumentAccess(documentId, userId)

  if (!hasAccess) {
    throw new Error("Unauthorized: You do not have access to this document")
  }

  const now = new Date().toISOString()

  const { data, error } = await supabase
    .from("reading_sessions")
    .insert({
      user_id: userId,
      document_id: documentId,
      session_start: now,
      session_end: now,
      pages_read: pagesRead,
      notes: notes,
    })
    .select()
    .single()

  if (error) {
    console.error("Error recording reading session:", error)
    return null
  }

  // Update progress in reading list if it exists
  const { data: readingListItem } = await supabase
    .from("user_reading_lists")
    .select("id, progress, status")
    .eq("user_id", userId)
    .eq("document_id", documentId)
    .single()

  if (readingListItem) {
    // Get document page count
    const { data: document } = await supabase
      .from("library_documents")
      .select("page_count")
      .eq("id", documentId)
      .single()

    if (document && document.page_count) {
      const newProgress = Math.min(
        100,
        Math.round((readingListItem.progress + (pagesRead / document.page_count) * 100) * 100) / 100,
      )

      let newStatus = readingListItem.status
      if (newProgress > 0 && newProgress < 100) {
        newStatus = "reading"
      } else if (newProgress >= 100) {
        newStatus = "completed"
      }

      await supabase
        .from("user_reading_lists")
        .update({
          progress: newProgress,
          status: newStatus,
          completed_at: newStatus === "completed" ? now : null,
        })
        .eq("id", readingListItem.id)
    }
  }

  return {
    id: data.id,
    userId: data.user_id,
    documentId: data.document_id,
    sessionStart: data.session_start,
    sessionEnd: data.session_end,
    pagesRead: data.pages_read,
    notes: data.notes,
  }
}

// Get library statistics
export const getLibraryStats = async (userId?: string): Promise<LibraryStats> => {
  // Get document counts by visibility
  const { data: counts, error: countsError } = await supabase
    .from("library_documents")
    .select("visibility")
    .then(({ data }) => {
      if (!data) return { data: [] }

      const publicCount = data.filter((d) => d.visibility === "public").length
      const membersOnlyCount = data.filter((d) => d.visibility === "members-only").length
      const adminOnlyCount = data.filter((d) => d.visibility === "admin-only").length

      return {
        data: {
          totalDocuments: data.length,
          publicDocuments: publicCount,
          membersOnlyDocuments: membersOnlyCount,
          adminOnlyDocuments: adminOnlyCount,
        },
      }
    })

  if (countsError) {
    console.error("Error getting library stats:", countsError)
    return {
      totalDocuments: 0,
      publicDocuments: 0,
      membersOnlyDocuments: 0,
      adminOnlyDocuments: 0,
    }
  }

  // Get most popular category
  const { data: categories, error: categoriesError } = await supabase
    .from("library_documents")
    .select("category")
    .not("category", "is", null)
    .then(({ data }) => {
      if (!data) return { data: null }

      const categoryCounts: Record<string, number> = {}
      data.forEach((d) => {
        if (d.category) {
          categoryCounts[d.category] = (categoryCounts[d.category] || 0) + 1
        }
      })

      let mostPopularCategory = null
      let maxCount = 0

      Object.entries(categoryCounts).forEach(([category, count]) => {
        if (count > maxCount) {
          mostPopularCategory = category
          maxCount = count
        }
      })

      return { data: mostPopularCategory }
    })

  // Get most read document
  const { data: mostReadDocument, error: mostReadError } = await supabase
    .from("user_reading_lists")
    .select("document_id, count")
    .group("document_id")
    .order("count", { ascending: false })
    .limit(1)
    .then(async ({ data }) => {
      if (!data || data.length === 0) return { data: null }

      const { data: document } = await supabase
        .from("library_documents")
        .select("*")
        .eq("id", data[0].document_id)
        .single()

      return { data: document }
    })

  return {
    ...counts,
    mostPopularCategory: categories,
    mostReadDocument: mostReadDocument as LibraryDocument | undefined,
  }
}

// Get user library statistics
export const getUserLibraryStats = async (userId: string): Promise<UserLibraryStats> => {
  // Get reading list stats
  const { data: readingList, error: readingListError } = await supabase
    .from("user_reading_lists")
    .select("status, rating")
    .eq("user_id", userId)
    .then(({ data }) => {
      if (!data) return { data: { totalRead: 0, inProgress: 0, toRead: 0, averageRating: 0 } }

      const totalRead = data.filter((d) => d.status === "completed").length
      const inProgress = data.filter((d) => d.status === "reading").length
      const toRead = data.filter((d) => d.status === "to_read").length

      const ratings = data.filter((d) => d.rating).map((d) => d.rating!)
      const averageRating =
        ratings.length > 0 ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10 : 0

      return {
        data: {
          totalRead,
          inProgress,
          toRead,
          averageRating,
        },
      }
    })

  if (readingListError) {
    console.error("Error getting user library stats:", readingListError)
    return {
      totalRead: 0,
      inProgress: 0,
      toRead: 0,
      averageRating: 0,
      readingTime: 0,
    }
  }

  // Get favorite category
  const { data: favoriteCategory, error: categoryError } = await supabase
    .from("user_reading_lists")
    .select(`
      document:document_id(category)
    `)
    .eq("user_id", userId)
    .then(({ data }) => {
      if (!data) return { data: null }

      const categoryCounts: Record<string, number> = {}
      data.forEach((d) => {
        if (d.document && d.document.category) {
          categoryCounts[d.document.category] = (categoryCounts[d.document.category] || 0) + 1
        }
      })

      let favoriteCategory = null
      let maxCount = 0

      Object.entries(categoryCounts).forEach(([category, count]) => {
        if (count > maxCount) {
          favoriteCategory = category
          maxCount = count
        }
      })

      return { data: favoriteCategory }
    })

  // Get total reading time
  const { data: readingTime, error: timeError } = await supabase
    .from("reading_sessions")
    .select("session_start, session_end")
    .eq("user_id", userId)
    .then(({ data }) => {
      if (!data) return { data: 0 }

      let totalMinutes = 0

      data.forEach((session) => {
        if (session.session_start && session.session_end) {
          const start = new Date(session.session_start)
          const end = new Date(session.session_end)
          const minutes = (end.getTime() - start.getTime()) / (1000 * 60)
          totalMinutes += minutes
        }
      })

      return { data: Math.round(totalMinutes) }
    })

  return {
    ...readingList,
    favoriteCategory,
    readingTime: readingTime || 0,
  }
}

// Get document categories
export const getDocumentCategories = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from("library_documents")
    .select("category")
    .not("category", "is", null)
    .then(({ data }) => {
      if (!data) return { data: [] }

      const categories = new Set<string>()
      data.forEach((d) => {
        if (d.category) {
          categories.add(d.category)
        }
      })

      return { data: Array.from(categories) }
    })

  if (error) {
    console.error("Error getting document categories:", error)
    return []
  }

  return data
}
