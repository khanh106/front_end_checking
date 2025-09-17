import { NextRequest, NextResponse } from 'next/server'
import { rotateApiKey } from '@/server/actions/api-keys'

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

    const rotatedApiKey = await rotateApiKey(id)
    
    if (!rotatedApiKey) {
      return NextResponse.json(
        { error: 'Không thể xoay API key' },
        { status: 500 }
      )
    }

    return NextResponse.json(rotatedApiKey)
  } catch (error) {
    console.error('Lỗi API POST /api-keys/[id]/rotate:', error)
    return NextResponse.json(
      { error: 'Không thể xoay API key' },
      { status: 500 }
    )
  }
}
