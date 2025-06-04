import { type NextRequest, NextResponse } from "next/server"
import { getAllFiles, getFilesByCategory, getFilesByPath, searchFiles } from "@/lib/services/file-service"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const path = searchParams.get("path")
    const query = searchParams.get("query")

    let files

    try {
      if (query) {
        files = await searchFiles(query)
      } else if (category) {
        files = await getFilesByCategory(category)
      } else if (path) {
        files = await getFilesByPath(path)
      } else {
        files = await getAllFiles()
      }
    } catch (searchError) {
      console.error("Error retrieving files:", searchError)
      return NextResponse.json(
        { error: `Failed to retrieve files: ${searchError instanceof Error ? searchError.message : "Unknown error"}` },
        { status: 500 },
      )
    }

    return NextResponse.json({ files })
  } catch (error) {
    console.error("Unexpected error in files API:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error instanceof Error ? error.message : undefined },
      { status: 500 },
    )
  }
}
