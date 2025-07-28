import { NextResponse } from "next/server"
import { getAllFiles, createFile } from "@/lib/services/file-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const directory = searchParams.get("directory") || "/"

  try {
    const files = await getAllFiles(directory)
    return NextResponse.json(files)
  } catch (error) {
    console.error("Error fetching files:", error)
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const directory = (formData.get("directory") as string) || "/"

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const newFile = await createFile(file, directory)
    return NextResponse.json(newFile, { status: 201 })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
