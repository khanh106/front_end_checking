import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const cookieName = process.env.COOKIE_NAME || "auth_token"
    const token = request.cookies.get(cookieName)?.value

    if (!token) {
      return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 })
    }

    const apiBaseUrl = process.env.API_BASE_URL || ""
    
    if (process.env.NODE_ENV !== "production") {
      if (token === "dev-admin-token") {
        const mockFamsUrl = "https://fams-dev.example.com/sso?token=mock-sso-token&user=admin"
        return NextResponse.json({ 
          success: true, 
          url: mockFamsUrl,
          dev: true 
        })
      }
    }

    if (!apiBaseUrl) {
      return NextResponse.json({ message: "Thiếu cấu hình API_BASE_URL" }, { status: 500 })
    }

    const response = await fetch(`${apiBaseUrl}/auth/fams-link`, {
      method: "GET",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json" 
      }
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      const message = (data && data.message) || "Không thể tạo link FAMS"
      return NextResponse.json({ message }, { status: response.status })
    }

    const data = await response.json().catch(() => ({}))
    const famsUrl = data?.url || data?.fams_url || ""

    if (!famsUrl) {
      return NextResponse.json({ message: "Không nhận được URL FAMS" }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      url: famsUrl 
    })
  } catch (error) {
    console.error("FAMS link error:", error)
    return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 })
  }
}
