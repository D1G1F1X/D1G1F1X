import { type NextRequest, NextResponse } from "next/server"
import { supabaseManager } from "@/lib/database/supabase-manager"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!supabaseManager.isClientConfigured()) {
      console.warn("[API] Supabase not configured for document retrieval")
      return NextResponse.json({ error: "Database service unavailable" }, { status: 503 })
    }

    const result = await supabaseManager.executeQuery(async (client) => {
      const { data, error } = await client.from("documents").select("*").eq("id", id).single()

      if (error) throw error
      return data
    }, null)

    if (!result) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error(`[API] Error fetching document ${params.id}:`, error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()

    if (!supabaseManager.isClientConfigured()) {
      return NextResponse.json({ error: "Database service unavailable" }, { status: 503 })
    }

    const result = await supabaseManager.executeQuery(async (client) => {
      const { data, error } = await client.from("documents").update(body).eq("id", id).select().single()

      if (error) throw error
      return data
    }, null)

    if (!result) {
      return NextResponse.json({ error: "Document not found or update failed" }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error(`[API] Error updating document ${params.id}:`, error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!supabaseManager.isClientConfigured()) {
      return NextResponse.json({ error: "Database service unavailable" }, { status: 503 })
    }

    await supabaseManager.executeQuery(async (client) => {
      const { error } = await client.from("documents").delete().eq("id", id)

      if (error) throw error
      return true
    }, false)

    return NextResponse.json({ message: "Document deleted successfully" })
  } catch (error: any) {
    console.error(`[API] Error deleting document ${params.id}:`, error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
