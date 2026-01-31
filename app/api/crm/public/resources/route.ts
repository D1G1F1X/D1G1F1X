// API: Resources endpoint - public list of resources for download
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    // Return public resources that can be downloaded
    const resources = [
      {
        id: '1',
        name: 'Enterprise Solution Guide',
        description: 'Comprehensive guide to implementing enterprise solutions',
        asset_type: 'guide',
        url: 'https://drive.google.com/file/d/example-id-1/view',
      },
      {
        id: '2',
        name: 'Implementation Checklist',
        description: 'Step-by-step checklist for successful implementation',
        asset_type: 'template',
        url: 'https://drive.google.com/file/d/example-id-2/view',
      },
      {
        id: '3',
        name: 'ROI Calculator',
        description: 'Interactive tool to calculate ROI for your organization',
        asset_type: 'tool',
        url: 'https://drive.google.com/file/d/example-id-3/view',
      },
      {
        id: '4',
        name: 'Enterprise Case Study',
        description: 'Real-world case study from a Fortune 500 company',
        asset_type: 'case_study',
        url: 'https://drive.google.com/file/d/example-id-4/view',
      },
    ]

    return NextResponse.json({
      status: 'success',
      data: resources,
      count: resources.length,
    })
  } catch (error) {
    console.error('[v0] GET /api/crm/public/resources error:', error)
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch resources' },
      { status: 500 }
    )
  }
}
