// import { useState, useRef, useEffect } from "react";
// import { Search, ArrowRight, MoreVertical } from "lucide-react";
// import React from "react";
// const books = [
//   { id: 1, title: "عنوان کتاب اول", author: "نویسنده اول", rating: "۴.۵" },
//   { id: 2, title: "عنوان کتاب دوم", author: "نویسنده دوم", rating: "۴.۰" },
//   { id: 3, title: "عنوان کتاب سوم", author: "نویسنده سوم", rating: "۳.۸" },
//   { id: 4, title: "عنوان کتاب چهارم", author: "نویسنده چهارم", rating: "۳.۵" },
// ];

// function BookRow({
//   book,
//   onDelete,
// }: {
//   book: (typeof books)[0];
//   onDelete: (id: number) => void;
// }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
//         setMenuOpen(false);
//       }
//     }
//     if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [menuOpen]);

//   return (
//     // ردیف به صورت پیش‌فرض تمام عرض است
//     <div className="flex flex-row-reverse items-center w-full py-6 px-6 md:px-12 hover:bg-gray-50 transition-colors border-b border-gray-100">
//       {/* منو */}
//       <div className="relative" ref={menuRef}>
//         <button
//           onClick={() => setMenuOpen((o) => !o)}
//           className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400"
//         >
//           <MoreVertical size={20} />
//         </button>
//         {menuOpen && (
//           <div className="absolute left-0 top-12 z-50 bg-white rounded-lg shadow-xl border border-gray-100 min-w-[120px]">
//             <button
//               onClick={() => {
//                 onDelete(book.id);
//                 setMenuOpen(false);
//               }}
//               className="w-full text-right px-4 py-3 text-sm text-red-500 hover:bg-red-50"
//             >
//               حذف کتاب
//             </button>
//           </div>
//         )}
//       </div>

//       {/* اطلاعات - در دسکتاپ فضای زیادی می‌گیرد */}
//       <div className="flex-1 text-right mr-6">
//         <p className="text-lg font-bold text-gray-800">{book.title}</p>
//         <p className="text-sm text-gray-500">{book.author}</p>
//         <p className="text-xs text-gray-400 mt-1">امتیاز: {book.rating}</p>
//       </div>

//       {/* عکس کتاب */}
//       <div className="w-20 h-28 md:w-32 md:h-40 flex-shrink-0 rounded-xl bg-gray-200 shadow-sm" />
//     </div>
//   );
// }

// export default function LibraryDetail() {
//   const [bookList, setBookList] = useState(books);
//   const handleDelete = (id: number) =>
//     setBookList((prev) => prev.filter((b) => b.id !== id));

//   return (
//     <div
//       className="min-h-screen bg-white"
//       dir="rtl"
//       style={{ fontFamily: "'Vazirmatn', sans-serif" }}
//     >
//       {/* هدر - همیشه فول عرض */}
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 md:px-10 py-4 flex flex-row-reverse items-center justify-between gap-4">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
//             ک
//           </div>
//           <span className="text-lg font-bold text-teal-800 hidden md:block">
//             کتابیوم
//           </span>
//         </div>

//         {/* جستجو - در لپ‌تاپ کشیده‌تر می‌شود */}
//         <div className="flex-1 max-w-4xl flex items-center bg-gray-100 rounded-full px-5 py-2.5 gap-3">
//           <Search size={18} className="text-gray-400" />
//           <input
//             type="text"
//             placeholder="جستجو..."
//             className="flex-1 bg-transparent text-sm outline-none text-right"
//           />
//         </div>

//         <button className="text-gray-600 hover:text-teal-600">
//           <ArrowRight size={24} />
//         </button>
//       </header>
//       {/* محتوا - تمام عرض */}
//       <main className="w-full">
//         <div className="p-6 md:px-12 border-b border-gray-200 bg-gray-50">
//           <h2 className="text-2xl font-bold text-gray-800">کتابخانه من</h2>
//         </div>

