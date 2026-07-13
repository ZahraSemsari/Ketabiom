// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// // تعریف تایپ کتاب بر اساس ساختار دیتای دریافتی شما
// type Book = {
//   id: number;
//   title: string;
//   author_name: string; // فیلد استخراج شده از خروجی شما
//   cover_url: string | null;
//   average_rating: number;
// };

// export default function HomePage_body2() {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const scrollRef = useRef<HTMLDivElement>(null);
//   // تنظیمات Base URL
//   const rawBaseUrl =
//     import.meta.env.VITE_API_URL || "https://bookiom.liara.run";
//   const baseUrl = rawBaseUrl.replace(/\/$/, "").replace(/\/api$/, "");
//   const apiBaseUrl = `${baseUrl}/api`;

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${apiBaseUrl}/books/books/`);

//         // دریافت داده‌ها (آرایه مستقیم یا آبجکت دارای results)
//         const fetchedData: Book[] = Array.isArray(res.data)
//           ? res.data
//           : res.data?.results || [];

//         // فیلتر کردن کتاب‌هایی با امتیاز >= 3 و مرتب‌سازی نزولی بر اساس امتیاز
//         const processedBooks = fetchedData
//           .filter((book) => (Number(book.average_rating) || 0) >= 2)
//           .sort(
//             (a, b) =>
//               (Number(b.average_rating) || 0) - (Number(a.average_rating) || 0)
//           );

//         setBooks(processedBooks);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, [apiBaseUrl]);

//   const handleBookClick = (bookId: number) => {
//     navigate(`/books/${bookId}`);
//   };

//   const scrollLeft = () => {
//     scrollRef.current?.scrollBy({
//       left: -350,
//       behavior: "smooth",
//     });
//   };

//   const scrollRight = () => {
//     scrollRef.current?.scrollBy({
//       left: 350,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <main className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 lg:py-8">
//       <section className="mt-4 sm:mt-6 lg:mt-8">
//         <h2 className="font-['Arad:SemiBold',sans-serif] text-[18px] sm:text-[20px] lg:text-[24px] text-black text-right mb-3 sm:mb-4 lg:mb-8">
//           کتاب های محبوب :
//         </h2>

//         {/* <div className="relative">
//           <div className="overflow-x-auto pb-4 scrollbar-hide" dir="rtl"> */}
//         <div className="relative">
//           {/* فلش راست */}
//           <button
//             onClick={scrollRight}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
//           >
//             <ChevronRight size={28} />
//           </button>

//           {/* فلش چپ */}
//           <button
//             onClick={scrollLeft}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
//           >
//             <ChevronLeft size={28} />
//           </button>

//           <div
//             ref={scrollRef}
//             className="overflow-x-auto scrollbar-hide scroll-smooth px-12"
//             dir="rtl"
//           >
//             {loading ? (
//               <p className="text-right text-gray-500 font-['Arad:Medium',sans-serif]">
//                 در حال دریافت اطلاعات...
//               </p>
//             ) : books.length === 0 ? (
//               <p className="text-right text-gray-500 font-['Arad:Medium',sans-serif]">
//                 کتابی با امتیاز ۳ یا بالاتر یافت نشد.
//               </p>
//             ) : (
//               <div className="flex gap-4 sm:gap-6 lg:gap-14">
//                 {books.map((book) => (
//                   <button
//                     key={book.id}
//                     onClick={() => handleBookClick(book.id)}
//                     className="flex-shrink-0 flex flex-col items-center transition-all hover:scale-105 cursor-pointer"
//                   >
//                     {/* تصویر کتاب */}
//                     {book.cover_url ? (
//                       <img
//                         src={book.cover_url}
//                         alt={book.title}
//                         className="bg-gray-200 object-cover h-[130px] w-[100px] sm:h-[140px] sm:w-[108px] lg:h-[150px] lg:w-[115px] rounded-[30px] mb-2 sm:mb-3 hover:shadow-lg transition-shadow"
//                       />
//                     ) : (
//                       <div className="bg-gray-200 h-[130px] w-[100px] sm:h-[140px] sm:w-[108px] lg:h-[150px] lg:w-[115px] rounded-[30px] mb-2 sm:mb-3 flex items-center justify-center">
//                         <span className="text-[10px] text-gray-500">
//                           بدون تصویر
//                         </span>
//                       </div>
//                     )}

//                     {/* نام کتاب */}
//                     <p
//                       className="font-['Arad:Medium',sans-serif] text-[13px] sm:text-[14px] lg:text-[16px] text-black text-center w-[100px] sm:w-[108px] lg:w-[115px] line-clamp-1"
//                       title={book.title}
//                     >
//                       {book.title}
//                     </p>

//                     {/* نام نویسنده */}
//                     <p className="font-['Arad:Medium',sans-serif] text-[11px] sm:text-[12px] lg:text-[14px] text-darkgray text-center w-[100px] sm:w-[108px] lg:w-[115px] line-clamp-1">
//                       {book.author_name || "نویسنده نامشخص"}
//                     </p>
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Book = {
  id: number;
  title: string;
  author_name?: string;
  cover_url: string | null;
  average_rating?: number | string | null;
  published_year?: number | string | null;
};

type BookSliderProps = {
  title: string;
  books: Book[];
  loading: boolean;
  emptyMessage: string;
  onBookClick: (bookId: number) => void;
};

function getBookRating(book: Book) {
  const rating = Number(book.average_rating);

  if (Number.isNaN(rating)) {
    return 0;
  }

  return rating;
}

function getBookPublishedYear(book: Book) {
  const year = Number(book.published_year);

  if (Number.isNaN(year)) {
    return 0;
  }

  return year;
}

function BookSlider({
  title,
  books,
  loading,
  emptyMessage,
  onBookClick,
}: BookSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-4 sm:mt-6 lg:mt-8">
      <h2 className="font-['Arad:SemiBold',sans-serif] text-[18px] sm:text-[20px] lg:text-[24px] text-black text-right mb-3 sm:mb-4 lg:mb-8">
        {title}
      </h2>

      <div className="relative">
        <button
          type="button"
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
          aria-label="اسکرول به راست"
        >
          <ChevronRight size={28} />
        </button>

        <button
          type="button"
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
          aria-label="اسکرول به چپ"
        >
          <ChevronLeft size={28} />
        </button>

        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth px-12"
          dir="rtl"
        >
          {loading ? (
            <p className="text-right text-gray-500 font-['Arad:Medium',sans-serif]">
              در حال دریافت اطلاعات...
            </p>
          ) : books.length === 0 ? (
            <p className="text-right text-gray-500 font-['Arad:Medium',sans-serif]">
              {emptyMessage}
            </p>
          ) : (
            <div className="flex gap-4 sm:gap-6 lg:gap-14">
              {books.map((book) => (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => onBookClick(book.id)}
                  className="flex-shrink-0 flex flex-col items-center transition-all hover:scale-105 cursor-pointer"
                >
                  {book.cover_url ? (
                    <img
                      src={book.cover_url}
                      alt={book.title}
                      className="bg-gray-200 object-cover h-[130px] w-[100px] sm:h-[140px] sm:w-[108px] lg:h-[150px] lg:w-[115px] rounded-[30px] mb-2 sm:mb-3 hover:shadow-lg transition-shadow"
                    />
                  ) : (
                    <div className="bg-gray-200 h-[130px] w-[100px] sm:h-[140px] sm:w-[108px] lg:h-[150px] lg:w-[115px] rounded-[30px] mb-2 sm:mb-3 flex items-center justify-center">
                      <span className="text-[10px] text-gray-500">
                        بدون تصویر
                      </span>
                    </div>
                  )}

                  <p
                    className="font-['Arad:Medium',sans-serif] text-[13px] sm:text-[14px] lg:text-[16px] text-black text-center w-[100px] sm:w-[108px] lg:w-[115px] line-clamp-1"
                    title={book.title}
                  >
                    {book.title}
                  </p>

                  <p
                    className="font-['Arad:Medium',sans-serif] text-[11px] sm:text-[12px] lg:text-[14px] text-darkgray text-center w-[100px] sm:w-[108px] lg:w-[115px] line-clamp-1"
                    title={book.author_name || "نویسنده نامشخص"}
                  >
                    {book.author_name || "نویسنده نامشخص"}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function HomePage_body2() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const rawBaseUrl =
    import.meta.env.VITE_API_URL || "https://bookiom.liara.run";
  const baseUrl = rawBaseUrl.replace(/\/$/, "").replace(/\/api$/, "");
  const apiBaseUrl = `${baseUrl}/api`;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${apiBaseUrl}/books/books/`);

        const fetchedData: Book[] = Array.isArray(res.data)
          ? res.data
          : res.data?.results || [];

        setBooks(fetchedData);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [apiBaseUrl]);

  const handleBookClick = (bookId: number) => {
    navigate(`/books/${bookId}`);

    window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }, 0);
  };

  const popularBooks = [...books]
    .filter((book) => getBookRating(book) >= 2)
    .sort((a, b) => getBookRating(b) - getBookRating(a));

  const latestBooks = [...books]
    .filter((book) => getBookPublishedYear(book) > 0)
    .sort((a, b) => {
      const yearDifference = getBookPublishedYear(b) - getBookPublishedYear(a);

      if (yearDifference !== 0) {
        return yearDifference;
      }

      return b.id - a.id;
    })
    .slice(0, 10);

  return (
    <main className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 lg:py-8">
      <BookSlider
        title="کتاب های محبوب :"
        books={popularBooks}
        loading={loading}
        emptyMessage="کتاب محبوبی یافت نشد."
        onBookClick={handleBookClick}
      />

      <BookSlider
        title="تازه‌ترین کتاب‌ها :"
        books={latestBooks}
        loading={loading}
        emptyMessage="کتابی با سال انتشار معتبر یافت نشد."
        onBookClick={handleBookClick}
      />
    </main>
  );
}

