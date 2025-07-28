import { AIServiceTester } from "@/components/ai-service-tester"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Settings, TestTube } from "lucide-react"

export default function AITestingPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          AI Service Testing
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Test and validate your OpenAI Assistant integration for NUMO Oracle readings
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Brain className="h-3 w-3" />
            OpenAI Assistant
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <TestTube className="h-3 w-3" />
            Testing Suite
          </Badge>
        </div>
      </div>

      {/* Main Testing Interface */}
      <AIServiceTester />

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Setup Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">1. OpenAI Assistant Setup</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Go to OpenAI Platform → Assistants</li>
                <li>• Create a new Assistant</li>
                <li>• Add NUMO Oracle instructions</li>
                <li>• Copy the Assistant ID (starts with asst_)</li>
                <li>• Add to environment variables</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">2. Environment Variables</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• OPENAI_ASSISTANT_API_KEY</li>
                <li>• OPENAI_ASSISTANT_ID</li>
                <li>• OPENAI_MODEL (optional, defaults to gpt-4o)</li>
                <li>• OPENAI_MAX_TOKENS (optional, defaults to 4000)</li>
                <li>• Remember to redeploy after adding variables</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Fallback Behavior</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              If the Assistant is not configured, the system will automatically fall back to OpenAI's chat completion
              API. This ensures readings are always available, even during setup or if there are Assistant API issues.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