//         {bookList.length === 0 ? (
//           <div className="text-center py-32 text-gray-400">کتابی یافت نشد.</div>
//         ) : (
//           // استفاده از divide-y برای ایجاد خط کمرنگ بین ردیف‌ها
//           // divide-gray-100 رنگ خط را بسیار کمرنگ و شیک می‌کند
//           <div className="flex flex-col divide-y divide-gray-100">
//             {bookList.map((book) => (
//               <BookRow key={book.id} book={book} onDelete={handleDelete} />
//             ))}
//           </div>
//         )}
//       </main>

//       {/* محتوا - بدون محدودیت max-w برای پر کردن کل صفحه
//       <main className="w-full">
//         <div className="p-6 md:px-12 border-b border-gray-200 bg-gray-50">
//           <h2 className="text-2xl font-bold text-gray-800">کتابخانه من</h2>
//         </div>

//         {bookList.length === 0 ? (
//           <div className="text-center py-32 text-gray-400">کتابی یافت نشد.</div>
//         ) : (
//           <div className="flex flex-col">
//             {bookList.map((book) => (
//               <BookRow key={book.id} book={book} onDelete={handleDelete} />
//             ))}
//           </div>
//         )}
//       </main> */}
//     </div>
//   );
// }



// import React, { useEffect, useRef, useState } from "react";
// import { ArrowRight, MoreVertical, Search, Trash2 } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// type BookList = {
//   id: number;
//   title: string;
//   author_name?: string;
//   publisher_name?: string;
//   cover_url?: string | null;
//   pages_count?: number;
//   published_year?: number | null;
//   average_rating?: number;
//   reviews_count?: number;
// };

// type ReadingListItem = {
//   id: number;
//   book: BookList;
//   created_at?: string;
// };

// type ReadingListDetail = {
//   id: number;
//   name: string;
//   list_type?: string;
//   books_count?: string | number;
//   items?: ReadingListItem[];
//   created_at?: string;
// };

// function buildApiBaseUrl() {
//   const rawBaseUrl = import.meta.env.VITE_API_URL || "https://bookiom.liara.run";
//   const baseUrl = rawBaseUrl.replace(/\/$/, "").replace(/\/api$/, "");

//   return `${baseUrl}/api`;
// }

// export default function LibraryDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const apiBaseUrl = buildApiBaseUrl();

//   const [library, setLibrary] = useState<ReadingListDetail | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [deletingBookId, setDeletingBookId] = useState<number | null>(null);
//   const [errorMessage, setErrorMessage] = useState("");

//   const getAccessToken = () => {
//     return localStorage.getItem("accessToken");
//   };

//   const getRefreshToken = () => {
//     return localStorage.getItem("refreshToken");
//   };

//   const getAuthConfig = (token?: string) => {
//     const accessToken = token || getAccessToken();

//     return {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     };
//   };

//   const clearAuthAndGoLogin = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("username");

//     window.location.href = "/login";
//   };

//   const isAccessTokenExpired = (token: string | null) => {
//     if (!token) return true;

//     try {
//       const payloadBase64 = token.split(".")[1];

//       if (!payloadBase64) return true;

//       const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
//       const paddedBase64 = base64.padEnd(
//         base64.length + ((4 - (base64.length % 4)) % 4),
//         "="
//       );

//       const payloadJson = atob(paddedBase64);
//       const payload = JSON.parse(payloadJson);

//       if (!payload.exp) return true;

//       const currentTime = Math.floor(Date.now() / 1000);

//       return payload.exp <= currentTime + 30;
//     } catch {
//       return true;
//     }
//   };

//   const refreshAccessToken = async () => {
//     const refreshToken = getRefreshToken();

//     if (!refreshToken) {
//       clearAuthAndGoLogin();
//       throw new Error("No refresh token found");
//     }

