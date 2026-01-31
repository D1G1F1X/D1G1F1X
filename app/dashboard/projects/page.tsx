'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Folder, MoreVertical, Trash2, Edit, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { User as UserType } from '@/lib/auth-types'

interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'completed' | 'paused'
  progress: number
  createdAt: string
}

export default function ProjectsPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'Lumen Helix Branding', description: 'Complete brand identity overhaul', status: 'active', progress: 75, createdAt: '2024-01-15' },
    { id: '2', name: 'Website Redesign', description: 'Modern website interface', status: 'active', progress: 60, createdAt: '2024-01-20' },
    { id: '3', name: 'Mobile App Dev', description: 'Native mobile application', status: 'paused', progress: 40, createdAt: '2024-02-01' },
    { id: '4', name: 'API Integration', description: 'Third-party integrations', status: 'completed', progress: 100, createdAt: '2023-12-10' },
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
        // Handle fetch error silently - redirect to login
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
      case 'completed': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'paused': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  if (isLoading) return null

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
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
              <h1 className="text-3xl font-bold text-white">Project Management</h1>
              <p className="text-gray-400 text-sm mt-1">{projects.length} projects</p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Search and Filter */}
        <div className="mb-8 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            <Input
              placeholder="Search projects..."
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Folder className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{project.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Progress</span>
                  <span className="text-white font-semibold">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Status and Date */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
                <span className="text-gray-500 text-xs">{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Folder className="w-12 h-12 text-gray-600 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400">No projects found</p>
          </div>
        )}
      </div>
    </main>
  )
}
