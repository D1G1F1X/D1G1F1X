import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SimpleReadingDisplayProps {
  reading: string
  className?: string
}

export function SimpleReadingDisplay({ reading, className }: SimpleReadingDisplayProps) {
  // Parse the markdown-like format into sections
  const sections = reading.split(/^## /gm).filter(Boolean)

  // Format the introduction (first section)
  const introduction = sections[0]

  // Format the remaining sections
  const formattedSections = sections.slice(1).map((section) => {
    const [title, ...content] = section.split("\n")
    return {
      title: title.trim(),
      content: content.join("\n").trim(),
    }
  })

  return (
    <Card className={cn("w-full max-w-3xl mx-auto", className)}>
      <CardContent className="p-6 space-y-6">
        <div className="prose dark:prose-invert max-w-none">
          {/* Introduction */}
          <div className="mb-6">
            {introduction.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-4 text-muted-foreground">
                {paragraph.replace(/^# .*\n\n/, "")}
              </p>
            ))}
          </div>

          {/* Sections */}
          {formattedSections.map((section, i) => (
            <div key={i} className="mb-6">
              <h2 className="text-xl font-bold mb-3 text-primary">{section.title}</h2>
              {section.content.split("\n\n").map((paragraph, j) => {
                // Check if this is a card heading (starts with ###)
                if (paragraph.startsWith("### ")) {
                  const [cardTitle, ...cardContent] = paragraph.split("\n")
                  return (
                    <div key={`${i}-${j}`} className="mb-4">
                      <h3 className="text-lg font-semibold mb-2 text-secondary">{cardTitle.replace("### ", "")}</h3>
                      <p className="text-muted-foreground">{cardContent.join("\n")}</p>
                    </div>
                  )
                }
                return (
                  <p key={`${i}-${j}`} className="mb-4 text-muted-foreground">
                    {paragraph}
                  </p>
                )
              })}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