//     try {
//       const res = await axios.post(`${apiBaseUrl}/accounts/token/refresh/`, {
//         refresh: refreshToken,
//       });

//       const newAccessToken = res.data.access;

//       if (!newAccessToken) {
//         clearAuthAndGoLogin();
//         throw new Error("No access token returned from refresh endpoint");
//       }

//       localStorage.setItem("accessToken", newAccessToken);

//       return newAccessToken;
//     } catch (err) {
//       clearAuthAndGoLogin();
//       throw err;
//     }
//   };

//   const getValidAccessToken = async () => {
//     const accessToken = getAccessToken();

//     if (!isAccessTokenExpired(accessToken)) {
//       return accessToken;
//     }

//     return await refreshAccessToken();
//   };

//   const isTokenExpiredError = (err: any) => {
//     const data = err?.response?.data;
//     const stringifiedData = JSON.stringify(data || {});

//     return (
//       err?.response?.status === 401 &&
//       (data?.code === "token_not_valid" ||
//         stringifiedData.includes("Token is expired") ||
//         stringifiedData.includes("token_not_valid"))
//     );
//   };

//   const authGet = async (url: string) => {
//     try {
//       const validToken = await getValidAccessToken();
//       return await axios.get(url, getAuthConfig(validToken || undefined));
//     } catch (err: any) {
//       if (!isTokenExpiredError(err)) {
//         throw err;
//       }

//       const newAccessToken = await refreshAccessToken();
//       return await axios.get(url, getAuthConfig(newAccessToken));
//     }
//   };

//   const authDelete = async (url: string, body?: any) => {
//     try {
//       const validToken = await getValidAccessToken();

//       return await axios.delete(url, {
//         ...getAuthConfig(validToken || undefined),
//         data: body,
//       });
//     } catch (err: any) {
//       if (!isTokenExpiredError(err)) {
//         throw err;
//       }

//       const newAccessToken = await refreshAccessToken();

//       return await axios.delete(url, {
//         ...getAuthConfig(newAccessToken),
//         data: body,
//       });
//     }
//   };

//   const getApiErrorMessage = (err: any, fallback: string) => {
//     const data = err?.response?.data;

//     if (!data) return fallback;
//     if (typeof data === "string") return data;
//     if (data.detail) return data.detail;

//     if (typeof data === "object") {
//       const values = Object.values(data).flat();

//       if (values.length > 0) {
//         return values.join(" - ");
//       }
//     }

//     return fallback;
//   };

//   const fetchLibrary = async () => {
//     if (!id) return;

//     try {
//       setLoading(true);
//       setErrorMessage("");

//       const res = await authGet(`${apiBaseUrl}/books/reading-lists/${id}/`);

//       setLibrary(res.data);
//     } catch (err: any) {
//       console.log("FETCH LIBRARY DETAIL ERROR:", err.response?.data || err);
//       setErrorMessage("دریافت اطلاعات کتابخانه با خطا مواجه شد.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteBook = async (bookId: number) => {
//     if (!library) return;

//     const confirmed = window.confirm("این کتاب از کتابخانه حذف شود؟");

//     if (!confirmed) return;

//     try {
//       setDeletingBookId(bookId);
//       setErrorMessage("");

//       await authDelete(`${apiBaseUrl}/books/books/${bookId}/remove-from-list/`, {
//         list_id: library.id,
//       });

//       setLibrary((prev) => {
//         if (!prev) return prev;

//         return {
//           ...prev,
//           items: (prev.items || []).filter((item) => item.book.id !== bookId),
//           books_count: Math.max(0, Number(prev.books_count || 0) - 1),
//         };
//       });
//     } catch (err: any) {
//       console.log("DELETE BOOK FROM LIST ERROR:", err.response?.data || err);
//       setErrorMessage(
//         getApiErrorMessage(err, "حذف کتاب از کتابخانه با خطا مواجه شد.")
//       );
//     } finally {
//       setDeletingBookId(null);
//     }
//   };

