export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: "admin" | "member"
          is_premium: boolean
          purchase_code: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: "admin" | "member"
          is_premium?: boolean
          purchase_code?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: "admin" | "member"
          is_premium?: boolean
          purchase_code?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type UserProfile = Database["public"]["Tables"]["profiles"]["Row"]
