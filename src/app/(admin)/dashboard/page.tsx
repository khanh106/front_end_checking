import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="text-sm text-gray-500">Tổng số người dùng</div>
          <div className="mt-2 text-2xl font-semibold">—</div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="text-sm text-gray-500">Lượt check-in hôm nay</div>
          <div className="mt-2 text-2xl font-semibold">—</div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="text-sm text-gray-500">Tỉ lệ thành công</div>
          <div className="mt-2 text-2xl font-semibold">—</div>
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="text-sm text-gray-500">Sự cố</div>
          <div className="mt-2 text-2xl font-semibold">—</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Link href="/integrations/api-keys" className="rounded-lg border bg-white p-4 shadow-sm hover:shadow transition">
          <div className="font-medium">API Keys</div>
          <div className="text-sm text-gray-500 mt-1">Quản lý khóa tích hợp</div>
        </Link>
        <Link href={"/activity" as any} className="rounded-lg border bg-white p-4 shadow-sm hover:shadow transition">
          <div className="font-medium">Activity</div>
          <div className="text-sm text-gray-500 mt-1">Theo dõi hoạt động hệ thống</div>
        </Link>
        <Link href={"/docs" as any} className="rounded-lg border bg-white p-4 shadow-sm hover:shadow transition">
          <div className="font-medium">Docs</div>
          <div className="text-sm text-gray-500 mt-1">Tài liệu hướng dẫn</div>
        </Link>
        <Link href={"/resources" as any} className="rounded-lg border bg-white p-4 shadow-sm hover:shadow transition">
          <div className="font-medium">Tài Nguyên</div>
          <div className="text-sm text-gray-500 mt-1">Tài nguyên hệ thống</div>
        </Link>
        <Link href={"/legal" as any} className="rounded-lg border bg-white p-4 shadow-sm hover:shadow transition">
          <div className="font-medium">Pháp Lý</div>
          <div className="text-sm text-gray-500 mt-1">Thông tin pháp lý</div>
        </Link>
      </div>
    </div>
  )
}


