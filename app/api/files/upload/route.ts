import { NextResponse } from "next/server"
import { uploadFile } from "@/lib/services/file-service"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const directory = (formData.get("directory") as string) || "/"

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const uploadedFile = await uploadFile(file, directory)
    return NextResponse.json(uploadedFile, { status: 201 })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
