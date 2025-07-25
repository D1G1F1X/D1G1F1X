import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, RefreshCw } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Debug Cards - Admin",
  description: "Debug and inspect raw card data and image paths.",
}

export default function DebugCardsPage() {
  const cards = [
    { id: "1", title: "The Cauldron", element: "Fire", suit: "Cauldron", imageUrl: "/images/cards/cauldron.png" },
    { id: "2", title: "The Spear", element: "Air", suit: "Spear", imageUrl: "/images/cards/spear.png" },
    { id: "3", title: "The Stone", element: "Earth", suit: "Stone", imageUrl: "/images/cards/stone.png" },
    { id: "4", title: "The Sword", element: "Water", suit: "Sword", imageUrl: "/images/cards/sword.png" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" /> Debug Cards
          </CardTitle>
          <CardDescription>Inspect the raw data loaded for all Oracle Cards.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search card data..." className="pl-10" />
            </div>
            <Button>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Element</TableHead>
                  <TableHead>Suit</TableHead>
                  <TableHead>Image URL</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cards.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No card data found.
                    </TableCell>
                  </TableRow>
                ) : (
                  cards.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell className="font-mono text-xs">{card.id}</TableCell>
                      <TableCell className="font-medium">{card.title}</TableCell>
                      <TableCell>{card.element}</TableCell>
                      <TableCell>{card.suit}</TableCell>
                      <TableCell className="text-xs">
                        <a
                          href={card.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {card.imageUrl.length > 50 ? `${card.imageUrl.substring(0, 47)}...` : card.imageUrl}
                        </a>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/cards/${card.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
