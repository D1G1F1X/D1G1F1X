import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { posts } from "@/lib/blog"
import BlogCard from "@/components/blog-card"
import Breadcrumbs from "@/components/breadcrumbs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function BlogPage() {
  // Get unique categories
  const categories = Array.from(new Set(posts.map((post) => post.category)))

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

        <div className="container px-4 mx-auto relative z-10">
          <Breadcrumbs />
        </div>

        <div className="container px-4 mx-auto py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Text Content */}
            <div className="max-w-2xl">
              <Badge className="mb-4 px-4 py-1 text-sm bg-primary-500/20 text-primary-300 border border-primary-500/30">
                Knowledge Hub
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-balance">
                Our Blog
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl">
                Expert insights and thought leadership from our team of specialists
              </p>
            </div>

            {/* Right: Hero Illustration */}
            <div className="hidden lg:block relative h-96">
              <Image
                src="/images/blog/blog-hero-illustration.jpg"
                alt="Blog Knowledge and Insights"
                fill
                className="object-cover rounded-lg shadow-2xl border border-gray-700/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content Section */}
      <div className="container px-4 mx-auto py-12 relative z-10">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8 overflow-x-auto pb-2">
            <TabsList className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary-500/20 data-[state=active]:text-primary-400"
              >
                All Posts
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-primary-500/20 data-[state=active]:text-primary-400"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts
                  .filter((post) => post.category === category)
                  .map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
