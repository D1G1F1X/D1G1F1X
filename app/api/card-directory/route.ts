import { NextResponse } from "next/server"
import { getAllCardData } from "@/lib/card-data-access"

export const dynamic = "force-dynamic" // Added to force dynamic rendering

export async function GET() {
  try {
    const cardData = getAllCardData()
    return NextResponse.json(cardData)
  } catch (error) {
    console.error("Error fetching card directory data:", error)
    return NextResponse.json({ error: "Failed to fetch card directory data" }, { status: 500 })
  }
}
