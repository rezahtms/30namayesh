// components/movie/WatchedMovieList.tsx
"use client";

import { movies as allMovies } from "@/libs/constants/movie";
import { Movie } from "@/libs/types/movie";
import { Film, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { WatchedMovieCard } from "./WatchedMovieCard";

type WatchedMovie = {
  movie: Movie;
  watchedDate: string;
};

const initialWatchedMovies: WatchedMovie[] = [
  {
    movie: allMovies[0],
    watchedDate: "۲۵ اسفند ۱۴۰۳",
  },
  {
    movie: allMovies[2],
    watchedDate: "۲۰ اسفند ۱۴۰۳",
  },
  {
    movie: allMovies[4],
    watchedDate: "۱۵ اسفند ۱۴۰۳",
  },
];

export function WatchedMovieList() {
  const [watchedMovies, setWatchedMovies] =
    useState<WatchedMovie[]>(initialWatchedMovies);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleRemove = useCallback((movieId: number) => {
    setWatchedMovies((prev) =>
      prev.filter((item) => item.movie.id !== movieId),
    );
  }, []);

  const handleClearAll = useCallback(() => {
    setWatchedMovies([]);
    setShowClearConfirm(false);
  }, []);

  if (watchedMovies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 sm:py-32 text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-2xl"></div>
          <div className="relative p-6 bg-white/[0.02] rounded-full border border-white/[0.05]">
            <Film className="h-10 w-10 sm:h-14 sm:w-14 text-gray-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-white text-xl sm:text-2xl font-bold">
            لیست خالی است
          </h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-md">
            شما هنوز فیلمی را به عنوان تماشا شده علامت نزده‌اید. فیلم‌های مورد
            علاقه خود را تماشا کنید و آن‌ها را به این لیست اضافه کنید.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-400/10 to-emerald-500/10 rounded-xl border border-emerald-500/20">
            <Film className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg sm:text-xl">
              فیلم‌های تماشا شده
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              {watchedMovies.length} فیلم
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowClearConfirm(true)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-400 hover:text-red-300 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/30 rounded-xl transition-all duration-200"
        >
          <Trash2 className="h-4 w-4" />
          <span>پاک کردن همه</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 items-stretch sm:grid-cols-2  ">
        {watchedMovies.map((item, index) => (
          <div
            key={item.movie.id}
            className="animate-in fade-in slide-in-from-right-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <WatchedMovieCard
              movie={item.movie}
              watchedDate={item.watchedDate}
              onRemove={handleRemove}
            />
          </div>
        ))}
      </div>

      {showClearConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setShowClearConfirm(false)}
        >
          <div
            className="relative w-full max-w-md bg-gradient-to-b from-gray-900 to-gray-950 border border-white/[0.08] rounded-3xl shadow-2xl shadow-black/50 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-t-3xl"></div>

            <div className="text-center space-y-6">
              <div className="relative inline-flex">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
                <div className="relative p-4 bg-red-500/10 rounded-full">
                  <Trash2 className="h-8 w-8 text-red-400" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-white text-xl font-bold">
                  پاک کردن همه فیلم‌ها
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  آیا از پاک کردن تمام فیلم‌های تماشا شده اطمینان دارید؟ این
                  عملیات قابل بازگشت نیست.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-3 px-4 bg-white/[0.03] hover:bg-white/[0.06] text-gray-300 text-sm font-semibold rounded-2xl border border-white/[0.08] transition-all duration-200"
                >
                  انصراف
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-sm font-semibold rounded-2xl transition-all duration-300 shadow-lg shadow-red-600/20"
                >
                  پاک کردن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
