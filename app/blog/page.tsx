import { getPosts } from "@/lib/content"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ClientImage } from "@/components/client-image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | NUMO Oracle",
  description: "Explore articles about numerology, astrology, and oracle divination from NUMO Oracle.",
}

export default async function BlogPage() {
  const posts = await getPosts()
  const publishedPosts = posts.filter((post) => post.isPublished)

  return (
    <div className="container py-12 px-4 mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
            NUMO Oracle Blog
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Explore the ancient wisdom of numerology, astrology, and oracle divination through our collection of
            insightful articles
          </p>
        </div>

        <div className="grid gap-8">
          {publishedPosts.map((post) => (
            <Card key={post.id} className="bg-black/50 border-purple-800/30 overflow-hidden">
              <div className="md:flex">
                {post.featuredImage && (
                  <div className="md:w-1/3 h-48 md:h-auto relative">
                    <ClientImage
                      src={post.featuredImage || "/placeholder.svg"}
                      alt={post.title}
                      fallbackSrc="/gifts-of-danu.png"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <div className={`md:${post.featuredImage ? "w-2/3" : "w-full"}`}>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white">
                      <Link href={`/blog/${post.slug}`} className="hover:text-purple-400 transition">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      <div className="flex items-center gap-2 mt-1">
                        <span>By {post.author}</span>
                        <span>•</span>
                        <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleDateString()}</time>
                        {post.categories && post.categories.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="flex gap-2">
                              {post.categories.map((category, index) => (
                                <span key={index} className="text-purple-400">
                                  {category}
                                  {index < post.categories.length - 1 && ", "}
                                </span>
                              ))}
                            </span>
                          </>
                        )}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-purple-400 hover:text-purple-300 transition flex items-center"
                    >
                      Read more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                    {post.tags && post.tags.length > 0 && (
                      <div className="ml-auto flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}

          {publishedPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-white">No posts found</h3>
              <p className="text-gray-400">Check back later for new content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
