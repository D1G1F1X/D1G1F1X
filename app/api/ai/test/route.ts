import { NextResponse } from "next/server"
import { aiServiceManager } from "@/lib/ai/enhanced-ai-service-manager"

export async function POST() {
  try {
    console.log("🧪 Running AI service test...")

    // Test with sample card data
    const testCards = [
      {
        id: "test-card",
        name: "Test Card - The Oracle's Wisdom",
        element: "Spirit",
        tool: "Cauldron",
        number: 0,
        meaning: "Testing the connection to divine wisdom",
        description: "A test card to validate the AI service functionality",
        keywords: ["test", "validation", "connection", "wisdom"],
      },
    ]

    const testRequest = {
      cards: testCards,
      question: "Is the AI service working correctly?",
      spread_type: "test",
      user_context: "This is a system test to validate AI functionality",
    }

    console.log("📝 Generating test reading...")
    const result = await aiServiceManager.generateReading(testRequest)

    console.log("✅ Test completed:", {
      success: result.success,
      method: result.method,
      hasReading: !!result.reading,
    })

    return NextResponse.json({
      success: true,
      test_result: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ AI service test failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
