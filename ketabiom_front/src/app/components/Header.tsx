import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo";

//@=src
import React from "react";
// import logoImg from "@/imports/HomePage-1/50a9a903443c3aef8e8e8ce55688630c424280c1.png";
const FONT = "'Vazirmatn', sans-serif";

const SEARCH_RESULTS = [
  { id: 1, title: "عنوان کتاب", author: "نویسنده" },
  { id: 2, title: "عنوان کتاب", author: "نویسنده" },
  { id: 3, title: "عنوان کتاب", author: "نویسنده" },
  { id: 4, title: "عنوان کتاب", author: "نویسنده" },
  { id: 5, title: "عنوان کتاب", author: "نویسنده" },
  { id: 6, title: "عنوان کتاب", author: "نویسنده" },
];

function SearchDropdown({
  query,
  onShowMore,
}: {
  query: string;
  onShowMore: () => void;
}) {
  if (!query.trim()) return null;

  return (
    <div
      className="absolute top-[calc(100%+8px)] left-0 right-0 bg-[#eaeaea] rounded-[14px] shadow-[0px_4px_20px_rgba(35,100,116,0.18)] z-50 overflow-hidden"
      dir="rtl"
    >
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {SEARCH_RESULTS.slice(0, 3).map((book) => (
            <button
              key={book.id}
              className="flex flex-col items-center gap-2 group cursor-pointer outline-none"
            >
              <div className="w-full aspect-[3/4] bg-[#d9d9d9] rounded-[20px] transition-all duration-200 group-hover:bg-[#c4c4c4] group-hover:scale-[1.02]" />
              <p
                className="text-black text-[14px] sm:text-[18px] font-medium text-right whitespace-nowrap"
                style={{ fontFamily: FONT }}
              >
                {book.title}
              </p>
              <p
                className="text-[#3d3d3d] text-[11px] sm:text-[14px] font-medium text-right -mt-1"
                style={{ fontFamily: FONT }}
              >
                {book.author}
              </p>
            </button>
          ))}
        </div>

        {/* Show more */}
        <div className="mt-5 flex justify-center">
          <button
            onClick={onShowMore}
            className="text-[#4499af] text-[15px] sm:text-[17px] font-semibold border border-[#4499af] rounded-full px-8 py-2 hover:bg-[#4499af] hover:text-white transition-all duration-200"
            style={{ fontFamily: FONT }}
          >
            نمایش بیشتر
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setOpen(e.target.value.trim().length > 0);
  }

  function handleShowMore() {
    alert(`نمایش همه نتایج برای: ${query}`);
  }

  return (
    <header
      className="sticky top-0 z-50 w-full bg-[#fafafa] shadow-[0px_1px_8px_0px_#236474]"
      style={{ height: "100px" }}
    >
      <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <Logo />
        {/* <div className="flex items-center gap-1 shrink-0">
          <div className="h-[70px] w-[105px] relative">
            <img
              src={logoImg}
              alt="کتابیوم"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
          <span
            className="text-[#236474] text-[18px] font-bold hidden sm:block"
            style={{ fontFamily: FONT, direction: "rtl" }}
          >
            کتابیوم
          </span>
        </div> */}

        {/* Search bar + dropdown */}
        <div className="flex-1 max-w-[600px] relative" ref={wrapperRef}>
          <div className="relative flex items-center bg-[#ebf5f7] rounded-full shadow-[0px_1px_3px_1px_#236474] h-[50px] px-4">
            <input
              type="text"
              placeholder="جستجو"
              dir="rtl"
              value={query}
              onChange={handleChange}
              onFocus={() => query.trim() && setOpen(true)}
              className="flex-1 bg-transparent outline-none border-none text-right text-[#4499af] placeholder-[#4499af] text-[17px] px-3"
              style={{ fontFamily: FONT }}
            />
            <Search className="text-[#4499af] shrink-0" size={20} />
          </div>

          {open && <SearchDropdown query={query} onShowMore={handleShowMore} />}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0" dir="rtl">
          {/* <button
            className="bg-[#4499af] text-white rounded-[20px] shadow-[0px_4px_4px_1px_rgba(0,0,0,0.25)] px-4 sm:px-6 h-[44px] text-[16px] sm:text-[20px] font-semibold whitespace-nowrap hover:bg-[#3a8a9e] transition-colors"
            style={{ fontFamily: FONT }}
          >
            ورود
          </button> */}
          <Link
            to="/login"
            className="bg-[#4499af] text-white rounded-[20px] shadow-[0px_4px_4px_1px_rgba(0,0,0,0.25)] px-4 sm:px-6 h-[44px] text-[16px] sm:text-[20px] font-semibold whitespace-nowrap hover:bg-[#3a8a9e] transition-colors"
            style={{ fontFamily: FONT }}
          >
            ورود
          </Link>
          <Link
            to="/register"
            className="bg-[#4499af] text-white rounded-[20px] shadow-[0px_4px_4px_1px_rgba(0,0,0,0.25)] px-4 sm:px-6 h-[44px] text-[16px] sm:text-[20px] font-semibold whitespace-nowrap hover:bg-[#3a8a9e] transition-colors"
            style={{ fontFamily: FONT }}
          >
            ثبت‌نام
          </Link>
          {/* <div className="flex items-center gap-2 sm:gap-3 shrink-0" dir="rtl">
  <Link 
    to="/login" // ۲. تعیین مقصد
    className="bg-[#4499af] text-white rounded-[20px] px-4 sm:px-6 h-[44px] flex items-center justify-center text-[16px] sm:text-[20px] font-semibold hover:bg-[#3a8a9e] transition-colors"
    style={{ fontFamily: FONT }}
  >
    ورود
  </Link>
  <Link 
    to="/register" // ۲. تعیین مقصد
    className="bg-[#4499af] text-white rounded-[20px] px-4 sm:px-6 h-[44px] flex items-center justify-center text-[16px] sm:text-[20px] font-semibold hover:bg-[#3a8a9e] transition-colors"
    style={{ fontFamily: FONT }}
  >
    ثبت نام
  </Link>
</div> */}

          {/* <button
            className="bg-[#4499af] text-white rounded-[20px] shadow-[0px_4px_4px_1px_rgba(0,0,0,0.25)] px-4 sm:px-6 h-[44px] text-[16px] sm:text-[20px] font-semibold whitespace-nowrap hover:bg-[#3a8a9e] transition-colors"
            style={{ fontFamily: FONT }}
          >
            ثبت نام
          </button> */}
        </div>
      </div>
    </header>
  );
}
