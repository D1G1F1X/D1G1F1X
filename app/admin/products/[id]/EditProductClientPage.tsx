"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function EditProductClientPage({ params }: { params: { id: string } }) {
  const { id } = params

  // Placeholder for product data. In a real app, you'd fetch this from a database.
  const product = {
    id: id,
    name: "Numoracle Deck Standard Edition",
    slug: "numoracle-deck-standard",
    price: 39.99,
    description: "The foundational deck for your numerological journey. High-quality cards with vibrant art.",
    imageUrl: "/images/products/standard-deck.png",
    inStock: true,
    category: "Decks",
  }

  const handleSave = () => {
    console.log("Saving product changes for:", id)
    // Implement API call to save product changes
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Edit Product: {product.name}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input id="product-name" defaultValue={product.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-slug">Product Slug</Label>
              <Input id="product-slug" defaultValue={product.slug} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-price">Price</Label>
              <Input id="product-price" type="number" step="0.01" defaultValue={product.price} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-description">Description</Label>
              <Textarea id="product-description" defaultValue={product.description} rows={5} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-image-url">Image URL</Label>
              <Input id="product-image-url" defaultValue={product.imageUrl} />
              {product.imageUrl && (
                <div className="mt-2">
                  <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt="Product Image Preview"
                    className="max-w-[150px] h-auto rounded-md border"
                  />
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-category">Category</Label>
              <Input id="product-category" defaultValue={product.category} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="in-stock" defaultChecked={product.inStock} />
              <Label htmlFor="in-stock">In Stock</Label>
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
