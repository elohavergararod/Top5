import type { TopList, ListFormData, ApiResponse } from '../types'

const BASE = '/api/v1'

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(err.error ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function getLists(): Promise<TopList[]> {
  const res = await request<ApiResponse<TopList[]>>('/lists')
  return res.data
}

export async function getList(id: string): Promise<TopList> {
  const res = await request<ApiResponse<TopList>>(`/lists/${id}`)
  return res.data
}

export async function createList(data: ListFormData): Promise<TopList> {
  const res = await request<ApiResponse<TopList>>('/lists', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return res.data
}

export async function updateList(id: string, data: ListFormData): Promise<TopList> {
  const res = await request<ApiResponse<TopList>>(`/lists/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
  return res.data
}

export async function deleteList(id: string): Promise<void> {
  await request<ApiResponse<null>>(`/lists/${id}`, { method: 'DELETE' })
}