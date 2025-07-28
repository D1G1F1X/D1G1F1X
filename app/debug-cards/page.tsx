import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCardData, getCardImagePath } from "@/lib/card-data-access"
import Image from "next/image"

export default function DebugCardsPage() {
  const allCards = getCardData()

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Debug All Cards</h1>
      <p className="mb-4 text-muted-foreground">Displaying all cards with their resolved image paths.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {allCards.map((card) => (
          <Card key={card.id} className="flex flex-col items-center text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{card.fullTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-24 h-36 border rounded-md overflow-hidden mb-2">
                <Image
                  src={getCardImagePath(card, "first") || "/placeholder.svg"} // Always try base element first
                  alt={card.fullTitle}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback to synergistic element if base fails
                    const synergisticPath = getCardImagePath(card, "second")
                    if (e.currentTarget.src !== synergisticPath) {
                      e.currentTarget.src = synergisticPath
                    } else {
                      // If synergistic also fails, use generic placeholder
                      e.currentTarget.src = "/placeholder.svg?height=144&width=96"
                    }
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{card.id}</p>
              <p className="text-xs text-muted-foreground">Base: {card.baseElement}</p>
              <p className="text-xs text-muted-foreground">Synergistic: {card.synergisticElement}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
