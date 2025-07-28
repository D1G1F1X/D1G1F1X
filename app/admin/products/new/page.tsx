"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createProduct } from "@/lib/shop"
import { getCategories } from "@/lib/shop"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ContentEditor } from "@/components/admin/content-editor"
import { toast } from "@/components/ui/use-toast"

export default function NewProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    inventory: 0,
    category: "",
    imageUrl: "/assorted-products-display.png",
    isPublished: true,
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(data)
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, category: data[0].slug }))
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
        toast({
          title: "Error",
          description: "Failed to load categories",
          variant: "destructive",
        })
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "inventory" ? Number.parseFloat(value) : value,
    }))
  }

  const handleDescriptionChange = (content: string) => {
    setFormData((prev) => ({ ...prev, description: content }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isPublished: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createProduct(formData)
      toast({
        title: "Success",
        description: "Product created successfully",
      })
      router.push("/admin/products")
      router.refresh()
    } catch (error) {
      console.error("Error creating product:", error)
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/admin/products">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Add New Product</h1>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <ContentEditor initialContent={formData.description} onChange={handleDescriptionChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inventory">Inventory</Label>
                  <Input
                    id="inventory"
                    name="inventory"
                    type="number"
                    min="0"
                    value={formData.inventory}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
                {formData.imageUrl && (
                  <div className="mt-2 border rounded-md p-2 w-40 h-40 relative">
                    <img
                      src={formData.imageUrl || "/placeholder.svg"}
                      alt="Product preview"
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.currentTarget.src = "/assorted-products-display.png"
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="isPublished" checked={formData.isPublished} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="isPublished">Published</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Product"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardShell>
  )
}
