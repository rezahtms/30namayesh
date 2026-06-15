'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export function useLogin() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const login = async (data: { username: string; password: string }) => {
    try {
      setIsLoading(true)

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.error || 'خطا در ورود')
        throw new Error(result.error || 'خطا در ورود')
      }

      // ذخیره token
      localStorage.setItem('token', result.data.token)
      localStorage.setItem('user', JSON.stringify(result.data.user))
      document.cookie = `token=${result.data.token}; path=/; max-age=86400`

      // نمایش موفقیت
      toast.success(result.message || 'ورود موفقیت‌آمیز بود!')

      // یه تأخیر کوتاه برای دیدن toast
      await new Promise(resolve => setTimeout(resolve, 500))

      // ریدایرکت
      router.push('/home')
      router.refresh()

      return result
    } catch (err: any) {
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading }
}