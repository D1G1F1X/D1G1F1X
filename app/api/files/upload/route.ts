import { NextResponse } from "next/server"
import { handleFileUpload } from "@/lib/services/file-service"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const result = await handleFileUpload(file)

    if (result.success) {
      return NextResponse.json({ message: "File uploaded successfully", url: result.url }, { status: 201 })
    } else {
      return NextResponse.json({ error: result.message }, { status: 500 })
    }
  } catch (error) {
    console.error("Error handling file upload:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
