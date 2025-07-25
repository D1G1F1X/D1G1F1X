import { createClient } from "@supabase/supabase-js"
import type { LibraryDocument, UserReadingListItem, LibrarySearchFilters } from "@/types/library"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export class LibraryService {
  // Document management
  static async getAllDocuments(filters?: LibrarySearchFilters): Promise<LibraryDocument[]> {
    try {
      let query = supabase.from("library_documents").select("*").order("created_at", { ascending: false })

      if (filters?.query) {
        query = query.or(
          `title.ilike.%${filters.query}%,author.ilike.%${filters.query}%,description.ilike.%${filters.query}%`,
        )
      }

      if (filters?.author) {
        query = query.ilike("author", `%${filters.author}%`)
      }

      if (filters?.category) {
        query = query.eq("category", filters.category)
      }

      if (filters?.fileType) {
        query = query.eq("file_type", filters.fileType)
      }

      if (filters?.isPublic !== undefined) {
        query = query.eq("is_public", filters.isPublic)
      }

      const { data, error } = await query

      if (error) throw error

      return data?.map(this.mapDocumentFromDb) || []
    } catch (error) {
      console.error("Error fetching documents:", error)
      return this.getMockDocuments(filters)
    }
  }

  static async getDocumentById(id: string): Promise<LibraryDocument | null> {
    try {
      const { data, error } = await supabase.from("library_documents").select("*").eq("id", id).single()

      if (error) throw error

      return data ? this.mapDocumentFromDb(data) : null
    } catch (error) {
      console.error("Error fetching document:", error)
      return this.getMockDocuments().find((doc) => doc.id === id) || null
    }
  }

  static async createDocument(
    document: Omit<LibraryDocument, "id" | "createdAt" | "updatedAt">,
  ): Promise<LibraryDocument> {
    try {
      const { data, error } = await supabase
        .from("library_documents")
        .insert([this.mapDocumentToDb(document)])
        .select()
        .single()

      if (error) throw error

      return this.mapDocumentFromDb(data)
    } catch (error) {
      console.error("Error creating document:", error)
      // Return mock document for demo
      const mockDoc: LibraryDocument = {
        id: Math.random().toString(36).substr(2, 9),
        ...document,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return mockDoc
    }
  }

  static async updateDocument(id: string, updates: Partial<LibraryDocument>): Promise<LibraryDocument | null> {
    try {
      const { data, error } = await supabase
        .from("library_documents")
        .update(this.mapDocumentToDb(updates))
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      return this.mapDocumentFromDb(data)
    } catch (error) {
      console.error("Error updating document:", error)
      return null
    }
  }

  static async deleteDocument(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from("library_documents").delete().eq("id", id)

      if (error) throw error

      return true
    } catch (error) {
      console.error("Error deleting document:", error)
      return false
    }
  }

  // Reading list management
  static async getUserReadingList(userId: string): Promise<UserReadingListItem[]> {
    try {
      const { data, error } = await supabase
        .from("user_reading_lists")
        .select(`
          *,
          document:library_documents(*)
        `)
        .eq("user_id", userId)
        .order("added_at", { ascending: false })

      if (error) throw error

      return (
        data?.map((item) => ({
          id: item.id,
          userId: item.user_id,
          documentId: item.document_id,
          document: item.document ? this.mapDocumentFromDb(item.document) : undefined,
          status: item.status,
          progress: item.progress,
          notes: item.notes,
          rating: item.rating,
          addedAt: item.added_at,
          completedAt: item.completed_at,
        })) || []
      )
    } catch (error) {
      console.error("Error fetching reading list:", error)
      return []
    }
  }

  static async addToReadingList(
    userId: string,
    documentId: string,
    status: "to_read" | "reading" | "completed" = "to_read",
  ): Promise<UserReadingListItem | null> {
    try {
      const { data, error } = await supabase
        .from("user_reading_lists")
        .insert([
          {
            user_id: userId,
            document_id: documentId,
            status,
            progress: 0,
            added_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) throw error

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
    } catch (error) {
      console.error("Error adding to reading list:", error)
      return null
    }
  }

  static async updateReadingListItem(
    id: string,
    updates: Partial<UserReadingListItem>,
  ): Promise<UserReadingListItem | null> {
    try {
      const { data, error } = await supabase
        .from("user_reading_lists")
        .update({
          status: updates.status,
          progress: updates.progress,
          notes: updates.notes,
          rating: updates.rating,
          completed_at: updates.status === "completed" ? new Date().toISOString() : null,
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

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
    } catch (error) {
      console.error("Error updating reading list item:", error)
      return null
    }
  }

  static async removeFromReadingList(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from("user_reading_lists").delete().eq("id", id)

      if (error) throw error

      return true
    } catch (error) {
      console.error("Error removing from reading list:", error)
      return false
    }
  }

  // Aliases for requested exports
  static async getLibraryResources(filters?: LibrarySearchFilters): Promise<LibraryDocument[]> {
    return this.getAllDocuments(filters)
  }

  static async getAllReadingLists(userId?: string): Promise<UserReadingListItem[]> {
    if (userId) {
      return this.getUserReadingList(userId)
    }
    // In a real app, you might fetch all reading lists for admin or return an empty array
    return []
  }

  static async createReadingList(
    userId: string,
    documentId: string,
    status: "to_read" | "reading" | "completed" = "to_read",
  ): Promise<UserReadingListItem | null> {
    return this.addToReadingList(userId, documentId, status)
  }

  static async getReadingSessions(userId: string): Promise<any[]> {
    // Placeholder for reading sessions. Assuming a 'reading_sessions' table.
    try {
      const { data, error } = await supabase.from("reading_sessions").select("*").eq("user_id", userId)
      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching reading sessions:", error)
      return []
    }
  }

  static async createReadingSession(userId: string, documentId: string, durationMinutes: number): Promise<any | null> {
    // Placeholder for creating a reading session.
    try {
      const { data, error } = await supabase
        .from("reading_sessions")
        .insert([
          {
            user_id: userId,
            document_id: documentId,
            duration_minutes: durationMinutes,
            started_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()
      if (error) throw error
      return data
    } catch (error) {
      console.error("Error creating reading session:", error)
      return null
    }
  }

  static async getLibraryStats(): Promise<any> {
    // Placeholder for library statistics.
    try {
      const { count: totalDocuments, error: docError } = await supabase
        .from("library_documents")
        .select("*", { count: "exact" })
      const { count: totalReadingListItems, error: listItemError } = await supabase
        .from("user_reading_lists")
        .select("*", { count: "exact" })

      if (docError) throw docError
      if (listItemError) throw listItemError

      return {
        totalDocuments: totalDocuments || 0,
        totalReadingListItems: totalReadingListItems || 0,
        // Add more stats as needed
      }
    } catch (error) {
      console.error("Error fetching library stats:", error)
      return { totalDocuments: 0, totalReadingListItems: 0 }
    }
  }

  static async getReadingListById(id: string): Promise<UserReadingListItem | null> {
    // This might be redundant with getUserReadingList if the ID is a list item ID.
    // Assuming it refers to a specific item in a user's reading list.
    try {
      const { data, error } = await supabase.from("user_reading_lists").select("*").eq("id", id).single()
      if (error) throw error
      return data
        ? {
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
        : null
    } catch (error) {
      console.error("Error fetching reading list item by ID:", error)
      return null
    }
  }

  static async updateReadingList(
    id: string,
    updates: Partial<UserReadingListItem>,
  ): Promise<UserReadingListItem | null> {
    return this.updateReadingListItem(id, updates)
  }

  static async deleteReadingList(id: string): Promise<boolean> {
    return this.removeFromReadingList(id)
  }

  // Helper methods
  private static mapDocumentFromDb(dbDoc: any): LibraryDocument {
    return {
      id: dbDoc.id,
      title: dbDoc.title,
      author: dbDoc.author,
      isbn: dbDoc.isbn,
      description: dbDoc.description,
      fileType: dbDoc.file_type,
      fileUrl: dbDoc.file_url,
      fileSize: dbDoc.file_size,
      coverImageUrl: dbDoc.cover_image_url,
      category: dbDoc.category,
      tags: dbDoc.tags || [],
      pageCount: dbDoc.page_count,
      publicationDate: dbDoc.publication_date,
      language: dbDoc.language || "en",
      isPublic: dbDoc.is_public,
      createdAt: dbDoc.created_at,
      updatedAt: dbDoc.updated_at,
    }
  }

  private static mapDocumentToDb(doc: any): any {
    return {
      title: doc.title,
      author: doc.author,
      isbn: doc.isbn,
      description: doc.description,
      file_type: doc.fileType,
      file_url: doc.fileUrl,
      file_size: doc.fileSize,
      cover_image_url: doc.coverImageUrl,
      category: doc.category,
      tags: doc.tags,
      page_count: doc.pageCount,
      publication_date: doc.publicationDate,
      language: doc.language || "en",
      is_public: doc.isPublic,
      updated_at: new Date().toISOString(),
    }
  }

  private static getMockDocuments(filters?: LibrarySearchFilters): LibraryDocument[] {
    const mockDocs: LibraryDocument[] = [
      {
        id: "1",
        title: "The Complete Guide to Numerology",
        author: "Dr. Sarah Mitchell",
        isbn: "978-0123456789",
        description: "A comprehensive guide to understanding numerology and its applications in daily life.",
        fileType: "pdf",
        fileUrl: "/library/numerology-guide.pdf",
        coverImageUrl: "/library/covers/numerology-guide.jpg",
        category: "Numerology",
        tags: ["numerology", "spirituality", "guide"],
        pageCount: 245,
        language: "en",
        isPublic: true,
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
      },
      {
        id: "2",
        title: "Oracle Card Reading Mastery",
        author: "Elena Rodriguez",
        isbn: "978-0987654321",
        description: "Master the art of oracle card reading with advanced techniques and spreads.",
        fileType: "pdf",
        fileUrl: "/library/oracle-mastery.pdf",
        coverImageUrl: "/library/covers/oracle-mastery.jpg",
        category: "Oracle Cards",
        tags: ["oracle", "divination", "cards"],
        pageCount: 189,
        language: "en",
        isPublic: true,
        createdAt: "2024-01-10T14:30:00Z",
        updatedAt: "2024-01-10T14:30:00Z",
      },
      {
        id: "3",
        title: "Sacred Geometry in Practice",
        author: "Marcus Thompson",
        isbn: "978-0456789123",
        description: "Explore the mystical world of sacred geometry and its spiritual significance.",
        fileType: "pdf",
        fileUrl: "/library/sacred-geometry.pdf",
        coverImageUrl: "/library/covers/sacred-geometry.jpg",
        category: "Sacred Geometry",
        tags: ["geometry", "spirituality", "mathematics"],
        pageCount: 312,
        language: "en",
        isPublic: true,
        createdAt: "2024-01-05T09:15:00Z",
        updatedAt: "2024-01-05T09:15:00Z",
      },
      {
        id: "4",
        title: "Elemental Wisdom",
        author: "Luna Starweaver",
        isbn: "978-0789123456",
        description: "Understanding the four elements and their role in spiritual practice.",
        fileType: "txt",
        fileUrl: "/library/elemental-wisdom.txt",
        coverImageUrl: "/library/covers/elemental-wisdom.jpg",
        category: "Elements",
        tags: ["elements", "spirituality", "wisdom"],
        pageCount: 156,
        language: "en",
        isPublic: true,
        createdAt: "2024-01-01T16:45:00Z",
        updatedAt: "2024-01-01T16:45:00Z",
      },
      {
        id: "5",
        title: "Advanced Tarot Techniques",
        author: "Professor James Wilson",
        isbn: "978-0321654987",
        description: "Professional-level tarot reading methods and interpretations.",
        fileType: "pdf",
        fileUrl: "/library/advanced-tarot.pdf",
        coverImageUrl: "/library/covers/advanced-tarot.jpg",
        category: "Tarot",
        tags: ["tarot", "divination", "advanced"],
        pageCount: 278,
        language: "en",
        isPublic: false,
        createdAt: "2023-12-28T11:20:00Z",
        updatedAt: "2023-12-28T11:20:00Z",
      },
    ]

    if (!filters) return mockDocs

    return mockDocs.filter((doc) => {
      if (filters.query) {
        const query = filters.query.toLowerCase()
        const matchesQuery =
          doc.title.toLowerCase().includes(query) ||
          doc.author?.toLowerCase().includes(query) ||
          doc.description?.toLowerCase().includes(query) ||
          doc.isbn?.includes(query)
        if (!matchesQuery) return false
      }

      if (filters.author && !doc.author?.toLowerCase().includes(filters.author.toLowerCase())) {
        return false
      }

      if (filters.category && doc.category !== filters.category) {
        return false
      }

      if (filters.fileType && doc.fileType !== filters.fileType) {
        return false
      }

      if (filters.isPublic !== undefined && doc.isPublic !== filters.isPublic) {
        return false
      }

      return true
    })
  }
}
