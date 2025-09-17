"use client"

export default function Topbar() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4 md:pl-72">
      <div className="flex items-center gap-3">
        <button className="md:hidden inline-flex items-center justify-center rounded px-3 py-2 border">Menu</button>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center">
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
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
        <button aria-label="Thông báo" className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-gray-50">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
            <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Z" fill="currentColor" />
            <path d="M18 16v-4a6 6 0 1 0-12 0v4l-2 2h16l-2-2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <img src="/user-avatar.jpg" alt="avatar" className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200 hover:ring-2 hover:ring-blue-500 transition" />
      </div>
    </header>
  )
}


