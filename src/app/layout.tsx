import "@/styles/globals.css"
import Footer from "@/components/layout/Footer"
import { AdminFooterWrapper } from "@/components/layout/AdminFooterWrapper"
import { ClientLayout } from "@/components/layout/ClientLayout"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <ClientLayout />
        </div>
      </body>
    </html>
  )
}
