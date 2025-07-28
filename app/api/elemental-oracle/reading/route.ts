import { type NextRequest, NextResponse } from "next/server"
import { ElementalOracleSystem } from "@/lib/systems/elemental-oracle/reading-system"
import type { ReadingRequest } from "@/lib/systems/elemental-oracle/reading-system"

const oracleSystem = new ElementalOracleSystem()

export async function POST(request: NextRequest) {
  try {
    const body: ReadingRequest = await request.json()

    // Validate request body
    if (!body.querentInfo) {
      return NextResponse.json({ success: false, error: "Querent information is required" }, { status: 400 })
    }

    // Generate reading
    const result = await oracleSystem.generateReading(body)

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error generating elemental oracle reading:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error while generating reading",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action")

    switch (action) {
      case "cards":
        // Return all cards
        const cards = oracleSystem.getCardDatabase()
        return NextResponse.json({ success: true, cards })

      case "search":
        // Search cards with criteria
        const element = searchParams.get("element") || undefined
        const suit = searchParams.get("suit") || undefined
        const keywords = searchParams.get("keywords")?.split(",") || undefined
        const minNumber = searchParams.get("minNumber")
        const maxNumber = searchParams.get("maxNumber")

        const numberRange =
          minNumber && maxNumber
            ? ([Number.parseInt(minNumber), Number.parseInt(maxNumber)] as [number, number])
            : undefined

        const searchResults = oracleSystem.searchCards({
          element,
          suit,
          keywords,
          numberRange,
        })

        return NextResponse.json({ success: true, cards: searchResults })

      case "analyze":
        // Quick card combination analysis
        const cardIds = searchParams.get("cardIds")?.split(",") || []

        if (cardIds.length === 0) {
          return NextResponse.json({ success: false, error: "Card IDs required for analysis" }, { status: 400 })
        }

        const analysis = await oracleSystem.analyzeCardCombination(cardIds)
        return NextResponse.json({ success: true, ...analysis })

      default:
        return NextResponse.json({ success: false, error: "Invalid action parameter" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error in elemental oracle GET endpoint:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