//   useEffect(() => {
//     fetchLibrary();
//   }, [id]);

//   const items = library?.items || [];

//   return (
//     <div
//       className="min-h-screen bg-white"
//       dir="rtl"
//       style={{ fontFamily: "'Vazirmatn', sans-serif" }}
//     >
//       <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 md:px-10 py-4 flex items-center justify-between gap-4">
//         <button
//           type="button"
//           onClick={() => navigate(-1)}
//           className="text-gray-600 hover:text-teal-700 transition-colors"
//           aria-label="بازگشت"
//         >
//           <ArrowRight size={24} />
//         </button>

//         <div className="flex-1 max-w-4xl flex items-center bg-gray-100 rounded-full px-5 py-2.5 gap-3">
//           <Search size={18} className="text-gray-400" />
//           <input
//             type="text"
//             placeholder="جستجو..."
//             className="flex-1 bg-transparent text-sm outline-none text-right"
//           />
//         </div>

//         <div className="flex items-center gap-3">
//           <span className="text-lg font-bold text-teal-800 hidden md:block">
//             کتابیوم
//           </span>

//           <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
//             ک
//           </div>
//         </div>
//       </header>

//       <main className="w-full max-w-5xl mx-auto px-4 md:px-8">
//         <div className="py-6 border-b border-gray-300">
//           <h1 className="text-xl md:text-2xl font-bold text-gray-900 text-right">
//             {loading
//               ? "در حال دریافت کتابخانه..."
//               : library?.name || "نام کتابخانه"}
//           </h1>
//         </div>

//         {errorMessage && (
//           <p className="mt-4 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm text-center">
//             {errorMessage}
//           </p>
//         )}

//         {loading ? (
//           <div className="text-center py-32 text-gray-400">
//             در حال دریافت اطلاعات...
//           </div>
//         ) : items.length === 0 ? (
//           <div className="text-center py-32 text-gray-400">
//             کتابی در این کتابخانه وجود ندارد.
//           </div>
//         ) : (
//           <div className="flex flex-col divide-y divide-gray-200">
//             {items.map((item) => (
//               <BookRow
//                 key={item.id}
//                 item={item}
//                 isDeleting={deletingBookId === item.book.id}
//                 onDelete={() => handleDeleteBook(item.book.id)}
//                 onOpenBook={() => navigate(`/books/${item.book.id}`)}
//               />
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// function BookRow({
//   item,
//   isDeleting,
//   onDelete,
//   onOpenBook,
// }: {
//   item: ReadingListItem;
//   isDeleting: boolean;
//   onDelete: () => void;
//   onOpenBook: () => void;
// }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   const book = item.book;

//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
//         setMenuOpen(false);
//       }
//     }

//     if (menuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [menuOpen]);

//   return (
//     <div
//       dir="ltr"
//       className="flex items-center w-full py-7 px-2 md:px-4 hover:bg-gray-50 transition-colors"
//     >
//       <div
//         className="relative shrink-0"
//         ref={menuRef}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           type="button"
//           onClick={() => setMenuOpen((open) => !open)}
//           className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 text-black"
//           aria-label="گزینه‌های کتاب"
//         >
//           <MoreVertical size={22} />
//         </button>

//         {menuOpen && (
//           <div
//             dir="rtl"
//             className="absolute left-0 top-11 z-50 bg-white rounded-lg shadow-xl border border-gray-100 min-w-[150px] overflow-hidden"
//           >
//             <button
//               type="button"
//               onClick={() => {
//                 onDelete();
//                 setMenuOpen(false);
//               }}
//               disabled={isDeleting}
//               className="w-full flex items-center justify-between gap-2 text-right px-4 py-3 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <span>{isDeleting ? "در حال حذف..." : "حذف کتاب"}</span>
//               <Trash2 size={16} />
//             </button>
//           </div>
//         )}
//       </div>

