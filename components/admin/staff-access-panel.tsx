'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Save } from 'lucide-react'

interface StaffAccess {
  id: string
  staff_id: string
  staff_type: string
  permission_level: string
  department?: string
  can_manage_guests: boolean
  can_view_analytics: boolean
  can_manage_projects: boolean
  can_manage_tickets: boolean
  email: string
  name: string
}

export default function StaffAccessPanel() {
  const [staff, setStaff] = useState<StaffAccess[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [permissions, setPermissions] = useState<
    Record<string, Partial<StaffAccess>>
  >({})

  useEffect(() => {
    fetchStaff()
  }, [])

  async function fetchStaff() {
    try {
      const res = await fetch('/api/admin/staff-access')
      if (res.ok) {
        const data = await res.json()
        setStaff(data)
      }
    } catch (error) {
      // Silently handle fetch errors
    } finally {
      setLoading(false)
    }
  }

  function startEdit(staffMember: StaffAccess) {
    setEditingId(staffMember.id)
    setPermissions((prev) => ({
      ...prev,
      [staffMember.id]: { ...staffMember },
    }))
  }

  function cancelEdit() {
    setEditingId(null)
    setPermissions({})
  }

  async function savePermissions(staffId: string) {
    const staffMember = staff.find((s) => s.id === staffId)
    if (!staffMember) return

    try {
      const res = await fetch('/api/admin/staff-access', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffId: staffMember.staff_id,
          permissions: {
            can_manage_guests: permissions[staffId]?.can_manage_guests,
            can_view_analytics: permissions[staffId]?.can_view_analytics,
            can_manage_projects: permissions[staffId]?.can_manage_projects,
            can_manage_tickets: permissions[staffId]?.can_manage_tickets,
          },
        }),
      })

      if (res.ok) {
        const updated = await res.json()
        setStaff((prev) =>
          prev.map((s) => (s.id === staffId ? { ...s, ...updated } : s))
        )
        setEditingId(null)
        setPermissions({})
      }
    } catch (error) {
      // Silently handle save errors
    }
  }

  const roleColors: Record<string, string> = {
    'in-house': 'bg-blue-900/50 text-blue-200',
    contractor: 'bg-purple-900/50 text-purple-200',
    vendor: 'bg-orange-900/50 text-orange-200',
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Staff Access Management</h2>
        <p className="text-gray-400">
          Manage permissions for in-house, contractor, and vendor staff
        </p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <Card className="p-8 text-center text-gray-400">
            Loading staff...
          </Card>
        ) : staff.length === 0 ? (
          <Card className="p-8 text-center text-gray-400">
            No staff members configured yet
          </Card>
        ) : (
          staff.map((member) => (
            <Card
              key={member.id}
              className="p-6 border border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {member.name}
                    </h3>
                    <Badge className={roleColors[member.staff_type]}>
                      {member.staff_type}
                    </Badge>
                    <Badge className="bg-gray-700 text-gray-200">
                      {member.permission_level}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400">{member.email}</p>
                  {member.department && (
                    <p className="text-sm text-gray-400">
                      Department: {member.department}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-white mb-3">
                  Permissions
                </h4>
                <div className="space-y-2">
                  {editingId === member.id ? (
                    <>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={
                            permissions[member.id]?.can_manage_guests ?? member.can_manage_guests
                          }
                          onChange={(e) =>
                            setPermissions((prev) => ({
                              ...prev,
                              [member.id]: {
                                ...prev[member.id],
                                can_manage_guests: e.target.checked,
                              },
                            }))
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-300">
                          Manage Guests
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={
                            permissions[member.id]?.can_view_analytics ?? member.can_view_analytics
                          }
                          onChange={(e) =>
                            setPermissions((prev) => ({
                              ...prev,
                              [member.id]: {
                                ...prev[member.id],
                                can_view_analytics: e.target.checked,
                              },
                            }))
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-300">
                          View Analytics
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={
                            permissions[member.id]?.can_manage_projects ?? member.can_manage_projects
                          }
                          onChange={(e) =>
                            setPermissions((prev) => ({
                              ...prev,
                              [member.id]: {
                                ...prev[member.id],
                                can_manage_projects: e.target.checked,
                              },
                            }))
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-300">
                          Manage Projects
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={
                            permissions[member.id]?.can_manage_tickets ?? member.can_manage_tickets
                          }
                          onChange={(e) =>
                            setPermissions((prev) => ({
                              ...prev,
                              [member.id]: {
                                ...prev[member.id],
                                can_manage_tickets: e.target.checked,
                              },
                            }))
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-300">
                          Manage Tickets
                        </span>
                      </label>
                    </>
                  ) : (
                    <>
                      {member.can_manage_guests && (
                        <Badge className="block w-full text-center bg-green-900/30 text-green-200">
                          Can Manage Guests
                        </Badge>
                      )}
                      {member.can_view_analytics && (
                        <Badge className="block w-full text-center bg-green-900/30 text-green-200">
                          Can View Analytics
                        </Badge>
                      )}
                      {member.can_manage_projects && (
                        <Badge className="block w-full text-center bg-green-900/30 text-green-200">
                          Can Manage Projects
                        </Badge>
                      )}
                      {member.can_manage_tickets && (
                        <Badge className="block w-full text-center bg-green-900/30 text-green-200">
                          Can Manage Tickets
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                {editingId === member.id ? (
                  <>
                    <Button
                      onClick={() => savePermissions(member.id)}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                    <Button
                      onClick={cancelEdit}
                      className="bg-gray-700 hover:bg-gray-600 text-white"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => startEdit(member)}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Permissions
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
