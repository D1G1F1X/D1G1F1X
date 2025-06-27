import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import AIServiceTester from "@/components/ai-service-tester"

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-96" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-80" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

export default function AITestingPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🤖 AI Service Testing</h1>
        <p className="text-muted-foreground">
          Test and validate your OpenAI Assistant integration for advanced NUMO Oracle readings.
        </p>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Setup Instructions</CardTitle>
            <CardDescription>Follow these steps to configure your AI service</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">1. Environment Variables</h4>
              <p className="text-sm text-muted-foreground">
                Set these in your Vercel dashboard under Settings → Environment Variables:
              </p>
              <div className="bg-muted p-3 rounded-md font-mono text-sm">
                <div>OPENAI_ASSISTANT_API_KEY=your_api_key_here</div>
                <div>OPENAI_ASSISTANT_ID=asst_your_assistant_id_here</div>
                <div>OPENAI_MODEL=gpt-4o</div>
                <div>OPENAI_MAX_TOKENS=4000</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">2. Create OpenAI Assistant</h4>
              <p className="text-sm text-muted-foreground">
                In your OpenAI platform, create a new Assistant with these instructions:
              </p>
              <div className="bg-muted p-3 rounded-md text-sm">
                <p>
                  "You are the Oracle of NUMO, a mystical guide specializing in Celtic numerology and elemental wisdom
                  through the sacred NUMO Oracle Cards. Provide insightful, personalized readings that blend ancient
                  Celtic wisdom with modern spiritual guidance. Always structure responses with Reading, Interpretation,
                  and Guidance sections."
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">3. Deploy & Test</h4>
              <p className="text-sm text-muted-foreground">
                After setting environment variables, redeploy your application and use the tester below.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <AIServiceTester />
      </Suspense>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm">❌ Service Unavailable</h4>
              <p className="text-sm text-muted-foreground">
                Check that your OpenAI API key is valid and has sufficient credits.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm">❌ Assistant Not Accessible</h4>
              <p className="text-sm text-muted-foreground">
                Verify your Assistant ID is correct and the Assistant exists in your OpenAI account.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm">⚠️ Chat Completion Only</h4>
              <p className="text-sm text-muted-foreground">
                The system will fall back to chat completion if Assistant is not configured. This still provides good
                readings.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm">🔄 Environment Variables Not Loading</h4>
              <p className="text-sm text-muted-foreground">
                After adding environment variables in Vercel, trigger a new deployment for them to take effect.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
