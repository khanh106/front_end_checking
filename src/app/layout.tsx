"use client"

import "@/styles/globals.css"
import Footer from "@/components/layout/Footer"
import { AdminFooterWrapper } from "@/components/layout/AdminFooterWrapper"
import { usePathname } from "next/navigation"

export default function RootLayout({ children }: { children: React.ReactNode }) {
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

  return (
    <html lang="vi">
      <body>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          {isAdminRoute ? <AdminFooterWrapper /> : <Footer />}
        </div>
      </body>
    </html>
  )
}
