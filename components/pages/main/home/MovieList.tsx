"use client";

import type { Movie } from "@/libs/types/movie";
import { Clapperboard } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";

function MovieListContent() {
  const searchParams = useSearchParams();
  const filmName = searchParams.get("filmName");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);

        const url = filmName
          ? `/api/movies?filmName=${encodeURIComponent(filmName)}`
          : "/api/movies";

        const response = await fetch(url);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "خطا در دریافت فیلم‌ها");
        }

        setMovies(result.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [filmName]);

  return (
    <section
      aria-label="لیست فیلم‌ها"
      className="w-full space-y-8 sm:space-y-10"
    >
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

      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="flex items-center gap-3 text-gray-400">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-sm">در حال بارگذاری...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center text-red-400 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-sm">فیلمی با این نام یافت نشد</p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="grid items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
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
      )}
    </section>
  );
}

export function MovieList() {
  return (
    <Suspense
      fallback={
        <div className="w-full space-y-8 sm:space-y-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-amber-400/10 to-red-500/10 rounded-xl border border-white/[0.05]">
              <Clapperboard className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg sm:text-xl">
                همه فیلم‌ها
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm">...</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] bg-gray-800/30 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        </div>
      }
    >
      <MovieListContent />
    </Suspense>
  );
}
