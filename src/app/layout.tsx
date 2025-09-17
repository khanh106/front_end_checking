import type { Metadata } from "next"
import "@/styles/globals.css"
import Footer from "@/components/layout/Footer"
import { AdminFooterWrapper } from "../components/layout/AdminFooterWrapper"

export const metadata: Metadata = {
  title: "Admin Tira",
  description: "Web admin Tira"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <AdminFooterWrapper />
        </div>
      </body>
    </html>
  )
}


