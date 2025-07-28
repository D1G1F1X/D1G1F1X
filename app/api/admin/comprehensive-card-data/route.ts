import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const comprehensiveCardDataPath = path.resolve(process.cwd(), "data/comprehensive-card-data.json")

export async function GET() {
  try {
    const fileContents = await fs.readFile(comprehensiveCardDataPath, "utf8")
    const data = JSON.parse(fileContents)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error reading comprehensive card data:", error)
    return NextResponse.json({ error: "Failed to load comprehensive card data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { data } = await request.json()
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid data format received.")
    }
    await fs.writeFile(comprehensiveCardDataPath, JSON.stringify(data, null, 2), "utf8")
    return NextResponse.json({ message: "Comprehensive card data saved successfully" })
  } catch (error: any) {
    console.error("Error saving comprehensive card data:", error)
    return NextResponse.json({ error: error.message || "Failed to save comprehensive card data" }, { status: 500 })
  }
}
