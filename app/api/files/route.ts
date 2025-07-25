import { NextResponse } from "next/server"
import { getAllFiles, createFile } from "@/lib/services/file-service"

export async function GET() {
  try {
    const files = await getAllFiles()
    return NextResponse.json(files)
  } catch (error) {
    console.error("Error fetching files:", error)
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const fileData = await request.json()
    const result = await createFile(fileData)
    if (result.success) {
      return NextResponse.json({ message: "File created successfully", file: result.file }, { status: 201 })
    } else {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }
  } catch (error) {
    console.error("Error creating file:", error)
    return NextResponse.json({ error: "Failed to create file" }, { status: 500 })
  }
}
