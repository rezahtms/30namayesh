import { WatchedMovieList } from "@/components/pages/main/home/WatchedMovieList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "فیلم‌های تماشا شده | سینمایش",
  description: "لیست فیلم‌هایی که تماشا کرده‌اید",
};

export default function WatchedPage() {
  return (
    <main className="min-h-screen relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 bg-gray-950 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/95 to-gray-950"></div>
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/[0.02] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.02] rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-4xl mx-auto space-y-8 sm:space-y-12">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
            فیلم‌های تماشا شده
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            فیلم‌هایی که تماشا کرده‌اید و از آن‌ها لذت برده‌اید
          </p>
        </div>

        <WatchedMovieList />
      </div>
    </main>
  );
}
