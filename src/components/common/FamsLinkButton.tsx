"use client"
import { useState } from "react"

interface FamsLinkButtonProps {
  className?: string
  children: React.ReactNode
}

export default function FamsLinkButton({ className = "", children }: FamsLinkButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFamsLink = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/auth/fams-link", {
        method: "GET",
        credentials: "include"
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Không thể tạo link FAMS")
      }

      if (data.success && data.url) {
        window.open(data.url, "_blank", "noopener,noreferrer")
      } else {
        throw new Error("Không nhận được URL FAMS")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Lỗi không xác định"
      setError(errorMessage)
      console.error("FAMS link error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleFamsLink}
        disabled={isLoading}
        className={`${className} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            <span>Đang tải...</span>
          </div>
        ) : (
          children
        )}
      </button>
      
      {error && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}