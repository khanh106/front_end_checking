"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Sidebar() {
  const pathname = usePathname()
  const [hasOwnerPermission, setHasOwnerPermission] = useState(false)
  const [isCheckingPermission, setIsCheckingPermission] = useState(true)

  useEffect(() => {
    const checkPermission = async () => {
      const cachedPermission = localStorage.getItem('fams-permission')
      const cachedTime = localStorage.getItem('fams-permission-time')
      
      if (cachedPermission && cachedTime) {
        const timeDiff = Date.now() - parseInt(cachedTime)
        if (timeDiff < 5 * 60 * 1000) {
          setHasOwnerPermission(cachedPermission === 'true')
          setIsCheckingPermission(false)
          return
        }
      }

      try {
        const response = await fetch("/api/auth/check-owner", {
          method: "GET",
          credentials: "include"
        })
        const data = await response.json()
        const permission = data.hasPermission || false
        setHasOwnerPermission(permission)
        
        localStorage.setItem('fams-permission', permission.toString())
        localStorage.setItem('fams-permission-time', Date.now().toString())
      } catch {
        setHasOwnerPermission(false)
      } finally {
        setIsCheckingPermission(false)
      }
    }

    checkPermission()
  }, [])
  const groups = [
    {
      title: "BẢNG ĐIỀU KHIỂN FAMS",
      items: [
        {
          href: "/dashboard",
          label: "Tổng Quan",
          icon: (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" className="text-gray-600">
              <path d="M3 3h8v8H3V3Zm10 0h8v5h-8V3ZM3 13h8v8H3v-8Zm10 7v-8h8v8h-8Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          )
        },
        {
          href: "/settings",
          label: "Cài Đặt Chung",
          icon: (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" className="text-gray-600">
              <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M19 12a7 7 0 0 0-.08-1.06l2.02-1.57-2-3.46-2.42.7A7.03 7.03 0 0 0 14 5l-.5-2.5h-3L7 5a7.03 7.03 0 0 0-2.52 1.61l-2.42-.7-2 3.46L2.08 11A7.18 7.18 0 0 0 2 12c0 .36.03.72.08 1.06l-2.02 1.57 2 3.46 2.42-.7c.7.63 1.57 1.19 2.52 1.61l1.5 2.5h3L14 19a7.03 7.03 0 0 0 2.52-1.61l2.42.7 2-3.46-2.02-1.57c.05-.34.08-.7.08-1.06Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        }
      ]
    },
    {
      title: "TÍCH HỢP DỮ LIỆU",
      items: [
        {
          href: "/integrations/api-keys",
          label: "Quản Lý API & Khóa",
          icon: (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" className="text-gray-600">
              <path d="M7.5 10a3.5 3.5 0 1 1 6.16 2.19L20 18.5V21h-2.5l-1.5-1.5-1.5 1.5-1.5-1.5L11 21H8.5v-2.5l5.66-5.66A3.5 3.5 0 0 1 7.5 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        },
        {
          href: "/docs",
          label: "Tài Liệu Hướng Dẫn",
          icon: (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" className="text-gray-600">
              <path d="M6 3h8l4 4v14H6V3Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          )
        },
        {
          href: "/activity",
          label: "Lịch Sử Hoạt Động",
          icon: (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" className="text-gray-600">
              <path d="M12 8v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 21a9 9 0 1 0-9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        }
      ]
    }
  ]

  return (
    <aside className="w-64 shrink-0 border-r bg-white hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:z-30">
      <div className="h-16 border-b flex items-center px-4">
        <Link href="/dashboard" className="hover:opacity-80 transition-opacity">
          <img src="/tira-logo.svg" alt="logo" className="h-7 w-auto" />
        </Link>
      </div>
      <nav className="flex-1 px-3 py-2 space-y-6 overflow-y-auto">
        {groups.map(group => (
          <div key={group.title} className="space-y-2">
            <div className="px-2 text-sm font-bold text-gray-700 tracking-wide">{group.title}</div>
            <div className="space-y-1">
              {group.items.map(item => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <Link
                    key={item.href}
                    href={item.href as any}
                    className={
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors border-l-2 " +
                      (isActive
                        ? "text-gray-900 bg-blue-50 border-blue-600"
                        : "text-gray-700 hover:bg-gray-50 border-transparent")
                    }
                  >
                    <span className="inline-flex items-center justify-center">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="p-4 border-t">
        {isCheckingPermission ? (
          <div className="w-full inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-gray-500 bg-gray-50">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            <span>Đang kiểm tra quyền...</span>
          </div>
        ) : hasOwnerPermission ? (
          <Link
            href="/fams"
            className="w-full inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-gray-800 hover:bg-gray-50 transition-colors"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" className="text-gray-700">
              <path d="M14 3h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 14L21 3M10 3H3v18h18v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Truy Cập FAMS
          </Link>
        ) : (
          <div className="w-full inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-gray-400 bg-gray-50 cursor-not-allowed">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" className="text-gray-400">
              <path d="M14 3h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 14L21 3M10 3H3v18h18v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Truy Cập FAMS
          </div>
        )}
      </div>
    </aside>
  )
}


