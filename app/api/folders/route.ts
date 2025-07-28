import { NextResponse } from "next/server"
import { getAllFolders, createFolder } from "@/lib/services/file-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const parentId = searchParams.get("parentId") || null

  try {
    const folders = await getAllFolders(parentId)
    return NextResponse.json(folders)
  } catch (error) {
    console.error("Error fetching folders:", error)
    return NextResponse.json({ error: "Failed to fetch folders" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, parentId } = await request.json()
    if (!name) {
      return NextResponse.json({ error: "Folder name is required" }, { status: 400 })
    }
    const newFolder = await createFolder(name, parentId)
    return NextResponse.json(newFolder, { status: 201 })
  } catch (error) {
    console.error("Error creating folder:", error)
    return NextResponse.json({ error: "Failed to create folder" }, { status: 500 })
  }
}
