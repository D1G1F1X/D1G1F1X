"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EmailServiceMonitor } from "@/components/admin/email-service-monitor"

export default function TestAdminEmailClientPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [adminEmail, setAdminEmail] = useState("")

  const testAdminEmail = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const testOrderData = {
        orderNumber: `TEST-${Date.now()}`,
        orderId: "test-id-123",
        customerName: "Test Customer",
        customerEmail: "test@example.com",
        customerPhone: "+1-555-123-4567",
        shippingAddress: {
          street: "123 Test Street",
          city: "Test City",
          state: "Test State",
          zip: "12345",
          country: "Test Country",
        },
        items: [
          {
            id: "test-item-1",
            name: "Test Product",
            quantity: 2,
            price: 29.99,
            description: "This is a test product for email testing",
          },
        ],
        totalAmount: 59.98,
        notes: "This is a test order for email functionality testing.",
        submittedAt: new Date(),
      }

      const response = await fetch("/api/test-admin-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderDetails: testOrderData,
          adminEmail: adminEmail || undefined,
        }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Test Admin Email Notification</CardTitle>
          <CardDescription>Test the admin email notification system to debug delivery issues</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="adminEmail">Admin Email (optional)</Label>
            <Input
              id="adminEmail"
              type="email"
              placeholder="Leave empty to use default admin email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              If provided, this email will be used instead of the configured admin email
            </p>
          </div>

          <Button onClick={testAdminEmail} disabled={isLoading} className="w-full">
            {isLoading ? "Sending Test Email..." : "Send Test Admin Email"}
          </Button>

          {result && (
            <Alert className={result.success ? "border-green-500" : "border-red-500"}>
              <AlertDescription>
                <div className="space-y-2">
                  <p>
                    <strong>Status:</strong> {result.success ? "✅ Success" : "❌ Failed"}
                  </p>
                  {result.error && (
                    <p>
                      <strong>Error:</strong> {result.error}
                    </p>
                  )}
                  {result.messageId && (
                    <p>
                      <strong>Message ID:</strong> {result.messageId}
                    </p>
                  )}
                  {result.adminEmail && (
                    <p>
                      <strong>Sent to:</strong> {result.adminEmail}
                    </p>
                  )}
                  {result.details && (
                    <div>
                      <strong>Details:</strong>
                      <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>Current Environment Variables:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                ADMIN_EMAIL_FOR_NOTIFICATIONS: {process.env.ADMIN_EMAIL_FOR_NOTIFICATIONS ? "✅ Set" : "❌ Not set"}
              </li>
              <li>ADMIN_EMAIL: {process.env.ADMIN_EMAIL ? "✅ Set" : "❌ Not set"}</li>
              <li>BREVO_API_KEY: {process.env.BREVO_API_KEY ? "✅ Set" : "❌ Not set"}</li>
              <li>BREVO_SENDER_EMAIL: {process.env.BREVO_SENDER_EMAIL ? "✅ Set" : "❌ Not set"}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <EmailServiceMonitor />
    </div>
  )
}
