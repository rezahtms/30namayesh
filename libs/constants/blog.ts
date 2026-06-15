

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  authorAvatar: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
};
export const blogPosts = [
  {
    id: 1,
    title: "بررسی فیلم Oppenheimer: شاهکاری دیگر از کریستوفر نولان",
    excerpt:
      "در این مقاله به بررسی عمیق فیلم اوپنهایمر، جدیدترین ساخته کریستوفر نولان می‌پردازیم و جنبه‌های مختلف این اثر سینمایی را تحلیل می‌کنیم.",
    image: "https://picsum.photo/id/1/800/450",
    author: "امیر حسین هاشمی دو",
    authorAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=amir&backgroundColor=b6e3f4",
    category: "نقد فیلم",
    date: "۲۵ اسفند ۱۴۰۳",
    readTime: "۱۵ دقیقه",
    featured: true,
  },
  {
    id: 2,
    title: "بهترین فیلم‌های علمی تخیلی دهه اخیر",
    excerpt:
      "مروری بر برترین فیلم‌های علمی تخیلی که در ده سال اخیر اکران شده‌اند و توانسته‌اند تحسین منتقدان و مخاطبان را برانگیزند.",
    image: "https://picsum.photos/id/20/800/450",
    author: "عرفان غلامی",
    authorAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=erfan&backgroundColor=c0aede",
    category: "لیست فیلم",
    date: "۲۳ اسفند ۱۴۰۳",
    readTime: "۱۲ دقیقه",
    featured: false,
  },
  {
    id: 3,
    title: "آشنایی با سبک نئو-نوآر در سینما",
    excerpt:
      "سبک نئو-نوآر یکی از جذاب‌ترین و تأثیرگذارترین سبک‌های سینمایی معاصر است. در این مقاله با ویژگی‌ها و فیلم‌های شاخص این سبک آشنا می‌شویم.",
    image: "https://picsum.photos/id/26/800/450",
    author: "محمد حسین سرمدی",
    authorAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=mohammad&backgroundColor=ffd5dc",
    category: "آموزش سینما",
    date: "۲۰ اسفند ۱۴۰۳",
    readTime: "۱۰ دقیقه",
    featured: false,
  },
  {
    id: 4,
    title: "تأثیر هوش مصنوعی بر صنعت فیلمسازی",
    excerpt:
      "هوش مصنوعی به سرعت در حال تغییر صنعت فیلمسازی است. از نویسندگی فیلمنامه تا جلوه‌های ویژه، AI همه جا حضور دارد.",
    image: "https://picsum.photos/id/60/800/450",
    author: "سید امیر مسعود حسینی",
    authorAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=amirmasoud&backgroundColor=d1d4f9",
    category: "تکنولوژی",
    date: "۱۸ اسفند ۱۴۰۳",
    readTime: "۸ دقیقه",
    featured: false,
  },
  {
    id: 5,
    title: "راهنمای کامل شروع فیلمسازی با بودجه کم",
    excerpt:
      "آیا می‌خواهید فیلمسازی را شروع کنید اما بودجه کافی ندارید؟ در این راهنمای کامل به شما نشان می‌دهیم چطور با کمترین هزینه فیلم بسازید.",
    image: "https://picsum.photos/id/65/800/450",
    author: "امیر حسین هاشمی دو",
    authorAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=amir2&backgroundColor=b6e3f4",
    category: "آموزش فیلمسازی",
    date: "۱۵ اسفند ۱۴۰۳",
    readTime: "۲۰ دقیقه",
    featured: false,
  },
  {
    id: 6,
    title: "بررسی سریال The Last of Us: اقتباسی وفادار و درخشان",
    excerpt:
      "سریال The Last of Us ثابت کرد که اقتباس از بازی‌های ویدئویی می‌تواند موفق و تحسین‌برانگیز باشد. در این مقاله به بررسی این سریال می‌پردازیم.",
    image: "https://picsum.photos/id/76/800/450",
    author: "عرفان غلامی",
    authorAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=erfan2&backgroundColor=c0aede",
    category: "نقد سریال",
    date: "۱۰ اسفند ۱۴۰۳",
    readTime: "۱۴ دقیقه",
    featured: false,
  },
];

