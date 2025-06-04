import Link from "next/link"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getPosts } from "@/lib/content"
import { requireAuth } from "@/lib/auth"

export default async function PostsPage() {
  await requireAuth()
  const posts = await getPosts()

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog posts and articles</p>
        </div>
        <Link href="/admin/posts/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="border rounded-md">
        <div className="grid grid-cols-12 p-4 border-b font-medium">
          <div className="col-span-6">Title</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {posts.map((post) => (
          <div key={post.id} className="grid grid-cols-12 p-4 border-b items-center">
            <div className="col-span-6 font-medium">{post.title}</div>
            <div className="col-span-2">
              <Badge variant={post.isPublished ? "default" : "secondary"}>
                {post.isPublished ? "Published" : "Draft"}
              </Badge>
            </div>
            <div className="col-span-2 text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</div>
            <div className="col-span-2 flex justify-end space-x-2">
              <Link href={`/admin/posts/${post.id}`}>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </Link>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">
            No posts found. Create your first post to get started.
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
