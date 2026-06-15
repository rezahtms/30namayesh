"use client";

import { Movie } from "@/libs/types/movie";
import { Clock, Star, Trash2, User } from "lucide-react";

type WatchedMovieCardProps = {
  movie: Movie;
  watchedDate: string;
  onRemove: (movieId: number) => void;
};

export function WatchedMovieCard({
  movie,
  watchedDate,
  onRemove,
}: WatchedMovieCardProps) {
  return (
    <article className="group relative bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-sm border border-white/[0.05] rounded-2xl overflow-hidden hover:border-white/[0.1] hover:shadow-xl hover:shadow-black/20 transition-all duration-500">
      <div className="flex flex-col sm:flex-row gap-0">
        <div className="relative w-full sm:w-40 lg:w-48 aspect-[2/3] sm:aspect-auto overflow-hidden shrink-0">
          <img
            src={movie.image}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-gray-950/90 via-gray-950/30 to-transparent"></div>
        </div>

        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-white font-bold text-lg sm:text-xl leading-tight">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>{movie.year}</span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    <span>{movie.director}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onRemove(movie.id)}
                className="shrink-0 p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                aria-label={`حذف ${movie.title} از لیست تماشا شده`}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 rounded-full border border-amber-500/20">
                <Star className="h-4 w-4 text-amber-400" fill="currentColor" />
                <span className="text-amber-400 text-sm font-bold">
                  {movie.rating}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] rounded-full border border-white/[0.05]">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">{movie.duration}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {movie.genre.map((g) => (
                  <span
                    key={g}
                    className="px-2.5 py-1 bg-white/[0.03] text-gray-300 text-xs font-medium rounded-full border border-white/[0.05]"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
            <p className="text-xs text-gray-500">
              تاریخ تماشا:{" "}
              <span className="text-gray-400 font-medium">{watchedDate}</span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
