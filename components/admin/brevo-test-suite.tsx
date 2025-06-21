"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface TestResult {
  testName: string
  status: "pending" | "success" | "error"
  message: string
  duration?: number
  details?: any
}

export default function BrevoTestSuite() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [testEmail, setTestEmail] = useState("test@example.com")
  const [testName, setTestName] = useState("Test User")

  const updateTestResult = (testName: string, status: TestResult["status"], message: string, details?: any) => {
    setTestResults((prev) => {
      const existing = prev.find((r) => r.testName === testName)
      if (existing) {
        return prev.map((r) => (r.testName === testName ? { ...r, status, message, details } : r))
      }
      return [...prev, { testName, status, message, details }]
    })
  }

  const runTest = async (testName: string, testFn: () => Promise<any>) => {
    updateTestResult(testName, "pending", "Running...")
    const startTime = Date.now()

    try {
      const result = await testFn()
      const duration = Date.now() - startTime
      updateTestResult(testName, "success", `Completed in ${duration}ms`, result)
      return result
    } catch (error) {
      const duration = Date.now() - startTime
      updateTestResult(testName, "error", error instanceof Error ? error.message : "Unknown error", error)
      throw error
    }
  }

  const testHealthCheck = async () => {
    const response = await fetch("/api/email/health")
    const result = await response.json()
    if (!result.success) {
      throw new Error(result.error || "Health check failed")
    }
    return result
  }

  const testWelcomeEmail = async () => {
    const response = await fetch("/api/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "welcome",
        to: testEmail,
        userName: testName,
      }),
    })
    const result = await response.json()
    if (!result.success) {
      throw new Error(result.error || "Welcome email failed")
    }
    return result
  }

  const testOrderConfirmation = async () => {
    const mockOrder = {
      orderNumber: `TEST-${Date.now()}`,
      orderId: "test-uuid",
      customerName: testName,
      customerEmail: testEmail,
      customerPhone: "+1234567890",
      shippingAddress: {
        street: "123 Test Street",
        city: "Test City",
        state: "TS",
        zip: "12345",
        country: "Test Country",
      },
      items: [
        {
          name: "Test Oracle Deck",
          quantity: 1,
          price: 29.99,
          description: "Test product for email verification",
        },
      ],
      totalAmount: 29.99,
      notes: "This is a test order for email verification",
      submittedAt: new Date(),
    }

    const response = await fetch("/api/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "order-confirmation",
        to: testEmail,
        customerName: testName,
        orderDetails: mockOrder,
      }),
    })
    const result = await response.json()
    if (!result.success) {
      throw new Error(result.error || "Order confirmation email failed")
    }
    return result
  }

  const testRateLimit = async () => {
    const promises = []
    for (let i = 0; i < 5; i++) {
      promises.push(
        fetch("/api/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "welcome",
            to: `test${i}@example.com`,
            userName: `Test User ${i}`,
          }),
        }).then((r) => r.json()),
      )
    }

    const results = await Promise.all(promises)
    const successCount = results.filter((r) => r.success).length
    const errorCount = results.filter((r) => !r.success).length

    return {
      total: results.length,
      successful: successCount,
      failed: errorCount,
      results,
    }
  }

  const testInvalidData = async () => {
    const response = await fetch("/api/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "welcome",
        to: "invalid-email-format",
        userName: "",
      }),
    })
    const result = await response.json()

    // We expect this to fail
    if (result.success) {
      throw new Error("Expected validation to fail but it succeeded")
    }

    return { expectedFailure: true, error: result.error }
  }

  const runAllTests = async () => {
    setIsRunning(true)
    setTestResults([])

    try {
      await runTest("Health Check", testHealthCheck)
      await runTest("Welcome Email", testWelcomeEmail)
      await runTest("Order Confirmation", testOrderConfirmation)
      await runTest("Rate Limiting", testRateLimit)
      await runTest("Invalid Data Handling", testInvalidData)
    } catch (error) {
      console.error("Test suite error:", error)
    } finally {
      setIsRunning(false)
    }
  }

  const getStatusBadge = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500">✓ Pass</Badge>
      case "error":
        return <Badge className="bg-red-500">✗ Fail</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">⏳ Running</Badge>
      default:
        return <Badge className="bg-gray-500">- Pending</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Brevo Email Service Test Suite</CardTitle>
          <CardDescription>
            Comprehensive testing for email functionality including order confirmations, rate limiting, error handling,
            and API integration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="testEmail">Test Email Address</Label>
              <Input
                id="testEmail"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="test@example.com"
              />
            </div>
            <div>
              <Label htmlFor="testName">Test User Name</Label>
              <Input
                id="testName"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                placeholder="Test User"
              />
            </div>
          </div>

          <Button onClick={runAllTests} disabled={isRunning} className="w-full">
            {isRunning ? "Running Tests..." : "Run All Tests"}
          </Button>
        </CardContent>
      </Card>

      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{result.testName}</h4>
                    {getStatusBadge(result.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{result.message}</p>
                  {result.details && (
                    <details className="text-xs">
                      <summary className="cursor-pointer text-blue-600">View Details</summary>
                      <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Manual Test Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                <strong>Test Case 1: Valid Order Submission</strong>
                <br />
                Submit a complete order with all required fields filled correctly. Expected: Order saved to database,
                confirmation email sent to customer, notification sent to admin.
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertDescription>
                <strong>Test Case 2: Invalid Email Format</strong>
                <br />
                Submit order with malformed email address. Expected: Validation error displayed, order not processed.
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertDescription>
                <strong>Test Case 3: Missing Required Fields</strong>
                <br />
                Submit order with empty required fields. Expected: Field-specific validation errors displayed.
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertDescription>
                <strong>Test Case 4: Honeypot Spam Detection</strong>
                <br />
                Fill hidden "website" field to trigger spam detection. Expected: Order rejected with generic error
                message.
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertDescription>
                <strong>Test Case 5: API Rate Limiting</strong>
                <br />
                Submit multiple orders rapidly to test rate limiting. Expected: Rate limit enforced after threshold,
                appropriate error message.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
