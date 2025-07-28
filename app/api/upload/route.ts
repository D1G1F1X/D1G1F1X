import { NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get("filename")
  const contentType = searchParams.get("contentType")

  if (!filename || !contentType) {
    return NextResponse.json({ error: "Filename and contentType are required" }, { status: 400 })
  }

  try {
    const blob = await put(filename, request.body!, {
      access: "public",
      contentType,
    })
    return NextResponse.json(blob)
  } catch (error) {
    console.error("Error uploading blob:", error)
    return NextResponse.json({ error: "Failed to upload blob" }, { status: 500 })
  }
}
