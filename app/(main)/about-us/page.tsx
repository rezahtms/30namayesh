import { stats, team, values } from "@/libs/constants/about-us";
import { Film } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "درباره ما | سینمایش",
  description: "با تیم سینمایش و ماموریت ما در دنیای سینما بیشتر آشنا شوید",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 bg-gray-950 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/95 to-gray-950"></div>
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/[0.02] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-500/[0.02] rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-500/[0.01] rounded-full blur-[150px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400/10 via-red-500/10 to-rose-600/10 rounded-3xl border border-white/[0.06] mb-6 backdrop-blur-sm">
            <Film
              className="h-7 w-7 sm:h-9 sm:w-9 text-red-400"
              strokeWidth={2}
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
            درباره سینمایش
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            سینمایش پلتفرم جامع اطلاعات سینما و تلویزیون است. ما عاشق سینما
            هستیم و می‌خواهیم این عشق را با شما به اشتراک بگذاریم.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-16 sm:mb-20">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="relative group p-4 sm:p-6 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-2xl text-center hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-500/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <Icon
                    className="h-6 w-6 sm:h-8 sm:w-8 text-red-400 mx-auto mb-2 sm:mb-3"
                    strokeWidth={1.5}
                  />
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              ارزش‌های ما
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              اصولی که به آن‌ها پایبند هستیم
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group p-5 sm:p-6 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-2xl hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400/10 via-red-500/10 to-rose-600/10 rounded-xl flex items-center justify-center border border-white/[0.05] group-hover:border-white/[0.1] transition-all duration-300">
                      <Icon
                        className="h-5 w-5 sm:h-6 sm:w-6 text-red-400"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base sm:text-lg mb-1.5">
                        {value.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              تیم ما
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              با اعضای تیم سینمایش آشنا شوید
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="group p-5 sm:p-6 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-2xl hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400/20 via-red-500/20 to-rose-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/[0.05] group-hover:border-white/[0.1] transition-all duration-300">
                  <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm sm:text-base mb-1">
                  {member.name}
                </h3>
                <p className="text-red-400 text-xs sm:text-sm font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
