"use client"
import { useState } from "react"

export default function DebugPage() {
  const [checkOwnerResult, setCheckOwnerResult] = useState<any>(null)
  const [famsLinkResult, setFamsLinkResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testCheckOwner = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/check-owner", {
        method: "GET",
        credentials: "include"
      })
      const data = await response.json()
      setCheckOwnerResult({ status: response.status, data })
    } catch (error) {
      setCheckOwnerResult({ error: error instanceof Error ? error.message : "Unknown error" })
    } finally {
      setLoading(false)
    }
  }

  const testFamsLink = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/fams-link", {
        method: "GET",
        credentials: "include"
      })
      const data = await response.json()
      setFamsLinkResult({ status: response.status, data })
    } catch (error) {
      setFamsLinkResult({ error: error instanceof Error ? error.message : "Unknown error" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug FAMS Access</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Test Check Owner Permission</h2>
            <button
              onClick={testCheckOwner}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Testing..." : "Test /api/auth/check-owner"}
            </button>
            
            {checkOwnerResult && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Result:</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {JSON.stringify(checkOwnerResult, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Test FAMS Link</h2>
            <button
              onClick={testFamsLink}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Testing..." : "Test /api/auth/fams-link"}
            </button>
            
            {famsLinkResult && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Result:</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {JSON.stringify(famsLinkResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Environment Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>NODE_ENV:</strong> {process.env.NODE_ENV || "undefined"}
            </div>
            <div>
              <strong>Current URL:</strong> {typeof window !== "undefined" ? window.location.href : "SSR"}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">Hướng dẫn debug</h2>
          <ol className="list-decimal list-inside space-y-2 text-yellow-700">
            <li>Đầu tiên hãy đăng nhập vào hệ thống</li>
            <li>Sau đó test API "Check Owner Permission"</li>
            <li>Kiểm tra kết quả để xem có lỗi gì</li>
            <li>Nếu có lỗi, kiểm tra logs trên Vercel console</li>
            <li>Test API "FAMS Link" để xem có tạo được link không</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
