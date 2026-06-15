"use client";

import { navLinks } from "@/libs/constants/header";
import { Film, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function MainHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // 🆕 تابع خروج
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  };

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 transition-all duration-500">
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isScrolled
            ? "bg-gray-950/95 backdrop-blur-2xl shadow-[0_8px_40px_-15px_rgba(0,0,0,0.6)] border-b border-white/[0.06]"
            : "bg-gradient-to-b from-gray-950/80 via-gray-950/40 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute -top-20 left-1/4 w-[400px] h-[400px] bg-red-500/[0.02] rounded-full blur-[100px]"></div>
          <div className="absolute top-0 right-1/3 w-[300px] h-[300px] bg-rose-500/[0.02] rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"></div>
        </div>
      </div>

      <nav className="relative max-w-1/2 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="صفحه اصلی"
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-red-500 to-rose-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500 group-hover:scale-150"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-400/20 via-red-500/20 to-rose-600/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-amber-400 via-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:shadow-red-500/40 transition-all duration-300 group-hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <Film
                    className="relative h-5 w-5 sm:h-6 sm:w-6 text-white"
                    strokeWidth={2.5}
                  />
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-amber-400 via-red-400 to-rose-400 bg-clip-text text-transparent">
                  سینمایش
                </span>
                <span className="text-[9px] sm:text-[10px] text-gray-500 -mt-0.5 tracking-[0.2em] uppercase">
                  cinemayesh
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-1 p-1 bg-white/[0.03] rounded-2xl backdrop-blur-sm border border-white/[0.04]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    isActive
                      ? "text-white bg-white/[0.08] shadow-lg shadow-black/10"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-colors duration-300 ${
                      isActive
                        ? "text-red-400"
                        : "text-gray-500 group-hover:text-gray-300"
                    }`}
                    strokeWidth={2}
                  />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* 🆕 دکمه خروج - دسکتاپ */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleLogout}
              className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300"
            >
              <LogOut className="h-4 w-4" strokeWidth={2} />
              <span>خروج</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all duration-200 group"
              aria-label={isMobileMenuOpen ? "بستن منو" : "باز کردن منو"}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="absolute inset-0 rounded-xl bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              {isMobileMenuOpen ? (
                <X className="relative h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="relative h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`lg:hidden fixed inset-0 top-16 md:top-20 transition-all duration-500 ${
          isMobileMenuOpen
            ? "bg-black/80 backdrop-blur-sm opacity-100 pointer-events-auto"
            : "bg-transparent opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-16 md:top-20 right-0 h-full w-80 sm:w-96 bg-gray-950/98 backdrop-blur-2xl border-l border-white/[0.06] shadow-2xl transform transition-all duration-500 ease-out ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-amber-500/[0.04] rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 -left-20 w-48 h-48 bg-red-500/[0.03] rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.03)_0%,transparent_60%)]"></div>
        </div>

        <div className="relative p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 via-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20">
                <Film className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-xl bg-gradient-to-r from-amber-400 via-red-400 to-rose-400 bg-clip-text text-transparent">
                سینمایش
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-4 mb-2">
              منو
            </p>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/[0.08] border-r-2 border-red-500"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition-colors duration-300 ${
                      isActive
                        ? "text-red-400"
                        : "text-gray-500 group-hover:text-gray-300"
                    }`}
                    strokeWidth={2}
                  />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* 🆕 دکمه خروج - موبایل */}
          <div className="pt-4 border-t border-white/[0.06]">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200"
            >
              <LogOut className="h-4 w-4" strokeWidth={2} />
              خروج از حساب
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
