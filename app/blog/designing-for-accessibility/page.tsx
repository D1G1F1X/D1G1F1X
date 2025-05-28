import Link from "next/link"
import { Calendar, User, Tag, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ImageWithFallback from "@/components/image-with-fallback"

export default function AccessibilityBlogPost() {
  const post = {
    id: "designing-for-accessibility",
    title: "Designing for Accessibility: Best Practices for Inclusive Web Experiences",
    excerpt:
      "Learn how to create web experiences that are accessible to all users, including those with disabilities, and why it matters for your business.",
    date: "April 5, 2025",
    author: "Chris Phillips",
    image: "/images/blog/accessibility-design.png",
    category: "Design",
    tags: ["Accessibility", "UX Design", "Inclusive Design"],
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
                <Badge className="bg-purple-600 text-white">{post.category}</Badge>
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

                <h2>Why Accessibility Matters</h2>
                <p>
                  Web accessibility is no longer optional—it's essential. At Lumen Helix Solutions, we believe that
                  digital experiences should be accessible to everyone, regardless of their abilities or disabilities.
                  Beyond being the right thing to do, designing for accessibility offers significant business benefits:
                </p>

                <ul>
                  <li>
                    <strong>Expanded audience reach:</strong> Approximately 15% of the global population lives with some
                    form of disability. Accessible websites ensure you're not excluding potential customers.
                  </li>
                  <li>
                    <strong>Legal compliance:</strong> Many jurisdictions now require digital accessibility compliance,
                    with an increasing number of lawsuits targeting non-compliant websites.
                  </li>
                  <li>
                    <strong>Improved user experience for everyone:</strong> Accessibility improvements often enhance
                    usability for all users, not just those with disabilities.
                  </li>
                  <li>
                    <strong>SEO benefits:</strong> Many accessibility best practices align with search engine
                    optimization techniques, improving your site's visibility.
                  </li>
                </ul>

                <p>
                  Our approach to accessibility is holistic, considering the diverse needs of users with visual,
                  auditory, motor, and cognitive disabilities. Let's explore the key principles and practical techniques
                  for creating truly inclusive web experiences.
                </p>

                <h2>Understanding the WCAG Guidelines</h2>
                <p>
                  The Web Content Accessibility Guidelines (WCAG) provide the foundation for digital accessibility
                  standards worldwide. Currently at version 2.1, with 2.2 recently released, these guidelines are
                  organized around four key principles:
                </p>

                <h3>1. Perceivable</h3>
                <p>
                  Information and user interface components must be presentable to users in ways they can perceive. This
                  means providing alternatives for non-text content and creating content that can be presented in
                  different ways without losing meaning.
                </p>

                <h3>2. Operable</h3>
                <p>
                  User interface components and navigation must be operable. This includes making all functionality
                  available from a keyboard and giving users enough time to read and use content.
                </p>

                <h3>3. Understandable</h3>
                <p>
                  Information and the operation of the user interface must be understandable. This means making text
                  readable and predictable, and helping users avoid and correct mistakes.
                </p>

                <h3>4. Robust</h3>
                <p>
                  Content must be robust enough to be interpreted reliably by a wide variety of user agents, including
                  assistive technologies. This requires compatibility with current and future tools.
                </p>

                <p>
                  WCAG defines three levels of conformance: A (minimum), AA (standard), and AAA (enhanced). Most
                  organizations aim for AA compliance, which balances comprehensive accessibility with practical
                  implementation.
                </p>

                <h2>Practical Implementation Strategies</h2>

                <h3>Semantic HTML: The Foundation of Accessibility</h3>
                <p>
                  Using proper HTML elements for their intended purpose provides a strong foundation for accessibility:
                </p>

                <ul>
                  <li>
                    Use heading elements (<code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>) to create a logical
                    document structure
                  </li>
                  <li>
                    Implement <code>&lt;button&gt;</code> for interactive controls and <code>&lt;a&gt;</code> for
                    navigation
                  </li>
                  <li>
                    Utilize <code>&lt;table&gt;</code> for tabular data with appropriate headers
                  </li>
                  <li>
                    Apply <code>&lt;form&gt;</code>, <code>&lt;label&gt;</code>, and <code>&lt;fieldset&gt;</code>{" "}
                    elements for form controls
                  </li>
                  <li>
                    Employ ARIA landmarks (<code>role="navigation"</code>, <code>role="main"</code>, etc.) to define
                    page regions
                  </li>
                </ul>

                <div className="bg-gray-900 p-4 rounded-md mb-4">
                  <p className="text-red-400 font-mono">// Poor accessibility</p>
                  <p className="text-red-400 font-mono">
                    &lt;div class="button" onclick="submitForm()"&gt;Submit&lt;/div&gt;
                  </p>
                  <p className="text-green-400 font-mono mt-2">// Better accessibility</p>
                  <p className="text-green-400 font-mono">&lt;button type="submit"&gt;Submit&lt;/button&gt;</p>
                </div>

                <h3>Color and Contrast</h3>
                <p>Color choices significantly impact accessibility for users with visual impairments:</p>

                <ul>
                  <li>Maintain a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text (WCAG AA)</li>
                  <li>Never rely on color alone to convey information—always include additional indicators</li>
                  <li>
                    Consider color blindness when designing interfaces (approximately 8% of men have some form of color
                    vision deficiency)
                  </li>
                  <li>Test designs with tools like the WebAIM Contrast Checker or Stark plugin</li>
                </ul>

                <h3>Keyboard Accessibility</h3>
                <p>Many users with motor disabilities rely on keyboard navigation rather than a mouse:</p>

                <ul>
                  <li>Ensure all interactive elements are keyboard accessible</li>
                  <li>Maintain a logical tab order that follows the visual flow of the page</li>
                  <li>
                    Provide visible focus indicators (never use <code>outline: none</code> without an alternative)
                  </li>
                  <li>Implement keyboard shortcuts for frequently used actions</li>
                  <li>Test your interface by navigating using only the keyboard</li>
                </ul>

                <h3>Images and Media</h3>
                <p>Visual and audio content requires alternatives for users who cannot see or hear:</p>

                <ul>
                  <li>Add descriptive alt text to all informative images</li>
                  <li>
                    Use empty alt attributes (<code>alt=""</code>) for decorative images
                  </li>
                  <li>Provide captions and transcripts for video content</li>
                  <li>Include audio descriptions for videos when visual information is essential</li>
                  <li>Ensure media players have accessible controls</li>
                </ul>

                <div className="bg-gray-900 p-4 rounded-md mb-4">
                  <p className="text-red-400 font-mono">// Poor alt text</p>
                  <p className="text-red-400 font-mono">&lt;img src="chart.png" alt="chart"&gt;</p>
                  <p className="text-green-400 font-mono mt-2">// Better alt text</p>
                  <p className="text-green-400 font-mono">
                    &lt;img src="chart.png" alt="Bar chart showing revenue growth of 15% year-over-year from 2023 to
                    2025"&gt;
                  </p>
                </div>

                <h3>Forms and Input</h3>
                <p>Forms are often challenging for users with disabilities but can be made accessible:</p>

                <ul>
                  <li>
                    Associate labels with form controls using the <code>for</code> attribute
                  </li>
                  <li>
                    Group related form elements with <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code>
                  </li>
                  <li>Provide clear error messages and validation feedback</li>
                  <li>
                    Use appropriate input types (<code>type="email"</code>, <code>type="tel"</code>, etc.)
                  </li>
                  <li>Implement autocomplete attributes for common fields</li>
                </ul>

                <h3>Dynamic Content and ARIA</h3>
                <p>
                  Modern web applications often use JavaScript to update content dynamically, which can create
                  accessibility challenges:
                </p>

                <ul>
                  <li>Use ARIA live regions to announce dynamic content changes</li>
                  <li>Implement proper focus management when content changes</li>
                  <li>Ensure custom components follow the WAI-ARIA Authoring Practices</li>
                  <li>Test with screen readers to verify that updates are properly announced</li>
                </ul>

                <div className="bg-gray-900 p-4 rounded-md mb-4">
                  <p className="text-green-400 font-mono">// Announcing dynamic content</p>
                  <p className="text-green-400 font-mono">&lt;div aria-live="polite" aria-atomic="true"&gt;</p>
                  <p className="text-green-400 font-mono"> &lt;!-- Content that will update --&gt;</p>
                  <p className="text-green-400 font-mono">&lt;/div&gt;</p>
                </div>

                <h2>Testing and Validation</h2>
                <p>Comprehensive accessibility testing involves both automated and manual approaches:</p>

                <h3>Automated Testing</h3>
                <ul>
                  <li>Use tools like Axe, WAVE, or Lighthouse for initial scanning</li>
                  <li>Integrate accessibility linting into your development workflow</li>
                  <li>Implement automated tests for common accessibility issues</li>
                </ul>

                <h3>Manual Testing</h3>
                <ul>
                  <li>Test with keyboard navigation to ensure all functionality is accessible</li>
                  <li>Use screen readers (NVDA, JAWS, VoiceOver) to evaluate the experience</li>
                  <li>Test with display zoomed to 200% to verify responsive behavior</li>
                  <li>Disable CSS to check the logical structure of content</li>
                </ul>

                <h3>User Testing</h3>
                <ul>
                  <li>Conduct usability testing with people who have disabilities</li>
                  <li>Gather feedback from users of assistive technologies</li>
                  <li>Implement improvements based on real-world usage patterns</li>
                </ul>

                <h2>Case Study: Accessibility Transformation</h2>
                <p>
                  One of our clients, a financial services provider, recently underwent an accessibility transformation
                  that illustrates the impact of these practices. Their legacy web application had numerous
                  accessibility barriers, including:
                </p>

                <ul>
                  <li>Poor color contrast throughout the interface</li>
                  <li>Form fields without proper labels</li>
                  <li>Custom JavaScript controls that weren't keyboard accessible</li>
                  <li>Dynamic content updates that weren't announced to screen reader users</li>
                </ul>

                <p>
                  Our team implemented a comprehensive accessibility remediation plan, addressing both technical issues
                  and organizational processes. The results were significant:
                </p>

                <ul>
                  <li>WCAG 2.1 AA compliance achieved across all core user journeys</li>
                  <li>25% increase in account signups from users with declared disabilities</li>
                  <li>Reduced customer support calls related to usability issues</li>
                  <li>Improved overall user satisfaction scores</li>
                  <li>Mitigation of legal risk associated with accessibility complaints</li>
                </ul>

                <p>
                  Perhaps most importantly, the organization developed a sustainable approach to accessibility,
                  integrating it into their design system, development processes, and quality assurance workflows.
                </p>

                <h2>Building an Accessibility-First Culture</h2>
                <p>
                  Creating truly accessible web experiences requires more than technical implementation—it demands an
                  organizational commitment to inclusive design:
                </p>

                <ol>
                  <li>
                    <strong>Start with awareness:</strong> Educate all team members about accessibility principles and
                    their importance
                  </li>
                  <li>
                    <strong>Integrate into processes:</strong> Include accessibility requirements in design reviews,
                    development standards, and QA testing
                  </li>
                  <li>
                    <strong>Assign responsibility:</strong> Designate accessibility champions within each functional
                    team
                  </li>
                  <li>
                    <strong>Measure and report:</strong> Track accessibility metrics alongside other performance
                    indicators
                  </li>
                  <li>
                    <strong>Continuous improvement:</strong> Regularly audit and update existing content and
                    applications
                  </li>
                </ol>

                <h2>Conclusion: Accessibility as Innovation</h2>
                <p>
                  At Lumen Helix Solutions, we view accessibility not as a compliance checkbox but as an opportunity for
                  innovation. Many of today's most beloved features—from voice interfaces to responsive design—have
                  roots in accessibility solutions. By designing for the full spectrum of human abilities, we create
                  digital experiences that are more flexible, intuitive, and user-friendly for everyone.
                </p>

                <p>
                  As we continue to push the boundaries of digital experiences with emerging technologies like AR/VR,
                  voice interfaces, and AI-driven interactions, maintaining a commitment to accessibility will ensure
                  that these innovations benefit all users, regardless of their abilities.
                </p>

                <p>
                  Remember: accessibility is a journey, not a destination. Start where you are, make continuous
                  improvements, and prioritize the changes that will have the greatest impact on your users. The result
                  will be a more inclusive, usable, and successful digital presence.
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
                title="Web Development Trends to Watch"
                href="/blog/web-development-trends-2025"
                imageSrc="/images/blog/web-dev-trends.png"
              />
              <RelatedArticleCard
                title="Data-Driven Marketing Strategies"
                href="/blog/data-driven-marketing-strategies"
                imageSrc="/images/blog/data-marketing.png"
              />
              <RelatedArticleCard
                title="Effective Project Management Methodologies"
                href="/blog/effective-project-management-methodologies"
                imageSrc="/images/blog/project-management-methodologies.png"
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
