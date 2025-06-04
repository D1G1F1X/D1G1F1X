"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getSiteSettings, updateSiteSettings } from "@/lib/settings"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    siteTitle: "",
    siteDescription: "",
    logoUrl: "",
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    contactEmail: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
    footerText: "",
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSiteSettings()
        setSettings(data)
      } catch (error) {
        console.error("Error fetching settings:", error)
      }
    }

    fetchSettings()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setSettings((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setSettings((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleColorChange = (color: string, name: string) => {
    setSettings((prev) => ({ ...prev, [name]: color }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateSiteSettings(settings)
      toast({
        title: "Settings updated",
        description: "Your site settings have been updated successfully.",
      })
      router.refresh()
    } catch (error) {
      console.error("Error updating settings:", error)
      toast({
        title: "Error",
        description: "There was an error updating your settings.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Site Settings</h1>
        </div>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="contact">Contact & Social</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteTitle">Site Title</Label>
                    <Input id="siteTitle" name="siteTitle" value={settings.siteTitle} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      name="siteDescription"
                      value={settings.siteDescription}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="footerText">Footer Text</Label>
                    <Input id="footerText" name="footerText" value={settings.footerText} onChange={handleChange} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <Input id="logoUrl" name="logoUrl" value={settings.logoUrl} onChange={handleChange} />
                    {settings.logoUrl && (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground mb-1">Preview:</p>
                        <div className="h-16 w-16 relative">
                          <img
                            src={settings.logoUrl || "/placeholder.svg"}
                            alt="Logo preview"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-md border" style={{ backgroundColor: settings.primaryColor }} />
                        <Input
                          value={settings.primaryColor}
                          onChange={(e) => handleColorChange(e.target.value, "primaryColor")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Secondary Color</Label>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-8 w-8 rounded-md border"
                          style={{ backgroundColor: settings.secondaryColor }}
                        />
                        <Input
                          value={settings.secondaryColor}
                          onChange={(e) => handleColorChange(e.target.value, "secondaryColor")}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact & Social Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="socialLinks.facebook">Facebook URL</Label>
                    <Input
                      id="socialLinks.facebook"
                      name="socialLinks.facebook"
                      value={settings.socialLinks.facebook}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="socialLinks.twitter">Twitter URL</Label>
                    <Input
                      id="socialLinks.twitter"
                      name="socialLinks.twitter"
                      value={settings.socialLinks.twitter}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="socialLinks.instagram">Instagram URL</Label>
                    <Input
                      id="socialLinks.instagram"
                      name="socialLinks.instagram"
                      value={settings.socialLinks.instagram}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <div className="mt-6">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </form>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
