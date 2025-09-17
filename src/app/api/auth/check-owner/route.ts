import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const cookieName = process.env.COOKIE_NAME || "auth_token"
    const token = request.cookies.get(cookieName)?.value

    console.log("[check-owner] NODE_ENV:", process.env.NODE_ENV)
    console.log("[check-owner] Token exists:", !!token)

    if (!token) {
      console.log("[check-owner] No token found")
      return NextResponse.json({ hasPermission: false, error: "No token" })
    }

    if (process.env.NODE_ENV !== "production") {
      if (token === "dev-admin-token") {
        console.log("[check-owner] Dev admin token detected")
        return NextResponse.json({ hasPermission: true, dev: true })
      }
    }

    const apiBaseUrl = process.env.API_BASE_URL
    console.log("[check-owner] API_BASE_URL exists:", !!apiBaseUrl)
    
    if (!apiBaseUrl) {
      console.log("[check-owner] Missing API_BASE_URL")
      return NextResponse.json({ hasPermission: false, error: "Missing API_BASE_URL" })
    }

    console.log("[check-owner] Calling backend auth/me")
    const response = await fetch(`${apiBaseUrl}/auth/me`, {
      method: "GET",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json" 
      }
    })

    console.log("[check-owner] Backend response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error")
      console.log("[check-owner] Backend error:", errorText)
      return NextResponse.json({ hasPermission: false, error: `Backend error: ${response.status}` })
    }

    const data = await response.json().catch(() => ({}))
    console.log("[check-owner] Backend data:", data)
    
    const hasPermission = data?.role === "OWNER" || data?.permissions?.includes("OWNER")
    console.log("[check-owner] Has permission:", hasPermission)
    
    return NextResponse.json({ hasPermission })
  } catch (error) {
    console.error("[check-owner] Error:", error)
    return NextResponse.json({ hasPermission: false, error: "Server error" })
  }
}
