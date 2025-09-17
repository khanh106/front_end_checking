import { NextRequest, NextResponse } from 'next/server'
import { revokeApiKey } from '@/server/actions/api-keys'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID API key là bắt buộc' },
        { status: 400 }
      )
    }

    const success = await revokeApiKey(id)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Không thể thu hồi API key' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lỗi API POST /api-keys/[id]/revoke:', error)
    return NextResponse.json(
      { error: 'Không thể thu hồi API key' },
      { status: 500 }
    )
  }
}
