import { NextResponse } from "next/server"
// Ensure this path is correct and comprehensive-card-data.json contains
// all elemental cards, keyed by their descriptive IDs (e.g., "01cauldron-air").
import comprehensiveCardData from "@/data/comprehensive-card-data.json"

export async function GET() {
  try {
    // console.log("API: comprehensiveCardData keys:", Object.keys(comprehensiveCardData).length, Object.keys(comprehensiveCardData).slice(0,5)); // Optional: server-side log
    return NextResponse.json(comprehensiveCardData)
  } catch (error) {
    console.error("Error in /api/card-directory:", error)
    return NextResponse.json({ error: "Failed to load card data from comprehensive source" }, { status: 500 })
  }
}
