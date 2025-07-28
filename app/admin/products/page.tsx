import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, PlusCircle, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function AdminProductsPage() {
  const products = [
    {
      id: "prod1",
      name: "Deluxe Oracle Deck",
      price: 49.99,
      stock: 150,
      category: "Oracle Cards",
      status: "Active",
    },
    {
      id: "prod2",
      name: "Numerology Report",
      price: 19.99,
      stock: "Unlimited",
      category: "Numerology Reports",
      status: "Active",
    },
    {
      id: "prod3",
      name: "Elemental Dice Set",
      price: 24.99,
      stock: 75,
      category: "Accessories",
      status: "Active",
    },
    {
      id: "prod4",
      name: "Ancient Wisdom Guidebook",
      price: 35.0,
      stock: 0,
      category: "Guidebooks",
      status: "Out of Stock",
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Product Management</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Products</CardTitle>
          <CardDescription>Find products by name, category, or status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search products..." className="pl-9" />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create New Product</CardTitle>
          <CardDescription>Add a new product to your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/admin/products/new" passHref>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Product
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>A list of all products available in your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Price</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Stock</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Category</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Status</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-200">{product.name}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">${product.price.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">{product.stock}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">{product.category}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          product.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="flex justify-end space-x-2 whitespace-nowrap px-4 py-2 text-sm">
                      <Link href={`/admin/products/${product.id}`} passHref>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
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
