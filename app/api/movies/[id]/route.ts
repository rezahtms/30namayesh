import { MovieService } from "@/libs/services/movie.service"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filmName = searchParams.get("filmName")

    const movies = filmName
      ? await MovieService.search(filmName)
      : await MovieService.findAll()

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
    return Response.json(
      { success: false, error: "خطا در دریافت فیلم‌ها" },
      { status: 500 }
    )
  }
}