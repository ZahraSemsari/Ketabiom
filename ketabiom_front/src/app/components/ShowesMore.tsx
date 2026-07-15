import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface BookSearchResult {
  id: number;
  title: string;
  author_name: string;
  publisher_name: string;
  cover_url: string | null;
  pages_count: number;
  published_year: number | null;
  average_rating: number;
  reviews_count: number;
  description?: string;
}

export default function ShowMore() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = location.state?.query || "";

  const [books, setBooks] = useState<BookSearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // const res = await axios.get(
        //   `${baseUrl}/api/books/search/?search=${encodeURIComponent(query)}`
        // );
        const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");

        const res = await axios.get(
          `${baseUrl}/api/books/search/?q=${encodeURIComponent(query)}`
        );

        // console.log(res.data);
        console.log("SEARCH RESULT:", res.data);
        console.log("FIRST BOOK:", res.data[0]);
        console.log("DESCRIPTION:", res.data[0]?.description);
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];

        console.log("BOOK 0:", data[0]);
        console.log("DESCRIPTION:", data[0]?.description);
        setBooks(data);
      } catch (err: any) {
        console.log("SEARCH ERROR:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchBooks();
    }
  }, [query]);

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen flex justify-center items-center">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#fafafa]">
      <div className="px-8 py-6 md:px-12 lg:px-16">
        <h1 className="text-2xl font-bold mb-6">نتایج جستجو برای "{query}"</h1>

        {books.length === 0 ? (
          <p className="text-center text-gray-500">کتابی پیدا نشد</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books.map((book) => {
              console.log(book.title, book.description);

              return (
                <div
                  key={book.id}
                  onClick={() => navigate(`/books/${book.id}`)}
                  className="
      group
      bg-white
      rounded-3xl
      overflow-hidden
      shadow-sm
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      cursor-pointer
      border
      border-gray-100

    "
                >
                  <div className="relative w-full h-[220px] overflow-hidden bg-gray-100 group">
                    {book.cover_url ? (
                      <img
                        src={book.cover_url}
                        alt={book.title}
                        className="
      w-full
      h-full
      object-cover
      transition-transform
      duration-500
      group-hover:scale-105
    "
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300" />
                    )}

                    <div
                      className="
    absolute
    inset-0
    bg-black/75
    flex
    items-end
    p-4
    opacity-0
    group-hover:opacity-100
    transition-opacity
    duration-300
    pointer-events-none
  "
                    >
                      <p className="text-white text-xs sm:text-sm leading-relaxed line-clamp-6 text-right">
                        {book.description || "توضیحی ثبت نشده است"}
                      </p>
                    </div>
                  </div>
                  <div className="px-3 pt-3 pb-3">
                    <h2 className="font-bold text-sm leading-6 line-clamp-2 min-h-[48px]">
                      {book.title}
                    </h2>

                    <p className="mt-2 text-xs text-gray-500 line-clamp-1">
                      {book.author_name}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-yellow-500 font-semibold text-sm">
                        ⭐ {Number(book.average_rating).toFixed(1)}
                      </span>

                      <span className="text-gray-400 text-sm">
                        {book.reviews_count} نظر
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
