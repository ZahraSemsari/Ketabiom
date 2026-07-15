import React, { useEffect, useState } from "react";
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

type SearchBoxProps = {
  searchQuery: string;
  searchResults: BookSearchResult[];
  isDropdownOpen: boolean;
  loading: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputFocus: () => void;
  onBookClick: (bookId: number) => void;
  onMoreResultsClick: () => void;
  variant: "desktop" | "mobile";
};

function getBookAuthorName(book: BookSearchResult) {
  return book.author_name || book.author?.name || "نویسنده نامشخص";
}

function SearchBox({
  searchQuery,
  searchResults,
  isDropdownOpen,
  loading,
  onSearchChange,
  onInputFocus,
  onBookClick,
  onMoreResultsClick,
  variant,
}: SearchBoxProps) {
  const isMobile = variant === "mobile";

  return (
    <div
      className={
        isMobile ? "relative w-full" : "relative w-full max-w-[520px] min-w-0"
      }
    >
      <div
        className={
          isMobile
            ? "bg-searchbg h-[38px] rounded-[74px] shadow-[0px_1px_3px_1px_#236474] flex items-center px-4 gap-2"
            : "bg-searchbg h-[42px] rounded-[74px] shadow-[0px_1px_3px_1px_#236474] flex items-center px-4 gap-2"
        }
      >
        <button type="button" className="flex-shrink-0" aria-label="جستجو">
          <svg
            className={isMobile ? "w-[15px] h-[15px]" : "w-[17px] h-[17px]"}
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
          onChange={onSearchChange}
          onFocus={onInputFocus}
          placeholder={loading ? "در حال جستجو..." : "جستجو"}
          className={
            isMobile
              ? "w-full bg-transparent outline-none text-buttons text-[14px] font-['Arad:Medium'] placeholder:text-buttons text-right"
              : "w-full bg-transparent outline-none text-buttons text-[16px] font-['Arad:Medium'] placeholder:text-buttons text-right"
          }
        />
      </div>

      {isDropdownOpen && (
        <div
          className="
            absolute
            top-[calc(100%+8px)]
            left-1/2
            z-[1001]
            w-[calc(100vw-24px)]
            max-w-[520px]
            -translate-x-1/2
            rounded-[18px]
            bg-[#F5F5F5]
            shadow-xl
            overflow-hidden
          "
        >
          <div
            className="
              max-h-[62vh]
              overflow-y-auto
              overflow-x-hidden
              scrollbar-hide
              p-3
              sm:p-4
            "
          >
            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                gap-x-3
                gap-y-5
                sm:gap-x-4
                sm:gap-y-5
              "
            >
              {searchResults.slice(0, 6).map((book) => (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => onBookClick(book.id)}
                  className="
                    min-w-0
                    flex
                    flex-col
                    items-center
                    rounded-[14px]
                    transition
                    hover:opacity-80
                    hover:bg-white/60
                    p-1
                  "
                >
                  <div
                    className="
                      h-[108px]
                      w-[82px]
                      sm:h-[120px]
                      sm:w-[90px]
                      rounded-[15px]
                      mb-2
                      overflow-hidden
                      bg-[#D9D9D9]
                      border
                      border-gray-200
                      flex-shrink-0
                    "
                  >
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

                  <p
                    className="
                      font-['Arad:Medium']
                      text-[12px]
                      sm:text-[13px]
                      text-black
                      text-center
                      line-clamp-1
                      w-full
                      max-w-[110px]
                      px-1
                    "
                    title={book.title}
                  >
                    {book.title}
                  </p>

                  <p
                    className="
                      mt-1
                      font-['Arad:Regular']
                      text-[11px]
                      text-gray-500
                      text-center
                      line-clamp-1
                      w-full
                      max-w-[110px]
                      px-1
                    "
                    title={getBookAuthorName(book)}
                  >
                    {getBookAuthorName(book)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 border-t border-gray-200 flex justify-center bg-[#F5F5F5]">
            <button
              type="button"
              onClick={onMoreResultsClick}
              className="
                border-2
                border-[#236474]
                h-[36px]
                px-6
                rounded-[12px]
                text-xs
                font-bold
                text-[#236474]
                hover:bg-gray-200
                transition-colors
              "
            >
              نتایج بیشتر
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MainHeader() {
  const { isLoggedIn, logout, username } = useAuth();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BookSearchResult[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const rawBaseUrl =
    import.meta.env.VITE_API_URL || "https://bookiom.liara.run";
  const baseUrl = rawBaseUrl.replace(/\/$/, "").replace(/\/api$/, "");
  const apiBaseUrl = `${baseUrl}/api`;

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
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

        const res = await axios.get(
          `${apiBaseUrl}/books/search/?q=${encodeURIComponent(
            searchQuery.trim(),
          )}`,
          {
            cancelToken: source.token,
          },
        );

        const books = Array.isArray(res.data)
          ? res.data
          : res.data?.results || [];

        setSearchResults(books);
        setIsDropdownOpen(books.length > 0);
      } catch (err: any) {
        if (!axios.isCancel(err)) {
          console.log(err.response?.data || err.message);
          setSearchResults([]);
          setIsDropdownOpen(false);
        }
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      source.cancel();
    };
  }, [searchQuery, apiBaseUrl]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputFocus = () => {
    if (searchQuery.trim() && searchResults.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  const handleBookClick = (bookId: number) => {
    setIsDropdownOpen(false);
    setSearchQuery("");
    navigate(`/books/${bookId}`);

    window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }, 0);
  };

  const handleMoreResultsClick = () => {
    setIsDropdownOpen(false);
    navigate("/show-more", { state: { query: searchQuery } });
  };

  return (
    <div dir="rtl">
      <header className="bg-white w-full shadow-[0px_1px_8px_0px_#236474] relative z-[1000]">
        <div className="hidden md:block">
          <div className="max-w-[1400px] mx-auto h-[74px] px-4 lg:px-10 flex items-center justify-between gap-4">
            <div className="w-[210px] lg:w-[250px] min-w-0 flex items-center">
              {isLoggedIn ? (
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="hover:opacity-80 mr-2 flex-shrink-0"
                  >
                    <img src={imgExit} alt="خروج" className="h-[24px] w-auto" />
                  </button>

                  <Link
                    to="/profile"
                    className="flex items-center gap-3 min-w-0"
                  >
                    <img
                      src={defaultAvatar}
                      alt="پروفایل"
                      className="w-[44px] h-[44px] rounded-full object-cover border border-buttons bg-white flex-shrink-0"
                    />

                    <span className="font-['Poppins',sans-serif] text-[24px] font-bold leading-[1.35] pb-[3px] tracking-[0.2px] text-bordercol whitespace-nowrap">
                      {" "}
                      {username || "کاربر"}
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/register"
                    className="bg-buttons h-[40px] px-5 lg:px-6 rounded-[20px] shadow-[0px_4px_4px_1px_rgba(0,0,0,0.25)] hover:bg-[#3a8599] transition-colors flex items-center"
                    style={{ fontFamily: FONT }}
                  >
                    <p className="font-['Arad:SemiBold'] text-[17px] lg:text-[18px] text-white whitespace-nowrap">
                      ثبت نام
                    </p>
                  </Link>

                  <Link
                    to="/login"
                    className="bg-buttons h-[40px] px-5 lg:px-6 rounded-[20px] shadow-[0px_4px_4px_1px_rgba(0,0,0,0.25)] hover:bg-[#3a8599] transition-colors flex items-center"
                    style={{ fontFamily: FONT }}
                  >
                    <p className="font-['Arad:SemiBold'] text-[17px] lg:text-[18px] text-white whitespace-nowrap">
                      ورود
                    </p>
                  </Link>
                </div>
              )}
            </div>

            <div className="flex-1 flex justify-center min-w-0">
              <SearchBox
                variant="desktop"
                searchQuery={searchQuery}
                searchResults={searchResults}
                isDropdownOpen={isDropdownOpen}
                loading={loading}
                onSearchChange={handleSearchChange}
                onInputFocus={handleInputFocus}
                onBookClick={handleBookClick}
                onMoreResultsClick={handleMoreResultsClick}
              />
            </div>

            <div className="w-[110px] lg:w-[250px] min-w-0 flex justify-end">
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

        <div className="md:hidden">
          <div className="px-3 py-3 space-y-3">
            <div className="flex items-center justify-between gap-3">
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
                  <div className="flex gap-2">
                    <Link
                      to="/register"
                      className="bg-buttons h-[34px] px-4 rounded-[17px] flex items-center shadow-[0px_3px_4px_0px_rgba(0,0,0,0.18)]"
                    >
                      <span className="text-white text-xs whitespace-nowrap">
                        ثبت نام
                      </span>
                    </Link>

                    <Link
                      to="/login"
                      className="bg-buttons h-[34px] px-4 rounded-[17px] flex items-center shadow-[0px_3px_4px_0px_rgba(0,0,0,0.18)]"
                    >
                      <span className="text-white text-xs whitespace-nowrap">
                        ورود
                      </span>
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/" className="flex-shrink-0">
                <img
                  src={imgLogo}
                  alt="لوگو"
                  className="h-[56px] w-auto object-contain"
                />
              </Link>
            </div>

            <SearchBox
              variant="mobile"
              searchQuery={searchQuery}
              searchResults={searchResults}
              isDropdownOpen={isDropdownOpen}
              loading={loading}
              onSearchChange={handleSearchChange}
              onInputFocus={handleInputFocus}
              onBookClick={handleBookClick}
              onMoreResultsClick={handleMoreResultsClick}
            />
          </div>
        </div>
      </header>

      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-[999]"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      {showLogoutModal && (
        <div
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/45 px-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              cancelLogout();
            }
          }}
        >
          <div
            dir="rtl"
            className="
              relative
              w-full
              max-w-[430px]
              rounded-[28px]
              border-[3px]
              border-[#236474]
              bg-white
              px-6
              py-8
              shadow-2xl
              sm:px-8
            "
          >
            <button
              type="button"
              onClick={cancelLogout}
              className="
                absolute
                left-5
                top-4
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                text-[30px]
                leading-none
                text-black/60
                transition
                hover:bg-gray-100
                hover:text-black
              "
              aria-label="بستن"
            >
              ×
            </button>

            <div className="mb-5 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eef7f9]">
                <img src={imgExit} alt="خروج" className="h-8 w-auto" />
              </div>
            </div>

            <h2 className="text-center font-['Arad:Bold',sans-serif] text-[22px] text-black">
              خروج از حساب
            </h2>

            <p className="mt-4 text-center font-['Arad:Medium',sans-serif] text-[16px] leading-7 text-[#3d3d3d]">
              آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
            </p>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={cancelLogout}
                className="
                  h-12
                  flex-1
                  rounded-[13px]
                  border
                  border-[#236474]
                  bg-white
                  font-['Arad:Medium',sans-serif]
                  text-[17px]
                  text-[#236474]
                  transition
                  hover:bg-[#eef7f9]
                "
              >
                انصراف
              </button>

              <button
                type="button"
                onClick={confirmLogout}
                className="
                  h-12
                  flex-1
                  rounded-[13px]
                  bg-[#4499AF]
                  font-['Arad:Medium',sans-serif]
                  text-[17px]
                  text-white
                  transition
                  hover:bg-[#367f92]
                "
              >
                خروج
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
