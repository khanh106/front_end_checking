'use server'

export interface FamsLinkResponse {
  success: boolean
  url?: string
  error?: string
  message?: string
}

export async function getFamsLink(): Promise<FamsLinkResponse> {
  try {
    if (process.env.NODE_ENV !== "production") {
      return {
        success: true,
        url: 'https://fams-demo.example.com/sso?token=demo-token-123',
        message: 'Liên kết FAMS demo đã được tạo thành công'
      }
    }

    const response = await fetch(`${process.env.API_BASE_URL}/auth/fams-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_TOKEN}`
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString()
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        error: errorData.message || `HTTP ${response.status}`,
        message: 'Không thể tạo liên kết FAMS'
      }
    }

    const data = await response.json()
    
    return {
      success: true,
      url: data.url,
      message: 'Liên kết FAMS đã được tạo thành công'
    }
  } catch (error) {
    console.error('Lỗi khi tạo FAMS link:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Lỗi không xác định',
      message: 'Có lỗi xảy ra khi tạo liên kết FAMS'
    }
  }
}

export async function checkFamsAccess(): Promise<{
  hasAccess: boolean
  isOwner: boolean
  message?: string
}> {
  try {
    if (process.env.NODE_ENV !== "production") {
      return {
        hasAccess: true,
        isOwner: true,
        message: 'Tài khoản demo có quyền truy cập FAMS'
      }
    }

    const response = await fetch(`${process.env.API_BASE_URL}/auth/check-fams-access`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_TOKEN}`
      }
    })

    if (!response.ok) {
      return {
        hasAccess: false,
        isOwner: false,
        message: 'Không thể kiểm tra quyền truy cập FAMS'
      }
    }

    const data = await response.json()
    
    return {
      hasAccess: data.hasAccess || false,
      isOwner: data.isOwner || false,
      message: data.message
    }
  } catch (error) {
    console.error('Lỗi khi kiểm tra quyền FAMS:', error)
    return {
      hasAccess: false,
      isOwner: false,
      message: 'Có lỗi xảy ra khi kiểm tra quyền truy cập'
    }
  }
}
