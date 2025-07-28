import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Terminal, Database, ImageIcon, FileText, Component, CheckCircle } from "lucide-react"
import { Cloud, Mail, CheckSquare } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function DebugPage() {
  const debugTools = [
    {
      title: "Card Data Editor",
      description: "Directly edit the JSON data for oracle cards.",
      href: "/admin/card-data-editor",
      icon: <Database className="h-6 w-6" />,
    },
    {
      title: "Card Data Validation",
      description: "Run checks to ensure the integrity of your card data.",
      href: "/admin/card-validation",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      title: "Image Diagnostics",
      description: "Analyze and troubleshoot card image loading issues.",
      href: "/admin/image-diagnostics",
      icon: <ImageIcon className="h-6 w-6" />,
    },
    {
      title: "Image Optimization",
      description: "Tools for optimizing and managing card image assets.",
      href: "/admin/image-optimization",
      icon: <ImageIcon className="h-6 w-6" />,
    },
    {
      title: "AI Testing",
      description: "Test responses from the integrated AI services.",
      href: "/admin/ai-testing",
      icon: <Terminal className="h-6 w-6" />,
    },
    {
      title: "Blob Manager",
      description: "Manage Vercel Blob storage directly.",
      href: "/admin/blob-manager",
      icon: <Cloud className="h-6 w-6" />,
    },
    {
      title: "Email Service Monitor",
      description: "Check the status and configuration of email sending services.",
      href: "/admin/email-service-monitor",
      icon: <Mail className="h-6 w-6" />,
    },
    {
      title: "Supabase Audit",
      description: "Audit Supabase integration and data synchronization.",
      href: "/admin/supabase-audit",
      icon: <Database className="h-6 w-6" />,
    },
    {
      title: "Test Card Images (Old)",
      description: "Legacy test page for card images.",
      href: "/admin/test-card-images",
      icon: <ImageIcon className="h-6 w-6" />,
    },
    {
      title: "Verify Card Images (Old)",
      description: "Legacy verification page for card images.",
      href: "/admin/verify-card-images",
      icon: <CheckSquare className="h-6 w-6" />,
    },
    {
      title: "Files Manager (Old)",
      description: "Legacy file management interface.",
      href: "/admin/files",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: "Card Directory Debug",
      description: "Debug issues specific to the card directory display.",
      href: "/admin/debug/card-directory",
      icon: <Component className="h-6 w-6" />,
    },
    {
      title: "Card Images Debug",
      description: "Deep dive into card image loading issues.",
      href: "/admin/debug/card-images",
      icon: <Component className="h-6 w-6" />,
    },
  ]

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Debug & Tools</h1>
          <p className="text-muted-foreground">Access various tools for debugging and development.</p>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {debugTools.map((tool) => (
          <Card key={tool.title} className="hover:shadow-lg transition-shadow duration-200">
            <Link href={tool.href} className="block p-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-0 pt-0">
                <CardTitle className="text-lg font-medium">{tool.title}</CardTitle>
                {tool.icon}
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <CardDescription>{tool.description}</CardDescription>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
