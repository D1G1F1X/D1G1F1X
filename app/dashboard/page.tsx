'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, User, Shield, FileText, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { User as UserType } from '@/lib/auth-types'

interface RoleInfo {
  label: string
  description: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

const ROLE_INFO: Record<string, RoleInfo> = {
  admin: {
    label: 'Administrator',
    description: 'Full system access, user management, and analytics',
    icon: <Shield className="w-6 h-6" />,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 border-red-500/30',
  },
  editor: {
    label: 'Editor',
    description: 'Create, edit, and manage content and projects',
    icon: <FileText className="w-6 h-6" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/30',
  },
  user: {
    label: 'User',
    description: 'View and interact with projects and content',
    icon: <User className="w-6 h-6" />,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10 border-emerald-500/30',
  },
  guest: {
    label: 'Guest',
    description: 'View-only access to public content',
    icon: <Users className="w-6 h-6" />,
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10 border-gray-500/30',
  },
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (!response.ok) {
          router.push('/login')
          return
        }

        const data = await response.json()
        if (data.authenticated && data.user) {
          setUser(data.user)
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-t-primary-400 animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const roleInfo = ROLE_INFO[user.role] || ROLE_INFO.guest
  const permissions = {
    admin: [
      'Create and manage users',
      'View system analytics',
      'Manage roles and permissions',
      'Access all projects and content',
      'View activity logs',
      'Manage system settings',
    ],
    editor: [
      'Create and edit projects',
      'Manage content',
      'Create and manage comments',
      'View analytics for own projects',
      'Invite collaborators',
      'Manage project settings',
    ],
    user: [
      'View projects and content',
      'Create comments',
      'Update profile',
      'View personal analytics',
      'Access saved items',
      'Manage notifications',
    ],
    guest: [
      'View public projects',
      'View public content',
      'Read comments',
      'No editing capabilities',
      'Limited to public resources',
      'No project creation',
    ],
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-40 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-40 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2 border-gray-700 text-gray-300 hover:text-white bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">Welcome, {user.name}!</h2>
          <p className="text-gray-400 text-lg">
            You're signed in as a {roleInfo.label}
          </p>
        </div>

        {/* Role Information Card */}
        <div className={`border rounded-xl p-8 mb-12 ${roleInfo.bgColor}`}>
          <div className="flex items-start gap-4">
            <div className={`${roleInfo.color} p-3 rounded-lg bg-gray-800/50`}>
              {roleInfo.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">{roleInfo.label}</h3>
              <p className="text-gray-300 mb-6">{roleInfo.description}</p>

              {/* Permissions List */}
              <div>
                <p className="text-sm font-semibold text-gray-300 mb-3">Your Permissions:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {permissions[user.role as keyof typeof permissions]?.map(
                    (permission, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-gray-200 text-sm bg-gray-800/50 px-3 py-2 rounded-lg"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${roleInfo.color}`}></div>
                        {permission}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-2">Email Address</p>
            <p className="text-lg font-semibold text-white">{user.email}</p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-2">Account Created</p>
            <p className="text-lg font-semibold text-white">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>

          {user.last_login && (
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-2">Last Login</p>
              <p className="text-lg font-semibold text-white">
                {new Date(user.last_login).toLocaleDateString()}
              </p>
            </div>
          )}

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-2">Account Status</p>
            <p className="text-lg font-semibold text-emerald-400">Active</p>
          </div>
        </div>
      </div>
    </main>
  )
}
