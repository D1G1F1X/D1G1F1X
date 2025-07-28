import { NextResponse } from "next/server"
import { del } from "@vercel/blob"

export async function POST(request: Request) {
  const { pathnames } = await request.json()

  if (!Array.isArray(pathnames) || pathnames.length === 0) {
    return NextResponse.json({ message: "No pathnames provided for deletion" }, { status: 400 })
  }

  try {
    await Promise.all(pathnames.map((pathname) => del(pathname)))
    return NextResponse.json({ message: "Blobs deleted successfully" })
  } catch (error) {
    console.error("Error deleting blobs:", error)
    return NextResponse.json({ error: "Failed to delete blobs" }, { status: 500 })
  }
}
