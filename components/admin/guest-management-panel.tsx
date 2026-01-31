'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

interface GuestRegistration {
  id: string
  user_id: string
  company_name?: string
  contact_email: string
  phone?: string
  reason_for_access: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export default function GuestManagementPanel() {
  const [registrations, setRegistrations] = useState<GuestRegistration[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchRegistrations()
  }, [])

  async function fetchRegistrations() {
    try {
      const res = await fetch('/api/admin/guest-registrations')
      if (res.ok) {
        const data = await res.json()
        setRegistrations(data)
      }
    } catch (error) {
      console.error('Error fetching registrations:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleApprove(registrationId: string) {
    setActionLoading(registrationId)
    try {
      const res = await fetch('/api/admin/guest-registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId, action: 'approve' }),
      })
      if (res.ok) {
        setRegistrations((prev) =>
          prev.map((reg) =>
            reg.id === registrationId ? { ...reg, status: 'approved' } : reg
          )
        )
      }
    } catch (error) {
      console.error('Error approving registration:', error)
    } finally {
      setActionLoading(null)
    }
  }

  async function handleReject(registrationId: string) {
    setActionLoading(registrationId)
    try {
      const res = await fetch('/api/admin/guest-registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId, action: 'reject' }),
      })
      if (res.ok) {
        setRegistrations((prev) =>
          prev.map((reg) =>
            reg.id === registrationId ? { ...reg, status: 'rejected' } : reg
          )
        )
      }
    } catch (error) {
      console.error('Error rejecting registration:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const pendingCount = registrations.filter((r) => r.status === 'pending').length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Guest Registrations</h2>
        <p className="text-gray-400">
          Manage guest access requests and assign project permissions
        </p>
        {pendingCount > 0 && (
          <Badge className="mt-3 bg-yellow-900/50 text-yellow-200">
            {pendingCount} pending
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        {loading ? (
          <Card className="p-8 text-center text-gray-400">
            Loading registrations...
          </Card>
        ) : registrations.length === 0 ? (
          <Card className="p-8 text-center text-gray-400">
            No guest registrations yet
          </Card>
        ) : (
          registrations.map((reg) => (
            <Card key={reg.id} className="p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {reg.contact_email}
                    </h3>
                    {reg.status === 'pending' && (
                      <Badge className="bg-yellow-900/50 text-yellow-200">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                    {reg.status === 'approved' && (
                      <Badge className="bg-green-900/50 text-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approved
                      </Badge>
                    )}
                    {reg.status === 'rejected' && (
                      <Badge className="bg-red-900/50 text-red-200">
                        <XCircle className="w-3 h-3 mr-1" />
                        Rejected
                      </Badge>
                    )}
                  </div>
                  {reg.company_name && (
                    <p className="text-sm text-gray-400 mb-1">
                      Company: {reg.company_name}
                    </p>
                  )}
                  {reg.phone && (
                    <p className="text-sm text-gray-400 mb-1">Phone: {reg.phone}</p>
                  )}
                  <p className="text-sm text-gray-400 mt-2">
                    Reason: {reg.reason_for_access}
                  </p>
                </div>
              </div>

              {reg.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t border-gray-700">
                  <Button
                    onClick={() => handleApprove(reg.id)}
                    disabled={actionLoading === reg.id}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(reg.id)}
                    disabled={actionLoading === reg.id}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Reject
                  </Button>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
