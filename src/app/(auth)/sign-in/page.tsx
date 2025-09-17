import React from "react"
import SignInForm from "@/components/forms/SignInForm"

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white border rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden border mb-3 flex items-center justify-center bg-white">
            <img src="/tira-logo.svg" alt="TIRA" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">TIRA</h1>
          <p className="text-gray-500 mt-1 text-sm">Chào mừng bạn trở lại! Đăng nhập để tiếp tục quản lý.</p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}


