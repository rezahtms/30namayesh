// components/blog/BlogCard.tsx
import type { BlogPost } from "@/libs/constants/blog";
import { Clock } from "lucide-react";
import Link from "next/link";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`#`}
      className="group block bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-2xl overflow-hidden hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent z-10"></div>
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 z-20">
          <span className="px-2.5 py-1 bg-gray-950/80 backdrop-blur-sm text-gray-300 text-xs font-medium rounded-lg border border-white/[0.08]">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-2.5 group-hover:text-red-400 transition-colors duration-300 line-clamp-2 leading-relaxed">
          {post.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center justify-between text-xs text-gray-400 pt-4 border-t border-white/[0.05]">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-white/10 bg-gray-800">
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
            <Clock className="h-3 w-3" strokeWidth={1.5} />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