//       <button
//         type="button"
//         onClick={onOpenBook}
//         className="flex-1 flex items-center justify-end gap-6 text-right"
//       >
//         <div dir="rtl" className="flex flex-col items-start text-right">
//           <p className="text-base md:text-lg font-bold text-black">
//             {book.title}
//           </p>

//           <p className="text-sm text-gray-600 mt-2">
//             {book.author_name || "نویسنده نامشخص"}
//           </p>

//           <p className="text-xs text-gray-600 mt-4">
//             امتیاز: {Number(book.average_rating || 0).toFixed(1)}
//           </p>
//         </div>

//         {book.cover_url ? (
//           <img
//             src={book.cover_url}
//             alt={book.title}
//             className="w-24 h-32 md:w-28 md:h-36 shrink-0 rounded-2xl object-cover bg-gray-200"
//           />
//         ) : (
//           <div className="w-24 h-32 md:w-28 md:h-36 shrink-0 rounded-2xl bg-gray-300" />
//         )}
//       </button>
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, MoreVertical, Search, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

type BookList = {
  id: number;
  title: string;
  author_name?: string;
  publisher_name?: string;
  cover_url?: string | null;
  pages_count?: number;
  published_year?: number | null;
  average_rating?: number | string | null;
  rating?: number | string | null;
  avg_rating?: number | string | null;
  reviews_count?: number;
};

type ReadingListItem = {
  id: number;
  book: BookList;
  created_at?: string;
};

type ReadingListDetail = {
  id: number;
  name: string;
  list_type?: string;
  books_count?: string | number;
  items?: ReadingListItem[];
  created_at?: string;
};

function buildApiBaseUrl() {
  const rawBaseUrl = import.meta.env.VITE_API_URL || "https://bookiom.liara.run";
  const baseUrl = rawBaseUrl.replace(/\/$/, "").replace(/\/api$/, "");

  return `${baseUrl}/api`;
}

function getBookRating(book: BookList) {
  const possibleRating =
    book.average_rating ??
    book.avg_rating ??
    book.rating ??
    0;

  const ratingNumber = Number(possibleRating);

  if (Number.isNaN(ratingNumber)) {
    return 0;
  }

  return ratingNumber;
}

