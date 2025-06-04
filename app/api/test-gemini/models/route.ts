import { NextResponse } from "next/server"
import { listAvailableModels } from "@/lib/gemini"

export async function GET() {
  try {
    // Use the updated listAvailableModels function that doesn't cause errors
    const models = await listAvailableModels()
    return NextResponse.json({ models })
  } catch (error) {
    console.error("Error listing models:", error)
    return NextResponse.json({
      models: ["gemini-pro", "gemini-pro-vision"],
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
