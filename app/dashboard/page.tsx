'use client'

import React from "react"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, BarChart3, Briefcase, Users, FolderOpen, MessageSquare, Settings, ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { User as UserType } from '@/lib/auth-types'

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
          <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-t-red-500 animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'administrator') {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">Central hub for project management & CRM</p>
          </div>
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Banner */}
        <div className="mb-12 bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}!</h2>
          <p className="text-gray-300">You have full system access to manage projects, customers, and business operations.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Active Projects</p>
                <p className="text-3xl font-bold text-white">12</p>
              </div>
              <FolderOpen className="w-10 h-10 text-blue-400 opacity-50" />
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Customers</p>
                <p className="text-3xl font-bold text-white">48</p>
              </div>
              <Users className="w-10 h-10 text-emerald-400 opacity-50" />
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Pending Tasks</p>
                <p className="text-3xl font-bold text-white">7</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-400 opacity-50" />
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Open Issues</p>
                <p className="text-3xl font-bold text-white">3</p>
              </div>
              <AlertCircle className="w-10 h-10 text-red-400 opacity-50" />
            </div>
          </div>
        </div>

        {/* Main Navigation Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Project Management Section */}
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Project Management</h3>
                <p className="text-gray-300 text-sm">Create, track, and manage all your projects efficiently</p>
              </div>
            </div>

            {/* PM Features */}
            <div className="space-y-3 mb-6">
              {[
                { icon: FolderOpen, label: 'View All Projects', description: '12 active projects' },
                { icon: CheckCircle2, label: 'Task Management', description: 'Track project progress' },
                { icon: BarChart3, label: 'Project Analytics', description: 'Performance metrics' },
                { icon: Settings, label: 'Project Settings', description: 'Configure project details' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/40 rounded-lg hover:bg-gray-800/60 transition-colors">
                  <item.icon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{item.label}</p>
                    <p className="text-gray-500 text-xs">{item.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                </div>
              ))}
            </div>

            <Link href="/dashboard/projects">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Go to Project Management
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* CRM Section */}
          <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/20 border border-emerald-500/30 rounded-xl p-8 hover:border-emerald-500/50 transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Customer Relationship</h3>
                <p className="text-gray-300 text-sm">Manage customers, interactions, and business opportunities</p>
              </div>
            </div>

            {/* CRM Features */}
            <div className="space-y-3 mb-6">
              {[
                { icon: Users, label: 'Customer Directory', description: '48 total customers' },
                { icon: MessageSquare, label: 'Communication', description: 'Track all interactions' },
                { icon: BarChart3, label: 'Sales Pipeline', description: 'Opportunity tracking' },
                { icon: Settings, label: 'CRM Settings', description: 'Configure workflows' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/40 rounded-lg hover:bg-gray-800/60 transition-colors">
                  <item.icon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{item.label}</p>
                    <p className="text-gray-500 text-xs">{item.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                </div>
              ))}
            </div>

            <Link href="/dashboard/crm">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                Go to CRM Hub
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Additional Admin Tools */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Admin Tools & Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/admin/users">
              <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer border border-gray-700 hover:border-gray-600">
                <Users className="w-6 h-6 text-blue-400 mb-3" />
                <h4 className="text-white font-semibold mb-1">User Management</h4>
                <p className="text-gray-400 text-sm">Manage system users and permissions</p>
              </div>
            </Link>

            <Link href="/dashboard/admin/settings">
              <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer border border-gray-700 hover:border-gray-600">
                <Settings className="w-6 h-6 text-purple-400 mb-3" />
                <h4 className="text-white font-semibold mb-1">System Settings</h4>
                <p className="text-gray-400 text-sm">Configure system preferences</p>
              </div>
            </Link>

            <Link href="/dashboard/admin/analytics">
              <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer border border-gray-700 hover:border-gray-600">
                <BarChart3 className="w-6 h-6 text-cyan-400 mb-3" />
                <h4 className="text-white font-semibold mb-1">Analytics</h4>
                <p className="text-gray-400 text-sm">View system-wide analytics</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
