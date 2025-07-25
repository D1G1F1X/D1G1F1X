import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LoginForm } from "@/components/auth/login-form"
import { SignUpForm } from "@/components/auth/sign-up-form"

export const metadata = {
  title: "Login",
  description: "Login or create an account to access the Numo Oracle platform.",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-900 p-4">
      <div className="grid gap-6 md:grid-cols-2 max-w-2xl w-full">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Already have an account? Sign in to access your readings and personalized content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            <CardDescription>Create a new account to start your journey with the Numo Oracle.</CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
