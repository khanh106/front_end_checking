"use client"

import { useState } from "react"
import { ChevronDownIcon, ChevronRightIcon, CodeBracketIcon, DocumentTextIcon, LinkIcon } from "@heroicons/react/24/outline"

interface AccordionItem {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  content: React.ReactNode
}

export default function DocsPage() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const accordionItems: AccordionItem[] = [
    {
      id: "sdk-installation",
      title: "Cài đặt SDK",
      icon: CodeBracketIcon,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">JavaScript/TypeScript</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              <div>npm install @fams/checkin-sdk</div>
              <div className="text-gray-400">{`# hoặc`}</div>
              <div>yarn add @fams/checkin-sdk</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Python</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              <div>pip install fams-checkin-sdk</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">PHP</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              <div>composer require fams/checkin-sdk</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "authentication",
      title: "Xác thực API",
      icon: LinkIcon,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Cấu hình API Key</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="text-gray-400">{`// JavaScript/TypeScript`}</div>
              <div>import CheckinSDK from &apos;@fams/checkin-sdk&apos;</div>
              <div className="mt-2">const sdk = new CheckinSDK({`{`}</div>
              <div className="ml-4">apiKey: &apos;your-api-key&apos;,</div>
              <div className="ml-4">secretKey: &apos;your-secret-key&apos;,</div>
              <div className="ml-4">baseUrl: &apos;https://api.fams.vn&apos;</div>
              <div>{`}`})</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Headers bắt buộc</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              <div>Authorization: Bearer your-api-key</div>
              <div>X-Secret-Key: your-secret-key</div>
              <div>Content-Type: application/json</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "endpoints",
      title: "API Endpoints",
      icon: LinkIcon,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Check-in</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-mono rounded">POST</span>
                <span className="font-mono text-sm">/api/v1/checkin</span>
              </div>
              <p className="text-sm text-gray-600">Tạo bản ghi check-in mới</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Check-out</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded">POST</span>
                <span className="font-mono text-sm">/api/v1/checkout</span>
              </div>
              <p className="text-sm text-gray-600">Tạo bản ghi check-out</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Lịch sử</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-mono rounded">GET</span>
                <span className="font-mono text-sm">/api/v1/history</span>
              </div>
              <p className="text-sm text-gray-600">Lấy lịch sử check-in/out</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Thống kê</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-mono rounded">GET</span>
                <span className="font-mono text-sm">/api/v1/stats</span>
              </div>
              <p className="text-sm text-gray-600">Lấy thống kê theo khoảng thời gian</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "request-examples",
      title: "Mẫu Request",
      icon: DocumentTextIcon,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Check-in Request</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="text-gray-400">POST /api/v1/checkin</div>
              <div className="text-gray-400">Content-Type: application/json</div>
              <div className="mt-4">{`{`}</div>
              <div className="ml-4">&quot;employee_id&quot;: &quot;EMP001&quot;,</div>
              <div className="ml-4">&quot;location&quot;: {`{`}</div>
              <div className="ml-8">&quot;latitude&quot;: 10.762622,</div>
              <div className="ml-8">&quot;longitude&quot;: 106.660172,</div>
              <div className="ml-8">&quot;address&quot;: &quot;123 Nguyễn Huệ, Q1, TP.HCM&quot;</div>
              <div className="ml-4">{`},`}</div>
              <div className="ml-4">&quot;timestamp&quot;: &quot;2024-01-15T08:30:00Z&quot;,</div>
              <div className="ml-4">&quot;device_info&quot;: {`{`}</div>
              <div className="ml-8">&quot;platform&quot;: &quot;mobile&quot;,</div>
              <div className="ml-8">&quot;os&quot;: &quot;iOS 17.2&quot;,</div>
              <div className="ml-8">&quot;app_version&quot;: &quot;1.0.0&quot;</div>
              <div className="ml-4">{`}`}</div>
              <div>{`}`}</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Check-out Request</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="text-gray-400">POST /api/v1/checkout</div>
              <div className="text-gray-400">Content-Type: application/json</div>
              <div className="mt-4">{`{`}</div>
              <div className="ml-4">&quot;employee_id&quot;: &quot;EMP001&quot;,</div>
              <div className="ml-4">&quot;checkin_id&quot;: &quot;checkin_123456&quot;,</div>
              <div className="ml-4">&quot;location&quot;: {`{`}</div>
              <div className="ml-8">&quot;latitude&quot;: 10.762622,</div>
              <div className="ml-8">&quot;longitude&quot;: 106.660172,</div>
              <div className="ml-8">&quot;address&quot;: &quot;123 Nguyễn Huệ, Q1, TP.HCM&quot;</div>
              <div className="ml-4">{`},`}</div>
              <div className="ml-4">&quot;timestamp&quot;: &quot;2024-01-15T17:30:00Z&quot;</div>
              <div>{`}`}</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Lấy lịch sử</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="text-gray-400">GET /api/v1/history?employee_id=EMP001&amp;start_date=2024-01-01&amp;end_date=2024-01-31</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "response-examples",
      title: "Mẫu Response",
      icon: DocumentTextIcon,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Check-in Success Response</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="text-gray-400">HTTP 200 OK</div>
              <div className="mt-4">{`{`}</div>
              <div className="ml-4">&quot;success&quot;: true,</div>
              <div className="ml-4">&quot;data&quot;: {`{`}</div>
              <div className="ml-8">&quot;checkin_id&quot;: &quot;checkin_123456&quot;,</div>
              <div className="ml-8">&quot;employee_id&quot;: &quot;EMP001&quot;,</div>
              <div className="ml-8">&quot;timestamp&quot;: &quot;2024-01-15T08:30:00Z&quot;,</div>
              <div className="ml-8">&quot;status&quot;: &quot;checked_in&quot;,</div>
              <div className="ml-8">&quot;location&quot;: {`{`}</div>
              <div className="ml-12">&quot;latitude&quot;: 10.762622,</div>
              <div className="ml-12">&quot;longitude&quot;: 106.660172,</div>
              <div className="ml-12">&quot;address&quot;: &quot;123 Nguyễn Huệ, Q1, TP.HCM&quot;</div>
              <div className="ml-8">{`}`}</div>
              <div className="ml-4">{`},`}</div>
              <div className="ml-4">&quot;message&quot;: &quot;Check-in thành công&quot;</div>
              <div>{`}`}</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Error Response</h4>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="text-gray-400">HTTP 400 Bad Request</div>
              <div className="mt-4">{`{`}</div>
              <div className="ml-4">&quot;success&quot;: false,</div>
              <div className="ml-4">&quot;error&quot;: {`{`}</div>
              <div className="ml-8">&quot;code&quot;: &quot;INVALID_LOCATION&quot;,</div>
              <div className="ml-8">&quot;message&quot;: &quot;Vị trí không hợp lệ&quot;,</div>
              <div className="ml-8">&quot;details&quot;: &quot;Khoảng cách từ văn phòng quá xa&quot;</div>
              <div className="ml-4">{`}`}</div>
              <div>{`}`}</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "error-codes",
      title: "Mã lỗi",
      icon: DocumentTextIcon,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã lỗi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HTTP Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">INVALID_API_KEY</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">401</td>
                  <td className="px-6 py-4 text-sm text-gray-500">API Key không hợp lệ</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">INVALID_SECRET_KEY</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">401</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Secret Key không hợp lệ</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">INVALID_LOCATION</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">400</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Vị trí check-in không hợp lệ</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">ALREADY_CHECKED_IN</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">409</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Đã check-in rồi, chưa check-out</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">NOT_CHECKED_IN</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">409</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Chưa check-in, không thể check-out</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">RATE_LIMIT_EXCEEDED</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">429</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Vượt quá giới hạn request</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tài liệu tích hợp API</h1>
        <p className="text-gray-600">Hướng dẫn chi tiết về cách tích hợp và sử dụng API Check-in FAMS</p>
      </div>

      <div className="space-y-4">
        {accordionItems.map((item) => {
          const isExpanded = expandedItems.includes(item.id)
          const Icon = item.icon

          return (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-gray-500" />
                  <span className="font-medium text-gray-900">{item.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4">
                    {item.content}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Cần hỗ trợ?</h3>
        <p className="text-blue-800 text-sm mb-3">
          Nếu bạn gặp khó khăn trong quá trình tích hợp, vui lòng liên hệ với đội ngũ kỹ thuật.
        </p>
        <div className="flex gap-4 text-sm">
          <span className="text-blue-700">📧 Email: support@fams.vn</span>
          <span className="text-blue-700">📞 Hotline: 1900-xxxx</span>
        </div>
      </div>
      
    </div>
  )
}