import { NextResponse } from "next/server"
import { getAllCards } from "@/lib/card-data-access"

export async function GET() {
  try {
    const cards = await getAllCards()
    return NextResponse.json(cards)
  } catch (error) {
    console.error("Error fetching debug card data:", error)
    return NextResponse.json({ error: "Failed to fetch debug card data" }, { status: 500 })
  }
}
