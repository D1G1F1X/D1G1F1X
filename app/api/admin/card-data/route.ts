import { NextResponse } from "next/server"
import { getAllCardData, getCardDataById } from "@/lib/card-data-access" // Assuming these functions exist
import fs from "fs/promises"
import path from "path"

const masterCardDataPath = path.resolve(process.cwd(), "data/master-card-data.json")

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  try {
    if (id) {
      const card = getCardDataById(id)
      if (card) {
        return NextResponse.json(card)
      }
      return NextResponse.json({ message: "Card not found" }, { status: 404 })
    } else {
      const allCards = getAllCardData()
      return NextResponse.json(allCards)
    }
  } catch (error) {
    console.error("Error fetching card data:", error)
    return NextResponse.json({ error: "Failed to fetch card data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const updatedCard = await request.json()
    const allCards = getAllCardData()
    const cardIndex = allCards.findIndex((card) => card.id === updatedCard.id)

    if (cardIndex > -1) {
      allCards[cardIndex] = updatedCard
      await fs.writeFile(masterCardDataPath, JSON.stringify(allCards, null, 2), "utf8")
      return NextResponse.json({ message: "Card data updated successfully" })
    } else {
      // For new cards, append to the array
      allCards.push(updatedCard)
      await fs.writeFile(masterCardDataPath, JSON.stringify(allCards, null, 2), "utf8")
      return NextResponse.json({ message: "Card data added successfully" }, { status: 201 })
    }
  } catch (error) {
    console.error("Error updating/adding card data:", error)
    return NextResponse.json({ error: "Failed to update/add card data" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Card ID is required" }, { status: 400 })
  }

  try {
    let allCards = getAllCardData()
    const initialLength = allCards.length
    allCards = allCards.filter((card) => card.id !== id)

    if (allCards.length < initialLength) {
      await fs.writeFile(masterCardDataPath, JSON.stringify(allCards, null, 2), "utf8")
      return NextResponse.json({ message: `Card with ID ${id} deleted successfully` })
    } else {
      return NextResponse.json({ message: "Card not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error deleting card data:", error)
    return NextResponse.json({ error: "Failed to delete card data" }, { status: 500 })
  }
}
