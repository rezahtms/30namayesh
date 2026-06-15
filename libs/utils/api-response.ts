import { NextResponse } from 'next/server'

export class ApiResponse {
  static success(data: any, status = 200, message?: string) {
    return NextResponse.json(
      {
        success: true,
        data,
        message: message || 'عملیات با موفقیت انجام شد',
        timestamp: new Date().toISOString(),
      },
      { status }
    )
  }

  static error(message: string, status = 400, errors?: any) {
    return NextResponse.json(
      {
        success: false,
        error: message,
        errors: errors || null,
        timestamp: new Date().toISOString(),
      },
      { status }
    )
  }
}