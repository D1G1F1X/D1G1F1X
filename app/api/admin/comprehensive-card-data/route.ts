import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const DATA_FILE_PATH = path.join(process.cwd(), "data", "comprehensive-card-data.json")

export async function GET() {
  try {
    const fileContents = await fs.readFile(DATA_FILE_PATH, "utf8")
    const data = JSON.parse(fileContents)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to read comprehensive-card-data.json:", error)
    return NextResponse.json({ error: "Failed to load comprehensive card data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const updatedData = await request.json()
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedData, null, 2), "utf8")
    return NextResponse.json({ message: "Comprehensive card data updated successfully" })
  } catch (error) {
    console.error("Failed to write comprehensive-card-data.json:", error)
    return NextResponse.json({ error: "Failed to save comprehensive card data" }, { status: 500 })
  }
}
