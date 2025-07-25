"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2, ImageIcon, BookOpen } from "lucide-react"
import Link from "next/link"

export default function ManageOracleCardsClientPage() {
  // This is a placeholder for card data. In a real app, you'd fetch this from a database.
  const cards = [
    {
      id: "0-cauldron",
      title: "0 Cauldron - The Cauldron of Creation",
      suit: "Cauldron",
      number: "0",
      element: "Spirit",
    },
    {
      id: "1-cauldron",
      title: "1 Cauldron - The Cauldron of Manifestation",
      suit: "Cauldron",
      number: "1",
      element: "Fire",
    },
    { id: "5-sword", title: "5 Sword - The Sword of Power and Conflict", suit: "Sword", number: "5", element: "Water" },
    {
      id: "4-spear",
      title: "4 Spear - The Spear of Drive and Direction",
      suit: "Spear",
      number: "4",
      element: "Earth",
    },
  ]

  const handleEdit = (id: string) => {
    console.log("Edit card:", id)
    // Implement edit logic, e.g., open a dialog or navigate to an edit page
  }

  const handleDelete = (id: string) => {
    console.log("Delete card:", id)
    // Implement delete logic, e.g., show a confirmation dialog and then delete
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Oracle Card Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Card
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" /> Card Image Manager
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Upload, view, and manage the image files for each oracle card.
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/blob-manager">Go to Image Manager</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Card Data Editor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Edit the textual data, meanings, and symbolism for each oracle card.
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/card-data-editor">Go to Data Editor</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Oracle Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="search-cards">Search Cards</Label>
            <Input id="search-cards" placeholder="Search by title, suit, or number..." />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Suit</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Base Element</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell className="font-medium">{card.id}</TableCell>
                  <TableCell>{card.title}</TableCell>
                  <TableCell>{card.suit}</TableCell>
                  <TableCell>{card.number}</TableCell>
                  <TableCell>{card.element}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(card.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(card.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
