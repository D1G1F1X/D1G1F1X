import { NextRequest, NextResponse } from 'next/server'
import { getTickets, createTicket, getTicket, updateTicket, deleteTicket } from '@/lib/pms-ticket'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    const id = searchParams.get('id')

    if (id) {
      const ticket = await getTicket(id)
      return NextResponse.json(ticket)
    }

    if (!projectId) {
      return NextResponse.json({ error: 'projectId is required' }, { status: 400 })
    }

    const tickets = await getTickets(projectId)
    return NextResponse.json(tickets)
  } catch (error) {
    console.error('[v0] Error fetching tickets:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, title, description, priority, assignedTo } = body

    if (!projectId || !title) {
      return NextResponse.json({ error: 'projectId and title are required' }, { status: 400 })
    }

    const ticket = await createTicket(projectId, title, description, priority, assignedTo)
    return NextResponse.json(ticket, { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating ticket:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const ticket = await updateTicket(id, updates)
    return NextResponse.json(ticket)
  } catch (error) {
    console.error('[v0] Error updating ticket:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    await deleteTicket(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Error deleting ticket:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
