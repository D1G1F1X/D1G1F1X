import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Authentication Error</CardTitle>
          <CardDescription>There was a problem confirming your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>The authentication link may have expired or been used already.</AlertDescription>
          </Alert>
          <div className="mt-4 space-y-2">
            <Button asChild className="w-full">
              <Link href="/login">Try Signing In</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/register">Create New Account</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
