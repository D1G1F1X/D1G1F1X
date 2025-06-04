import { getServerClient } from "@/lib/supabase-server"
import { getClientSide } from "@/lib/supabase"

export type CardCollection = {
  id: string
  user_id: string
  name: string
  description: string | null
  cards: any[]
  created_at: string
  updated_at: string
  is_public: boolean
}

export type CardCollectionCreate = Omit<CardCollection, "id" | "created_at" | "updated_at">
export type CardCollectionUpdate = Partial<Omit<CardCollection, "id" | "user_id" | "created_at" | "updated_at">>

// Server-side card collection operations
export const cardCollectionService = {
  // Get a card collection by ID
  async getCollectionById(collectionId: string): Promise<CardCollection | null> {
    const supabase = getServerClient()

    const { data, error } = await supabase.from("card_collections").select("*").eq("id", collectionId).single()

    if (error) {
      console.error("Error fetching card collection:", error)
      return null
    }

    return data as CardCollection
  },

  // Get all public card collections
  async getPublicCollections(): Promise<CardCollection[]> {
    const supabase = getServerClient()

    const { data, error } = await supabase
      .from("card_collections")
      .select("*")
      .eq("is_public", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching public card collections:", error)
      return []
    }

    return data as CardCollection[]
  },

  // Get card collections by user ID
  async getCollectionsByUserId(userId: string): Promise<CardCollection[]> {
    const supabase = getServerClient()

    const { data, error } = await supabase
      .from("card_collections")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching user card collections:", error)
      return []
    }

    return data as CardCollection[]
  },
}

// Client-side card collection operations
export const useCardCollections = () => {
  const supabase = getClientSide()

  return {
    // Get current user's card collections
    async getCurrentUserCollections(): Promise<CardCollection[]> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return []
      }

      const { data, error } = await supabase
        .from("card_collections")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching current user card collections:", error)
        return []
      }

      return data as CardCollection[]
    },

    // Create a new card collection
    async createCollection(collection: CardCollectionCreate): Promise<CardCollection | null> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return null
      }

      // Ensure user_id is set to current user
      const collectionWithUserId = {
        ...collection,
        user_id: session.user.id,
      }

      const { data, error } = await supabase.from("card_collections").insert(collectionWithUserId).select().single()

      if (error) {
        console.error("Error creating card collection:", error)
        return null
      }

      return data as CardCollection
    },

    // Update a card collection
    async updateCollection(collectionId: string, updates: CardCollectionUpdate): Promise<CardCollection | null> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return null
      }

      // First check if the collection belongs to the current user
      const { data: collection, error: fetchError } = await supabase
        .from("card_collections")
        .select("*")
        .eq("id", collectionId)
        .eq("user_id", session.user.id)
        .single()

      if (fetchError || !collection) {
        console.error("Error fetching collection or collection not found:", fetchError)
        return null
      }

      const { data, error } = await supabase
        .from("card_collections")
        .update(updates)
        .eq("id", collectionId)
        .select()
        .single()

      if (error) {
        console.error("Error updating card collection:", error)
        return null
      }

      return data as CardCollection
    },

    // Delete a card collection
    async deleteCollection(collectionId: string): Promise<boolean> {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        return false
      }

      // First check if the collection belongs to the current user
      const { data: collection, error: fetchError } = await supabase
        .from("card_collections")
        .select("*")
        .eq("id", collectionId)
        .eq("user_id", session.user.id)
        .single()

      if (fetchError || !collection) {
        console.error("Error fetching collection or collection not found:", fetchError)
        return false
      }

      const { error } = await supabase.from("card_collections").delete().eq("id", collectionId)

      if (error) {
        console.error("Error deleting card collection:", error)
        return false
      }

      return true
    },
  }
}

// Legacy exports for backward compatibility
export type LegacyCardCollection = {
  id?: string
  user_id: string
  name: string
  description?: string
  cards: any[]
  created_at?: string
  updated_at?: string
  is_public: boolean
}

export async function saveCardCollection(
  collection: LegacyCardCollection,
): Promise<{ success: boolean; id?: string; error?: any }> {
  const supabase = getClientSide()

  if (!collection.user_id) {
    return { success: false, error: "User ID is required" }
  }

  // If collection has an id, update it, otherwise create a new one
  if (collection.id) {
    const { error } = await supabase
      .from("card_collections")
      .update({
        name: collection.name,
        description: collection.description,
        cards: collection.cards,
        is_public: collection.is_public,
      })
      .eq("id", collection.id)
      .eq("user_id", collection.user_id)

    if (error) {
      console.error("Error updating card collection:", error)
      return { success: false, error }
    }

    return { success: true, id: collection.id }
  } else {
    const { data, error } = await supabase
      .from("card_collections")
      .insert({
        user_id: collection.user_id,
        name: collection.name,
        description: collection.description,
        cards: collection.cards,
        is_public: collection.is_public || false,
      })
      .select("id")
      .single()

    if (error) {
      console.error("Error creating card collection:", error)
      return { success: false, error }
    }

    return { success: true, id: data?.id }
  }
}

export async function getUserCardCollections(userId: string): Promise<LegacyCardCollection[]> {
  const supabase = getClientSide()

  const { data, error } = await supabase
    .from("card_collections")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user card collections:", error)
    return []
  }

  return data || []
}

export async function getCardCollectionById(
  collectionId: string,
  userId?: string,
): Promise<LegacyCardCollection | null> {
  const supabase = getClientSide()

  let query = supabase.from("card_collections").select("*").eq("id", collectionId)

  // If userId is provided, ensure the collection belongs to the user or is public
  if (userId) {
    query = query.or(`user_id.eq.${userId},is_public.eq.true`)
  } else {
    // If no userId, only return public collections
    query = query.eq("is_public", true)
  }

  const { data, error } = await query.single()

  if (error) {
    console.error("Error fetching card collection:", error)
    return null
  }

  return data
}

export async function deleteCardCollection(
  collectionId: string,
  userId: string,
): Promise<{ success: boolean; error?: any }> {
  const supabase = getClientSide()

  const { error } = await supabase.from("card_collections").delete().eq("id", collectionId).eq("user_id", userId)

  if (error) {
    console.error("Error deleting card collection:", error)
    return { success: false, error }
  }

  return { success: true }
}

export async function getPublicCardCollections(limit = 20): Promise<LegacyCardCollection[]> {
  const supabase = getClientSide()

  const { data, error } = await supabase
    .from("card_collections")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching public card collections:", error)
    return []
  }

  return data || []
}
