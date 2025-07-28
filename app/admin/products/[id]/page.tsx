"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Upload } from "lucide-react"
import Link from "next/link"
import { ColorPicker } from "@/components/admin/color-picker"

export default function AdminProductDetailPage({ params }: { params: { id: string } }) {
  const productId = params.id
  // Mock data for a single product
  const product = {
    id: productId,
    name: "Deluxe Oracle Deck",
    slug: "deluxe-oracle-deck",
    price: 49.99,
    stock: 150,
    description: "A comprehensive oracle deck with stunning artwork and a detailed guidebook.",
    category: "Oracle Cards",
    imageUrl: "/images/products/deluxe-deck.png",
    isActive: true,
    featuredColor: "#8A2BE2", // Blue Violet
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Product: {product.name}</h1>
        <Link href="/admin/products" passHref>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>Edit the details of this product.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="product-name">Product Name</Label>
            <Input id="product-name" defaultValue={product.name} />
          </div>
          <div>
            <Label htmlFor="product-slug">Product Slug</Label>
            <Input id="product-slug" defaultValue={product.slug} />
          </div>
          <div>
            <Label htmlFor="product-price">Price</Label>
            <Input id="product-price" type="number" step="0.01" defaultValue={product.price} />
          </div>
          <div>
            <Label htmlFor="product-stock">Stock Quantity</Label>
            <Input id="product-stock" type="number" defaultValue={product.stock} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="product-description">Description</Label>
            <Textarea id="product-description" defaultValue={product.description} rows={5} />
          </div>
          <div>
            <Label htmlFor="product-category">Category</Label>
            <select
              id="product-category"
              defaultValue={product.category}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option>Oracle Cards</option>
              <option>Numerology Reports</option>
              <option>Guidebooks</option>
              <option>Accessories</option>
            </select>
          </div>
          <div>
            <Label htmlFor="product-image">Product Image URL</Label>
            <Input id="product-image" defaultValue={product.imageUrl} />
            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
              <Upload className="mr-2 h-4 w-4" /> Upload New Image
            </Button>
          </div>
          <div className="flex items-center space-x-2 md:col-span-2">
            <Checkbox id="is-active" checked={product.isActive} />
            <Label htmlFor="is-active">Active Product</Label>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="featured-color">Featured Color</Label>
            <ColorPicker value={product.featuredColor} onChange={() => {}} />
            <p className="text-sm text-gray-400 mt-1">Choose a color to represent this product (e.g., for banners).</p>
          </div>
          <div className="md:col-span-2">
            <Button className="w-full">
              <Save className="mr-2 h-4 w-4" /> Save Product
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
