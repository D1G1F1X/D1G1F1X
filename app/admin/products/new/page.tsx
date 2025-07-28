import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ImagePlus, Save } from "lucide-react"

export default function NewProductPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Product</h1>
          <p className="text-muted-foreground">Add a new product to your store.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Discard</Button>
          <Button>
            <Save className="mr-2 h-4 w-4" /> Create Product
          </Button>
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>Basic details for your new product.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input id="productName" placeholder="e.g., Oracle Card Deck" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="e.g., Oracle Decks, Guidebooks" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="A detailed description of the product." rows={5} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" step="0.01" defaultValue={0.0} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input id="stock" type="number" defaultValue={0} />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="isActive" defaultChecked />
            <Label htmlFor="isActive">Active (Visible in Store)</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
          <CardDescription>Add images for this product.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline">
            <ImagePlus className="mr-2 h-4 w-4" /> Upload Images
          </Button>
          <p className="text-sm text-muted-foreground">Main product image will be the first uploaded.</p>
        </CardContent>
      </Card>
    </div>
  )
}
