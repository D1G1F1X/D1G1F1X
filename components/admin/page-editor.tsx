"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentEditor } from "@/components/admin/content-editor"
import { toast } from "@/components/ui/use-toast"
import { updatePage } from "@/lib/content"

interface PageEditorProps {
  page: any
  onSave?: (page: any) => void
}

export function PageEditor({ page, onSave }: PageEditorProps) {
  const [pageData, setPageData] = useState(page)
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (field: string, value: any) => {
    setPageData({
      ...pageData,
      [field]: value,
    })
  }

  const handleSectionChange = (sectionId: string, field: string, value: any) => {
    const updatedSections = pageData.sections?.map((section: any) => {
      if (section.id === sectionId) {
        return {
          ...section,
          [field]: value,
        }
      }
      return section
    })

    setPageData({
      ...pageData,
      sections: updatedSections,
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const updatedPage = await updatePage(pageData)

      if (updatedPage) {
        toast({
          title: "Page saved",
          description: "Your changes have been saved successfully.",
        })

        if (onSave) {
          onSave(updatedPage)
        }
      } else {
        throw new Error("Failed to save page")
      }
    } catch (error) {
      console.error("Error saving page:", error)
      toast({
        title: "Error",
        description: "There was an error saving your changes.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Page: {pageData.title || "New Page"}</h1>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          {pageData.slug === "landing" && <TabsTrigger value="sections">Sections</TabsTrigger>}
        </TabsList>

        <TabsContent value="general" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={pageData.title || ""} onChange={(e) => handleChange("title", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={pageData.slug || ""}
                onChange={(e) => handleChange("slug", e.target.value)}
                disabled={pageData.slug === "landing"}
              />
            </div>
          </div>

          {pageData.slug === "landing" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={pageData.subtitle || ""}
                  onChange={(e) => handleChange("subtitle", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={pageData.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="content" className="pt-4">
          <ContentEditor initialValue={pageData.content || ""} onChange={(value) => handleChange("content", value)} />
        </TabsContent>

        {pageData.slug === "landing" && (
          <TabsContent value="sections" className="space-y-6 pt-4">
            {pageData.sections?.map((section: any) => (
              <div key={section.id} className="border p-4 rounded-md space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    {section.id.charAt(0).toUpperCase() + section.id.slice(1)} Section
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`active-${section.id}`}
                      checked={section.isActive}
                      onCheckedChange={(checked) => handleSectionChange(section.id, "isActive", checked)}
                    />
                    <Label htmlFor={`active-${section.id}`}>Active</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`title-${section.id}`}>Title</Label>
                  <Input
                    id={`title-${section.id}`}
                    value={section.title || ""}
                    onChange={(e) => handleSectionChange(section.id, "title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`content-${section.id}`}>Content</Label>
                  <Textarea
                    id={`content-${section.id}`}
                    value={section.content || ""}
                    onChange={(e) => handleSectionChange(section.id, "content", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
