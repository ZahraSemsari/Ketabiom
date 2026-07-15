import React from "react";
import { useState } from "react";
import svgPaths from "../../../imports/HomePage-1/svg-mc69sns2lc";
import imgLogo from "../../imports/HomePage-1/imgLogo.png";
import svgPathsSearch from "../../../imports/SearchBar/svg-jqxuipwkm2";
//const FONT = "'Vazirmatn', sans-serif";
import tailwindConfig from "../../../../tailwind.config";

import imgExit from "../../imports/HomePage-1/exitbtn.png";
import imgProfile from "../../imports/HomePage-1/profile_photo.png";

const BUTTON_COLOR = "#4499AF";

const searchResults = [
  { id: 1, title: "نتیجه کتاب اول", author: "نویسنده" },
  { id: 2, title: "نتیجه کتاب دوم", author: "نویسنده" },
  { id: 3, title: "نتیجه کتاب سوم", author: "نویسنده" },
];

export default function home_page_Login_Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<number | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(e.target.value.length > 0);
  };

  const handleBookClick = (bookId: number) => {
    setSelectedBook(bookId);
  };

  return (
    <div>
      <header className="bg-white w-full shadow-[0px_1px_8px_0px_#236474] relative z-20">
        {/* Desktop/Tablet Layout */}
        <div className="hidden sm:block">
          <div className="max-w-[1400px] mx-auto h-[70px] px-4 sm:px-6 lg:px-8 relative">
            {/* Logo - سمت چپ */}
            <button
              onClick={() => window.location.reload()}
              className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img
                src={imgLogo}
                alt="کتابیوم لوگو"
                className="h-[60px] sm:h-[60px] w-auto object-contain"
              />
            </button>

            {/* Search Bar - وسط */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[350px] sm:max-w-[420px] lg:max-w-[500px] px-2 sm:px-4">
              <div className="relative">
                <div className="bg-searchbg h-[36px] sm:h-[40px] rounded-[74px] shadow-[0px_1px_3px_1px_#236474] flex items-center px-3 sm:px-4 gap-2">
                  <button className="flex-shrink-0">
                    <svg
                      className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]"
                      fill="none"
                      viewBox="0 0 22 22"
                    >
                      <path
                        clipRule="evenodd"
                        d={svgPaths.p228bc000}
                        fill={BUTTON_COLOR}
                        fillRule="evenodd"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => searchQuery && setIsDropdownOpen(true)}
                    placeholder="جستجو"
                    className="flex-1 bg-transparent outline-none text-buttons text-[14px] sm:text-[16px] font-['Arad:Medium',sans-serif] placeholder:text-buttons text-right"
                  />
                </div>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute top-[calc(100%+8px)] right-0 w-full bg-gray1 rounded-tl-[14px] rounded-tr-[14px] shadow-lg max-h-[400px] overflow-y-auto z-30">
                    {/* <div className="p-2 sm:p-3 border-b border-[#d0d0d0]">
                      <p className="font-['Arad:Medium',sans-serif] text-[14px] sm:text-[16px] text-black text-right">
                        {searchQuery}
                      </p>
                    </div> */}
                    <div className="p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                      {searchResults.map((book) => (
                        <button
                          key={book.id}
                          onClick={() => {
                            handleBookClick(book.id);
                            setIsDropdownOpen(false);
                          }}
                          className="flex flex-col items-center hover:opacity-80 transition-opacity"
                        >
                          <div className="bg-gray2 h-[110px] w-[85px] sm:h-[130px] sm:w-[100px] rounded-[20px] mb-2" />
                          <p className="font-['Arad:Medium',sans-serif] text-[13px] sm:text-[14px] text-black text-center line-clamp-1">
                            {book.title}
                          </p>
                          <p className="font-['Arad:Medium',sans-serif] text-[11px] sm:text-[12px] text-darkgray text-center">
                            {book.author}
                          </p>
                        </button>
                      ))}
                    </div>
                    <div className="p-3 sm:p-4 flex justify-center">
                      <button className="bg-gray1 border-2 border-bordercol h-[36px] sm:h-[40px] px-4 sm:px-6 rounded-[15px] hover:bg-[#d0d0d0] transition-colors">
                        <p className="font-['Arad:Bold',sans-serif] text-[14px] sm:text-[16px] text-bordercol">
                          نتایج بیشتر
                        </p>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Login/Register Buttons */}
            {/* User Profile & Exit - سمت راست */}
            <div className="absolute right-0 sm:right-1 lg:right-4 top-1/2 -translate-y-1/2 flex items-center gap-5">
              {/* Logout Button */}
              <button className="hover:opacity-80 transition-opacity">
                <img src={imgExit} alt="خروج" className="h-[24px] w-auto" />
              </button>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="w-[34px] h-[34px] rounded-full overflow-hidden ">
                  <button className="hover:opacity-80 transition-opacity">
                    <img
                      src={imgProfile}
                      alt="پروفایل"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </div>
                <span className="font-['Arad:Medium',sans-serif] text-[20px] text-buttons">
                  نام کاربر
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden">
          <div className="px-3 py-3 space-y-2">
            {/* First Row: Logo and Buttons */}
            <div className="flex items-center justify-between">
              {/* Logo */}
              {/* User Section Mobile */}
              <div className="flex items-center gap-6">
                <button className="hover:opacity-80">
                  <img src={imgExit} alt="خروج" className="h-[25px] w-auto" />
                </button>
                <div className="flex items-center gap-1.5">
                  <button className="hover:opacity-80">
                    <img
                      src={imgProfile}
                      alt="پروفایل"
                      className="w-[32px] h-[32px] rounded-full border border-buttons"
                    />
                  </button>
                  <span className="font-['Arad:Medium',sans-serif] text-[13px] text-buttons">
                    نام کاربری
                  </span>
                </div>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-1 hover:opacity-80 transition-opacity"
              >
                <img
                  src={imgLogo}
                  alt="کتابیوم لوگو"
                  className="h-[40px] w-auto object-contain"
                />
              </button>

              {/* Login/Register Buttons */}
            </div>

            {/* Second Row: Search Bar */}
            <div className="relative w-full">
              <div className="bg-searchbg h-[35px] rounded-[74px] shadow-[0px_1px_3px_1px_#236474] flex items-center px-3 gap-2">
                <button className="flex-shrink-0">
                  <svg
                    className="w-[14px] h-[14px]"
                    fill="none"
                    viewBox="0 0 22 22"
                  >
                    <path
                      clipRule="evenodd"
                      d={svgPaths.p228bc000}
                      fill={BUTTON_COLOR}
                      fillRule="evenodd"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery && setIsDropdownOpen(true)}
                  placeholder="جستجو"
                  className="flex-1 bg-transparent outline-none text-buttons text-[14px] font-['Arad:Medium',sans-serif] placeholder:text-buttons text-right"
                />
              </div>

              {/* Mobile Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-[calc(100%+8px)] right-0 left-0 bg-gray1 rounded-tl-[14px] rounded-tr-[14px] shadow-lg max-h-[400px] overflow-y-auto z-30">
                  <div className="p-3 border-b border-[#d0d0d0]">
                    <p className="font-['Arad:Medium',sans-serif] text-[14px] text-black text-right">
                      {searchQuery}
                    </p>
                  </div>
                  <div className="p-3 grid grid-cols-3 gap-3">
                    {searchResults.map((book) => (
                      <button
                        key={book.id}
                        onClick={() => {
                          handleBookClick(book.id);
                          setIsDropdownOpen(false);
                        }}
                        className="flex flex-col items-center hover:opacity-80 transition-opacity"
                      >
                        <div className="bg-gray2 h-[100px] w-[75px] rounded-[20px] mb-2" />
                        <p className="font-['Arad:Medium',sans-serif] text-[12px] text-black text-center line-clamp-1">
                          {book.title}
                        </p>
                        <p className="font-['Arad:Medium',sans-serif] text-[10px] text-darkgray text-center">
                          {book.author}
                        </p>
                      </button>
                    ))}
                  </div>
                  <div className="p-3 flex justify-center">
                    <button className="bg-gray1 border-2 border-bordercol h-[35px] px-4 rounded-[15px] hover:bg-[#d0d0d0] transition-colors">
                      <p className="font-['Arad:Bold',sans-serif] text-[14px] text-bordercol">
                        نتایج بیشتر
                      </p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}
