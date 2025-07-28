import { ApiTestComponent } from "@/components/api-test-component"

export default function TestApiPage() {
  return (
    <div className="container py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">OpenAI API Integration Test</h1>
        <p className="text-gray-600 mt-2">Test the server-side OpenAI API integration</p>
      </div>

      <ApiTestComponent />

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This page is for testing the API integration during development.</p>
        <p>
          Navigate to <code>/test-api</code> to access this test interface.
        </p>
      </div>
    </div>
  )
}