export default function LibraryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const apiBaseUrl = buildApiBaseUrl();

  const [library, setLibrary] = useState<ReadingListDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingBookId, setDeletingBookId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
  };

  const getAuthConfig = (token?: string) => {
    const accessToken = token || getAccessToken();

    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };

  const clearAuthAndGoLogin = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");

    window.location.href = "/login";
  };

  const isAccessTokenExpired = (token: string | null) => {
    if (!token) return true;

    try {
      const payloadBase64 = token.split(".")[1];

      if (!payloadBase64) return true;

      const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
      const paddedBase64 = base64.padEnd(
        base64.length + ((4 - (base64.length % 4)) % 4),
        "="
      );

      const payloadJson = atob(paddedBase64);
      const payload = JSON.parse(payloadJson);

      if (!payload.exp) return true;

      const currentTime = Math.floor(Date.now() / 1000);

      return payload.exp <= currentTime + 30;
    } catch {
      return true;
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearAuthAndGoLogin();
      throw new Error("No refresh token found");
    }

    try {
      const res = await axios.post(`${apiBaseUrl}/accounts/token/refresh/`, {
        refresh: refreshToken,
      });

      const newAccessToken = res.data.access;

      if (!newAccessToken) {
        clearAuthAndGoLogin();
        throw new Error("No access token returned from refresh endpoint");
      }

      localStorage.setItem("accessToken", newAccessToken);

      return newAccessToken;
    } catch (err) {
      clearAuthAndGoLogin();
      throw err;
    }
  };

  const getValidAccessToken = async () => {
    const accessToken = getAccessToken();

    if (!isAccessTokenExpired(accessToken)) {
      return accessToken;
    }

    return await refreshAccessToken();
  };

  const isTokenExpiredError = (err: any) => {
    const data = err?.response?.data;
    const stringifiedData = JSON.stringify(data || {});

    return (
      err?.response?.status === 401 &&
      (data?.code === "token_not_valid" ||
        stringifiedData.includes("Token is expired") ||
        stringifiedData.includes("token_not_valid"))
    );
  };

  const authGet = async (url: string) => {
    try {
      const validToken = await getValidAccessToken();
      return await axios.get(url, getAuthConfig(validToken || undefined));
    } catch (err: any) {
      if (!isTokenExpiredError(err)) {
        throw err;
      }

      const newAccessToken = await refreshAccessToken();
      return await axios.get(url, getAuthConfig(newAccessToken));
    }
  };

  const authDelete = async (url: string, body?: any) => {
    try {
      const validToken = await getValidAccessToken();

      return await axios.delete(url, {
        ...getAuthConfig(validToken || undefined),
        data: body,
      });
    } catch (err: any) {
      if (!isTokenExpiredError(err)) {
        throw err;
      }

      const newAccessToken = await refreshAccessToken();

      return await axios.delete(url, {
        ...getAuthConfig(newAccessToken),
        data: body,
      });
    }
  };

  const getApiErrorMessage = (err: any, fallback: string) => {
    const data = err?.response?.data;

    if (!data) return fallback;
    if (typeof data === "string") return data;
    if (data.detail) return data.detail;

    if (typeof data === "object") {
      const values = Object.values(data).flat();

      if (values.length > 0) {
        return values.join(" - ");
      }
    }

    return fallback;
  };

  const enrichItemsWithBookDetails = async (items: ReadingListItem[]) => {
    const enrichedItems = await Promise.all(
      items.map(async (item) => {
        try {
          const detailRes = await authGet(
            `${apiBaseUrl}/books/books/${item.book.id}/`
          );

          const detailBook = detailRes.data || {};

          return {
            ...item,
            book: {
              ...item.book,
              ...detailBook,
              id: item.book.id,
              title: detailBook.title || item.book.title,
              author_name:
                detailBook.author_name ||
                detailBook.author?.name ||
                item.book.author_name,
              publisher_name:
                detailBook.publisher_name ||
                detailBook.publisher?.name ||
                item.book.publisher_name,
              cover_url: detailBook.cover_url || item.book.cover_url,
              average_rating:
                detailBook.average_rating ??
                detailBook.avg_rating ??
                detailBook.rating ??
                item.book.average_rating,
            },
          };
        } catch (err) {
          console.log("FETCH BOOK DETAIL ERROR:", item.book.id, err);

          return item;
        }
      })
    );

    return enrichedItems;
  };

  const fetchLibrary = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setErrorMessage("");

      const res = await authGet(`${apiBaseUrl}/books/reading-lists/${id}/`);

      const libraryData: ReadingListDetail = res.data;
      const originalItems = libraryData.items || [];

      const enrichedItems = await enrichItemsWithBookDetails(originalItems);

      setLibrary({
        ...libraryData,
        items: enrichedItems,
      });
    } catch (err: any) {
      console.log("FETCH LIBRARY DETAIL ERROR:", err.response?.data || err);
      setErrorMessage("دریافت اطلاعات کتابخانه با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (bookId: number) => {
    if (!library) return;

    const confirmed = window.confirm("این کتاب از کتابخانه حذف شود؟");

    if (!confirmed) return;

    try {
      setDeletingBookId(bookId);
      setErrorMessage("");

      await authDelete(`${apiBaseUrl}/books/books/${bookId}/remove-from-list/`, {
        list_id: library.id,
      });

      setLibrary((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          items: (prev.items || []).filter((item) => item.book.id !== bookId),
          books_count: Math.max(0, Number(prev.books_count || 0) - 1),
        };
      });
    } catch (err: any) {
      console.log("DELETE BOOK FROM LIST ERROR:", err.response?.data || err);
      setErrorMessage(
        getApiErrorMessage(err, "حذف کتاب از کتابخانه با خطا مواجه شد.")
      );
    } finally {
      setDeletingBookId(null);
    }
  };

  useEffect(() => {
    fetchLibrary();
  }, [id]);

  const items = library?.items || [];

  return (
    <div
      className="min-h-screen bg-white"
      dir="rtl"
      style={{ fontFamily: "'Vazirmatn', sans-serif" }}
    >
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 md:px-10 py-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-teal-700 transition-colors"
          aria-label="بازگشت"
        >
          <ArrowRight size={24} />
        </button>

        <div className="flex-1 max-w-4xl flex items-center bg-gray-100 rounded-full px-5 py-2.5 gap-3">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="جستجو..."
            className="flex-1 bg-transparent text-sm outline-none text-right"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-teal-800 hidden md:block">
            کتابیوم
          </span>

          <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            ک
          </div>
        </div>
      </header>

      <main className="w-full max-w-5xl mx-auto px-4 md:px-8">
        <div className="py-6 border-b border-gray-300">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 text-right">
            {loading
              ? "در حال دریافت کتابخانه..."
              : library?.name || "نام کتابخانه"}
          </h1>
        </div>

        {errorMessage && (
          <p className="mt-4 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm text-center">
            {errorMessage}
          </p>
        )}

        {loading ? (
          <div className="text-center py-32 text-gray-400">
            در حال دریافت اطلاعات...
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-32 text-gray-400">
            کتابی در این کتابخانه وجود ندارد.
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-gray-300">
            {items.map((item) => (
              <BookRow
                key={item.id}
                item={item}
                isDeleting={deletingBookId === item.book.id}
                onDelete={() => handleDeleteBook(item.book.id)}
                onOpenBook={() => navigate(`/books/${item.book.id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function BookRow({
  item,
  isDeleting,
  onDelete,
  onOpenBook,
}: {
  item: ReadingListItem;
  isDeleting: boolean;
  onDelete: () => void;
  onOpenBook: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const book = item.book;
  const rating = getBookRating(book);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <div
      dir="ltr"
      className="flex items-center w-full py-7 px-2 md:px-4 hover:bg-gray-50 transition-colors"
    >
      <div
        className="relative shrink-0"
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 text-black"
          aria-label="گزینه‌های کتاب"
        >
          <MoreVertical size={22} />
        </button>

        {menuOpen && (
          <div
            dir="rtl"
            className="absolute left-0 top-11 z-50 bg-white rounded-lg shadow-xl border border-gray-100 min-w-[150px] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => {
                onDelete();
                setMenuOpen(false);
              }}
              disabled={isDeleting}
              className="w-full flex items-center justify-between gap-2 text-right px-4 py-3 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isDeleting ? "در حال حذف..." : "حذف کتاب"}</span>
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onOpenBook}
        className="flex-1 flex items-center justify-end gap-6 text-right"
      >
        <div dir="rtl" className="flex flex-col items-start text-right">
          <p className="text-base md:text-lg font-bold text-black">
            {book.title}
          </p>

          <p className="text-sm text-gray-600 mt-2">
            {book.author_name || "نویسنده نامشخص"}
          </p>

          <p className="text-xs text-gray-600 mt-4">
            امتیاز: {rating.toFixed(1)}
          </p>
        </div>

        {book.cover_url && !imageError ? (
          <img
            src={book.cover_url}
            alt={book.title}
            onError={() => setImageError(true)}
            className="w-24 h-32 md:w-28 md:h-36 shrink-0 rounded-2xl object-cover bg-gray-200"
          />
        ) : (
          <div className="w-24 h-32 md:w-28 md:h-36 shrink-0 rounded-2xl bg-gray-300" />
        )}
      </button>
    </div>
  );
}
