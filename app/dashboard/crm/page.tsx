'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Users, Mail, Phone, MapPin, Star, Search, Filter, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { User as UserType } from '@/lib/auth-types'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: 'active' | 'inactive' | 'prospect'
  lastContact: string
  value: number
}

export default function CRMPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [customers, setCustomers] = useState<Customer[]>([
    { id: '1', name: 'Acme Corp', email: 'contact@acme.com', phone: '+1-555-0101', company: 'Acme Corp', status: 'active', lastContact: '2024-02-15', value: 45000 },
    { id: '2', name: 'Tech Ventures', email: 'info@techventures.com', phone: '+1-555-0102', company: 'Tech Ventures Inc', status: 'active', lastContact: '2024-02-10', value: 32000 },
    { id: '3', name: 'Global Solutions', email: 'sales@globalsol.com', phone: '+1-555-0103', company: 'Global Solutions LLC', status: 'prospect', lastContact: '2024-02-01', value: 15000 },
    { id: '4', name: 'NextGen Systems', email: 'hello@nextgen.com', phone: '+1-555-0104', company: 'NextGen Systems', status: 'active', lastContact: '2024-02-12', value: 28000 },
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

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
      case 'prospect': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'inactive': return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const totalValue = customers.reduce((sum, c) => sum + c.value, 0)
  const activeCustomers = customers.filter(c => c.status === 'active').length
  const prospects = customers.filter(c => c.status === 'prospect').length

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
              <h1 className="text-3xl font-bold text-white">Customer Relationship Management</h1>
              <p className="text-gray-400 text-sm mt-1">{customers.length} customers tracked</p>
            </div>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            New Customer
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-1">Active Customers</p>
            <p className="text-3xl font-bold text-emerald-400">{activeCustomers}</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-1">Prospects</p>
            <p className="text-3xl font-bold text-blue-400">{prospects}</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-1">Total Customer Value</p>
            <p className="text-3xl font-bold text-white">${(totalValue / 1000).toFixed(0)}K</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
          <Button variant="outline" className="border-gray-700 bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Customers Table */}
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-800/50">
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">Customer</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">Contact</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">Status</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">Last Contact</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">Value</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map(customer => (
                  <tr key={customer.id} className="border-b border-gray-700/50 hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">{customer.name}</p>
                          <p className="text-gray-400 text-sm">{customer.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <Mail className="w-4 h-4 text-gray-500" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <Phone className="w-4 h-4 text-gray-500" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(customer.status)}`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(customer.lastContact).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-white font-semibold">
                      ${customer.value.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400">No customers found</p>
          </div>
        )}
      </div>
    </main>
  )
}
