'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Mail, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type UserType = 'admin' | 'editor' | 'user' | 'guest'

interface LoginFormProps {
  onSuccess?: () => void
  defaultUserType?: UserType
  showUserTypeSelector?: boolean
}

const USER_TYPE_INFO: Record<UserType, { label: string; description: string; color: string }> = {
  admin: {
    label: 'Administrator',
    description: 'Full system access, user management, and analytics',
    color: 'from-red-600 to-red-700',
  },
  editor: {
    label: 'Editor',
    description: 'Create, edit, and manage content and projects',
    color: 'from-blue-600 to-blue-700',
  },
  user: {
    label: 'User',
    description: 'View and interact with projects and content',
    color: 'from-emerald-600 to-emerald-700',
  },
  guest: {
    label: 'Guest',
    description: 'View-only access to public content',
    color: 'from-gray-600 to-gray-700',
  },
}

export default function LoginForm({
  onSuccess,
  defaultUserType = 'user',
  showUserTypeSelector = true,
}: LoginFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedUserType, setSelectedUserType] = useState<UserType>(defaultUserType)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Login failed')
        setIsLoading(false)
        return
      }

      setSuccess(true)

      // Redirect to dashboard after brief success display
      setTimeout(() => {
        if (onSuccess) {
          onSuccess()
        } else {
          router.push('/dashboard')
        }
      }, 1500)
    } catch (err: any) {
      setError(err.message || 'An error occurred during login')
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* User Type Selector */}
      {showUserTypeSelector && (
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-300 mb-4">Select Access Level:</p>
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(USER_TYPE_INFO) as UserType[]).map(type => (
              <button
                key={type}
                onClick={() => {
                  setSelectedUserType(type)
                  setError(null)
                }}
                className={`p-4 rounded-lg transition-all duration-200 border-2 ${
                  selectedUserType === type
                    ? `bg-gradient-to-br ${USER_TYPE_INFO[type].color} border-white/50 text-white shadow-lg scale-105`
                    : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                <p className="font-semibold text-sm">{USER_TYPE_INFO[type].label}</p>
                <p className="text-xs opacity-75 mt-1">{USER_TYPE_INFO[type].description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Selected User Type Display */}
        <div className={`p-4 rounded-lg border-2 border-l-4 ${
          selectedUserType === 'admin'
            ? 'bg-red-500/10 border-red-500/30 border-l-red-500'
            : selectedUserType === 'editor'
              ? 'bg-blue-500/10 border-blue-500/30 border-l-blue-500'
              : selectedUserType === 'user'
                ? 'bg-emerald-500/10 border-emerald-500/30 border-l-emerald-500'
                : 'bg-gray-500/10 border-gray-500/30 border-l-gray-500'
        }`}>
          <p className="text-sm text-gray-300">
            <span className="font-semibold">Logging in as: </span>
            <span className="font-bold">{USER_TYPE_INFO[selectedUserType].label}</span>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-200">Login successful! Redirecting...</p>
          </div>
        )}

        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
              className="pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          disabled={isLoading || success || !formData.email || !formData.password}
          className={`w-full h-11 font-semibold text-lg transition-all duration-300 ${
            selectedUserType === 'admin'
              ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
              : selectedUserType === 'editor'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                : selectedUserType === 'user'
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'
                  : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Signing in...
            </>
          ) : success ? (
            <>
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Signed in successfully
            </>
          ) : (
            `Sign In as ${USER_TYPE_INFO[selectedUserType].label}`
          )}
        </Button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link href="/register" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
            Create one
          </Link>
        </p>
      </form>
    </div>
  )
}
