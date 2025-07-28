import { type NextRequest, NextResponse } from "next/server"
import { getAllFolders, getFoldersByPath, createFolder } from "@/lib/services/file-service"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const path = searchParams.get("path")

    let folders

    if (path) {
      folders = await getFoldersByPath(path)
    } else {
      folders = await getAllFolders()
    }

    return NextResponse.json({ folders })
  } catch (error) {
    console.error("Error retrieving folders:", error)
    return NextResponse.json({ error: "Failed to retrieve folders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, path } = data

    if (!name || !path) {
      return NextResponse.json({ error: "Name and path are required" }, { status: 400 })
    }

    const newFolder = await createFolder(name, path)

    return NextResponse.json({ folder: newFolder })
  } catch (error) {
    console.error("Error creating folder:", error)
    return NextResponse.json({ error: "Failed to create folder" }, { status: 500 })
  }
}
