import { getServerClient } from "@/lib/supabase-server"
import { getClientSide } from "@/lib/supabase"

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image_url: string | null
  category: string | null
  stock: number
  created_at: string
  updated_at: string
  is_active: boolean
}

export type ProductCreate = Omit<Product, "id" | "created_at" | "updated_at">
export type ProductUpdate = Partial<Omit<Product, "id" | "created_at" | "updated_at">>

// Server-side product operations
export const productService = {
  // Get a product by ID
  async getProductById(productId: string): Promise<Product | null> {
    const supabase = getServerClient()

    const { data, error } = await supabase.from("products").select("*").eq("id", productId).single()

    if (error) {
      console.error("Error fetching product:", error)
      return null
    }

    return data as Product
  },

  // Get all active products
  async getActiveProducts(): Promise<Product[]> {
    const supabase = getServerClient()

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("name", { ascending: true })

    if (error) {
      console.error("Error fetching active products:", error)
      return []
    }

    return data as Product[]
  },

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    const supabase = getServerClient()

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .eq("is_active", true)
      .order("name", { ascending: true })

    if (error) {
      console.error("Error fetching products by category:", error)
      return []
    }

    return data as Product[]
  },

  // Create a product (admin only)
  async createProduct(product: ProductCreate): Promise<Product | null> {
    const supabase = getServerClient()

    const { data, error } = await supabase.from("products").insert(product).select().single()

    if (error) {
      console.error("Error creating product:", error)
      return null
    }

    return data as Product
  },

  // Update a product (admin only)
  async updateProduct(productId: string, updates: ProductUpdate): Promise<Product | null> {
    const supabase = getServerClient()

    const { data, error } = await supabase.from("products").update(updates).eq("id", productId).select().single()

    if (error) {
      console.error("Error updating product:", error)
      return null
    }

    return data as Product
  },

  // Delete a product (admin only)
  async deleteProduct(productId: string): Promise<boolean> {
    const supabase = getServerClient()

    const { error } = await supabase.from("products").delete().eq("id", productId)

    if (error) {
      console.error("Error deleting product:", error)
      return false
    }

    return true
  },
}

// Client-side product operations
export const useProducts = () => {
  const supabase = getClientSide()

  return {
    // Get all active products
    async getActiveProducts(): Promise<Product[]> {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("name", { ascending: true })

      if (error) {
        console.error("Error fetching active products:", error)
        return []
      }

      return data as Product[]
    },

    // Get a product by ID
    async getProductById(productId: string): Promise<Product | null> {
      const { data, error } = await supabase.from("products").select("*").eq("id", productId).single()

      if (error) {
        console.error("Error fetching product:", error)
        return null
      }

      return data as Product
    },
  }
}
