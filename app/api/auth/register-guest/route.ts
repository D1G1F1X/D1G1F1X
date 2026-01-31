import { NextRequest, NextResponse } from 'next/server'
import {
  createGuestRegistration,
  findUserByEmail,
  hashPassword,
} from '@/lib/auth'
import { notifyAllAdmins } from '@/lib/admin-notifications'

export async function POST(request: NextRequest) {
  try {
    const { email, password, company, phone, reason } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Create user with guest role
    const hashedPassword = await hashPassword(password)
    const user = await createUser(email, hashedPassword, 'guest', {
      email,
      name: email.split('@')[0],
    })

    // Create guest registration
    const registration = await createGuestRegistration(user.id, {
      company_name: company,
      contact_email: email,
      phone,
      reason_for_access: reason,
    })

    // Notify all admins
    await notifyAllAdmins(
      'guest_registration',
      `New guest registration from ${email} (${company})`,
      user.id,
      registration.id,
      `/dashboard/admin/guests/${registration.id}`
    )

    return NextResponse.json(
      {
        message: 'Guest registration successful. Pending admin approval.',
        registration,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Guest registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}

async function createUser(
  email: string,
  hashedPassword: string,
  role: string,
  profile?: { email?: string; name?: string }
) {
  // This function should be added to your auth.ts
  const { pool } = await import('@/lib/db')
  const result = await pool.query(
    `INSERT INTO users (email, password_hash, role)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [email, hashedPassword, role]
  )
  return result.rows[0]
}
