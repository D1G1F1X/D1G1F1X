"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, Upload } from "lucide-react"
import { ColorPicker } from "@/components/admin/color-picker"

export default function AdminNewProductPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Create New Product</h1>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>Enter the details for your new product.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="product-name">Product Name</Label>
            <Input id="product-name" placeholder="e.g., Beginner Oracle Deck" />
          </div>
          <div>
            <Label htmlFor="product-slug">Product Slug</Label>
            <Input id="product-slug" placeholder="e.g., beginner-oracle-deck" />
          </div>
          <div>
            <Label htmlFor="product-price">Price</Label>
            <Input id="product-price" type="number" step="0.01" defaultValue={0.0} />
          </div>
          <div>
            <Label htmlFor="product-stock">Stock Quantity</Label>
            <Input id="product-stock" type="number" defaultValue={0} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="product-description">Description</Label>
            <Textarea id="product-description" placeholder="A brief description of the product." rows={5} />
          </div>
          <div>
            <Label htmlFor="product-category">Category</Label>
            <select
              id="product-category"
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
            <Input id="product-image" placeholder="/images/products/default.png" />
            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
              <Upload className="mr-2 h-4 w-4" /> Upload Image
            </Button>
          </div>
          <div className="flex items-center space-x-2 md:col-span-2">
            <Checkbox id="is-active" defaultChecked />
            <Label htmlFor="is-active">Active Product</Label>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="featured-color">Featured Color</Label>
            <ColorPicker value="#6A0DAD" onChange={() => {}} /> {/* Default to a purple shade */}
            <p className="text-sm text-gray-400 mt-1">Choose a color to represent this product (e.g., for banners).</p>
          </div>
          <div className="md:col-span-2">
            <Button className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Product
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
