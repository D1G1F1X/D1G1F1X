import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { posts } from "@/lib/blog"
import PageHero from "@/components/page-hero"
import BlogCard from "@/components/blog-card"
import Breadcrumbs from "@/components/breadcrumbs"

export default function BlogPage() {
  // Get unique categories
  const categories = Array.from(new Set(posts.map((post) => post.category)))

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <div className="container px-4 mx-auto py-8 relative z-10">
        <Breadcrumbs />
      </div>

      <PageHero
        badge="Knowledge Hub"
        badgeVariant="primary"
        title="Our Blog"
        subtitle="Expert insights and thought leadership from our team of specialists"
      />

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
