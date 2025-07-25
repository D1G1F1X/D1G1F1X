import { NextResponse } from "next/server"
import { listAllBlobs } from "@/lib/comprehensive-blob-manager"

export async function GET() {
  try {
    const blobs = await listAllBlobs()
    return NextResponse.json(blobs)
  } catch (error) {
    console.error("Error listing all blobs:", error)
    return NextResponse.json({ error: "Failed to list blobs" }, { status: 500 })
  }
}
