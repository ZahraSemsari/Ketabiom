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
        const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");

        const res = await axios.get(
          `${baseUrl}/api/books/search/?search=${encodeURIComponent(query)}`
        );

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];

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
    <div dir="rtl" className="min-h-screen bg-[#fafafa] p-6">
      <h1 className="text-2xl font-bold mb-6">نتایج جستجو برای "{query}"</h1>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">کتابی پیدا نشد</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => navigate(`/books/${book.id}`)}
              className="bg-white rounded-xl shadow-md p-3 cursor-pointer hover:shadow-xl transition"
            >
              <div className="w-full h-[250px] overflow-hidden rounded-lg bg-gray-200">
                {book.cover_url ? (
                  <img
                    src={book.cover_url}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
                )}
              </div>

              <h2 className="mt-3 font-bold text-sm line-clamp-2">
                {book.title}
              </h2>

              <p className="text-xs text-gray-500 mt-1">{book.author_name}</p>

              <div className="mt-2 text-xs text-gray-400">
                ⭐ {book.average_rating}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
