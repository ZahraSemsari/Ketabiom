import React from "react";
import { useState } from "react";
import imgLogo3 from "../../imports/HomePage-1/imgLogo3.png";
//const FONT = "'Vazirmatn', sans-serif";
import tailwindConfig from "../../../tailwind.config";

const books = [
  { id: 1, title: "عنوان کتاب 1", author: "نویسنده" },
  { id: 2, title: "عنوان کتاب 2", author: "نویسنده" },
  { id: 3, title: "عنوان کتاب 3", author: "نویسنده" },
  { id: 4, title: "عنوان کتاب 4", author: "نویسنده" },
  { id: 5, title: "عنوان کتاب 5", author: "نویسنده" },
  { id: 6, title: "عنوان کتاب 6", author: "نویسنده" },
  { id: 7, title: "عنوان کتاب 7", author: "نویسنده" },
  { id: 8, title: "عنوان کتاب 8", author: "نویسنده" },
  { id: 9, title: "عنوان کتاب 9", author: "نویسنده" },
  // { id: 10, title: 'عنوان کتاب 10', author: 'نویسنده' },
];

export default function HomePage_body2() {
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const handleBookClick = (bookId: number) => {
    setSelectedBook(bookId);
  };
  return (
    <main className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 lg:py-8">
      {/* Popular Books Section */}
      <section className="mt-4 sm:mt-6 lg:mt-8">
        <h2 className="font-['Arad:SemiBold',sans-serif] text-[18px] sm:text-[20px] lg:text-[24px] text-black text-right mb-3 sm:mb-4 lg:mb-8">
          کتاب های محبوب :
        </h2>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div className="overflow-x-auto pb-4 scrollbar-hide" dir="rtl">
            <div className="flex gap-4 sm:gap-6 lg:gap-14">
              {books.map((book) => (
                <button
                  key={book.id}
                  onClick={() => handleBookClick(book.id)}
                  className={`flex-shrink-0 flex flex-col items-center transition-all hover:scale-105 ${
                    selectedBook === book.id
                      ? "ring-2 ring-buttons rounded-[30px] p-2"
                      : ""
                  }`}
                >
                  <div className="bg-gray1 h-[130px] w-[100px] sm:h-[140px] sm:w-[108px] lg:h-[150px] lg:w-[115px] rounded-[30px] mb-2 sm:mb-3 hover:shadow-lg transition-shadow" />
                  <p className="font-['Arad:Medium',sans-serif] text-[13px] sm:text-[14px] lg:text-[16px] text-black text-center w-[100px] sm:w-[108px] lg:w-[115px] line-clamp-1">
                    {book.title}
                  </p>
                  <p className="font-['Arad:Medium',sans-serif] text-[11px] sm:text-[12px] lg:text-[14px] text-darkgray text-center">
                    {book.author}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
