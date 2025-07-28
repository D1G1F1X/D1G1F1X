import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Edit, Trash2 } from "lucide-react"

export default function AdminCategoriesPage() {
  const categories = [
    { id: "1", name: "Oracle Cards", slug: "oracle-cards" },
    { id: "2", name: "Numerology Reports", slug: "numerology-reports" },
    { id: "3", name: "Guidebooks", slug: "guidebooks" },
    { id: "4", name: "Accessories", slug: "accessories" },
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Categories Management</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
          <CardDescription>Create a new product or blog category.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="category-name">Category Name</Label>
              <Input id="category-name" placeholder="e.g., New Age Books" />
            </div>
            <div>
              <Label htmlFor="category-slug">Category Slug</Label>
              <Input id="category-slug" placeholder="e.g., new-age-books" />
            </div>
            <div className="md:col-span-2">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Category
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Categories</CardTitle>
          <CardDescription>Manage your current categories.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Slug</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-200">{category.name}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">{category.slug}</td>
                    <td className="flex justify-end space-x-2 whitespace-nowrap px-4 py-2 text-sm">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
