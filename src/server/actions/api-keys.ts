'use server'

import { randomBytes } from 'crypto'

interface ApiKey {
  id: string
  name: string
  apiKey: string
  secretKey: string
  status: 'active' | 'revoked'
  createdAt: string
  lastUsed?: string
}

let apiKeys: ApiKey[] = []

export async function getApiKeys(): Promise<ApiKey[]> {
  return apiKeys.filter(key => key.status === 'active')
}

export async function createApiKey(name: string): Promise<ApiKey | null> {
  try {
    const activeKeys = apiKeys.filter(key => key.status === 'active')
    if (activeKeys.length > 0) {
      throw new Error('Mỗi tài khoản admin chỉ được có 1 API key và Secret Key duy nhất.')
    }
    
    const id = randomBytes(16).toString('hex')
    const apiKey = `ak_live_${randomBytes(16).toString('hex')}`
    const secretKey = `sk_live_${randomBytes(32).toString('hex')}`
    
    const newKey: ApiKey = {
      id,
      name,
      apiKey,
      secretKey,
      status: 'active',
      createdAt: new Date().toISOString()
    }
    
    apiKeys.push(newKey)
    return newKey
  } catch (error) {
    console.error('Lỗi khi tạo API key:', error)
    return null
  }
}

export async function revokeApiKey(id: string): Promise<boolean> {
  try {
    const keyIndex = apiKeys.findIndex(key => key.id === id)
    if (keyIndex !== -1) {
      apiKeys[keyIndex].status = 'revoked'
      return true
    }
    return false
  } catch (error) {
    console.error('Lỗi khi thu hồi API key:', error)
    return false
  }
}

export async function rotateApiKey(id: string): Promise<ApiKey | null> {
  try {
    const keyIndex = apiKeys.findIndex(key => key.id === id)
    if (keyIndex !== -1 && apiKeys[keyIndex].status === 'active') {
      const newSecretKey = `sk_live_${randomBytes(32).toString('hex')}`
      apiKeys[keyIndex].secretKey = newSecretKey
      apiKeys[keyIndex].lastUsed = new Date().toISOString()
      return apiKeys[keyIndex]
    }
    return null
  } catch (error) {
    console.error('Lỗi khi xoay API key:', error)
    return null
  }
}

export async function logSecretView(keyId: string, userId: string): Promise<void> {
  try {
    console.log(`[SECURITY LOG] User ${userId} viewed secret for API key ${keyId} at ${new Date().toISOString()}`)
  } catch (error) {
    console.error('Lỗi khi log sự kiện xem secret:', error)
  }
}