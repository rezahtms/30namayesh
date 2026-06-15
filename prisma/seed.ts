import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 شروع seed...")

  await prisma.actor.deleteMany()
  await prisma.movie.deleteMany()
  await prisma.user.deleteMany()

  const movies = [
    {
      title: "The Shawshank Redemption",
      image: "https://picsum.photos/id/1/400/600",
      rating: 9.3,
      duration: "۱۴۲ دقیقه",
      year: 1994,
      director: "Frank Darabont",
      genre: "درام, جنایی",
      summary: "یک بانکدار به نام اندی دوفرین به اشتباه به قتل همسرش متهم می‌شود و به زندان شاوشنک فرستاده می‌شود.",
      actors: [
        { name: "Tim Robbins", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tim" },
        { name: "Morgan Freeman", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=morgan" },
      ],
    },
    {
      title: "The Godfather",
      image: "https://picsum.photos/id/2/400/600",
      rating: 9.2,
      duration: "۱۷۵ دقیقه",
      year: 1972,
      director: "Francis Ford Coppola",
      genre: "درام, جنایی",
      summary: "داستان حماسی خانواده کورلئونه به رهبری ویتو کورلئونه.",
      actors: [
        { name: "Marlon Brando", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marlon" },
        { name: "Al Pacino", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=al" },
      ],
    },
    {
      title: "The Dark Knight",
      image: "https://picsum.photos/id/3/400/600",
      rating: 9.0,
      duration: "۱۵۲ دقیقه",
      year: 2008,
      director: "Christopher Nolan",
      genre: "اکشن, جنایی, درام",
      summary: "بتمن با کمک ستوان گوردون و دادستان هاروی دنت، با جرم و جنایت در گاتهام مبارزه می‌کند.",
      actors: [
        { name: "Christian Bale", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=christian" },
        { name: "Heath Ledger", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=heath" },
      ],
    },
    {
      title: "Pulp Fiction",
      image: "https://picsum.photos/id/4/400/600",
      rating: 8.9,
      duration: "۱۵۴ دقیقه",
      year: 1994,
      director: "Quentin Tarantino",
      genre: "جنایی, درام",
      summary: "چهار داستان درهم تنیده از خلافکاران لس آنجلس.",
      actors: [
        { name: "John Travolta", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john" },
        { name: "Samuel L. Jackson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=samuel" },
      ],
    },
    {
      title: "Inception",
      image: "https://picsum.photos/id/5/400/600",
      rating: 8.8,
      duration: "۱۴۸ دقیقه",
      year: 2010,
      director: "Christopher Nolan",
      genre: "اکشن, علمی تخیلی",
      summary: "دام کاب، یک دزد ماهر در استخراج اسرار از ناخودآگاه افراد.",
      actors: [
        { name: "Leonardo DiCaprio", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=leonardo" },
        { name: "Joseph Gordon-Levitt", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=joseph" },
      ],
    },
    {
      title: "Interstellar",
      image: "https://picsum.photos/id/6/400/600",
      rating: 8.7,
      duration: "۱۶۹ دقیقه",
      year: 2014,
      director: "Christopher Nolan",
      genre: "علمی تخیلی, درام",
      summary: "در آینده‌ای نزدیک، زمین در حال نابودی است.",
      actors: [
        { name: "Matthew McConaughey", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=matthew" },
        { name: "Anne Hathaway", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anne" },
      ],
    },
  ]

  for (const movieData of movies) {
    const { actors, ...movieFields } = movieData
    const movie = await prisma.movie.create({ data: movieFields })

    for (const actor of actors) {
      await prisma.actor.create({
        data: { ...actor, movieId: movie.id },
      })
    }
  }

  console.log(`✅ ${movies.length} فیلم ساخته شد`)
  console.log("🌱 Seed با موفقیت انجام شد!")
}

main()
  .catch((e) => console.error("❌ خطا:", e))
  .finally(() => prisma.$disconnect())