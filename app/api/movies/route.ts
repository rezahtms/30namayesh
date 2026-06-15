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

    const formattedMovies = movies.map((movie) => ({
      ...movie,
      genre: movie.genre.split(",").map((g) => g.trim()),
    }))

    return Response.json({
      success: true,
      data: formattedMovies,
      total: formattedMovies.length,
    })
  } catch (error) {
    console.error("API Error:", error)
    return Response.json(
      { success: false, error: "خطا در دریافت فیلم‌ها" },
      { status: 500 }
    )
  }
}