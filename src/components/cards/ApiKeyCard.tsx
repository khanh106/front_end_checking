'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import CopyButton from '@/components/common/CopyButton'
import Revealable from '@/components/common/Revealable'
import { Eye, EyeOff, RotateCcw, Trash2, Calendar, Clock } from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  apiKey: string
  secretKey: string
  status: 'active' | 'revoked'
  createdAt: string
  lastUsed?: string
}

interface ApiKeyCardProps {
  apiKey: ApiKey
  onRevoke: (id: string) => void
  onRotate: (id: string) => void
  onSecretView: (id: string) => void
}

export default function ApiKeyCard({ apiKey, onRevoke, onRotate, onSecretView }: ApiKeyCardProps) {
  const [showSecret, setShowSecret] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleRevealSecret = () => {
    if (!showSecret) {
      onSecretView(apiKey.id)
    }
    setShowSecret(!showSecret)
  }

  return (
    <Card className="border border-gray-200 shadow-sm bg-white">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-bold text-gray-900">
          {apiKey.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              API Key
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={apiKey.apiKey}
                readOnly
                className="flex-1 bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm font-mono text-gray-800 focus:outline-none"
              />
              <CopyButton text={apiKey.apiKey} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Secret Key
            </label>
            <div className="flex items-center gap-2">
              <input 
                type={showSecret ? "text" : "password"}
                value={showSecret ? apiKey.secretKey : "••••••••••••••••••••••••••••••••"}
                readOnly
                className="flex-1 bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm font-mono text-gray-800 focus:outline-none"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleRevealSecret}
                className="px-3"
              >
                {showSecret ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
              <CopyButton text={apiKey.secretKey} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Trạng thái:</span>
            <Badge 
              variant={apiKey.status === 'active' ? 'default' : 'secondary'}
              className={apiKey.status === 'active' 
                ? 'bg-green-500 text-white px-3 py-1 rounded-full text-sm' 
                : 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm'
              }
            >
              {apiKey.status === 'active' ? 'Đang hoạt động' : 'Đã thu hồi'}
            </Badge>
          </div>
          
          <Button
            onClick={() => onRevoke(apiKey.id)}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 px-4 py-2 rounded-md"
          >
            <Trash2 className="h-4 w-4" />
            Thu Hồi Khóa
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}