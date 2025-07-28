import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { requireAuth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await requireAuth()
    if (!authResult) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get form data
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || ""

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Ensure folder path is formatted correctly
    const folderPath = folder ? (folder.endsWith("/") ? folder : `${folder}/`) : ""

    // Create a pathname with the folder and filename
    const pathname = `${folderPath}${file.name}`

    // Upload to Blob
    const { url } = await put(pathname, file, {
      access: "public",
    })

    return NextResponse.json({
      success: true,
      url,
      pathname,
      name: file.name,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
