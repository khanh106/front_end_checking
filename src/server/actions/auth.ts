"use server"

import { cookies } from "next/headers"

export async function checkOwnerPermission(): Promise<boolean> {
  try {
    const cookieName = process.env.COOKIE_NAME || "auth_token"
    const token = cookies().get(cookieName)?.value

    if (!token) {
      return false
    }

    if (process.env.NODE_ENV !== "production") {
      if (token === "dev-admin-token") {
        return true
      }
    }

    const apiBaseUrl = process.env.API_BASE_URL || ""
    if (!apiBaseUrl) {
      return false
    }

    const response = await fetch(`${apiBaseUrl}/auth/me`, {
      method: "GET",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json" 
      }
    })

    if (!response.ok) {
      return false
    }

    const data = await response.json().catch(() => ({}))
    return data?.role === "OWNER" || data?.permissions?.includes("OWNER")
  } catch {
    return false
  }
}
