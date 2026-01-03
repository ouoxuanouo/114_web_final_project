import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:3001'

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

export async function unwrap(promise) {
  const res = await promise
  if (!res?.data) throw new Error('Empty response')
  if (res.data.success) return res.data.data
  const msg = res.data.message || 'API Error'
  const details = res.data?.error?.details
  throw new Error(details ? `${msg}: ${details}` : msg)
}
