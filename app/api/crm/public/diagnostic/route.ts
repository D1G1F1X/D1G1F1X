// API: Diagnostic intake - collect diagnostic requests
import { NextRequest, NextResponse } from 'next/server'
import {
  getContactByEmail,
  createContact,
  createActivity,
  createTask,
  checkIdempotencyKey,
  storeIdempotencyKey,
} from '@/lib/crm-queries'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      first_name,
      last_name,
      phone,
      company_name,
      company_domain,
      title,
      message,
      'X-Idempotency-Key': idempotencyKey,
    } = body

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { status: 'error', message: 'Email is required' },
        { status: 400 }
      )
    }

    // Check idempotency
    let key = idempotencyKey
    if (!key) {
      key = crypto.createHash('md5').update(`${email}:${Date.now()}`).digest('hex')
    }

    const cached = await checkIdempotencyKey(key)
    if (cached) {
      return NextResponse.json({
        status: 'success',
        message: 'Diagnostic request already submitted',
        data: cached,
        fromCache: true,
      })
    }

    // Check or create contact
    let contact = await getContactByEmail(email)
    if (!contact) {
      contact = await createContact({
        email,
        first_name: first_name || null,
        last_name: last_name || null,
        phone: phone || null,
        title: title || null,
        source: 'diagnostic',
        attribution_referrer: request.headers.get('referer') || undefined,
        consent: true,
        created_by: 'system',
      })
    }

    // Log activity
    await createActivity({
      activity_type: 'note',
      contact_id: contact.id,
      title: 'Diagnostic Request Submitted',
      description: message || 'Requested diagnostic services',
      metadata: {
        company_name,
        company_domain,
        intake_source: 'diagnostic_form',
      },
      actor_email: email,
    })

    // Create follow-up task
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 2)

    await createTask({
      title: `Follow up: ${first_name} ${last_name} - Diagnostic`,
      task_type: 'follow_up',
      contact_id: contact.id,
      priority: 'high',
      due_date: dueDate,
      sla_hours: 48,
      created_by: 'system',
    })

    const response = {
      status: 'success',
      message: 'Diagnostic request received',
      data: {
        contact_id: contact.id,
        email: contact.email,
        submitted_at: new Date().toISOString(),
      },
    }

    await storeIdempotencyKey(key, '/api/crm/public/diagnostic', response)

    return NextResponse.json(response)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { status: 'error', message: 'Failed to process diagnostic request', details: errorMessage },
      { status: 500 }
    )
  }
}
