import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Alert variant="destructive" className="max-w-md">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Authentication Error</AlertTitle>
        <AlertDescription>
          <p className="mb-2">
            There was an issue with your authentication code. This might be due to an expired or invalid link.
          </p>
          <p className="mb-4">Please try logging in again or contact support if the problem persists.</p>
          <div className="flex justify-end space-x-2">
            <Button asChild variant="outline">
              <Link href="/login">Go to Login</Link>
            </Button>
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
