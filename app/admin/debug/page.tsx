import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Bug, ImageIcon, Database, Terminal, FlaskConical, CheckCircle, Cloud } from "lucide-react"

export const metadata = {
  title: "Admin Debug Tools",
  description: "Collection of debugging and testing tools for administrators.",
}

export default function AdminDebugPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Admin Debug Tools</h1>
      <p className="text-muted-foreground mb-8">
        Access various tools to diagnose and test different parts of the application.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" /> Image Diagnostics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Verify card image integrity, check blob storage, and optimize image delivery.
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/image-diagnostics">Go to Image Diagnostics</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" /> Card Data Editor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Directly edit and manage the oracle card data JSON.</p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/card-data-editor">Go to Card Data Editor</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" /> Card Data Validation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Run automated checks to validate the structure and consistency of card data.
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/card-validation">Go to Card Data Validation</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" /> Blob Manager
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Upload, list, and delete files directly from Vercel Blob storage.
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/blob-manager">Go to Blob Manager</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5" /> API Test Console
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Test various API endpoints directly from the admin interface.
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/test-api">Go to API Test Console</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5" /> AI Service Tester
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Test the integration and responses of the AI services.</p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/ai-testing">Go to AI Service Tester</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5" /> Bug Report Submitter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Submit detailed bug reports directly to the development team.
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/bug-report">Go to Bug Report</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" /> Test Card Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              A page to test the display and loading of individual card images.
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/test-card-images">Go to Test Card Images</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" /> Verify Card Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Verify if all expected card images exist in blob storage.
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/verify-card-images">Go to Verify Card Images</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" /> Verify All Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Verify all images in the public directory against blob storage.
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/verify-images">Go to Verify All Images</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" /> Image Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Tools for optimizing and managing image assets.</p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/image-optimization">Go to Image Optimization</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" /> Data Integrity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Run checks to ensure the consistency and integrity of application data.
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/data-integrity">Go to Data Integrity</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5" /> Lazy Loading Demo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Demonstration and testing of lazy loading components and images.
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/lazy-loading">Go to Lazy Loading Demo</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5" /> Email Service Monitor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor the health and status of the email sending service.
            </p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/test-admin-email">Go to Email Service Monitor</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" /> Supabase Audit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Run an audit of Supabase integration and data.</p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/supabase-audit">Go to Supabase Audit</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
