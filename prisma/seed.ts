import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 شروع seed...')

  // فقط کاربر رو پاک کن
  await prisma.user.deleteMany()

  // ساخت کاربر آزمایشی
  const hashedPassword = await bcrypt.hash('123456', 10)

  const user = await prisma.user.create({
    data: {
      email: 'test@test.com',
      password: hashedPassword,
      name: 'کاربر آزمایشی',
    },
  })

  console.log('✅ کاربر آزمایشی ساخته شد:')
  console.log('   📧 Email: test@test.com')
  console.log('   🔑 Password: 123456')
  console.log('   👤 Name: کاربر آزمایشی')
}

main()
  .catch((e) => {
    console.error('❌ خطا در seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })