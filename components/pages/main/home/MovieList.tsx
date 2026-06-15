"use client";

import { movies } from "@/libs/constants/movie";
import { Clapperboard } from "lucide-react";
import { MovieCard } from "./MovieCard";

export function MovieList() {
  return (
    <section
      aria-label="لیست فیلم‌ها"
      className="w-full space-y-8 sm:space-y-10"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-amber-400/10 to-red-500/10 rounded-xl border border-white/[0.05]">
            <Clapperboard className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg sm:text-xl">
              همه فیلم‌ها
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              {movies.length} فیلم
            </p>
          </div>
        </div>
      </div>

      <div className="grid items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-5 sm:gap-6">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
