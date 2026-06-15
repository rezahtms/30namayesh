import { prisma } from "@/libs/prisma/client"

export class MovieService {
  static async findAll() {
    return prisma.movie.findMany({
      include: {
        actors: true,
      },
      orderBy: { createdAt: "desc" },
    })
  }

  static async search(filmName: string) {
    return prisma.movie.findMany({
      where: {
        title: {
          contains: filmName,
        },
      },
      include: {
        actors: true,
      },
      orderBy: { createdAt: "desc" },
    })
  }

  static async findById(id: number) {
    return prisma.movie.findUnique({
      where: { id },
      include: {
        actors: true,
      },
    })
  }
}