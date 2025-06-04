import { type NextRequest, NextResponse } from "next/server"
import { getDocument, updateDocument, deleteDocument } from "@/lib/services/enhanced-library-service"
import { getUserFromRequest } from "@/lib/auth-utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const documentId = params.id

    // Get user from session if available
    const user = await getUserFromRequest(request)
    const userId = user?.id

    const document = await getDocument(documentId, userId)

    if (!document) {
      return NextResponse.json({ error: "Document not found or access denied" }, { status: 404 })
    }

    return NextResponse.json({ document })
  } catch (error) {
    console.error(`Error in GET /api/library/documents/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch document" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const documentId = params.id
    const user = await getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updates = await request.json()

    const document = await updateDocument(documentId, updates, user.id)

    if (!document) {
      return NextResponse.json({ error: "Failed to update document" }, { status: 500 })
    }

    return NextResponse.json({ document })
  } catch (error: any) {
    console.error(`Error in PUT /api/library/documents/${params.id}:`, error)

    if (error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }

    return NextResponse.json({ error: "Failed to update document" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const documentId = params.id
    const user = await getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const success = await deleteDocument(documentId, user.id)

    if (!success) {
      return NextResponse.json({ error: "Failed to delete document" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error(`Error in DELETE /api/library/documents/${params.id}:`, error)

    if (error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }

    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 })
  }
}
