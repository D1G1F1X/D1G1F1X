import { NextResponse } from "next/server"
import cardImagePaths from "@/data/card-image-paths.json" // Directly import the JSON file

export async function GET() {
  try {
    // Return the content of card-image-paths.json directly
    console.log("Serving card-image-paths.json. Number of paths:", Object.keys(cardImagePaths).length)
    return NextResponse.json(cardImagePaths)
  } catch (error) {
    console.error("Error serving card-image-paths.json:", error)
    return NextResponse.json({ error: "Failed to load card image paths" }, { status: 500 })
  }
}
