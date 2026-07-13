import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import imgLogo from "../../imports/HomePage-1/imgLogo.png";
import imgExit from "../../imports/HomePage-1/exitbtn.png";
import defaultAvatar from "../../assets/default-avatar.png";
import svgPaths from "../../imports/HomePage-1/svg-mc69sns2lc";

const BUTTON_COLOR = "#4499AF";
const FONT = "'Vazirmatn', sans-serif";

interface BookSearchResult {
  id: number;
  title: string;
  author_name?: string;
  author?: {
    id?: number;
    name?: string;
  };
  publisher_name?: string;
  cover_url: string | null;
  pages_count?: number;
  published_year?: number | null;
  average_rating?: number;
  reviews_count?: number;
}

function getBookAuthorName(book: BookSearchResult) {
  return book.author_name || book.author?.name || "نویسنده نامشخص";
}

export default function MainHeader() {
  const { isLoggedIn, logout, username } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BookSearchResult[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const source = axios.CancelToken.source();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");

        const res = await axios.get(
          `${baseUrl}/api/books/search/?q=${encodeURIComponent(
            searchQuery.trim(),
          )}`,
          {
            cancelToken: source.token,
          },
        );

        const books = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];

        setSearchResults(books);
        setIsDropdownOpen(books.length > 0);
      } catch (err: any) {
        if (!axios.isCancel(err)) {
          console.log(err.response?.data || err.message);
          setSearchResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      source.cancel();
    };
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleBookClick = (bookId: number) => {
    setIsDropdownOpen(false);
    setSearchQuery("");
    navigate(`/books/${bookId}`);
  };

  const handleMoreResultsClick = () => {
    setIsDropdownOpen(false);
    navigate("/show-more", { state: { query: searchQuery } });
  };

  return (
    <div dir="rtl">
      <header className="bg-white w-full shadow-[0px_1px_8px_0px_#236474] relative z-[1000]">
        {" "}
        <div className="hidden sm:block">
          <div className="max-w-[1400px] mx-auto h-[74px] px-10 flex items-center justify-between">
            <div className="flex items-center gap-4 min-w-[250px]">
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="hover:opacity-80 mr-2"
                  >
                    <img src={imgExit} alt="خروج" className="h-[24px] w-auto" />
                  </button>

                  <Link to="/profile" className="flex items-center gap-3">
                    <img
                      src={defaultAvatar}
                      alt="پروفایل"
                      className="w-[50px] h-[40px] rounded-full object-cover border border-buttons bg-white"
                    />

                    <span className="font-['Arad:Medium'] text-[25px] text-buttons">
                      {username || "کاربر"}
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/register"
                    className="bg-buttons h-[40px] px-6 rounded-[20px] shadow-[0px_4px_4px_1px_rgba(0,0,0,0.25)] hover:bg-[#3a8599] transition-colors flex items-center"
                    style={{ fontFamily: FONT }}
                  >
                    <p className="font-['Arad:SemiBold'] text-[18px] text-white whitespace-nowrap">
                      ثبت نام
                    </p>
                  </Link>

                  <Link
                    to="/login"
                    className="bg-buttons h-[40px] px-6 rounded-[20px] shadow-[0px_4px_4px_1px_rgba(0,0,0,0.25)] hover:bg-[#3a8599] transition-colors flex items-center"
                    style={{ fontFamily: FONT }}
                  >
                    <p className="font-['Arad:SemiBold'] text-[18px] text-white whitespace-nowrap">
                      ورود
                    </p>
                  </Link>
                </div>
              )}
            </div>

            <div className="flex-1 max-w-[500px] relative">
              <div className="bg-searchbg h-[40px] rounded-[74px] shadow-[0px_1px_3px_1px_#236474] flex items-center px-4 gap-2">
                <button type="button" className="flex-shrink-0">
                  <svg
                    className="w-[16px] h-[16px]"
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
                  onFocus={() =>
                    searchQuery &&
                    searchResults.length > 0 &&
                    setIsDropdownOpen(true)
                  }
                  placeholder={loading ? "در حال جستجو..." : "جستجو"}
                  className="flex-1 bg-transparent outline-none text-buttons text-[16px] font-['Arad:Medium'] placeholder:text-buttons text-right"
                />
              </div>

              {isDropdownOpen && (
                <div className="absolute top-[calc(100%+8px)] right-0 w-full bg-[#F5F5F5] rounded-tl-[14px] rounded-tr-[14px] shadow-lg max-h-[400px] overflow-y-auto z-[1001]">
                  <div className="p-4 grid grid-cols-3 gap-4">
                    {searchResults.slice(0, 6).map((book) => (
                      <button
                        key={book.id}
                        type="button"
                        onClick={() => handleBookClick(book.id)}
                        className="flex flex-col items-center hover:opacity-80 transition-opacity"
                      >
                        <div className="h-[120px] w-[90px] rounded-[15px] mb-2 overflow-hidden bg-[#D9D9D9] border border-gray-200">
                          {book.cover_url ? (
                            <img
                              src={book.cover_url}
                              alt={book.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-300" />
                          )}
                        </div>

                        <p className="font-['Arad:Medium'] text-[13px] text-black text-center line-clamp-1 w-full px-1">
                          {book.title}
                        </p>

                        <p className="mt-1 font-['Arad:Regular'] text-[11px] text-gray-500 text-center line-clamp-1 w-full px-1">
                          {getBookAuthorName(book)}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="p-3 border-t border-gray-200 flex justify-center">
                    <button
                      type="button"
                      onClick={handleMoreResultsClick}
                      className="border-2 border-[#236474] h-[36px] px-6 rounded-[12px] text-xs font-bold text-[#236474] hover:bg-gray-200 transition-colors"
                    >
                      نتایج بیشتر
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="min-w-[250px] flex justify-end">
              <Link to="/" className="flex-shrink-0">
                <img
                  src={imgLogo}
                  alt="لوگو"
                  className="h-[60px] w-auto object-contain"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="sm:hidden">
          <div className="px-3 py-3 flex items-center justify-between gap-2">
            {/* سمت راست: آیکون ها */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <button type="button" onClick={handleLogout}>
                    <img src={imgExit} alt="خروج" className="h-6 w-auto" />
                  </button>

                  <Link to="/profile">
                    <img
                      src={defaultAvatar}
                      alt="پروفایل"
                      className="w-10 h-10 rounded-full object-cover border border-buttons"
                    />
                  </Link>
                </div>
              ) : (
                <div className="flex gap-1">
                  <Link
                    to="/register"
                    className="bg-buttons h-[32px] px-3 rounded-[16px] flex items-center"
                  >
                    <span className="text-white text-xs">ثبت نام</span>
                  </Link>

                  <Link
                    to="/login"
                    className="bg-buttons h-[32px] px-3 rounded-[16px] flex items-center"
                  >
                    <span className="text-white text-xs">ورود</span>
                  </Link>
                </div>
              )}
            </div>

            {/* وسط: سرچ */}
            <div className="relative flex-1 max-w-[220px]">
              <div className="bg-searchbg h-[34px] rounded-[74px] shadow-[0px_1px_3px_1px_#236474] flex items-center px-3 gap-2">
                <button type="button" className="flex-shrink-0">
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
                  placeholder={loading ? "..." : "جستجو"}
                  className="
            w-full
            bg-transparent
            outline-none
            text-buttons
            text-[13px]
            text-right
          "
                />
              </div>
            </div>

            {/* سمت چپ: لوگو */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={imgLogo}
                alt="لوگو"
                className="h-[60px] w-auto object-contain"
              />
            </Link>
          </div>
        </div>
      </header>

      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-[999]"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}
