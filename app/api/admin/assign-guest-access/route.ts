import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-session'
import { assignGuestToProject, revokeGuestProjectAccess } from '@/lib/guest-access'
import { createAdminNotification } from '@/lib/admin-notifications'

export async function POST(request: NextRequest) {
  try {
    const session = await getSession(request)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { guestId, projectId, accessLevel, expiresAt } = await request.json()

    const assignment = await assignGuestToProject(
      guestId,
      projectId,
      accessLevel,
      session.user.id,
      expiresAt
    )

    await createAdminNotification(
      session.user.id,
      'guest_access_assigned',
      `Assigned guest to project with ${accessLevel} access`,
      guestId,
      projectId
    )

    return NextResponse.json(assignment, { status: 201 })
  } catch (error) {
    console.error('Error assigning guest access:', error)
    return NextResponse.json(
      { error: 'Failed to assign access' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession(request)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { guestId, projectId } = await request.json()
    await revokeGuestProjectAccess(guestId, projectId)

    await createAdminNotification(
      session.user.id,
      'guest_access_revoked',
      `Revoked guest project access`,
      guestId,
      projectId
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error revoking guest access:', error)
    return NextResponse.json(
      { error: 'Failed to revoke access' },
      { status: 500 }
    )
  }
}
