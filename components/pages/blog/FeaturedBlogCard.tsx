import type { BlogPost } from "@/libs/constants/blog";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

type FeaturedBlogCardProps = {
  post: BlogPost;
};

export function FeaturedBlogCard({ post }: FeaturedBlogCardProps) {
  return (
    <Link
      href={`/blog/${post.id}`}
      className="group block relative mb-10 sm:mb-14 overflow-hidden rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.08] transition-all duration-500"
    >
      <div className="grid lg:grid-cols-2 gap-0">
        <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] overflow-hidden bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-950/40 to-transparent lg:bg-gradient-to-r lg:from-gray-950/80 lg:via-gray-950/40 lg:to-transparent z-10"></div>
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </div>

        <div className="relative z-20 p-6 sm:p-8 lg:p-10 flex flex-col justify-center lg:-ml-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-gradient-to-r from-amber-600/20 via-red-500/20 to-rose-600/20 text-red-400 text-xs font-medium rounded-full border border-red-500/20">
              ویژه
            </span>
            <span className="px-3 py-1 bg-white/[0.03] text-gray-300 text-xs font-medium rounded-full border border-white/[0.05]">
              {post.category}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300 leading-tight">
            {post.title}
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/10 bg-gray-800">
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="text-gray-300">{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
