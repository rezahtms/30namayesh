import { prisma } from '@/libs/prisma/client'
import { AppError } from '@/libs/utils/errors'
import bcrypt from 'bcryptjs'

export class AuthService {
  static async login(username: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: username },
          { name: username },
        ],
      },
    })

    if (!user) {
      throw new AppError('نام کاربری یا رمز عبور اشتباه است', 401)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw new AppError('نام کاربری یا رمز عبور اشتباه است', 401)
    }

    // حذف پسورد از response
    const { password: _, ...userWithoutPassword } = user
    return { user: userWithoutPassword }
  }
}