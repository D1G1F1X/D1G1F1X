import { DashboardShell } from "@/components/admin/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

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
          <Skeleton className="h-10 w-[120px]" />
        </div>

        <Skeleton className="h-10 w-[300px]" />

        <Card>
          <CardHeader>
            <CardTitle>Prompts</CardTitle>
            <CardDescription>Manage your AI prompts for different features of the application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-5 w-[150px]" />
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}
