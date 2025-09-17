"use client"

import { usePathname } from "next/navigation"
import Footer from "./Footer"

export function AdminFooterWrapper() {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/integrations')
  
  return <Footer isLoggedIn={isAdminRoute} />
}
