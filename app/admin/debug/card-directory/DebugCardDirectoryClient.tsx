"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Loader2 } from "lucide-react"
import { filterCards, sortCards } from "@/lib/card-data-access"
import type { OracleCard } from "@/types/cards"
import { EnhancedCardImage } from "@/components/enhanced-card-image-handler"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

interface CardDirectoryDebugClientProps {
  initialCards: OracleCard[]
  suits: string[]
  elements: string[]
  numbers: string[]
}

function CardDirectoryDebugClient({ initialCards, suits, elements, numbers }: CardDirectoryDebugClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSuit, setSelectedSuit] = useState("any")
  const [selectedElement, setSelectedElement] = useState("any")
  const [selectedNumber, setSelectedNumber] = useState("any")
  const [sortBy, setSortBy] = useState<"number" | "suit" | "title" | "element">("number")
  const [loading, setLoading] = useState(false)
  const [displayCards, setDisplayCards] = useState<OracleCard[]>([])

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    const timer = setTimeout(() => {
      if (isMounted) {
        const filtered = filterCards(initialCards, {
          suit: selectedSuit === "any" ? undefined : selectedSuit,
          element: selectedElement === "any" ? undefined : selectedElement,
          number: selectedNumber === "any" ? undefined : selectedNumber,
          query: searchTerm === "" ? undefined : searchTerm,
        })
        const sorted = sortCards(filtered, sortBy)
        setDisplayCards(sorted)
        setLoading(false)
      }
    }, 100) // Small delay to simulate work

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [initialCards, searchTerm, selectedSuit, selectedElement, selectedNumber, sortBy])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Data Explorer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="col-span-full">
            <Label htmlFor="search-term">Search Cards</Label>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-term"
                placeholder="Search by title or meaning..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="suit-filter">Filter by Suit</Label>
            <Select value={selectedSuit} onValueChange={setSelectedSuit}>
              <SelectTrigger id="suit-filter">
                <SelectValue placeholder="Any Suit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Suit</SelectItem>
                {suits.map((suit) => (
                  <SelectItem key={suit} value={suit}>
                    {suit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="element-filter">Filter by Element</Label>
            <Select value={selectedElement} onValueChange={setSelectedElement}>
              <SelectTrigger id="element-filter">
                <SelectValue placeholder="Any Element" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Element</SelectItem>
                {elements.map((element) => (
                  <SelectItem key={element} value={element}>
                    {element}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="number-filter">Filter by Number</Label>
            <Select value={selectedNumber} onValueChange={setSelectedNumber}>
              <SelectTrigger id="number-filter">
                <SelectValue placeholder="Any Number" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Number</SelectItem>
                {numbers.map((number) => (
                  <SelectItem key={number} value={number}>
                    {number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sort-by">Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy as (value: string) => void}>
              <SelectTrigger id="sort-by">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="suit">Suit</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="element">Element</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading cards...</span>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Suit</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Base Element</TableHead>
                <TableHead>Synergistic Element</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayCards.length > 0 ? (
                displayCards.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell>
                      <EnhancedCardImage
                        cardId={card.id}
                        cardTitle={card.fullTitle}
                        baseElement={card.baseElement}
                        synergisticElement={card.synergisticElement}
                        className="w-16 h-auto"
                        showStatus={false}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-xs">{card.id}</TableCell>
                    <TableCell>{card.fullTitle}</TableCell>
                    <TableCell>{card.suit}</TableCell>
                    <TableCell>{card.number}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{card.baseElement}</Badge>
                    </TableCell>
                    <TableCell>
                      {card.synergisticElement && card.synergisticElement !== card.baseElement && (
                        <Badge variant="secondary">{card.synergisticElement}</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No cards found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

export default CardDirectoryDebugClient
