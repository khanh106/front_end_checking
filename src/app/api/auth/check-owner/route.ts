import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const cookieName = process.env.COOKIE_NAME || "auth_token"
    const token = request.cookies.get(cookieName)?.value

    if (!token) {
      return NextResponse.json({ hasPermission: false })
    }

    if (process.env.NODE_ENV !== "production") {
      if (token === "dev-admin-token") {
        return NextResponse.json({ hasPermission: true, dev: true })
      }
    }

    const apiBaseUrl = process.env.API_BASE_URL || ""
    if (!apiBaseUrl) {
      return NextResponse.json({ hasPermission: false })
    }

    const response = await fetch(`${apiBaseUrl}/auth/me`, {
      method: "GET",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json" 
      }
    })

    if (!response.ok) {
      return NextResponse.json({ hasPermission: false })
    }

    const data = await response.json().catch(() => ({}))
    const hasPermission = data?.role === "OWNER" || data?.permissions?.includes("OWNER")
    
    return NextResponse.json({ hasPermission })
  } catch {
    return NextResponse.json({ hasPermission: false })
  }
}
