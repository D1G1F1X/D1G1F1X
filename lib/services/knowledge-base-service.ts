import { getServerClient } from "@/lib/supabase-server"
import { getClientSide } from "@/lib/supabase"

export type KnowledgeBaseItem = {
  id: string
  title: string
  content: string
  category: string | null
  tags: string[] | null
  created_at: string
  updated_at: string
  created_by: string | null
}

export type KnowledgeBaseItemCreate = Omit<KnowledgeBaseItem, "id" | "created_at" | "updated_at">
export type KnowledgeBaseItemUpdate = Partial<
  Omit<KnowledgeBaseItem, "id" | "created_at" | "updated_at" | "created_by">
>

// Server-side knowledge base operations
export const knowledgeBaseService = {
  // Get a knowledge base item by ID
  async getItemById(itemId: string): Promise<KnowledgeBaseItem | null> {
    const supabase = getServerClient()

    const { data, error } = await supabase.from("knowledge_base").select("*").eq("id", itemId).single()

    if (error) {
      console.error("Error fetching knowledge base item:", error)
      return null
    }

    return data as KnowledgeBaseItem
  },

  // Get all knowledge base items
  async getAllItems(): Promise<KnowledgeBaseItem[]> {
    const supabase = getServerClient()

    try {
      const { data, error } = await supabase.from("knowledge_base").select("*")

      if (error) {
        console.error("Error fetching knowledge base items:", error)
        return []
      }

      // Sort the data after fetching
      return (data as KnowledgeBaseItem[]).sort((a, b) => a.title.localeCompare(b.title))
    } catch (error) {
      console.error("Error in getAllItems:", error)
      return []
    }
  },

  // Get knowledge base items by category
  async getItemsByCategory(category: string): Promise<KnowledgeBaseItem[]> {
    const supabase = getServerClient()

    try {
      const { data, error } = await supabase.from("knowledge_base").select("*").eq("category", category)

      if (error) {
        console.error("Error fetching knowledge base items by category:", error)
        return []
      }

      // Sort the data after fetching
      return (data as KnowledgeBaseItem[]).sort((a, b) => a.title.localeCompare(b.title))
    } catch (error) {
      console.error("Error in getItemsByCategory:", error)
      return []
    }
  },

  // Search knowledge base items
  async searchItems(query: string): Promise<KnowledgeBaseItem[]> {
    const supabase = getServerClient()

    try {
      const { data, error } = await supabase
        .from("knowledge_base")
        .select("*")
        .or(`title.ilike.%${query}%,content.ilike.%${query}%`)

      if (error) {
        console.error("Error searching knowledge base items:", error)
        return []
      }

      // Sort the data after fetching
      return (data as KnowledgeBaseItem[]).sort((a, b) => a.title.localeCompare(b.title))
    } catch (error) {
      console.error("Error in searchItems:", error)
      return []
    }
  },

  // Create a knowledge base item
  async createItem(item: KnowledgeBaseItemCreate): Promise<KnowledgeBaseItem | null> {
    const supabase = getServerClient()

    const { data, error } = await supabase.from("knowledge_base").insert(item).select().single()

    if (error) {
      console.error("Error creating knowledge base item:", error)
      return null
    }

    return data as KnowledgeBaseItem
  },

  // Update a knowledge base item
  async updateItem(itemId: string, updates: KnowledgeBaseItemUpdate): Promise<KnowledgeBaseItem | null> {
    const supabase = getServerClient()

    const { data, error } = await supabase.from("knowledge_base").update(updates).eq("id", itemId).select().single()

    if (error) {
      console.error("Error updating knowledge base item:", error)
      return null
    }

    return data as KnowledgeBaseItem
  },

  // Delete a knowledge base item
  async deleteItem(itemId: string): Promise<boolean> {
    const supabase = getServerClient()

    const { error } = await supabase.from("knowledge_base").delete().eq("id", itemId)

    if (error) {
      console.error("Error deleting knowledge base item:", error)
      return false
    }

    return true
  },
}

// Client-side knowledge base operations (admin only)
export const useKnowledgeBase = () => {
  const supabase = getClientSide()

  return {
    // Get all knowledge base items
    async getAllItems(): Promise<KnowledgeBaseItem[]> {
      try {
        const { data, error } = await supabase.from("knowledge_base").select("*")

        if (error) {
          console.error("Error fetching knowledge base items:", error)
          return []
        }

        // Sort the data after fetching
        return (data as KnowledgeBaseItem[]).sort((a, b) => a.title.localeCompare(b.title))
      } catch (error) {
        console.error("Error in client getAllItems:", error)
        return []
      }
    },

    // Create a knowledge base item
    async createItem(item: Omit<KnowledgeBaseItemCreate, "created_by">): Promise<KnowledgeBaseItem | null> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return null
      }

      // Add created_by to the item
      const itemWithCreatedBy = {
        ...item,
        created_by: session.user.id,
      }

      const { data, error } = await supabase.from("knowledge_base").insert(itemWithCreatedBy).select().single()

      if (error) {
        console.error("Error creating knowledge base item:", error)
        return null
      }

      return data as KnowledgeBaseItem
    },

    // Update a knowledge base item
    async updateItem(itemId: string, updates: KnowledgeBaseItemUpdate): Promise<KnowledgeBaseItem | null> {
      const { data, error } = await supabase.from("knowledge_base").update(updates).eq("id", itemId).select().single()

      if (error) {
        console.error("Error updating knowledge base item:", error)
        return null
      }

      return data as KnowledgeBaseItem
    },

    // Delete a knowledge base item
    async deleteItem(itemId: string): Promise<boolean> {
      const { error } = await supabase.from("knowledge_base").delete().eq("id", itemId)

      if (error) {
        console.error("Error deleting knowledge base item:", error)
        return false
      }

      return true
    },
  }
}
