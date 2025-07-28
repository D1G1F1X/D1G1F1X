import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const comprehensiveDataPath = path.resolve(process.cwd(), "data/comprehensive-card-data.json")

export async function GET(request: Request) {
  // Add authentication check if needed
  // const user = await isAuthenticated(request);
  // if (!user || !user.isAdmin) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const fileContents = await fs.readFile(comprehensiveDataPath, "utf8")
    const data = JSON.parse(fileContents)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error reading comprehensive card data:", error)
    return NextResponse.json({ error: "Failed to load comprehensive card data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  // const user = await isAuthenticated(request);
  // if (!user || !user.isAdmin) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    const { data } = await request.json()
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid data format received.")
    }
    // Basic validation could be added here if needed
    await fs.writeFile(comprehensiveDataPath, JSON.stringify(data, null, 2), "utf8")
    return NextResponse.json({ message: "Comprehensive card data saved successfully" })
  } catch (error: any) {
    console.error("Error saving comprehensive card data:", error)
    return NextResponse.json({ error: error.message || "Failed to save comprehensive card data" }, { status: 500 })
  }
}
