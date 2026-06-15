"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const filmName = searchParams.get("filmName");
    if (filmName) {
      setSearchValue(filmName);
    }
  }, [searchParams]);

  const updateUrlParams = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set("filmName", value.trim());
      } else {
        params.delete("filmName");
      }

      const queryString = params.toString();
      router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, {
        scroll: false,
      });
    },
    [router, pathname, searchParams],
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      updateUrlParams(searchValue);
    },
    [searchValue, updateUrlParams],
  );

  const handleClearInput = useCallback(() => {
    setSearchValue("");
    inputRef.current?.focus();
  }, []);

  const handleClearAll = useCallback(() => {
    setSearchValue("");
    updateUrlParams("");
    inputRef.current?.focus();
  }, [updateUrlParams]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        handleClearInput();
      }
    },
    [handleClearInput],
  );

  const currentFilmName = searchParams.get("filmName");

  return (
    <section aria-label="جستجوی فیلم" className="w-full mx-auto space-y-3">
      <form
        role="search"
        onSubmit={handleSubmit}
        className="relative group"
        noValidate
      >
        <label htmlFor="film-search" className="sr-only">
          نام فیلم مورد نظر خود را جستجو کنید
        </label>

        <div
          className={`relative flex items-center bg-gray-900/60 backdrop-blur-xl border rounded-2xl transition-all duration-300 shadow-lg ${
            isFocused
              ? "border-red-500/50 shadow-red-500/10 ring-2 ring-red-500/20"
              : "border-white/[0.08] hover:border-white/[0.15] shadow-black/10"
          }`}
        >
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <Search
              className={`h-5 w-5 transition-colors duration-300 ${
                isFocused ? "text-red-400" : "text-gray-500"
              }`}
              aria-hidden="true"
            />
          </div>

          <input
            ref={inputRef}
            id="film-search"
            type="search"
            name="film-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="نام فیلم را جستجو کنید..."
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            aria-label="جستجوی نام فیلم"
            aria-describedby="search-description"
            className="w-full pr-12 pl-12 py-4 sm:py-5 bg-transparent text-white placeholder-gray-500 text-sm sm:text-base outline-none rounded-2xl"
          />

          {searchValue && (
            <button
              type="button"
              onClick={handleClearInput}
              aria-label="پاک کردن متن جستجو"
              className="absolute left-14 sm:left-16 p-1.5 text-gray-500 hover:text-gray-300 hover:bg-white/[0.05] rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}

          <button
            type="submit"
            aria-label="جستجو"
            className="absolute left-2 sm:left-3 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-amber-600 via-red-500 to-rose-600 hover:from-amber-500 hover:via-red-400 hover:to-rose-500 text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-lg shadow-red-600/20 hover:shadow-red-500/30 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500/50"
          >
            <Search className="h-4 w-4 sm:hidden" aria-hidden="true" />
            <span className="hidden sm:inline">جستجو</span>
          </button>
        </div>

        <p id="search-description" className="sr-only">
          با تایپ نام فیلم و فشردن دکمه جستجو یا Enter، نتایج مرتبط نمایش داده
          خواهد شد
        </p>
      </form>

      {currentFilmName && (
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl">
          <div className="flex items-center gap-2 min-w-0">
            <Search
              className="h-4 w-4 text-red-400 shrink-0"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-300 truncate">
              نتایج جستجو برای:{" "}
              <span className="text-white font-medium">{currentFilmName}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={handleClearAll}
            aria-label="حذف جستجو و پاک کردن نتایج"
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            <span>پاک کردن</span>
          </button>
        </div>
      )}
    </section>
  );
}

export function HeroSearch() {
  return (
    <Suspense
      fallback={
        <div className="w-full mx-auto space-y-3">
          <div className="h-14 sm:h-16 bg-gray-900/40 rounded-2xl animate-pulse" />
        </div>
      }
    >
      <SearchBox />
    </Suspense>
  );
}
