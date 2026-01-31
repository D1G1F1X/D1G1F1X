// CRM API access control middleware
import { NextRequest, NextResponse } from 'next/server'
import type { UserRole } from '@/lib/crm-types'
import { hasPermission } from '@/lib/crm-rbac'
import type { Permission } from '@/lib/crm-rbac'

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string
    email: string
    role: UserRole
  }
}

export async function withCRMAuth(
  request: AuthenticatedRequest,
  requiredPermission: Permission,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    // In production, verify JWT from cookies/headers
    const user = request.user
    
    if (!user) {
      return NextResponse.json(
        { status: 'error', message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check permission
    if (!hasPermission(user.role, requiredPermission)) {
      return NextResponse.json(
        { status: 'error', message: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    // Call handler
    return await handler(request)
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper to extract user from request
export async function getUserFromRequest(request: NextRequest) {
  try {
    // Get auth token from cookies or Authorization header
    const token = request.cookies.get('auth_token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return null
    }

    // In production: verify JWT
    // For now, return null (actual verification should happen here)
    return null
  } catch {
    // Silently handle authentication errors
    return null
  }
}
