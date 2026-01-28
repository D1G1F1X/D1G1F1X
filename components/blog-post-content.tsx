import React, { ReactNode } from "react"

interface BlogPostContentProps {
  children: ReactNode
}

/**
 * BlogPostContent Component
 * 
 * Standardized wrapper for blog post content that ensures:
 * - Consistent typography (font sizes, line heights, spacing)
 * - Proper contrast ratios for accessibility (WCAG AA/AAA compliance)
 * - Responsive design for all screen sizes
 * - Unified styling across all blog posts
 * 
 * Usage:
 * <BlogPostContent>
 *   <p>Your content here</p>
 *   <h2>Section heading</h2>
 * </BlogPostContent>
 */
export default function BlogPostContent({ children }: BlogPostContentProps) {
  return <div className="blog-content">{children}</div>
}
