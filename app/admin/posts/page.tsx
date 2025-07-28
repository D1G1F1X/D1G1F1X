import { DataTable } from "./data-table"
import { columns } from "./columns"

async function getPosts(): Promise<any[]> {
  // Replace with your actual API call to fetch posts
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }
  return res.json()
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog Posts</h2>
          <p className="text-muted-foreground">Manage your blog posts here.</p>
        </div>
      </div>
      <DataTable data={posts} columns={columns} />
    </div>
  )
}
