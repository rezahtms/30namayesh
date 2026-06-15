export interface FormValues {
  username: string
  password: string
}

export interface LoginResponse {
  success: boolean
  data: {
    user: {
      id: number
      email: string
      name: string | null
    }
  }
  message: string
}

export interface ApiErrorResponse {
  success: false
  error: string
  errors?: Record<string, string[]>
  timestamp: string
}