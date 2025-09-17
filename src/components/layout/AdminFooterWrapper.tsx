"use client"

import Link from "next/link"

export function AdminFooterWrapper() {
  return (
    <footer className="border-t bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40 w-full">
      <div className="mx-auto max-w-6xl px-4 py-4 grid grid-cols-12 items-center text-sm text-gray-600">
        <div className="col-start-1 col-span-12 md:col-start-7 md:col-span-6 flex items-center justify-between">
          <nav className="flex gap-6">
            <Link href="#" className="hover:text-gray-900">Tài Nguyên</Link>
            <Link href="#" className="hover:text-gray-900">Pháp Lý</Link>
            <Link href="#" className="hover:text-gray-900">Liên Hệ</Link>
          </nav>
          <div className="flex items-center gap-5 text-gray-700">
            <a aria-label="Facebook" href="#" className="hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M13 22v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4z"/></svg>
            </a>
            <a aria-label="Twitter" href="#" className="hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M22 5.8c-.7.3-1.5.6-2.2.6.8-.5 1.4-1.2 1.7-2.1-.7.5-1.6.8-2.4 1-1.5-1.6-4-1.3-5.2.5-.7 1.1-.7 2.6-.2 3.8-3.2-.2-6.1-1.7-8.1-4.1-1.1 2 0 4.6 2 5.8-.6 0-1.2-.2-1.7-.5 0 2.1 1.5 4 3.6 4.4-.6.2-1.2.2-1.8.1.5 1.7 2.1 2.9 3.9 3-1.5 1.2-3.4 1.8-5.3 1.8H2c2 1.2 4.3 1.9 6.6 1.9 8 0 12.5-6.7 12.3-12.6.8-.6 1.4-1.3 1.9-2.1z"/></svg>
            </a>
            <a aria-label="LinkedIn" href="#" className="hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.3 18.3H5.9V9.6h2.4v8.7zM7.1 8.4a1.4 1.4 0 1 1 0-2.9 1.4 1.4 0 0 1 0 2.9zM18.3 18.3h-2.4v-4.5c0-1.1-.4-1.8-1.4-1.8-.8 0-1.3.6-1.5 1.2-.1.2-.1.5-.1.8v4.3H10.5V9.6h2.3v1.2c.3-.6 1.1-1.5 2.6-1.5 1.9 0 2.9 1.2 2.9 3.6v5.4z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
