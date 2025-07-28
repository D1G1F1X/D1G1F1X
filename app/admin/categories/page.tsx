import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function CategoriesPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">Manage content categories for blog posts, products, etc.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Category
        </Button>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Blog Categories</CardTitle>
            <CardDescription>Organize your blog posts into categories.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for categories list */}
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Numerology</li>
              <li>Oracle Readings</li>
              <li>Spirituality</li>
              <li>Personal Growth</li>
              <li>Product Updates</li>
            </ul>
            <Button variant="outline" className="mt-4 bg-transparent">
              Edit Blog Categories
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>Categorize products in your shop.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for categories list */}
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Oracle Decks</li>
              <li>Guidebooks</li>
              <li>Tools</li>
              <li>Reports</li>
              <li>Merchandise</li>
            </ul>
            <Button variant="outline" className="mt-4 bg-transparent">
              Edit Product Categories
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Library Categories</CardTitle>
            <CardDescription>Group resources in the library.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for categories list */}
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Numerology Basics</li>
              <li>Card Meanings</li>
              <li>Spread Guides</li>
              <li>Astrology & Numerology</li>
            </ul>
            <Button variant="outline" className="mt-4 bg-transparent">
              Edit Library Categories
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
