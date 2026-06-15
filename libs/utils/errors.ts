export class AppError extends Error {
  public statusCode: number
  public code?: string

  constructor(message: string, statusCode: number = 400, code?: string) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
    this.code = code
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

export class ValidationError extends AppError {
  public errors?: any

  constructor(message: string, errors?: any) {
    super(message, 422, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
    this.errors = errors
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}