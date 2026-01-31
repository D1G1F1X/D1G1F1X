import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-session'
import {
  getPendingGuestRegistrations,
  approveGuestRegistration,
  rejectGuestRegistration,
} from '@/lib/guest-access'
import { createAdminNotification } from '@/lib/admin-notifications'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession(request)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const registrations = await getPendingGuestRegistrations()
    return NextResponse.json(registrations)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
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

    const { registrationId, action } = await request.json()

    if (action === 'approve') {
      const updated = await approveGuestRegistration(registrationId, session.user.id)
      await createAdminNotification(
        session.user.id,
        'guest_approved',
        `Guest registration approved`,
        updated.user_id
      )
      return NextResponse.json(updated)
    } else if (action === 'reject') {
      const updated = await rejectGuestRegistration(registrationId, session.user.id)
      await createAdminNotification(
        session.user.id,
        'guest_rejected',
        `Guest registration rejected`,
        updated.user_id
      )
      return NextResponse.json(updated)
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    )
  }
}
