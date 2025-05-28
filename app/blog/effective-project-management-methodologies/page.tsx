import Link from "next/link"
import { Calendar, User, Tag, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ImageWithFallback from "@/components/image-with-fallback"

export default function ProjectManagementBlogPost() {
  const post = {
    id: "effective-project-management-methodologies",
    title: "Effective Project Management Methodologies for Digital Transformation",
    excerpt:
      "Explore how modern project management approaches can accelerate digital transformation initiatives while minimizing risk and maximizing ROI.",
    date: "May 20, 2025",
    author: "Chris Phillips",
    image: "/placeholder.svg?height=500&width=1000&text=Project%20Management%20Methodologies",
    category: "Project Management",
    tags: ["Project Management", "Digital Transformation", "Agile", "Waterfall"],
  }

  const placeholderImage = `/placeholder.svg?height=400&width=800&text=${encodeURIComponent(post.title)}`

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
                <Badge className="bg-secondary-500 text-white">{post.category}</Badge>
              </div>
            </div>
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>

              <div className="flex items-center text-gray-400 mb-8">
                <div className="flex items-center mr-6">
                  <Calendar className="h-5 w-5 mr-2 text-primary-400" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary-400" />
                  <span>{post.author}</span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none prose-invert">
                <p className="text-gray-300 mb-6 text-lg">{post.excerpt}</p>

                <h2>The Evolution of Project Management in Digital Transformation</h2>
                <p>
                  Digital transformation initiatives are inherently complex, involving multiple stakeholders,
                  technologies, and business processes. Traditional project management approaches often struggle to
                  accommodate the rapid pace of change and uncertainty that characterizes these initiatives.
                </p>

                <p>
                  At Lumen Helix Solutions, we've developed a hybrid approach that combines the structure and
                  predictability of traditional methodologies with the flexibility and adaptability of modern
                  frameworks. This approach enables us to deliver digital transformation projects that meet both
                  immediate business needs and long-term strategic objectives.
                </p>

                <h2>Key Methodologies for Digital Transformation</h2>

                <h3>Agile Project Management</h3>
                <p>
                  Agile methodologies have become the cornerstone of successful digital transformation initiatives. By
                  breaking projects into small, manageable increments, Agile enables:
                </p>

                <ul>
                  <li>Rapid delivery of business value through iterative development</li>
                  <li>Continuous stakeholder feedback and adaptation</li>
                  <li>Reduced risk through early identification of issues</li>
                  <li>Increased transparency and collaboration</li>
                </ul>

                <p>
                  Our Agile implementation incorporates elements of Scrum, Kanban, and Lean principles, tailored to each
                  organization's specific needs and culture.
                </p>

                <h3>Scaled Agile Framework (SAFe)</h3>
                <p>
                  For enterprise-level digital transformation, we employ the Scaled Agile Framework to coordinate
                  multiple teams working on related initiatives. SAFe provides:
                </p>

                <ul>
                  <li>Alignment between business strategy and execution</li>
                  <li>Coordination across teams and departments</li>
                  <li>Standardized processes and metrics</li>
                  <li>Enterprise-wide visibility and governance</li>
                </ul>

                <h3>Hybrid Approaches</h3>
                <p>
                  Many organizations benefit from a hybrid approach that combines elements of Agile with traditional
                  Waterfall methodologies. This approach is particularly effective for:
                </p>

                <ul>
                  <li>Projects with regulatory or compliance requirements</li>
                  <li>Initiatives involving legacy systems integration</li>
                  <li>Cross-functional projects spanning multiple departments</li>
                </ul>

                <h2>Technology-Enabled Project Management</h2>
                <p>
                  Modern project management relies heavily on technology to enhance collaboration, visibility, and
                  efficiency. Our approach leverages:
                </p>

                <ul>
                  <li>Integrated project management platforms for planning, tracking, and reporting</li>
                  <li>Collaboration tools for real-time communication and document sharing</li>
                  <li>Automation for routine tasks and status updates</li>
                  <li>Data analytics for performance monitoring and predictive insights</li>
                </ul>

                <h2>Measuring Success: Beyond the Iron Triangle</h2>
                <p>
                  Traditional project management focuses on the "iron triangle" of scope, time, and cost. While these
                  remain important, digital transformation projects require additional success metrics:
                </p>

                <ul>
                  <li>Business value delivered</li>
                  <li>User adoption and satisfaction</li>
                  <li>Technical quality and sustainability</li>
                  <li>Organizational capability development</li>
                  <li>Innovation and competitive advantage</li>
                </ul>

                <h2>Case Study: Financial Services Digital Transformation</h2>
                <p>
                  A leading financial services provider engaged Lumen Helix to manage their customer experience
                  transformation initiative. Using our hybrid project management approach, we:
                </p>

                <ul>
                  <li>Delivered a new digital banking platform in 9 months instead of the projected 18 months</li>
                  <li>Achieved 40% improvement in operational efficiency</li>
                  <li>Increased customer satisfaction scores by 35%</li>
                  <li>Reduced time-to-market for new features by 60%</li>
                </ul>

                <p>
                  This success was achieved through a combination of Agile delivery practices, strategic stakeholder
                  management, and integrated technology solutions.
                </p>

                <h2>Conclusion</h2>
                <p>
                  Effective project management is the cornerstone of successful digital transformation. By adopting
                  modern methodologies, leveraging technology, and focusing on business value, organizations can
                  navigate the complexities of digital change while minimizing risk and maximizing return on investment.
                </p>

                <p>
                  At Lumen Helix Solutions, we continue to refine our project management approach based on industry best
                  practices and our own experience delivering complex digital initiatives. Our commitment to excellence
                  in project management ensures that our clients achieve their transformation objectives efficiently and
                  effectively.
                </p>
              </div>

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
              <RelatedArticleCard
                title="Leveraging AI for Business Growth"
                href="/blog/leveraging-ai-for-business-growth"
                imageSrc="/placeholder.svg?height=160&width=240&text=AI%20Business%20Growth"
              />

              <RelatedArticleCard
                title="Web Development Trends to Watch"
                href="/blog/web-development-trends-2025"
                imageSrc="/placeholder.svg?height=160&width=240&text=Web%20Development%20Trends"
              />

              <RelatedArticleCard
                title="Data-Driven Marketing Strategies"
                href="/blog/data-driven-marketing-strategies"
                imageSrc="/placeholder.svg?height=160&width=240&text=Data-Driven%20Marketing"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Create a client component for related articles
function RelatedArticleCard({
  title,
  href,
  imageSrc,
}: {
  title: string
  href: string
  imageSrc: string
}) {
  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300 group">
      <div className="h-40 bg-gray-900/80 relative">
        <ImageWithFallback
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fallbackSrc={`/placeholder.svg?height=160&width=240&text=${encodeURIComponent(title)}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
        <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{title}</h4>
        <Link
          href={href}
          className="inline-flex items-center text-primary-400 font-medium group-hover:text-primary-300 transition-colors"
        >
          Read article
          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
        </Link>
      </div>
    </div>
  )
}
