import { CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, BookOpen, Sparkles, User } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-foreground mb-4">Welcome to Your Dashboard!</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your personalized hub for all things NUMO Oracle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Sparkles className="h-16 w-16 text-purple-500 mb-4" />
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary-foreground">Generate a Reading</CardTitle>
            <CardDescription className="text-muted-foreground">
              Draw cards and receive AI-powered insights tailored to your questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow"></CardContent>
          <CardFooter>
            <Link href="/tools/card-simulator">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                Start Reading <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <BookOpen className="h-16 w-16 text-green-500 mb-4" />
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary-foreground">My Readings</CardTitle>
            <CardDescription className="text-muted-foreground">
              Access your saved readings and revisit past insights.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow"></CardContent>
          <CardFooter>
            <Link href="/library">
              <Button variant="outline">
                View Library <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <User className="h-16 w-16 text-orange-500 mb-4" />
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary-foreground">My Profile</CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage your account details, preferences, and membership.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow"></CardContent>
          <CardFooter>
            <Link href="/user/dashboard">
              <Button variant="outline">
                Edit Profile <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Separator className="my-12" />

      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-primary-foreground">Explore More Tools</h2>
        <p className="text-lg text-muted-foreground">
          Dive deeper into numerology and oracle wisdom with our specialized tools.
        </p>
        <Link href="/tools">
          <Button size="lg" variant="secondary">
            All Tools <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
