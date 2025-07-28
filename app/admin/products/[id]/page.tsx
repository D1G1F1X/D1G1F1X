"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { ContentEditor } from "@/components/admin/content-editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ImagePlus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock product data
const mockProduct = {
  id: "prod001",
  name: "Deluxe Oracle Deck",
  description: "A beautifully designed oracle deck with intricate artwork and a comprehensive guidebook.",
  price: 79.99,
  stock: 150,
  category: "Oracle Decks",
  isActive: true,
  imageUrl: "/images/products/deluxe-deck.png",
}

// Mock categories
const categories = [
  { id: "1", name: "Oracle Cards", slug: "oracle-cards" },
  { id: "2", name: "Numerology", slug: "numerology" },
  { id: "3", name: "Readings", slug: "readings" },
  { id: "4", name: "Spiritual Tools", slug: "spiritual-tools" },
]

interface ProductEditPageProps {
  params: {
    id: string
  }
}

export default function ProductEditPage({ params }: ProductEditPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    // In a real app, you would fetch the product data from your API
    setProduct(mockProduct)
    setIsLoading(false)
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Here you would normally save the product to your database
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Product updated",
        description: "Your product has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your product.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-96">
          <p>Loading product...</p>
        </div>
      </DashboardShell>
    )
  }

  if (!product) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-96">
          <p>Product not found</p>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Product: {product.name}</h1>
          <p className="text-muted-foreground">Update product details, pricing, and inventory.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.push("/admin/products")}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>Basic details about the product.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                placeholder="Product name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={product.category} onValueChange={(value) => setProduct({ ...product, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.slug} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <ContentEditor
                initialValue={product.description}
                onChange={(value) => setProduct({ ...product, description: value })}
                minHeight="300px"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: Number.parseFloat(e.target.value) })}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  value={product.stock}
                  onChange={(e) => setProduct({ ...product, stock: Number.parseInt(e.target.value) })}
                  placeholder="0"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={product.isActive}
                onCheckedChange={(checked) => setProduct({ ...product, isActive: checked })}
              />
              <Label htmlFor="isActive">Active (Visible in Store)</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
          <CardDescription>Manage images for this product.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            {product.imageUrl && (
              <img
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-md border"
              />
            )}
            <Button variant="outline">
              <ImagePlus className="mr-2 h-4 w-4" /> Upload New Image
            </Button>
            {/* Add more image management features here, e.g., reordering, deleting */}
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
