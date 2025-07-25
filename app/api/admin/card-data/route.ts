import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { OracleCard } from "@/types/cards" // Ensure this type is correct
import { getAllCards } from "@/lib/card-data-access"

const DATA_FILE_PATH = path.join(process.cwd(), "data", "master-deck-cards.json")

// Basic validation function (can be expanded)
function validateMasterDeckData(data: any): { valid: boolean; errors?: string[] } {
  if (!Array.isArray(data)) {
    return { valid: false, errors: ["Data must be an array."] }
  }
  if (data.some((item) => typeof item !== "object" || item === null)) {
    return { valid: false, errors: ["All items in the array must be objects."] }
  }
  // Add more specific validation for OracleCard structure if needed
  // For example, check for required fields like id, name, element, type, firstEnd, secondEnd
  const requiredFields: (keyof OracleCard)[] = [
    "id",
    "name",
    "element",
    "type",
    "firstEnd",
    "secondEnd",
    "firstEndImage",
    "secondEndImage",
  ]
  const missingFieldsErrors: string[] = []
  data.forEach((card, index) => {
    for (const field of requiredFields) {
      if (!(field in card)) {
        missingFieldsErrors.push(`Card at index ${index} is missing required field: ${field}`)
      }
    }
    // Could also validate firstEnd and secondEnd structure here
  })

  if (missingFieldsErrors.length > 0) {
    return { valid: false, errors: missingFieldsErrors }
  }

  return { valid: true }
}

export async function GET() {
  try {
    const cards = await getAllCards()
    return NextResponse.json(cards)
  } catch (error) {
    console.error("Error fetching card data:", error)
    return NextResponse.json({ error: "Failed to fetch card data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const jsonData = await request.json() // Expecting the raw array data directly

    const validationResult = validateMasterDeckData(jsonData)
    if (!validationResult.valid) {
      return NextResponse.json(
        { error: "Invalid card data structure", details: validationResult.errors },
        { status: 400 },
      )
    }

    const formattedData = JSON.stringify(jsonData, null, 2) // Pretty print JSON
    fs.writeFileSync(DATA_FILE_PATH, formattedData)

    return NextResponse.json({ success: true, message: "Master deck card data saved successfully." }, { status: 200 })
  } catch (error) {
    console.error("Error saving master deck card data:", error)
    return NextResponse.json(
      {
        error: "Failed to save master deck card data",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
