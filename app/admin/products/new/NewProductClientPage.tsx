"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle } from "lucide-react"

export default function NewProductClientPage() {
  const handleCreate = () => {
    console.log("Creating new product...")
    // Implement API call to create new product
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Create New Product</h1>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input id="product-name" placeholder="e.g., Numoracle Deck Deluxe Edition" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-slug">Product Slug</Label>
              <Input id="product-slug" placeholder="e.g., numoracle-deck-deluxe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-price">Price</Label>
              <Input id="product-price" type="number" step="0.01" placeholder="0.00" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-description">Description</Label>
              <Textarea id="product-description" rows={5} placeholder="Detailed description of the product..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-image-url">Image URL</Label>
              <Input id="product-image-url" placeholder="/images/products/new-product.png" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-category">Category</Label>
              <Input id="product-category" placeholder="e.g., Decks, Guidebooks, Accessories" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="in-stock" defaultChecked />
              <Label htmlFor="in-stock">In Stock</Label>
            </div>
            <Button onClick={handleCreate}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Product
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
