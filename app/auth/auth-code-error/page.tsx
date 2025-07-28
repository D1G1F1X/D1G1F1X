import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
          <CardDescription>There was an issue with your authentication code or link.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            The link may have expired, or the code might be invalid. Please try logging in again or request a new link.
          </p>
          <Link href="/login" passHref>
            <Button className="w-full">Go to Login</Button>
          </Link>
          <Link href="/contact" passHref>
            <Button variant="link" className="w-full text-gray-400 hover:text-gray-200">
              Contact Support
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
