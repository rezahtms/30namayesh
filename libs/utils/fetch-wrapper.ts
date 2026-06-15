const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

interface FetchOptions extends RequestInit {
  params?: Record<string, string>
}

async function fetchWrapper<T = any>(
  endpoint: string,
  options?: FetchOptions
): Promise<{ success: boolean; data: T; message?: string }> {
  const url = new URL(`${BASE_URL}/api${endpoint}`)

  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'خطا در ارتباط با سرور')
  }

  return data
}

export const api = {
  get: <T>(endpoint: string, params?: Record<string, string>) =>
    fetchWrapper<T>(endpoint, { method: 'GET', params }),

  post: <T>(endpoint: string, body: any) =>
    fetchWrapper<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body: any) =>
    fetchWrapper<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string) =>
    fetchWrapper<T>(endpoint, { method: 'DELETE' }),
}

export { fetchWrapper };
