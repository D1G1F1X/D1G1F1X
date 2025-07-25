"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2, Package, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProductsPageClient() {
  // This is a placeholder for product data. In a real app, you'd fetch this from a database.
  const products = [
    {
      id: "prod1",
      name: "Numoracle Deck Standard Edition",
      price: 39.99,
      stock: 150,
      category: "Decks",
      imageUrl: "/images/products/standard-deck.png",
    },
    {
      id: "prod2",
      name: "Beginner's Guidebook",
      price: 20.0,
      stock: 200,
      category: "Guidebooks",
      imageUrl: "/images/products/guidebook.png",
    },
    {
      id: "prod3",
      name: "Elemental Dice Set",
      price: 15.0,
      stock: 80,
      category: "Accessories",
      imageUrl: "/images/products/crystal-set.png",
    },
    {
      id: "prod4",
      name: "Deluxe Reading Cloth",
      price: 25.0,
      stock: 50,
      category: "Accessories",
      imageUrl: "/images/products/reading-cloth.png",
    },
  ]

  const handleEdit = (id: string) => {
    console.log("Edit product:", id)
    // Implement edit logic, e.g., open a dialog or navigate to an edit page
  }

  const handleDelete = (id: string) => {
    console.log("Delete product:", id)
    // Implement delete logic, e.g., show a confirmation dialog and then delete
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" /> All Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="search-products">Search Products</Label>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="search-products" placeholder="Search by name or category..." className="pl-8" />
              </div>
            </div>
            <div>
              <Label htmlFor="filter-category">Filter by Category</Label>
              <Input id="filter-category" placeholder="e.g., Decks, Guidebooks" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="object-cover rounded-sm"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/products/${product.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
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
