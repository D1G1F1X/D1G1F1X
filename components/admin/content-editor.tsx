"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, ImageIcon, LinkIcon } from "lucide-react"

interface ContentEditorProps {
  initialValue?: string
  onChange?: (value: string) => void
}

export function ContentEditor({ initialValue = "", onChange }: ContentEditorProps) {
  const [content, setContent] = useState(initialValue)
  const [activeTab, setActiveTab] = useState("edit")

  const handleChange = (value: string) => {
    setContent(value)
    if (onChange) {
      onChange(value)
    }
  }

  const insertMarkdown = (markdownSyntax: string, placeholder = "") => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    const replacement = selectedText || placeholder

    let newText
    if (markdownSyntax === "**") {
      newText = `${textarea.value.substring(0, start)}**${replacement}**${textarea.value.substring(end)}`
    } else if (markdownSyntax === "*") {
      newText = `${textarea.value.substring(0, start)}*${replacement}*${textarea.value.substring(end)}`
    } else if (markdownSyntax === "- ") {
      newText = `${textarea.value.substring(0, start)}- ${replacement}${textarea.value.substring(end)}`
    } else if (markdownSyntax === "1. ") {
      newText = `${textarea.value.substring(0, start)}1. ${replacement}${textarea.value.substring(end)}`
    } else if (markdownSyntax === "## ") {
      newText = `${textarea.value.substring(0, start)}## ${replacement}${textarea.value.substring(end)}`
    } else if (markdownSyntax === "### ") {
      newText = `${textarea.value.substring(0, start)}### ${replacement}${textarea.value.substring(end)}`
    } else if (markdownSyntax === "![](") {
      newText = `${textarea.value.substring(0, start)}![${replacement}](image-url)${textarea.value.substring(end)}`
    } else if (markdownSyntax === "[](") {
      newText = `${textarea.value.substring(0, start)}[${replacement}](url)${textarea.value.substring(end)}`
    }

    handleChange(newText || "")

    // Set focus back to textarea and update cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + markdownSyntax.length + replacement.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  // Simple markdown to HTML converter for preview
  const markdownToHtml = (markdown: string) => {
    const html = markdown
      // Convert headers
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-4">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-5 mb-3">$1</h3>')
      // Convert bold and italic
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Convert lists
      .replace(/^- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-6 list-decimal">$2</li>')
      // Convert links and images
      .replace(/!\[(.*?)\]$$(.*?)$$/g, '<img src="$2" alt="$1" class="my-4 rounded-md">')
      .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" class="text-primary underline">$1</a>')
      // Convert paragraphs
      .replace(/^(?!<[hl]|<li|<img|<a)(.+)$/gm, '<p class="my-3">$1</p>')
      // Fix lists
      .replace(/<\/li>\n<li/g, "</li><li")
      .replace(/<li class="ml-6 list-disc">/g, '<ul class="my-4"><li class="ml-6 list-disc">')
      .replace(/<li class="ml-6 list-decimal">/g, '<ol class="my-4"><li class="ml-6 list-decimal">')
      .replace(/<\/li>\n(?!<li)/g, "</li></ul>\n")
      .replace(/<\/li>\n(?!<li)/g, "</li></ol>\n")

    return html
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          {activeTab === "edit" && (
            <div className="flex items-center space-x-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => insertMarkdown("**", "bold text")}
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => insertMarkdown("*", "italic text")}
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => insertMarkdown("## ", "Heading")}
                title="Heading 2"
              >
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => insertMarkdown("### ", "Subheading")}
                title="Heading 3"
              >
                <Heading3 className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => insertMarkdown("- ", "List item")}
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => insertMarkdown("1. ", "List item")}
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => insertMarkdown("![](", "Image description")}
                title="Image"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => insertMarkdown("[](", "Link text")}
                title="Link"
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <TabsContent value="edit" className="mt-0">
          <Textarea
            id="content-editor"
            value={content}
            onChange={(e) => handleChange(e.target.value)}
            className="min-h-[400px] font-mono text-sm"
            placeholder="Write your content here using Markdown..."
          />
          <p className="text-xs text-muted-foreground mt-2">
            Use Markdown for formatting. You can use **bold**, *italic*, ## headings, - lists, and more.
          </p>
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <div className="border rounded-md p-4 min-h-[400px] prose dark:prose-invert max-w-none">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
            ) : (
              <p className="text-muted-foreground">Preview will appear here...</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
