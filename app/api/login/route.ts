import { NextRequest } from 'next/server'

const STATIC_USER = {
  username: 'admin',
  password: 'admin123',
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (username !== STATIC_USER.username || password !== STATIC_USER.password) {
      return Response.json(
        { success: false, error: 'نام کاربری یا رمز عبور اشتباه است' },
        { status: 401 }
      )
    }

    const token = Buffer.from(
      JSON.stringify({ username, timestamp: Date.now() })
    ).toString('base64')

    return Response.json({
      success: true,
      data: {
        token,
        user: { username },
      },
      message: 'ورود موفقیت‌آمیز بود',
    })
  } catch (error) {
    return Response.json(
      { success: false, error: 'خطای سرور' },
      { status: 500 }
    )
  }
}