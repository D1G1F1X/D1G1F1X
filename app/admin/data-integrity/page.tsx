import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { checkDataIntegrity, getAllCards, getComprehensiveCardData } from "@/lib/card-data-access"

export const dynamic = "force-dynamic" // Added to force dynamic rendering

export default function DataIntegrityPage() {
  // Ensure issues is always an array
  const issues = checkDataIntegrity() || []
  const cards = getAllCards() || []
  // Ensure masterData is always an array
  const masterData = getComprehensiveCardData() || []

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Data Integrity Checker</h1>

      <Card>
        <CardHeader>
          <CardTitle>Data Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-md">
                <h3 className="font-medium mb-2">Master Data</h3>
                <p>Total cards: {Array.isArray(masterData) ? masterData.length : "Unknown"}</p>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <h3 className="font-medium mb-2">Transformed Data</h3>
                <p>Total cards: {cards.length}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Integrity Issues</CardTitle>
        </CardHeader>
        <CardContent>
          {issues.length === 0 ? (
            <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-md">
              <p className="text-green-300">No data integrity issues found! All data is consistent.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-md">
                <p className="text-red-300 mb-2">Found {issues.length} data integrity issues:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {issues.map((issue, index) => (
                    <li key={index} className="text-red-200">
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="destructive">Fix All Issues</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sample Card Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          {cards.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">First Card: {cards[0].name}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Transformed Data</h4>
                  <pre className="p-4 bg-muted rounded-md overflow-auto text-xs">
                    {JSON.stringify(cards[0], null, 2)}
                  </pre>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Master Data</h4>
                  <pre className="p-4 bg-muted rounded-md overflow-auto text-xs">
                    {JSON.stringify(
                      Array.isArray(masterData) && masterData.length > 0
                        ? masterData.find((c: any) => c.id === cards[0].id) || "Not found in master data"
                        : "No master data available",
                      null,
                      2,
                    )}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
