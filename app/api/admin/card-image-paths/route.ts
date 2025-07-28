import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "card-image-paths.json")
  try {
    const fileContents = await fs.readFile(filePath, "utf8")
    const data = JSON.parse(fileContents)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to read card-image-paths.json:", error)
    return NextResponse.json({ error: "Failed to load image paths" }, { status: 500 })
  }
}
