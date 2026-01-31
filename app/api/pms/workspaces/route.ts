import { NextRequest, NextResponse } from 'next/server'
import { getWorkspaces, createWorkspace, getWorkspace, updateWorkspace, deleteWorkspace } from '@/lib/pms-workspace'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ownerId = searchParams.get('ownerId')
    const id = searchParams.get('id')

    if (id) {
      const workspace = await getWorkspace(id)
      return NextResponse.json(workspace)
    }

    if (!ownerId) {
      return NextResponse.json({ error: 'ownerId is required' }, { status: 400 })
    }

    const workspaces = await getWorkspaces(ownerId)
    return NextResponse.json(workspaces)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ownerId, name, description } = body

    if (!ownerId || !name) {
      return NextResponse.json({ error: 'ownerId and name are required' }, { status: 400 })
    }

    const workspace = await createWorkspace(ownerId, name, description)
    return NextResponse.json(workspace, { status: 201 })
  } catch (error) {
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

    const workspace = await updateWorkspace(id, updates)
    return NextResponse.json(workspace)
  } catch (error) {
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

    await deleteWorkspace(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
