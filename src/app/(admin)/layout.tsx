"use client"
import { usePathname } from "next/navigation"
import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isFamsPage = pathname === "/fams"

  if (isFamsPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="fixed inset-x-0 top-0 z-50 border-b bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40">
          <div className="h-16 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <a href="/dashboard" className="hover:opacity-80 transition-opacity">
                <img src="/tira-logo.svg" alt="logo" className="h-7 w-auto" />
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                      <line x1="20" y1="20" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="w-64 rounded-full border px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button aria-label="Thông báo"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-gray-50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
                  <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Z" fill="currentColor" />
                  <path d="M18 16v-4a6 6 0 1 0-12 0v4l-2 2h16l-2-2Z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <img
                src="/user-avatar.jpg"
                alt="avatar"
                className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200 hover:ring-2 hover:ring-blue-500 transition"
              />
            </div>
          </div>
        </header>

        <div className="pt-16">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 w-full md:ml-64 pt-20">{children}</main>
      </div>
    </div>
  )
}


  