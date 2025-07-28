import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Save, Mail, Globe, Lock } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Site Settings</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure basic site information and features.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site-name">Site Name</Label>
              <Input id="site-name" defaultValue="NUMO Oracle" />
            </div>
            <div>
              <Label htmlFor="site-tagline">Site Tagline</Label>
              <Input id="site-tagline" defaultValue="Discover the wisdom of the NUMO Oracle cards" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-registration">Enable User Registration</Label>
              <Switch id="enable-registration" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-shop">Enable Shop</Label>
              <Switch id="enable-shop" defaultChecked />
            </div>
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save General Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Settings</CardTitle>
            <CardDescription>Configure email sending for notifications and marketing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="sender-email">Sender Email</Label>
              <Input id="sender-email" type="email" defaultValue="noreply@numoracle.com" />
            </div>
            <div>
              <Label htmlFor="sender-name">Sender Name</Label>
              <Input id="sender-name" defaultValue="NUMO Oracle" />
            </div>
            <div>
              <Label htmlFor="brevo-api-key">Brevo API Key</Label>
              <Input id="brevo-api-key" type="password" defaultValue="sk_************************" />
            </div>
            <Button>
              <Mail className="mr-2 h-4 w-4" /> Test Email Configuration
            </Button>
            <Button className="w-full">
              <Save className="mr-2 h-4 w-4" /> Save Email Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>Manage meta tags and search engine visibility.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="meta-description">Default Meta Description</Label>
              <Textarea
                id="meta-description"
                defaultValue="Explore numerology and oracle card readings for personal insight and guidance."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input id="keywords" defaultValue="numerology, oracle cards, spiritual guidance, divination" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="allow-indexing">Allow Search Engine Indexing</Label>
              <Switch id="allow-indexing" defaultChecked />
            </div>
            <Button>
              <Globe className="mr-2 h-4 w-4" /> Save SEO Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage authentication and access control.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="admin-username">Admin Username</Label>
              <Input id="admin-username" defaultValue="admin" />
            </div>
            <div>
              <Label htmlFor="admin-password">Admin Password</Label>
              <Input id="admin-password" type="password" placeholder="********" />
              <p className="mt-1 text-sm text-gray-400">Leave blank to keep current password.</p>
            </div>
            <Button>
              <Lock className="mr-2 h-4 w-4" /> Save Security Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
