import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, PlusCircle, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function AdminPostsPage() {
  const posts = [
    {
      id: "post1",
      title: "The Power of Numerology in Daily Life",
      author: "Admin",
      date: "2023-10-20",
      status: "Published",
    },
    {
      id: "post2",
      title: "Decoding Oracle Card Spreads",
      author: "Admin",
      date: "2023-10-15",
      status: "Published",
    },
    {
      id: "post3",
      title: "Upcoming Features for NUMO Oracle",
      author: "Admin",
      date: "2023-10-10",
      status: "Draft",
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Blog Post Management</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Posts</CardTitle>
          <CardDescription>Find blog posts by title or author.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search posts..." className="pl-9" />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>Write and publish a new blog post.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/admin/posts/new" passHref>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Post
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts</CardTitle>
          <CardDescription>A list of all blog posts, including drafts.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Title</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Author</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Status</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-200">{post.title}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">{post.author}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">{post.date}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          post.status === "Published"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="flex justify-end space-x-2 whitespace-nowrap px-4 py-2 text-sm">
                      <Link href={`/admin/posts/${post.id}`} passHref>
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
