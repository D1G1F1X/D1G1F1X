import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Authentication Error",
  description: "An error occurred during authentication.",
}

export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-900 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
          <CardDescription className="text-muted-foreground">
            There was an issue with your authentication.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>This could be due to an invalid or expired authentication link. Please try logging in again.</p>
          <Button asChild>
            <Link href="/login">Go to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
