import prisma from "@/libs/prisma/client"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filmName = searchParams.get("filmName")

    const movies = filmName
      ? await prisma.movie.findMany({
        where: { title: { contains: filmName } },
        include: { actors: true },
        orderBy: { createdAt: "desc" },
      })
      : await prisma.movie.findMany({
        include: { actors: true },
        orderBy: { createdAt: "desc" },
      })

    const formatted = movies.map((m) => ({
      ...m,
      genre: m.genre.split(",").map((g) => g.trim()),
    }))

    return Response.json({ success: true, data: formatted, total: formatted.length })
  } catch (error) {
    console.error("GET Error:", error)
    return Response.json({ success: false, error: "خطا در دریافت فیلم‌ها" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const title = formData.get("title") as string
    const rating = parseFloat(formData.get("rating") as string)
    const duration = formData.get("duration") as string
    const year = parseInt(formData.get("year") as string)
    const director = formData.get("director") as string
    const genre = formData.get("genre") as string
    const summary = formData.get("summary") as string
    const imageFile = formData.get("image") as File

    const actorsRaw = formData.get("actors") as string
    const actorsData = JSON.parse(actorsRaw)

    const fileToBase64 = async (file: File): Promise<string> => {
      const buffer = Buffer.from(await file.arrayBuffer())
      return `data:${file.type};base64,${buffer.toString("base64")}`
    }

    let imageBase64 = ""
    if (imageFile) {
      imageBase64 = await fileToBase64(imageFile)
    }

    const actorAvatars: File[] = []
    const actorIndices: number[] = []

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("actor_avatar_") && value instanceof File) {
        const index = parseInt(key.replace("actor_avatar_", ""))
        actorAvatars.push(value)
        actorIndices.push(index)
      }
    }

    for (let i = 0; i < actorIndices.length; i++) {
      const base64 = await fileToBase64(actorAvatars[i])
      actorsData[actorIndices[i]].avatar = base64
    }

    const movie = await prisma.movie.create({
      data: {
        title,
        image: imageBase64,
        rating,
        duration,
        year,
        director,
        genre: Array.isArray(genre) ? genre.join(", ") : genre,
        summary,
        actors: {
          create: actorsData,
        },
      },
      include: { actors: true },
    })

    const formatted = {
      ...movie,
      genre: movie.genre.split(",").map((g) => g.trim()),
    }

    return Response.json({ success: true, data: formatted, message: "فیلم با موفقیت اضافه شد" }, { status: 201 })
  } catch (error) {
    console.error("POST Error:", error)
    return Response.json({ success: false, error: "خطا در افزودن فیلم" }, { status: 500 })
  }
}