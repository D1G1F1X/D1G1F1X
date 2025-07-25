"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsClientPage() {
  // Placeholder for settings data. In a real app, you'd fetch this from a database or configuration file.
  const settings = {
    siteName: "Numoracle",
    defaultTheme: "dark",
    enableAnalytics: true,
    contactEmail: "support@numoracle.com",
    seoDescription: "Unlock your destiny with numerology and oracle readings.",
  }

  const handleSave = () => {
    console.log("Saving settings...")
    // Implement API call to save settings
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Site Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="site-name">Site Name</Label>
              <Input id="site-name" defaultValue={settings.siteName} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="default-theme">Default Theme</Label>
              <Select defaultValue={settings.defaultTheme}>
                <SelectTrigger id="default-theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enable-analytics" defaultChecked={settings.enableAnalytics} />
              <Label htmlFor="enable-analytics">Enable Analytics</Label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input id="contact-email" type="email" defaultValue={settings.contactEmail} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="seo-description">SEO Description</Label>
              <Textarea id="seo-description" defaultValue={settings.seoDescription} rows={3} />
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
