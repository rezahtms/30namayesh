import { MovieList } from "@/components/pages/main/home/MovieList";
import { HeroSearch } from "../../../components/pages/main/home/SearchBox";

export default function HomePage() {
  return (
    <section className="w-full flex flex-col gap-5 max-w-[90%] mt-25 mx-auto md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%] 2xl:max-w-[65%] my-40">
      <HeroSearch />
      <MovieList />
    </section>
  );
}
