import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = typeof body?.email === "string" ? body.email.trim() : ""
    const password = typeof body?.password === "string" ? body.password : ""

    if (!email || !password) {
      return NextResponse.json({ message: "Thiếu thông tin" }, { status: 400 })
    }

    const apiBaseUrl = process.env.API_BASE_URL || ""
    const cookieName = process.env.COOKIE_NAME || "auth_token"
    const devAdminEmail = process.env.DEV_ADMIN_EMAIL || "admin@gmail.com"
    const devAdminPassword = process.env.DEV_ADMIN_PASSWORD || "Admin123"
    const devAdmin1Email = process.env.DEV_ADMIN1_EMAIL || "admin1@gmail.com"
    const devAdmin1Password = process.env.DEV_ADMIN1_PASSWORD || "Admin123"

    if ((email === devAdminEmail && password === devAdminPassword) || 
        (email === devAdmin1Email && password === devAdmin1Password)) {
      const res = NextResponse.json({ success: true, dev: true })
      res.cookies.set(cookieName, "dev-admin-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
      })
      return res
    }

    if (!apiBaseUrl) {
      return NextResponse.json({ message: "Thiếu cấu hình API_BASE_URL" }, { status: 500 })
    }

    const response = await fetch(`${apiBaseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      const message = (data && data.message) || "Đăng nhập thất bại"
      return NextResponse.json({ message }, { status: response.status })
    }

    const data = await response.json().catch(() => ({}))
    const token = data?.token || data?.access_token || ""

    if (!token) {
      return NextResponse.json({ message: "Thiếu token" }, { status: 500 })
    }

    const res = NextResponse.json({ success: true })
    res.cookies.set(cookieName, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/"
    })
    return res
  } catch {
    return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 })
  }
}




