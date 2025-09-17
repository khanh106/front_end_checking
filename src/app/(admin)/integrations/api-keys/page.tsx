'use client'

import { useState, useEffect } from 'react'
import ApiKeyCard from '@/components/cards/ApiKeyCard'
import { Button } from '@/components/ui/button'
import { Plus, RefreshCw, ChevronDown } from 'lucide-react'
import { getApiKeys, createApiKey, revokeApiKey, rotateApiKey, logSecretView } from '@/server/actions/api-keys'

interface ApiKey {
  id: string
  name: string
  apiKey: string
  secretKey: string
  status: 'active' | 'revoked'
  createdAt: string
  lastUsed?: string
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  const fetchApiKeys = async () => {
    try {
      setLoading(true)
      const data = await getApiKeys()
      setApiKeys(data)
    } catch (error) {
      console.error('Lỗi khi tải API keys:', error)
    } finally {
      setLoading(false)
    }
  }

  const createNewKey = async () => {
    try {
      setCreating(true)
      const newKey = await createApiKey(`API Key ${new Date().toLocaleString()}`)
      if (newKey) {
        await fetchApiKeys()
      }
    } catch (error) {
      console.error('Lỗi khi tạo API key:', error)
    } finally {
      setCreating(false)
    }
  }

  const handleRevoke = async (id: string) => {
    try {
      const success = await revokeApiKey(id)
      if (success) {
        await fetchApiKeys()
      }
    } catch (error) {
      console.error('Lỗi khi thu hồi API key:', error)
    }
  }

  const handleRotate = async (id: string) => {
    try {
      const rotatedKey = await rotateApiKey(id)
      if (rotatedKey) {
        await fetchApiKeys()
      }
    } catch (error) {
      console.error('Lỗi khi xoay API key:', error)
    }
  }

  const handleSecretView = async (keyId: string) => {
    try {
      await logSecretView(keyId, 'admin')
    } catch (error) {
      console.error('Lỗi khi log sự kiện xem secret:', error)
    }
  }

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    )
  }

  useEffect(() => {
    fetchApiKeys()
  }, [])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <nav className="text-sm text-gray-500">
          <span>Bảng Điều Khiển FAMS</span>
          <span className="mx-2">/</span>
          <span>Tích Hợp Dữ Liệu</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Quản Lý API & Khóa</span>
        </nav>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản Lý API & Khóa</h1>
          <p className="text-gray-600">Quản lý các khóa API và Secret Key để tích hợp dữ liệu chấm công vào hệ thống của bạn.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Thông Tin API & Khóa</h2>
          <Button
            onClick={createNewKey}
            disabled={creating}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tạo Khóa Mới
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : apiKeys.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Chưa có API key nào</p>
            <Button onClick={createNewKey} disabled={creating} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Tạo API Key đầu tiên
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-100 px-3 py-2 rounded border text-sm font-mono">
                      {apiKey.apiKey}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(apiKey.apiKey)
                      }}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-100 px-3 py-2 rounded border text-sm font-mono">
                      {apiKey.secretKey}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(apiKey.secretKey)
                        handleSecretView(apiKey.id)
                      }}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">Trạng thái:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      apiKey.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {apiKey.status === 'active' ? 'Đang hoạt động' : 'Đã thu hồi'}
                    </span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRevoke(apiKey.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Thu Hồi Khóa
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Hướng Dẫn Tích Hợp Cơ Bản</h2>
        
        <div className="space-y-0">
          {[
            {
              title: "1. Cài Đặt Thư Viện Tích Hợp",
              description: "Sử dụng thư viện tích hợp của chúng tôi để đơn giản hóa quá trình kết nối. Bạn có thể tìm thấy hướng dẫn chi tiết trên trang tài liệu API.",
              details: "Cài đặt package thông qua npm hoặc yarn, sau đó import vào project của bạn."
            },
            {
              title: "2. Cấu Hình Endpoint API",
              description: "Đảm bảo cấu hình đúng địa chỉ endpoint API trong ứng dụng của bạn. Địa chỉ này thường được cung cấp cùng với khóa API của bạn.",
              details: "Endpoint mặc định: https://api.fams.com.vn/v1/checkin. Có thể thay đổi theo yêu cầu của tổ chức."
            },
            {
              title: "3. Gửi Dữ Liệu Chấm Công",
              description: "Sử dụng phương thức POST để gửi dữ liệu chấm công định dạng JSON tới endpoint đã cấu hình. Tham khảo ví dụ code trong tài liệu để biết thêm chi tiết về cấu trúc dữ liệu.",
              details: "Dữ liệu JSON cần bao gồm: employee_id, timestamp, location, device_info và các thông tin bổ sung khác."
            }
          ].map((item, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => toggleExpanded(index)}
                className="w-full py-4 px-0 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <ChevronDown 
                  className={`h-5 w-5 text-gray-400 transition-transform ${
                    expandedItems.includes(index) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {expandedItems.includes(index) && (
                <div className="pb-4 px-0">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{item.details}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
