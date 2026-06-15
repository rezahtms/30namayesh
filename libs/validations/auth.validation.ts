import { z } from 'zod'

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'نام کاربری الزامی است')
    .min(3, 'نام کاربری حداقل ۳ کاراکتر باشد')
    .max(50, 'نام کاربری حداکثر ۵۰ کاراکتر باشد'),
  password: z
    .string()
    .min(1, 'رمز عبور الزامی است')
    .min(6, 'رمز عبور حداقل ۶ کاراکتر باشد')
    .max(100, 'رمز عبور حداکثر ۱۰۰ کاراکتر باشد'),
})

export type LoginInput = z.infer<typeof loginSchema>