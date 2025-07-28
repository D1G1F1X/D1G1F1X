import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, PlusCircle, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function AdminPagesPage() {
  const pages = [
    { id: "home", title: "Homepage", slug: "/", status: "Published" },
    { id: "about", title: "About Us", slug: "/about", status: "Published" },
    { id: "contact", title: "Contact Us", slug: "/contact", status: "Published" },
    { id: "faq", title: "FAQ", slug: "/faq", status: "Published" },
    { id: "draft-page", title: "Draft Page", slug: "/draft-page", status: "Draft" },
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Page Management</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Pages</CardTitle>
          <CardDescription>Find pages by title or status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search pages..." className="pl-9" />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create New Page</CardTitle>
          <CardDescription>Add a new static page to your website.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/admin/pages/new" passHref>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Page
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Pages</CardTitle>
          <CardDescription>A list of all static pages on your site.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Title</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Slug</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Status</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {pages.map((page) => (
                  <tr key={page.id}>
                    <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-200">{page.title}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">{page.slug}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          page.status === "Published"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {page.status}
                      </span>
                    </td>
                    <td className="flex justify-end space-x-2 whitespace-nowrap px-4 py-2 text-sm">
                      <Link href={`/admin/pages/${page.id}`} passHref>
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
