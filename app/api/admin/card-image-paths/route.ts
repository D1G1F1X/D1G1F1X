import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const imagePathsDataPath = path.resolve(process.cwd(), "data/card-image-paths.json")

export async function GET(request: Request) {
  // const user = await isAuthenticated(request);
  // if (!user || !user.isAdmin) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }
  try {
    const fileContents = await fs.readFile(imagePathsDataPath, "utf8")
    const data = JSON.parse(fileContents)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error reading card image paths data:", error)
    return NextResponse.json({ error: "Failed to load card image paths" }, { status: 500 })
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
    // Basic validation could be added here
    await fs.writeFile(imagePathsDataPath, JSON.stringify(data, null, 2), "utf8")
    return NextResponse.json({ message: "Card image paths saved successfully" })
  } catch (error: any) {
    console.error("Error saving card image paths data:", error)
    return NextResponse.json({ error: error.message || "Failed to save card image paths" }, { status: 500 })
  }
}
