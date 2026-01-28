import { posts } from "@/lib/blog"
import { Calendar, User, Tag, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { notFound } from "next/navigation"
import ImageWithFallback from "@/components/image-with-fallback"
import Breadcrumb from "@/components/breadcrumb"
import ReadingTime from "@/components/reading-time"
import BlogPostContent from "@/components/blog-post-content"

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = posts.find((p) => p.id === params.id)

  if (!post) {
    notFound()
  }

  const placeholderImage = `/placeholder.svg?height=400&width=800&text=${encodeURIComponent(post.title)}`

  const articleContent = `${post.excerpt} The Evolution of AI in Business Artificial Intelligence has transformed...` // In production, this would be the actual article content

  return (
    <div className="min-h-screen bg-gray-900 pt-24 relative overflow-hidden">
      {/* Futuristic digital pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="binaryGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <pattern id="binary4" width="100" height="100" patternUnits="userSpaceOnUse">
            <text x="0" y="10" className="text-xs" fill="url(#binaryGradient4)">
              10110101
            </text>
            <text x="0" y="20" className="text-xs" fill="url(#binaryGradient4)">
              01101001
            </text>
            <text x="0" y="30" className="text-xs" fill="url(#binaryGradient4)">
              11010110
            </text>
            <text x="0" y="40" className="text-xs" fill="url(#binaryGradient4)">
              00101101
            </text>
            <text x="0" y="50" className="text-xs" fill="url(#binaryGradient4)">
              10110010
            </text>
            <text x="0" y="60" className="text-xs" fill="url(#binaryGradient4)">
              01011010
            </text>
            <text x="0" y="70" className="text-xs" fill="url(#binaryGradient4)">
              11001010
            </text>
            <text x="0" y="80" className="text-xs" fill="url(#binaryGradient4)">
              01101001
            </text>
            <text x="0" y="90" className="text-xs" fill="url(#binaryGradient4)">
              10101100
            </text>
            <text x="0" y="100" className="text-xs" fill="url(#binaryGradient4)">
              01010011
            </text>
          </pattern>
          <rect width="100%" height="100%" fill="url(#binary4)" />
        </svg>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-primary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-secondary-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow"></div>

      <div className="container px-4 mx-auto py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

          <Link
            href="/blog"
            className="inline-flex items-center text-primary-400 font-medium mb-8 hover:text-primary-300 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all articles
          </Link>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-gray-700/50 hover:border-primary-500/20 transition-all duration-500">
            <div className="h-80 bg-gray-900/80 relative overflow-hidden">
              <div className="w-full h-full relative">
                <ImageWithFallback
                  src={post.image || placeholderImage}
                  alt={post.title}
                  fallbackSrc={placeholderImage}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary-500 text-white">{post.category}</Badge>
              </div>
            </div>
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>

              <div className="flex items-center text-gray-400 mb-8 flex-wrap gap-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary-400" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary-400" />
                  <span>{post.author}</span>
                </div>
                <ReadingTime content={articleContent} />
              </div>

              <BlogPostContent>
                <p>{post.excerpt}</p>

                <h2>The Evolution of AI in Business</h2>
                <p>
                  Artificial Intelligence has transformed from a futuristic concept to an essential business tool.
                  Organizations across industries are leveraging AI to automate processes, gain insights from data, and
                  create personalized customer experiences.
                </p>

                <p>
                  At Lumen Helix Solutions, we've observed that businesses that embrace AI strategically gain
                  significant competitive advantages. However, implementation requires careful planning and expertise.
                </p>

                <h2>Key Considerations for Implementation</h2>
                <p>When implementing AI solutions, businesses should consider:</p>

                <ul>
                  <li>Clear definition of business objectives and success metrics</li>
                  <li>Quality and accessibility of data</li>
                  <li>Integration with existing systems and workflows</li>
                  <li>Ethical implications and governance</li>
                  <li>Staff training and change management</li>
                </ul>

                <h2>The Future Landscape</h2>
                <p>
                  As AI technologies continue to evolve, we anticipate even greater integration into core business
                  functions. Organizations that establish strong AI foundations now will be better positioned to
                  leverage future advancements.
                </p>

                <p>
                  The key to success lies in viewing AI not as a standalone technology but as part of a holistic digital
                  transformation strategy that encompasses people, processes, and technology.
                </p>

                <h2>Conclusion</h2>
                <p>
                  AI adoption is no longer optional for businesses seeking to remain competitive. By taking a strategic
                  approach to implementation and partnering with experienced specialists, organizations can navigate the
                  complexities of AI integration and realize significant business value.
                </p>
              </BlogPostContent>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="flex items-center">
                  <Tag className="h-5 w-5 text-primary-400 mr-3" />
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-gray-300 border-gray-700 bg-gray-900/50 hover:border-primary-500/30 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts
                .filter((p) => p.id !== post.id && p.category === post.category)
                .slice(0, 3)
                .map((relatedPost) => (
                  <div
                    key={relatedPost.id}
                    className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300 group"
                  >
                    <div className="h-40 bg-gray-900/80 relative overflow-hidden">
                      <div className="w-full h-full relative">
                        <ImageWithFallback
                          src={
                            relatedPost.image ||
                            `/placeholder.svg?height=160&width=240&text=${encodeURIComponent(relatedPost.category) || "/placeholder.svg"}`
                          }
                          alt={relatedPost.title}
                          fallbackSrc={`/placeholder.svg?height=160&width=240&text=${encodeURIComponent(relatedPost.category)}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                        {relatedPost.title}
                      </h4>
                      <Link
                        href={`/blog/${relatedPost.id}`}
                        className="inline-flex items-center text-primary-400 font-medium group-hover:text-primary-300 transition-colors"
                      >
                        Read article
                        <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
