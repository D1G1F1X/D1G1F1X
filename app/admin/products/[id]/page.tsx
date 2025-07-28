"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { ContentEditor } from "@/components/admin/content-editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

// Mock product data
const mockProduct = {
  id: "1",
  name: "Numoracle Card Deck",
  slug: "numoracle-card-deck",
  price: 39.99,
  salePrice: 29.99,
  description:
    "# Numoracle Card Deck\n\nThe complete set of Numoracle cards featuring all elements and numerological connections. This deck includes:\n\n- 30 Element Cards\n- 10 Spirit Cards\n- Comprehensive guidebook\n- Beautiful storage box\n\nPerfect for beginners and advanced practitioners alike.",
  images: ["/assorted-products-display.png"],
  inventory: 25,
  category: "oracle-cards",
  featured: true,
  published: true,
}

// Mock categories
const categories = [
  { id: "1", name: "Oracle Cards", slug: "oracle-cards" },
  { id: "2", name: "Numerology", slug: "numerology" },
  { id: "3", name: "Readings", slug: "readings" },
  { id: "4", name: "Spiritual Tools", slug: "spiritual-tools" },
]

export default function EditProductPage({ params }: { params: { id: string } }) {
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
          <h1 className="text-2xl font-bold tracking-tight">Edit Product</h1>
          <p className="text-muted-foreground">Update product details and inventory</p>
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

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
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
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={product.slug}
                onChange={(e) => setProduct({ ...product, slug: e.target.value })}
                placeholder="product-slug"
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
                <Label htmlFor="salePrice">Sale Price ($)</Label>
                <Input
                  id="salePrice"
                  type="number"
                  step="0.01"
                  value={product.salePrice || ""}
                  onChange={(e) =>
                    setProduct({ ...product, salePrice: e.target.value ? Number.parseFloat(e.target.value) : null })
                  }
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inventory">Inventory</Label>
              <Input
                id="inventory"
                type="number"
                value={product.inventory}
                onChange={(e) => setProduct({ ...product, inventory: Number.parseInt(e.target.value) })}
                placeholder="0"
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

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={product.featured}
                onCheckedChange={(checked) => setProduct({ ...product, featured: checked })}
              />
              <Label htmlFor="featured">Featured Product</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={product.published}
                onCheckedChange={(checked) => setProduct({ ...product, published: checked })}
              />
              <Label htmlFor="published">Published</Label>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Product Images</Label>
              <div className="border rounded-md p-4">
                <div className="grid grid-cols-2 gap-4">
                  {product.images.map((image: string, index: number) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Product image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => {
                          const newImages = [...product.images]
                          newImages.splice(index, 1)
                          setProduct({ ...product, images: newImages })
                        }}
                      >
                        &times;
                      </Button>
                    </div>
                  ))}
                  <div className="flex items-center justify-center border border-dashed rounded-md aspect-square cursor-pointer hover:bg-muted/50">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="p-2 rounded-full bg-muted">+</div>
                      <span className="text-sm text-muted-foreground">Add Image</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <ContentEditor
                initialValue={product.description}
                onChange={(value) => setProduct({ ...product, description: value })}
                minHeight="300px"
              />
            </div>
          </div>
        </div>
      </form>
    </DashboardShell>
  )
}
