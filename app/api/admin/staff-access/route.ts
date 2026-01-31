import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-session'
import {
  createStaffAccessLevel,
  updateStaffAccessPermissions,
  getStaffByManager,
} from '@/lib/staff-access'
import { createAdminNotification } from '@/lib/admin-notifications'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession(request)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const staff = await getStaffByManager(session.user.id)
    return NextResponse.json(staff)
  } catch (error) {
    console.error('Error fetching staff:', error)
    return NextResponse.json(
      { error: 'Failed to fetch staff' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession(request)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { staffId, staffType, permissionLevel, department, permissions } =
      await request.json()

    // Create or update staff access level
    let staffAccess = await createStaffAccessLevel(
      staffId,
      staffType,
      permissionLevel,
      department,
      session.user.id
    )

    if (permissions) {
      staffAccess = await updateStaffAccessPermissions(staffId, permissions)
    }

    await createAdminNotification(
      session.user.id,
      'staff_access_configured',
      `Configured access for ${staffType} staff member`,
      staffId
    )

    return NextResponse.json(staffAccess, { status: 201 })
  } catch (error) {
    console.error('Error creating staff access:', error)
    return NextResponse.json(
      { error: 'Failed to create staff access' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession(request)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { staffId, permissions } = await request.json()

    const updated = await updateStaffAccessPermissions(staffId, permissions)

    await createAdminNotification(
      session.user.id,
      'staff_permissions_updated',
      `Updated permissions for staff member`,
      staffId
    )

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating staff permissions:', error)
    return NextResponse.json(
      { error: 'Failed to update permissions' },
      { status: 500 }
    )
  }
}
