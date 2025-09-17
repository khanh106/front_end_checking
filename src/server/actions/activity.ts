'use server'

export interface ActivityLog {
  id: string
  action: 'create_key' | 'revoke_key' | 'rotate_key' | 'view_secret' | 'login' | 'logout'
  userId: string
  userName: string
  keyId?: string
  keyName?: string
  ipAddress: string
  userAgent: string
  timestamp: string
  details?: string
}

let activityLogs: ActivityLog[] = [
  {
    id: '1',
    action: 'create_key',
    userId: 'admin_001',
    userName: 'Admin User',
    keyId: 'ak_live_123456789',
    keyName: 'API Key 2025-09-17 10:30:00',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: '2025-09-17T10:30:00.000Z',
    details: 'Tạo API key mới thành công'
  },
  {
    id: '2',
    action: 'view_secret',
    userId: 'admin_001',
    userName: 'Admin User',
    keyId: 'ak_live_123456789',
    keyName: 'API Key 2025-09-17 10:30:00',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: '2025-09-17T11:15:30.000Z',
    details: 'Xem secret key'
  },
  {
    id: '3',
    action: 'rotate_key',
    userId: 'admin_001',
    userName: 'Admin User',
    keyId: 'ak_live_123456789',
    keyName: 'API Key 2025-09-17 10:30:00',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: '2025-09-17T14:22:15.000Z',
    details: 'Xoay secret key thành công'
  },
  {
    id: '4',
    action: 'login',
    userId: 'admin_001',
    userName: 'Admin User',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: '2025-09-17T08:00:00.000Z',
    details: 'Đăng nhập thành công'
  },
  {
    id: '5',
    action: 'revoke_key',
    userId: 'admin_001',
    userName: 'Admin User',
    keyId: 'ak_live_987654321',
    keyName: 'API Key 2025-09-16 15:45:00',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: '2025-09-16T16:30:45.000Z',
    details: 'Thu hồi API key'
  }
]

export interface ActivityFilters {
  startDate?: string
  endDate?: string
  action?: string
  userId?: string
  page?: number
  limit?: number
}

export async function getActivityLogs(filters: ActivityFilters = {}): Promise<{
  logs: ActivityLog[]
  total: number
  page: number
  totalPages: number
}> {
  try {
    let filteredLogs = [...activityLogs]

    if (filters.startDate) {
      filteredLogs = filteredLogs.filter(log => log.timestamp >= filters.startDate!)
    }

    if (filters.endDate) {
      filteredLogs = filteredLogs.filter(log => log.timestamp <= filters.endDate!)
    }

    if (filters.action && filters.action !== 'all') {
      filteredLogs = filteredLogs.filter(log => log.action === filters.action)
    }

    if (filters.userId && filters.userId !== 'all') {
      filteredLogs = filteredLogs.filter(log => log.userId === filters.userId)
    }

    filteredLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    const page = filters.page || 1
    const limit = filters.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const paginatedLogs = filteredLogs.slice(startIndex, endIndex)
    const totalPages = Math.ceil(filteredLogs.length / limit)

    return {
      logs: paginatedLogs,
      total: filteredLogs.length,
      page,
      totalPages
    }
  } catch (error) {
    console.error('Lỗi khi lấy activity logs:', error)
    return {
      logs: [],
      total: 0,
      page: 1,
      totalPages: 1
    }
  }
}

export async function logActivity(activity: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<void> {
  try {
    const newLog: ActivityLog = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    }
    
    activityLogs.unshift(newLog)
    
    if (activityLogs.length > 1000) {
      activityLogs = activityLogs.slice(0, 1000)
    }
  } catch (error) {
    console.error('Lỗi khi log activity:', error)
  }
}

export async function getUniqueUsers(): Promise<Array<{ id: string; name: string }>> {
  try {
    const users = new Map<string, string>()
    
    activityLogs.forEach(log => {
      users.set(log.userId, log.userName)
    })
    
    return Array.from(users.entries()).map(([id, name]) => ({ id, name }))
  } catch (error) {
    console.error('Lỗi khi lấy danh sách users:', error)
    return []
  }
}
