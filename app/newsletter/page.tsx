import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Newsletter",
  description: "Sign up for our newsletter to receive updates and exclusive content.",
}

export default function NewsletterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Mail className="mx-auto h-12 w-12 text-purple-600 dark:text-purple-400 mb-4" />
          <CardTitle className="text-3xl font-bold">Subscribe to Our Newsletter</CardTitle>
          <CardDescription className="text-muted-foreground">
            Stay up-to-date with the latest news, insights, and exclusive content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <Button type="submit" className="w-full">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
