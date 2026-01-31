import { NextRequest, NextResponse } from 'next/server'
import { getProjects, createProject, getProject, updateProject, deleteProject } from '@/lib/pms-project'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const workspaceId = searchParams.get('workspaceId')
    const id = searchParams.get('id')

    if (id) {
      const project = await getProject(id)
      return NextResponse.json(project)
    }

    if (!workspaceId) {
      return NextResponse.json({ error: 'workspaceId is required' }, { status: 400 })
    }

    const projects = await getProjects(workspaceId)
    return NextResponse.json(projects)
  } catch (error) {
    console.error('[v0] Error fetching projects:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { workspaceId, name, description } = body

    if (!workspaceId || !name) {
      return NextResponse.json({ error: 'workspaceId and name are required' }, { status: 400 })
    }

    const project = await createProject(workspaceId, name, description)
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating project:', error)
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

    const project = await updateProject(id, updates)
    return NextResponse.json(project)
  } catch (error) {
    console.error('[v0] Error updating project:', error)
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

    await deleteProject(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Error deleting project:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
