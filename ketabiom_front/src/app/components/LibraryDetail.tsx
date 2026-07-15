import React, { useEffect, useRef, useState } from "react";
import { MoreVertical, Trash2, ArrowRight, X } from "lucide-react";
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

type DeleteTarget =
  | {
      type: "library";
      title: string;
    }
  | {
      type: "book";
      bookId: number;
      title: string;
    }
  | null;

function buildApiBaseUrl() {
  const rawBaseUrl =
    import.meta.env.VITE_API_URL || "https://bookiom.liara.run";
  const baseUrl = rawBaseUrl.replace(/\/$/, "").replace(/\/api$/, "");

  return `${baseUrl}/api`;
}

function getBookRating(book: BookList) {
  const possibleRating =
    book.average_rating ?? book.avg_rating ?? book.rating ?? 0;

  const ratingNumber = Number(possibleRating);

  if (Number.isNaN(ratingNumber)) {
    return 0;
  }

  return ratingNumber;
}

function DeleteConfirmModal({
  target,
  isDeleting,
  onClose,
  onConfirm,
}: {
  target: DeleteTarget;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!target) return null;

  const isLibraryDelete = target.type === "library";

  const title = isLibraryDelete ? "حذف کتابخانه" : "حذف کتاب از کتابخانه";

  const description = isLibraryDelete
    ? `آیا مطمئن هستید که می‌خواهید کتابخانه «${target.title}» را حذف کنید؟`
    : `آیا مطمئن هستید که می‌خواهید کتاب «${target.title}» را از این کتابخانه حذف کنید؟`;

  const confirmText = isLibraryDelete ? "حذف کتابخانه" : "حذف کتاب";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDeleting) {
          onClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-[460px] rounded-[29px] border-4 border-[#236474] bg-white p-6 shadow-2xl sm:p-8"
        dir="rtl"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className="absolute left-6 top-6 cursor-pointer text-black/70 transition hover:scale-110 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="بستن"
        >
          <X size={24} />
        </button>

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
          <Trash2 size={30} />
        </div>

        <p className="mb-4 text-center font-['Arad:Bold',sans-serif] text-[21px] text-black">
          {title}
        </p>

        <p className="mb-7 text-center font-['Arad:Medium',sans-serif] text-[16px] leading-7 text-black">
          {description}
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-center">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="h-[44px] w-full rounded-[12px] border border-[#236474] bg-white font-['Arad:Medium',sans-serif] text-[16px] text-[#236474] transition hover:bg-[#ebf5f7] disabled:cursor-not-allowed disabled:opacity-50 sm:w-[150px]"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="h-[44px] w-full rounded-[12px] bg-red-600 font-['Arad:Medium',sans-serif] text-[16px] text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-[150px]"
          >
            {isDeleting ? "در حال حذف..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LibraryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const apiBaseUrl = buildApiBaseUrl();

  const [library, setLibrary] = useState<ReadingListDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingBookId, setDeletingBookId] = useState<number | null>(null);
  const [isDeletingLibrary, setIsDeletingLibrary] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);
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

  const requestDeleteLibrary = () => {
    if (!library) return;

    setErrorMessage("");
    setDeleteTarget({
      type: "library",
      title: library.name,
    });
  };

  const requestDeleteBook = (book: BookList) => {
    setErrorMessage("");
    setDeleteTarget({
      type: "book",
      bookId: book.id,
      title: book.title,
    });
  };

  const closeDeleteModal = () => {
    if (isDeletingLibrary || deletingBookId !== null) return;

    setDeleteTarget(null);
  };

  const confirmDeleteLibrary = async () => {
    if (!library) return;

    try {
      setIsDeletingLibrary(true);
      setErrorMessage("");

      await authDelete(`${apiBaseUrl}/books/reading-lists/${library.id}/`);

      setDeleteTarget(null);
      navigate("/userprofile");
    } catch (err: any) {
      console.log("DELETE LIBRARY ERROR:", err.response?.data || err);
      setErrorMessage(getApiErrorMessage(err, "حذف کتابخانه با خطا مواجه شد."));
      setIsDeletingLibrary(false);
      setDeleteTarget(null);
    }
  };

  const confirmDeleteBook = async (bookId: number) => {
    if (!library) return;

    try {
      setDeletingBookId(bookId);
      setErrorMessage("");

      await authDelete(
        `${apiBaseUrl}/books/books/${bookId}/remove-from-list/`,
        {
          list_id: library.id,
        }
      );

      setLibrary((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          items: (prev.items || []).filter((item) => item.book.id !== bookId),
          books_count: Math.max(0, Number(prev.books_count || 0) - 1),
        };
      });

      setDeleteTarget(null);
    } catch (err: any) {
      console.log("DELETE BOOK FROM LIST ERROR:", err.response?.data || err);
      setErrorMessage(
        getApiErrorMessage(err, "حذف کتاب از کتابخانه با خطا مواجه شد.")
      );
      setDeleteTarget(null);
    } finally {
      setDeletingBookId(null);
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === "library") {
      confirmDeleteLibrary();
      return;
    }

    confirmDeleteBook(deleteTarget.bookId);
  };

  useEffect(() => {
    fetchLibrary();
  }, [id]);

  const items = library?.items || [];
  const isDeleting = isDeletingLibrary || deletingBookId !== null;

  return (
    <div
      className="min-h-screen bg-white font-['Arad:SemiBold',sans-serif]"
      dir="rtl"
    >
      <main className="pt-[40px] sm:pt-[55px] pb-16 w-full max-w-5xl mx-auto px-4 md:px-8">
        <div className="py-6 border-b border-gray-300 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/userprofile")}
              className="p-2 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black rounded-full transition-colors shrink-0"
              title="بازگشت به پروفایل"
            >
              <ArrowRight size={22} />
            </button>

            <h1 className="text-xl md:text-2xl font-bold text-gray-900 text-right">
              {loading
                ? "در حال دریافت کتابخانه..."
                : library?.name || "نام کتابخانه"}
            </h1>
          </div>

          {library &&
            !["خوانده شده", "در حال خواندن", "خواهم خواند"].includes(library.name) && (
              <button
                type="button"
                onClick={requestDeleteLibrary}
                disabled={isDeletingLibrary || loading}
                className="flex items-center gap-2 px-3 py-2 text-sm md:text-base font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                title="حذف کتابخانه"
              >
                <Trash2 size={20} />
                <span className="hidden sm:inline">
                  {isDeletingLibrary ? "در حال حذف..." : "حذف کتابخانه"}
                </span>
              </button>
            )}
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
                onDelete={() => requestDeleteBook(item.book)}
                onOpenBook={() => navigate(`/books/${item.book.id}`)}
              />
            ))}
          </div>
        )}
      </main>

      <DeleteConfirmModal
        target={deleteTarget}
        isDeleting={isDeleting}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
      />
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
