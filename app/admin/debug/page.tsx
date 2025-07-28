import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ImageIcon, Database, Settings } from "lucide-react"
import { CheckCircle } from "lucide-react" // Declare CheckCircle variable

export default function AdminDebugPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Admin Debug Tools</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Card Directory Debug</CardTitle>
            <CardDescription>Inspect raw card data and directory structure.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/debug/card-directory" passHref>
              <Button className="w-full">
                <Database className="mr-2 h-4 w-4" /> Go to Card Directory Debug
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card Images Debug</CardTitle>
            <CardDescription>Verify card image paths and loading status.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/debug/card-images" passHref>
              <Button className="w-full">
                <ImageIcon className="mr-2 h-4 w-4" /> Go to Card Images Debug
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Integrity Check</CardTitle>
            <CardDescription>Run a comprehensive check on all card data for consistency.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/data-integrity" passHref>
              <Button className="w-full">
                <CheckCircle className="mr-2 h-4 w-4" /> Run Data Integrity Check
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Service Tester</CardTitle>
            <CardDescription>Test the AI Assistant API integration.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/ai-testing" passHref>
              <Button className="w-full">
                <Settings className="mr-2 h-4 w-4" /> Test AI Service
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Service Monitor</CardTitle>
            <CardDescription>Check the status and send test emails via Brevo.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/test-email" passHref>
              <Button className="w-full">
                <Settings className="mr-2 h-4 w-4" /> Email Service Monitor
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supabase Audit Report</CardTitle>
            <CardDescription>View a report on Supabase integration status.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/supabase-audit" passHref>
              <Button className="w-full">
                <Settings className="mr-2 h-4 w-4" /> Supabase Audit
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blob Storage Diagnostics</CardTitle>
            <CardDescription>Test and manage Vercel Blob storage for card images.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/blob-diagnostics" passHref>
              <Button className="w-full">
                <ImageIcon className="mr-2 h-4 w-4" /> Blob Diagnostics
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blob Manager</CardTitle>
            <CardDescription>Upload, list, and delete files in Vercel Blob Storage.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/blob-manager" passHref>
              <Button className="w-full">
                <ImageIcon className="mr-2 h-4 w-4" /> Blob Manager
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
