import { useState } from "react";
import { Search, ArrowLeft, Star, BookOpen } from "lucide-react";
import React from "react";
const books = [
  {
    id: 1,
    title: "بوف کور",
    author: "صادق هدایت",
    rating: 4.7,
    description:
      "رمانی تاریک و سوررئالیستی که داستان زندگی یک نقاش منزوی را روایت می‌کند.",
    color: "from-slate-300 to-slate-400",
  },
  {
    id: 2,
    title: "کلیدر",
    author: "محمود دولت‌آبادی",
    rating: 4.9,
    description:
      "حماسه‌ای انسانی و اجتماعی در باب مقاومت و زندگی روستایی ایران.",
    color: "from-stone-300 to-stone-400",
  },
  {
    id: 3,
    title: "سمفونی مردگان",
    author: "عباس معروفی",
    rating: 4.6,
    description:
      "روایت خانواده‌ای در آذربایجان که درگیر تقدیر و اراده آزاد است.",
    color: "from-zinc-300 to-zinc-400",
  },
  {
    id: 4,
    title: "چشم‌هایش",
    author: "بزرگ علوی",
    rating: 4.5,
    description:
      "داستانی عاشقانه و سیاسی که در دوران مبارزات ضد استبدادی رخ می‌دهد.",
    color: "from-neutral-300 to-neutral-400",
  },
  {
    id: 5,
    title: "آواز کشتگان",
    author: "جلال آل احمد",
    rating: 4.3,
    description:
      "مجموعه داستان‌هایی که زندگی طبقات پایین جامعه ایران را به تصویر می‌کشد.",
    color: "from-slate-200 to-slate-300",
  },
  {
    id: 6,
    title: "شازده احتجاب",
    author: "هوشنگ گلشیری",
    rating: 4.8,
    description:
      "تصویری از انحطاط اشراف‌زادگی ایرانی از دریچه ذهن آخرین شازده.",
    color: "from-gray-300 to-gray-400",
  },
  {
    id: 7,
    title: "مدیر مدرسه",
    author: "جلال آل احمد",
    rating: 4.2,
    description:
      "نگاهی انتقادی به سیستم آموزشی ایران از زاویه دید یک مدیر مدرسه.",
    color: "from-stone-200 to-stone-300",
  },
  {
    id: 8,
    title: "هم‌نوایی شبانه",
    author: "رضا قاسمی",
    rating: 4.4,
    description:
      "رمانی موسیقایی درباره تبعید، خاطره و هویت یک موسیقی‌دان ایرانی.",
    color: "from-zinc-200 to-zinc-300",
  },
  {
    id: 9,
    title: "جای خالی سلوچ",
    author: "محمود دولت‌آبادی",
    rating: 4.6,
    description:
      "داستان زنی روستایی که با غیاب شوهرش زندگی خود را از نو می‌سازد.",
    color: "from-neutral-200 to-neutral-300",
  },
  {
    id: 10,
    title: "نفرین زمین",
    author: "جلال آل احمد",
    rating: 4.1,
    description:
      "روایت تغییرات اجتماعی در روستاهای ایران در دوران مدرنیزاسیون.",
    color: "from-slate-300 to-slate-400",
  },
  {
    id: 11,
    title: "تنگسیر",
    author: "صادق چوبک",
    rating: 4.5,
    description:
      "داستان مردی از جنوب ایران که برای دادخواهی و انتقام قیام می‌کند.",
    color: "from-stone-300 to-stone-400",
  },
  {
    id: 12,
    title: "سنگ صبور",
    author: "صادق چوبک",
    rating: 4.3,
    description:
      "رمانی واقع‌گرا که زندگی فقر و تنهایی در شیراز دهه ۱۳۲۰ را روایت می‌کند.",
    color: "from-zinc-300 to-zinc-400",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" dir="ltr">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={
            star <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : star - 0.5 <= rating
              ? "fill-amber-300 text-amber-300"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
      <span className="text-xs text-white/90 font-medium mr-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
// ... (بخش imports و داده‌ها ثابت باقی می‌ماند)

function BookCard({ book }: { book: (typeof books)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-3 cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Book Cover - گوشه‌های بسیار گردتر (پینترستی) */}
      <div
        className="relative w-full rounded-3xl overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ aspectRatio: "2/3" }}
      >
        <div className={`w-full h-full bg-gradient-to-br ${book.color}`} />

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-black/40 flex flex-col justify-end p-4 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-white text-xs text-right line-clamp-3 leading-relaxed">
            {book.description}
          </div>
        </div>
      </div>

      {/* Title & Author */}
      <div className="text-right w-full px-1">
        <p className="text-[14px] font-bold text-gray-800 truncate">
          {book.title}
        </p>
        <p className="text-[12px] text-gray-500 mt-0.5">{book.author}</p>
      </div>
    </div>
  );
}

export default function ShowesMorePage() {
  const [query, setQuery] = useState("داستان");

  return (
    <div className="min-h-screen bg-[#f9f9f9]" dir="rtl">
      {/* هدر ثابت و شیک */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="text-teal-600 font-bold text-lg">کتابیوم</div>
          <div className="flex-1 max-w-md">
            <input
              className="w-full bg-gray-100 rounded-full py-2 px-5 text-sm outline-none"
              placeholder="جستجو در کتاب‌ها..."
            />
          </div>
        </div>
      </header>

      {/* Main Grid - ستون‌های ریزتر و فاصله بیشتر برای استایل پینترست */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </main>
    </div>
  );
}
