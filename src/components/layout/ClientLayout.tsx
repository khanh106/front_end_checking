"use client"

import Footer from "@/components/layout/Footer"
import { AdminFooterWrapper } from "@/components/layout/AdminFooterWrapper"
import { usePathname } from "next/navigation"

export function ClientLayout() {
  const rawPath = usePathname()
 
  const pathname = rawPath.replace(/\/+$/, "") || "/"

  const adminPages = new Set<string>([
    "/dashboard",
    "/settings",
    "/integrations/api-keys",
    "/integrations/activity",
    "/docs",
  ])

  const isAdminRoute = adminPages.has(pathname)

  return isAdminRoute ? <AdminFooterWrapper /> : <Footer />
}
