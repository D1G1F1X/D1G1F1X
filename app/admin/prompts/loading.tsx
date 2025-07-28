import { DashboardShell } from "@/components/admin/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function PromptManagerLoading() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Prompt Manager</h2>
            <p className="text-muted-foreground">
              Create and manage AI prompts for the NUMO Card Dealer and other features
            </p>
          </div>
          <Loader2 className="h-10 w-[120px] animate-spin text-primary" />
        </div>

        <Loader2 className="h-10 w-[300px] animate-spin text-primary" />

        <Card>
          <CardHeader>
            <CardTitle>Prompts</CardTitle>
            <CardDescription>Manage your AI prompts for different features of the application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Loader2 className="h-10 w-full animate-spin text-primary" />
              <Loader2 className="h-10 w-full animate-spin text-primary" />
              <Loader2 className="h-10 w-full animate-spin text-primary" />
              <Loader2 className="h-10 w-full animate-spin text-primary" />
              <Loader2 className="h-10 w-full animate-spin text-primary" />
            </div>
          </CardContent>
          <CardFooter>
            <Loader2 className="h-5 w-[150px] animate-spin text-primary" />
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}
