"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2 } from "lucide-react"

export default function CategoriesPageClient() {
  // This is a placeholder for category data. In a real app, you'd fetch this from a database.
  const categories = [
    { id: "1", name: "Numerology Basics", slug: "numerology-basics" },
    { id: "2", name: "Card Meanings", slug: "card-meanings" },
    { id: "3", name: "Spiritual Growth", slug: "spiritual-growth" },
    { id: "4", name: "Oracle Readings", slug: "oracle-readings" },
  ]

  const handleEdit = (id: string) => {
    console.log("Edit category:", id)
    // Implement edit logic, e.g., open a dialog or navigate to an edit page
  }

  const handleDelete = (id: string) => {
    console.log("Delete category:", id)
    // Implement delete logic, e.g., show a confirmation dialog and then delete
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Category Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Existing Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(category.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(category.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="category-name">Category Name</Label>
                <Input id="category-name" placeholder="Enter category name" />
              </div>
              <div>
                <Label htmlFor="category-slug">Category Slug</Label>
                <Input id="category-slug" placeholder="Enter category slug (e.g., numerology-basics)" />
              </div>
              <Button className="w-full">Create Category</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
