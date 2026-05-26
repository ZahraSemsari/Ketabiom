import { useState, useRef, useEffect } from "react";
import { Search, ArrowRight, MoreVertical } from "lucide-react";
import React from "react";
const books = [
  { id: 1, title: "عنوان کتاب اول", author: "نویسنده اول", rating: "۴.۵" },
  { id: 2, title: "عنوان کتاب دوم", author: "نویسنده دوم", rating: "۴.۰" },
  { id: 3, title: "عنوان کتاب سوم", author: "نویسنده سوم", rating: "۳.۸" },
  { id: 4, title: "عنوان کتاب چهارم", author: "نویسنده چهارم", rating: "۳.۵" },
];

function BookRow({
  book,
  onDelete,
}: {
  book: (typeof books)[0];
  onDelete: (id: number) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    // ردیف به صورت پیش‌فرض تمام عرض است
    <div className="flex flex-row-reverse items-center w-full py-6 px-6 md:px-12 hover:bg-gray-50 transition-colors border-b border-gray-100">
      {/* منو */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400"
        >
          <MoreVertical size={20} />
        </button>
        {menuOpen && (
          <div className="absolute left-0 top-12 z-50 bg-white rounded-lg shadow-xl border border-gray-100 min-w-[120px]">
            <button
              onClick={() => {
                onDelete(book.id);
                setMenuOpen(false);
              }}
              className="w-full text-right px-4 py-3 text-sm text-red-500 hover:bg-red-50"
            >
              حذف کتاب
            </button>
          </div>
        )}
      </div>

      {/* اطلاعات - در دسکتاپ فضای زیادی می‌گیرد */}
      <div className="flex-1 text-right mr-6">
        <p className="text-lg font-bold text-gray-800">{book.title}</p>
        <p className="text-sm text-gray-500">{book.author}</p>
        <p className="text-xs text-gray-400 mt-1">امتیاز: {book.rating}</p>
      </div>

      {/* عکس کتاب */}
      <div className="w-20 h-28 md:w-32 md:h-40 flex-shrink-0 rounded-xl bg-gray-200 shadow-sm" />
    </div>
  );
}

export default function LibraryDetail() {
  const [bookList, setBookList] = useState(books);
  const handleDelete = (id: number) =>
    setBookList((prev) => prev.filter((b) => b.id !== id));

  return (
    <div
      className="min-h-screen bg-white"
      dir="rtl"
      style={{ fontFamily: "'Vazirmatn', sans-serif" }}
    >
      {/* هدر - همیشه فول عرض */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 md:px-10 py-4 flex flex-row-reverse items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            ک
          </div>
          <span className="text-lg font-bold text-teal-800 hidden md:block">
            کتابیوم
          </span>
        </div>

        {/* جستجو - در لپ‌تاپ کشیده‌تر می‌شود */}
        <div className="flex-1 max-w-4xl flex items-center bg-gray-100 rounded-full px-5 py-2.5 gap-3">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="جستجو..."
            className="flex-1 bg-transparent text-sm outline-none text-right"
          />
        </div>

        <button className="text-gray-600 hover:text-teal-600">
          <ArrowRight size={24} />
        </button>
      </header>
      {/* محتوا - تمام عرض */}
      <main className="w-full">
        <div className="p-6 md:px-12 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">کتابخانه من</h2>
        </div>

        {bookList.length === 0 ? (
          <div className="text-center py-32 text-gray-400">کتابی یافت نشد.</div>
        ) : (
          // استفاده از divide-y برای ایجاد خط کمرنگ بین ردیف‌ها
          // divide-gray-100 رنگ خط را بسیار کمرنگ و شیک می‌کند
          <div className="flex flex-col divide-y divide-gray-100">
            {bookList.map((book) => (
              <BookRow key={book.id} book={book} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      {/* محتوا - بدون محدودیت max-w برای پر کردن کل صفحه
      <main className="w-full">
        <div className="p-6 md:px-12 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">کتابخانه من</h2>
        </div>

        {bookList.length === 0 ? (
          <div className="text-center py-32 text-gray-400">کتابی یافت نشد.</div>
        ) : (
          <div className="flex flex-col">
            {bookList.map((book) => (
              <BookRow key={book.id} book={book} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main> */}
    </div>
  );
}
