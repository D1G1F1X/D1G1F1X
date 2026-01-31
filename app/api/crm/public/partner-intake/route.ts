// API: Partner intake - collect partner applications
import { NextRequest, NextResponse } from 'next/server'
import {
  getContactByEmail,
  createContact,
  createAccount,
  createDeal,
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
      company_website,
      title,
      partner_type, // 'reseller', 'technology', 'integration'
      message,
      'X-Idempotency-Key': idempotencyKey,
    } = body

    // Validate required fields
    if (!email || !company_name) {
      return NextResponse.json(
        { status: 'error', message: 'Email and company name are required' },
        { status: 400 }
      )
    }

    // Check idempotency
    let key = idempotencyKey
    if (!key) {
      key = crypto.createHash('md5').update(`partner:${email}:${company_name}`).digest('hex')
    }

    const cached = await checkIdempotencyKey(key)
    if (cached) {
      return NextResponse.json({
        status: 'success',
        message: 'Partner application already submitted',
        data: cached,
        fromCache: true,
      })
    }

    // Create or get account
    let account = null
    if (company_domain) {
      account = await createAccount({
        name: company_name,
        domain: company_domain,
        website: company_website || undefined,
        created_by: 'system',
      })
    }

    // Create or get contact
    let contact = await getContactByEmail(email)
    if (!contact) {
      contact = await createContact({
        email,
        first_name: first_name || null,
        last_name: last_name || null,
        phone: phone || null,
        title: title || null,
        company_id: account?.id,
        source: 'partner_referral',
        attribution_referrer: request.headers.get('referer') || undefined,
        consent: true,
        created_by: 'system',
      })
    }

    // Create partner deal
    const deal = await createDeal({
      title: `Partnership: ${company_name}`,
      pipeline: 'partner',
      stage: 'applied',
      contact_id: contact.id,
      account_id: account?.id,
      created_by: 'system',
    })

    // Log activity
    await createActivity({
      activity_type: 'note',
      contact_id: contact.id,
      deal_id: deal.id,
      account_id: account?.id,
      title: 'Partner Application Submitted',
      description: message || 'Submitted partner application',
      metadata: {
        partner_type,
        intake_source: 'partner_form',
      },
      actor_email: email,
    })

    // Create review task for admin
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 3)

    await createTask({
      title: `Review partner application: ${company_name}`,
      task_type: 'review',
      contact_id: contact.id,
      deal_id: deal.id,
      account_id: account?.id,
      priority: 'high',
      due_date: dueDate,
      sla_hours: 72,
      created_by: 'system',
    })

    const response = {
      status: 'success',
      message: 'Partner application received',
      data: {
        contact_id: contact.id,
        deal_id: deal.id,
        company_name,
        submitted_at: new Date().toISOString(),
      },
    }

    await storeIdempotencyKey(key, '/api/crm/public/partner-intake', response)

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('[v0] POST /api/crm/public/partner-intake error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { status: 'error', message: 'Failed to process partner application', details: errorMessage },
      { status: 500 }
    )
  }
}
