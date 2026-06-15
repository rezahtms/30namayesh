// components/movie/MovieCard.tsx
"use client";

import { Movie } from "@/libs/types/movie";
import {
  BookOpen,
  CheckCircle,
  ChevronDown,
  Clock,
  Star,
  User,
  Users,
} from "lucide-react";
import { useCallback, useState } from "react";
import { SuccessModal } from "./SuccessModal";

type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  const [isWatched, setIsWatched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMarkAsWatched = useCallback(() => {
    setIsWatched(true);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <article className="group relative bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-sm border border-white/[0.05] rounded-3xl overflow-hidden hover:border-white/[0.1] hover:shadow-2xl hover:shadow-black/30 transition-all duration-500 hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={movie.image}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/30 to-gray-950/10 group-hover:via-gray-950/40 transition-all duration-500"></div>

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-950/70 backdrop-blur-md rounded-full border border-white/[0.1] shadow-lg">
              <Star
                className="h-4 w-4 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                fill="currentColor"
              />
              <span className="text-white text-sm font-bold">
                {movie.rating}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-950/70 backdrop-blur-md rounded-full border border-white/[0.1] shadow-lg">
              <Clock className="h-4 w-4 text-rose-400" />
              <span className="text-gray-200 text-sm font-medium">
                {movie.duration}
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-xl sm:text-2xl leading-tight mb-2 drop-shadow-lg">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="font-medium">{movie.year}</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-gray-400" />
                <span>{movie.director}</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
            {movie.genre.map((g) => (
              <span
                key={g}
                className="px-2.5 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20 shadow-lg"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors duration-200 group/expand"
            >
              <BookOpen className="h-4 w-4" />
              <span className="font-medium">خلاصه داستان</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? "max-h-48 mt-3 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-400 text-sm leading-7 text-justify border-r-2 border-red-500/30 pr-4">
                {movie.summary}
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Users className="h-3.5 w-3.5" />
              <span className="font-medium tracking-wide uppercase">
                بازیگران
              </span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {movie.actors.map((actor) => (
                <div
                  key={actor.id}
                  className="flex items-center gap-2 group/actor"
                  title={actor.name}
                >
                  <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/[0.06] group-hover/actor:ring-red-500/50 transition-all duration-300 group-hover/actor:scale-110 bg-gray-800 shrink-0">
                    <img
                      src={actor.avatar}
                      alt={actor.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/actor:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="text-xs text-gray-400 group-hover/actor:text-white transition-colors duration-300 font-medium">
                    {actor.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleMarkAsWatched}
            disabled={isWatched}
            className={`w-full relative flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-2xl text-sm font-semibold transition-all duration-500 overflow-hidden group/btn ${
              isWatched
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 cursor-not-allowed"
                : "bg-white/[0.03] hover:bg-white/[0.06] text-gray-300 hover:text-white border border-white/[0.08] hover:border-white/[0.15] hover:shadow-lg hover:shadow-black/20"
            }`}
          >
            {isWatched ? (
              <>
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span>تماشا شده</span>
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-red-500/10 to-rose-600/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                <Star className="h-5 w-5 text-amber-400 group-hover/btn:animate-pulse" />
                <span>علامت به عنوان تماشا شده</span>
              </>
            )}
          </button>
        </div>
      </article>

      {showModal && (
        <SuccessModal movieTitle={movie.title} onClose={handleCloseModal} />
      )}
    </>
  );
}
