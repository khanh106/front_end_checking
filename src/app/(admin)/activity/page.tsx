'use client'

import ActivityTable from '@/components/tables/ActivityTable'
import { Activity, Shield, Clock, Users } from 'lucide-react'

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <nav className="text-sm text-gray-500">
          <span>Bảng Điều Khiển FAMS</span>
          <span className="mx-2">/</span>
          <span>Tích Hợp Dữ Liệu</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Lịch Sử Hoạt Động</span>
        </nav>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch Sử Hoạt Động</h1>
          <p className="text-gray-600">
            Theo dõi và giám sát tất cả các hoạt động quan trọng trong hệ thống quản lý API & khóa bảo mật.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">API Keys tạo</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hoạt động hôm nay</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Người dùng hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Chi Tiết Hoạt Động</h2>
          <p className="text-gray-600">
            Xem chi tiết tất cả các hoạt động được ghi lại trong hệ thống. Bạn có thể lọc theo thời gian, 
            loại hành động và người thao tác để dễ dàng theo dõi.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">Bảo mật và Giám sát</p>
              <p className="text-sm text-blue-800">
                Hệ thống tự động ghi lại tất cả các hoạt động quan trọng bao gồm: tạo API key, 
                thu hồi key, xoay key, xem secret key, đăng nhập và đăng xuất. 
                Thông tin này giúp đảm bảo tính bảo mật và khả năng truy xuất nguồn gốc.
              </p>
            </div>
          </div>
        </div>

        <ActivityTable />
      </div>
    </div>
  )
}
