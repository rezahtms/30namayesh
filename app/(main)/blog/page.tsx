import { BlogGrid } from "@/components/pages/blog/BlogGrid";
import { FeaturedBlogCard } from "@/components/pages/blog/FeaturedBlogCard";
import { blogPosts } from "@/libs/constants/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "وبلاگ | سینمایش",
  description: "مقالات و مطالب خواندنی درباره دنیای سینما و تلویزیون",
};

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <section className="min-h-screen relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 bg-gray-950 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/95 to-gray-950"></div>
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/[0.02] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-500/[0.02] rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-500/[0.01] rounded-full blur-[150px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
            وبلاگ سینمایش
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            مقالات، نقدها و مطالب خواندنی درباره دنیای سینما و تلویزیون
          </p>
        </div>

        {featuredPost && <FeaturedBlogCard post={featuredPost} />}

        <BlogGrid posts={regularPosts} />
      </div>
    </section>
  );
}
