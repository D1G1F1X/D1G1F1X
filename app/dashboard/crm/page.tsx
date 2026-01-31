'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Users, Mail, Phone, TrendingUp, Search, Filter, MoreVertical, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { User as UserType } from '@/lib/auth-types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CRMPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('pipeline')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - in production, fetch from API
  const [stats] = useState({
    totalContacts: 156,
    activeDeals: 24,
    openTasks: 12,
    conversionRate: 18.5,
  })

  const [pipeline] = useState([
    { stage: 'New Lead', count: 8, value: 120000, color: 'bg-blue-500' },
    { stage: 'Contacted', count: 12, value: 280000, color: 'bg-cyan-500' },
    { stage: 'Qualified', count: 9, value: 350000, color: 'bg-emerald-500' },
    { stage: 'Proposal', count: 5, value: 240000, color: 'bg-yellow-500' },
  ])

  const [recentTasks] = useState([
    { id: '1', title: 'Follow up with Acme Corp', priority: 'high', dueDate: '2024-02-20', status: 'open' },
    { id: '2', title: 'Send proposal to TechVent', priority: 'medium', dueDate: '2024-02-21', status: 'in_progress' },
    { id: '3', title: 'Schedule meeting with Global Sol', priority: 'high', dueDate: '2024-02-19', status: 'open' },
  ])

  const [recentActivities] = useState([
    { id: '1', type: 'email', contact: 'John Smith', company: 'Acme Corp', action: 'Sent proposal' },
    { id: '2', type: 'call', contact: 'Sarah Johnson', company: 'Tech Ventures', action: 'Negotiation call' },
    { id: '3', type: 'meeting', contact: 'Mike Chen', company: 'Global Solutions', action: 'Discovery meeting' },
  ])

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-400 bg-red-500/10'
      case 'high': return 'text-orange-400 bg-orange-500/10'
      case 'medium': return 'text-yellow-400 bg-yellow-500/10'
      case 'low': return 'text-gray-400 bg-gray-500/10'
      default: return 'text-gray-400 bg-gray-500/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      case 'in_progress': return <Clock className="w-4 h-4 text-blue-400" />
      default: return <AlertCircle className="w-4 h-4 text-yellow-400" />
    }
  }

  if (isLoading) return null

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">CRM Hub</h1>
              <p className="text-gray-400 text-sm mt-1">Manage contacts, deals, and customer interactions</p>
            </div>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            New Contact
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-1">Total Contacts</p>
            <p className="text-3xl font-bold text-white">{stats.totalContacts}</p>
            <p className="text-gray-500 text-xs mt-2">+12 this month</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-1">Active Deals</p>
            <p className="text-3xl font-bold text-emerald-400">{stats.activeDeals}</p>
            <p className="text-gray-500 text-xs mt-2">$1.2M pipeline</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-1">Open Tasks</p>
            <p className="text-3xl font-bold text-yellow-400">{stats.openTasks}</p>
            <p className="text-gray-500 text-xs mt-2">3 due today</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-1">Conversion Rate</p>
            <p className="text-3xl font-bold text-blue-400">{stats.conversionRate}%</p>
            <p className="text-gray-500 text-xs mt-2">+2.1% vs last month</p>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-800/50 border border-gray-700">
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          {/* Pipeline View */}
          <TabsContent value="pipeline" className="space-y-6">
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Sales Pipeline</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {pipeline.map((stage, idx) => (
                  <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
                    <div className={`w-2 h-2 rounded-full ${stage.color} mb-4`}></div>
                    <h3 className="text-white font-semibold mb-2">{stage.stage}</h3>
                    <p className="text-3xl font-bold text-white mb-1">{stage.count}</p>
                    <p className="text-gray-400 text-sm">${(stage.value / 1000).toFixed(0)}K value</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline Details */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Recent Deals</h3>
                <Link href="/dashboard/crm/deals">
                  <Button variant="outline" className="border-gray-700 bg-transparent text-gray-300">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                    <div>
                      <p className="text-white font-semibold">Deal {i + 1}</p>
                      <p className="text-gray-400 text-sm">Contacted 2 days ago</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">$50,000</p>
                      <p className="text-gray-400 text-sm">Proposal</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Tasks View */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">My Tasks</h2>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Task
                </Button>
              </div>

              <div className="space-y-3">
                {recentTasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700/50">
                    <div className="flex items-center gap-4 flex-1">
                      {getStatusIcon(task.status)}
                      <div>
                        <p className="text-white font-semibold">{task.title}</p>
                        <p className="text-gray-400 text-sm">Due {task.dueDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Activities View */}
          <TabsContent value="activities" className="space-y-6">
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Activities</h2>
              <div className="space-y-3">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{activity.contact}</p>
                        <p className="text-gray-400 text-sm">{activity.company} • {activity.action}</p>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">{activity.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
