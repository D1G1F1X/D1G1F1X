import { EditPostPageClient } from "./EditPostPageClient"
import { getPostById } from "@/lib/enhanced-blog-system" // Assuming this function exists

export const metadata = {
  title: "Edit Post - Admin",
  description: "Edit an existing blog post.",
}

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const postId = params.id
  const post = await getPostById(postId) // Fetch post content based on ID

  if (!post) {
    return <div>Post not found.</div> // Handle case where post doesn't exist
  }

  return <EditPostPageClient initialPost={post} />
}
