export function calculateReadingTime(content: string): number {
  // Average reading speed: 200-250 words per minute
  // We'll use 225 words per minute as the average
  const wordsPerMinute = 225

  // Remove HTML tags and count words
  const text = content.replace(/<[^>]*>/g, "")
  const wordCount = text.trim().split(/\s+/).length

  // Calculate reading time in minutes, round up
  const readingTime = Math.ceil(wordCount / wordsPerMinute)

  return readingTime
}

export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return "1 min read"
  }
  return `${minutes} min read`
}
