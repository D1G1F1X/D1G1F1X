import { type NextRequest, NextResponse } from "next/server"
import { getDocuments, createDocument, getDocumentCategories } from "@/lib/services/enhanced-library-service"
import { getUserFromRequest } from "@/lib/auth-utils"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get("search") || undefined
    const category = searchParams.get("category") || undefined
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const categoriesOnly = searchParams.get("categoriesOnly") === "true"

    // Get user from session if available
    const user = await getUserFromRequest(request)
    const userId = user?.id

    if (categoriesOnly) {
      const categories = await getDocumentCategories()
      return NextResponse.json({ categories })
    }

    const { documents, count } = await getDocuments(userId, search, category, limit, offset)

    return NextResponse.json({
      documents,
      pagination: {
        total: count,
        limit,
        offset,
      },
    })
  } catch (error) {
    console.error("Error in GET /api/library/documents:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const documentData = await request.json()

    const document = await createDocument(documentData, user.id)

    if (!document) {
      return NextResponse.json({ error: "Failed to create document" }, { status: 500 })
    }

    return NextResponse.json({ document })
  } catch (error: any) {
    console.error("Error in POST /api/library/documents:", error)

    if (error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }

    return NextResponse.json({ error: "Failed to create document" }, { status: 500 })
  }
}
