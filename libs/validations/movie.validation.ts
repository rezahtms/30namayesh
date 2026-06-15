import { z } from "zod"

const MAX_FILE_SIZE = 2 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const imageFileSchema = z
  .any()
  .refine((file) => file instanceof File, "تصویر الزامی است")
  .refine((file) => file.size <= MAX_FILE_SIZE, "حجم تصویر باید کمتر از ۲ مگابایت باشد")
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "فقط فرمت‌های jpg, jpeg, png, webp مجاز است"
  )

const imageFileOrStringSchema = z.union([
  z.string().min(1),
  imageFileSchema,
])

export const movieSchema = z.object({
  title: z.string().min(1, "نام فیلم الزامی است").min(2, "حداقل ۲ کاراکتر"),
  image: imageFileSchema,
  rating: z.number().min(0, "حداقل ۰").max(10, "حداکثر ۱۰"),
  duration: z.string().min(1, "مدت زمان الزامی است"),
  year: z.number().min(1900, "سال معتبر نیست").max(2030, "سال معتبر نیست"),
  director: z.string().min(1, "نام کارگردان الزامی است"),
  genre: z.string().min(1, "ژانر الزامی است"),
  summary: z.string().min(1, "خلاصه فیلم الزامی است").min(10, "حداقل ۱۰ کاراکتر"),
  actors: z.array(
    z.object({
      name: z.string().min(1, "نام بازیگر الزامی است"),
      avatar: imageFileOrStringSchema,
    })
  ).min(1, "حداقل یک بازیگر اضافه کنید"),
})

export type MovieFormValues = z.infer<typeof movieSchema>