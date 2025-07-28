import CardDebug from "@/components/card-debug"
import CardImageVerifier from "@/components/card-image-verifier" // Changed to default import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllCards, getAllElements, getAllSuits } from "@/lib/card-data-access"

export const dynamic = "force-dynamic" // Added to force dynamic rendering

export default function DebugCardDirectoryPage() {
  // These functions are executed server-side
  const cards = getAllCards() || [] // Ensure cards is always an array
  const elements = getAllElements() || [] // Ensure elements is always an array
  const suits = getAllSuits() || [] // Ensure suits is always an array

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Debug Card Directory</h1>
      <CardDebug />

      <Card>
        <CardHeader>
          <CardTitle>Card Data Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Total Cards: {cards.length}</h3>
              <p className="text-sm text-muted-foreground">
                This shows the total number of cards loaded from the data source.
              </p>
            </div>

            <div>
              <h3 className="font-medium">Elements ({elements.length})</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {elements.map((element) => (
                  <span key={element} className="px-2 py-1 bg-muted rounded-md text-sm">
                    {element}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium">Suits ({suits.length})</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {suits.map((suit) => (
                  <span key={suit} className="px-2 py-1 bg-muted rounded-md text-sm">
                    {suit}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium">First 3 Cards</h3>
              <pre className="p-4 bg-muted rounded-md overflow-auto text-xs mt-2">
                {JSON.stringify(cards.slice(0, 3), null, 2)}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <CardImageVerifier />
    </div>
  )
}
