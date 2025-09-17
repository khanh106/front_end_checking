import { NextRequest, NextResponse } from 'next/server'
import { getApiKeys, createApiKey } from '@/server/actions/api-keys'

export async function GET() {
  try {
    const apiKeys = await getApiKeys()
    return NextResponse.json(apiKeys)
  } catch (error) {
    console.error('Lỗi API GET /api-keys:', error)
    return NextResponse.json(
      { error: 'Không thể tải danh sách API keys' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json()
    
    if (!name) {
      return NextResponse.json(
        { error: 'Tên API key là bắt buộc' },
        { status: 400 }
      )
    }

    const newApiKey = await createApiKey(name)
    
    if (!newApiKey) {
      return NextResponse.json(
        { error: 'Không thể tạo API key' },
        { status: 500 }
      )
    }

    return NextResponse.json(newApiKey)
  } catch (error) {
    console.error('Lỗi API POST /api-keys:', error)
    return NextResponse.json(
      { error: 'Không thể tạo API key' },
      { status: 500 }
    )
  }
}
