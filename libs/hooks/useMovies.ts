"use client";

import { Movie } from "@/libs/types/movie";
import { useCallback, useEffect, useState } from "react";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async (filmName?: string) => {
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
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return { movies, loading, error, refetch: fetchMovies };
}