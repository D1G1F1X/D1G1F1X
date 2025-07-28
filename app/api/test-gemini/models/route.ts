import { NextResponse } from "next/server"
import { listGeminiModels } from "@/lib/gemini"

export async function GET() {
  try {
    const models = await listGeminiModels()
    return NextResponse.json(models)
  } catch (error) {
    console.error("Error listing Gemini models:", error)
    return NextResponse.json({ error: "Failed to list Gemini models" }, { status: 500 })
  }
}
