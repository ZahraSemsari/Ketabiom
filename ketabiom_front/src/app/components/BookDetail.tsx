import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { X, Star } from "lucide-react";
import defaultAvatar from "../../assets/default-avatar.png";

const primaryButtonClass =
  "bg-[#5fa8ba] hover:bg-[#4c94a7] active:bg-[#3f8496] hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 cursor-pointer h-[40px] w-full sm:w-[200px] rounded-[10px] font-['Arad:Medium',sans-serif] text-[16px] sm:text-[18px] text-white";

const modalButtonClass =
  "bg-[#6aa2b4] hover:bg-[#568fa1] active:bg-[#477f91] hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 cursor-pointer h-[42px] w-full sm:w-[220px] rounded-[12px] font-['Arad:Medium',sans-serif] text-[18px] sm:text-[20px] text-white mx-auto block";

type Author = {
  id: number;
  name: string;
  bio?: string;
};

type Publisher = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  title: string;
};

type Note = {
  id: number;
  username: string;
  book?: number | null;
  book_title?: string;
  author_name?: string;
  cover_url?: string;
  text: string;
  created_at?: string;
};

type Quote = {
  id: number;
  username: string;
  book?: number;
  book_title?: string;
  author_name?: string;
  cover_url?: string;
  text: string;
  page_number?: number | null;
  created_at?: string;
};

type BookInList = {
  id: number;
  title?: string;
};

type ReadingListItem = {
  id: number;
  book?: BookInList | number;
  book_id?: number;
  created_at?: string;
};

type ReadingList = {
  id: number;
  name: string;
  list_type?: string;
  books_count?: string | number;
  items?: ReadingListItem[];
  books?: BookInList[];
  created_at?: string;
};

type BookDetailType = {
  id: number;
  title: string;
  author?: Author;
  publisher?: Publisher;
  categories?: Category[];
  cover_url?: string | null;
  description?: string;
  pages_count?: number;
  published_year?: number | null;
  average_rating?: number;
  reviews_count?: number;
  quotes?: Quote[];
  notes?: Note[];
  created_at?: string;
};

type SystemListKind = "read" | "reading" | "want_to_read" | "custom";

const getSystemListKind = (list?: ReadingList | null): SystemListKind => {
  const type = String(list?.list_type || "").toLowerCase();
  const name = String(list?.name || "").trim();

  if (
    type === "read" ||
    type === "finished" ||
    type === "done" ||
    name === "خوانده شده"
  ) {
    return "read";
  }

  if (
    type === "reading" ||
    type === "currently_reading" ||
    name === "در حال خواندن"
  ) {
    return "reading";
  }

  if (
    type === "want_to_read" ||
    type === "to_read" ||
    type === "wishlist" ||
    name === "خواهم خواند"
  ) {
    return "want_to_read";
  }

  return "custom";
};

const getSystemListPayloadType = (kind: SystemListKind) => {
  if (kind === "read") return "read";
  if (kind === "reading") return "reading";
  if (kind === "want_to_read") return "want_to_read";
  return "custom";
};

const buildReadingListPayload = (list: ReadingList) => {
  const kind = getSystemListKind(list);

  if (kind !== "custom") {
    return {
      list_type: list.list_type || getSystemListPayloadType(kind),
    };
  }

  return {
    list_id: list.id,
  };
};

const getBookIdFromReadingListItem = (item: any) => {
  if (!item) return null;

  if (typeof item.book === "object" && item.book?.id) {
    return Number(item.book.id);
  }

  if (typeof item.book === "number" || typeof item.book === "string") {
    return Number(item.book);
  }

  if (item.book_id) {
    return Number(item.book_id);
  }

  return null;
};

const normalizeReadingListItems = (list: ReadingList): ReadingListItem[] => {
  if (Array.isArray(list.items)) {
    return list.items;
  }

  if (Array.isArray(list.books)) {
    return list.books.map((book) => ({
      id: book.id,
      book,
    }));
  }

  return [];
};

export default function BookDetail() {
  const { id } = useParams();

  const rawBaseUrl =
    import.meta.env.VITE_API_URL || "https://bookiom.liara.run";
  const baseUrl = rawBaseUrl.replace(/\/$/, "").replace(/\/api$/, "");
  const apiBaseUrl = `${baseUrl}/api`;

  const [book, setBook] = useState<BookDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showClipModal, setShowClipModal] = useState(false);

  const [readingLists, setReadingLists] = useState<ReadingList[]>([]);
  const [isLoadingLibraries, setIsLoadingLibraries] = useState(false);

  const [selectedLibraryId, setSelectedLibraryId] = useState<number | null>(
    null,
  );

  const [selectedStars, setSelectedStars] = useState(0);
  const [hoveredStars, setHoveredStars] = useState(0);
  const [bookRating, setBookRating] = useState(0);

  const [noteText, setNoteText] = useState("");
  const [quoteText, setQuoteText] = useState("");
  const [quotePageNumber, setQuotePageNumber] = useState("");

  const [isSubmittingLibrary, setIsSubmittingLibrary] = useState(false);
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const TEXT_PREVIEW_LIMIT = 500;

  const [expandedQuotes, setExpandedQuotes] = useState<number[]>([]);
  const [expandedNotes, setExpandedNotes] = useState<number[]>([]);

  const [pendingMove, setPendingMove] = useState<{
    fromList: ReadingList;
    toList: ReadingList;
  } | null>(null);

  const moveConfirmationResolverRef = useRef<
    ((confirmed: boolean) => void) | null
  >(null);

  const selectedLibrary = readingLists.find(
    (list) => list.id === selectedLibraryId,
  );

  const selectedLibraryKind = getSystemListKind(selectedLibrary);
  const showRatingStars = selectedLibraryKind === "read";

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
      return await axios.get(url, getAuthConfig());
    } catch (err: any) {
      if (!isTokenExpiredError(err)) {
        throw err;
      }

      const newAccessToken = await refreshAccessToken();
      return await axios.get(url, getAuthConfig(newAccessToken));
    }
  };

  const authPost = async (url: string, body: any) => {
    try {
      return await axios.post(url, body, getAuthConfig());
    } catch (err: any) {
      if (!isTokenExpiredError(err)) {
        throw err;
      }

      const newAccessToken = await refreshAccessToken();
      return await axios.post(url, body, getAuthConfig(newAccessToken));
    }
  };

  const authDelete = async (url: string, body?: any) => {
    try {
      return await axios.delete(url, {
        ...getAuthConfig(),
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

  const isSystemReadingList = (list: ReadingList) => {
    return getSystemListKind(list) !== "custom";
  };

  const fetchBook = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setErrorMessage("");

      const res = await axios.get(`${apiBaseUrl}/books/books/${id}/`);

      setBook(res.data);
      setBookRating(Number(res.data.average_rating) || 0);
    } catch (err: any) {
      console.log("FETCH BOOK ERROR:", err.response?.data || err.message);
      setBook(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchReadingLists = async () => {
    const token = getAccessToken();

    if (!token) {
      setErrorMessage(
        "برای افزودن کتاب به کتابخانه باید وارد حساب کاربری شوید.",
      );
      setReadingLists([]);
      return;
    }

    try {
      setIsLoadingLibraries(true);
      setErrorMessage("");

      const res = await authGet(`${apiBaseUrl}/books/reading-lists/`);

      const data = Array.isArray(res.data) ? res.data : res.data?.results || [];
      setReadingLists(data);
    } catch (err: any) {
      console.log(
        "FETCH READING LISTS ERROR:",
        err.response?.data || err.message,
      );

      setErrorMessage(
        getApiErrorMessage(err, "دریافت کتابخانه‌ها با خطا مواجه شد."),
      );
    } finally {
      setIsLoadingLibraries(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  useEffect(() => {
    if (showLibraryModal) {
      fetchReadingLists();
    }
  }, [showLibraryModal]);

  const handleSelectLibrary = (library: ReadingList) => {
    setSelectedLibraryId(library.id);
    setErrorMessage("");

    if (getSystemListKind(library) !== "read") {
      setSelectedStars(0);
      setHoveredStars(0);
    }
  };

  const listContainsCurrentBook = (list: ReadingList) => {
    const currentBookId = Number(id);

    if (!currentBookId) {
      return false;
    }

    const items = normalizeReadingListItems(list);

    return items.some((item) => {
      const itemBookId = getBookIdFromReadingListItem(item);

      return itemBookId === currentBookId;
    });
  };

  const safeFetchFullReadingList = async (list: ReadingList) => {
    try {
      const res = await authGet(
        `${apiBaseUrl}/books/reading-lists/${list.id}/`,
      );

      return res.data as ReadingList;
    } catch (err: any) {
      console.log(
        "FETCH FULL READING LIST ERROR:",
        err.response?.data || err.message,
      );

      return {
        ...list,
        items: [],
        books: [],
      } as ReadingList;
    }
  };

  const selectedListAlreadyContainsCurrentBook = async (
    selectedList: ReadingList,
  ) => {
    const fullSelectedList = await safeFetchFullReadingList(selectedList);

    return listContainsCurrentBook(fullSelectedList);
  };

  const findCurrentSystemListForBook = async (selectedList: ReadingList) => {
    const selectedKind = getSystemListKind(selectedList);

    if (selectedKind === "custom") {
      return null;
    }

    const otherSystemLists = readingLists.filter((list) => {
      const kind = getSystemListKind(list);

      return kind !== "custom" && kind !== selectedKind;
    });

    for (const list of otherSystemLists) {
      const fullList = await safeFetchFullReadingList(list);

      if (listContainsCurrentBook(fullList)) {
        return fullList;
      }
    }

    return null;
  };

  const removeBookFromListSafe = async (list: ReadingList) => {
    if (!id) return;

    try {
      await authDelete(
        `${apiBaseUrl}/books/books/${id}/remove-from-list/`,
        buildReadingListPayload(list),
      );
    } catch (err: any) {
      console.log(
        "SAFE REMOVE FROM SYSTEM LIST ERROR:",
        err.response?.data || err.message,
      );
    }
  };

  const requestMoveConfirmation = (
    fromList: ReadingList,
    toList: ReadingList,
  ) => {
    return new Promise<boolean>((resolve) => {
      moveConfirmationResolverRef.current = resolve;
      setPendingMove({
        fromList,
        toList,
      });
    });
  };

  const closeMoveConfirmation = (confirmed: boolean) => {
    if (moveConfirmationResolverRef.current) {
      moveConfirmationResolverRef.current(confirmed);
    }

    moveConfirmationResolverRef.current = null;
    setPendingMove(null);
  };

  const addBookToLibrary = async () => {
    if (!selectedLibraryId) {
      throw new Error("No selected library");
    }

    const selectedList = readingLists.find(
      (list) => list.id === selectedLibraryId,
    );

    if (!selectedList) {
      throw new Error("Selected library not found");
    }

    const selectedKind = getSystemListKind(selectedList);

    const alreadyInSelectedList =
      await selectedListAlreadyContainsCurrentBook(selectedList);

    if (alreadyInSelectedList) {
      throw new Error("ALREADY_IN_SELECTED_LIST");
    }

    if (selectedKind !== "custom") {
      const currentSystemList =
        await findCurrentSystemListForBook(selectedList);

      if (currentSystemList) {
        const confirmed = await requestMoveConfirmation(
          currentSystemList,
          selectedList,
        );

        if (!confirmed) {
          throw new Error("MOVE_CANCELLED");
        }

        await removeBookFromListSafe(currentSystemList);
      }
    }

    return await authPost(
      `${apiBaseUrl}/books/books/${id}/add-to-list/`,
      buildReadingListPayload(selectedList),
    );
  };

  const submitRatingIfNeeded = async () => {
    if (!showRatingStars || selectedStars === 0) return;

    try {
      await authPost(`${apiBaseUrl}/books/books/${id}/reviews/`, {
        rating: selectedStars,
      });

      setBookRating(selectedStars);
    } catch (err: any) {
      console.log("RATING ERROR:", err.response?.data || err.message);
    }
  };

  const handleLibrarySubmit = async () => {
    const token = getAccessToken();

    if (!token) {
      setErrorMessage(
        "برای افزودن کتاب به کتابخانه باید وارد حساب کاربری شوید.",
      );
      return;
    }

    if (!selectedLibraryId) {
      setErrorMessage("لطفاً یک کتابخانه انتخاب کنید.");
      return;
    }

    if (showRatingStars && selectedStars === 0) {
      setErrorMessage("لطفاً امتیاز کتاب را انتخاب کنید.");
      return;
    }

    try {
      setIsSubmittingLibrary(true);
      setErrorMessage("");

      await addBookToLibrary();
      await submitRatingIfNeeded();

      setShowLibraryModal(false);
      setSelectedLibraryId(null);
      setSelectedStars(0);
      setHoveredStars(0);

      await fetchBook();
    } catch (err: any) {
      if (err?.message === "MOVE_CANCELLED") {
        setErrorMessage("");
        return;
      }

      if (err?.message === "ALREADY_IN_SELECTED_LIST") {
        setErrorMessage("این کتاب از قبل در همین کتابخانه قرار دارد.");
        return;
      }

      console.log("ADD TO LIBRARY ERROR:", err.response?.data || err.message);

      setErrorMessage(
        getApiErrorMessage(err, "افزودن کتاب به کتابخانه با خطا مواجه شد."),
      );
    } finally {
      setIsSubmittingLibrary(false);
    }
  };

  const handleNoteSubmit = async () => {
    const token = getAccessToken();
    const trimmedText = noteText.trim();

    if (!token) {
      setErrorMessage("برای افزودن یادداشت باید وارد حساب کاربری شوید.");
      return;
    }

    if (!trimmedText) {
      setErrorMessage("متن یادداشت را وارد کنید.");
      return;
    }

    try {
      setIsSubmittingNote(true);
      setErrorMessage("");

      const res = await authPost(`${apiBaseUrl}/books/books/${id}/notes/`, {
        text: trimmedText,
      });

      setBook((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          notes: [res.data, ...(prev.notes || [])],
        };
      });

      setNoteText("");
      setShowNoteModal(false);
    } catch (err: any) {
      console.log("ADD NOTE ERROR:", err.response?.data || err.message);

      setErrorMessage(
        getApiErrorMessage(err, "افزودن یادداشت با خطا مواجه شد."),
      );
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const handleQuoteSubmit = async () => {
    const token = getAccessToken();
    const trimmedText = quoteText.trim();

    if (!token) {
      setErrorMessage("برای افزودن بریده کتاب باید وارد حساب کاربری شوید.");
      return;
    }

    if (!trimmedText) {
      setErrorMessage("متن بریده کتاب را وارد کنید.");
      return;
    }

    try {
      setIsSubmittingQuote(true);
      setErrorMessage("");

      const payload = {
        text: trimmedText,
        page_number: quotePageNumber ? Number(quotePageNumber) : null,
      };

      const res = await authPost(
        `${apiBaseUrl}/books/books/${id}/quotes/`,
        payload,
      );

      setBook((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          quotes: [res.data, ...(prev.quotes || [])],
        };
      });

      setQuoteText("");
      setQuotePageNumber("");
      setShowClipModal(false);
    } catch (err: any) {
      console.log("ADD QUOTE ERROR:", err.response?.data || err.message);

      setErrorMessage(
        getApiErrorMessage(err, "افزودن بریده کتاب با خطا مواجه شد."),
      );
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  const closeLibraryModal = () => {
    setShowLibraryModal(false);
    setErrorMessage("");
    setSelectedLibraryId(null);
    setSelectedStars(0);
    setHoveredStars(0);
  };

  const closeNoteModal = () => {
    setShowNoteModal(false);
    setErrorMessage("");
    setNoteText("");
  };

  const closeQuoteModal = () => {
    setShowClipModal(false);
    setErrorMessage("");
    setQuoteText("");
    setQuotePageNumber("");
  };

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center">
        در حال دریافت اطلاعات...
      </div>
    );
  }

  if (!book) {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center">
        کتاب پیدا نشد.
      </div>
    );
  }

  const systemReadingLists = readingLists.filter(isSystemReadingList);
  const personalReadingLists = readingLists.filter(
    (list) => !isSystemReadingList(list),
  );

  const firstSectionLists =
    systemReadingLists.length > 0 ? systemReadingLists : readingLists;

  const secondSectionLists =
    systemReadingLists.length > 0 ? personalReadingLists : [];

  const bookInfoItems = [
    {
      label: "دسته‌بندی",
      value:
        (book.categories || []).map((category) => category.title).join("، ") ||
        "نامشخص",
    },
    {
      label: "ناشر",
      value: book.publisher?.name || "نامشخص",
    },
    {
      label: "تعداد صفحه‌ها",
      value: book.pages_count || "نامشخص",
    },
    {
      label: "سال انتشار",
      value: book.published_year || "نامشخص",
    },
  ];

  return (
    <div className="bg-[#fafafa] min-h-screen relative" dir="rtl">
      {/* <div className="page-background min-h-screen relative" dir="rtl"> */}

      <main className="relative pt-[40px] sm:pt-[55px] pb-16">
        <section className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-[28px] md:gap-[95px]">
            {book.cover_url ? (
              <img
                src={book.cover_url}
                alt={book.title}
                className="h-[260px] w-[185px] sm:h-[340px] sm:w-[240px] rounded-[20px] object-cover bg-[#d9d9d9]"
              />
            ) : (
              <div className="h-[260px] w-[185px] sm:h-[340px] sm:w-[240px] rounded-[20px] bg-[#d9d9d9]" />
            )}

            <div className="flex flex-col items-center md:items-start gap-[14px] md:pt-[18px] flex-shrink-0 w-full sm:w-auto">
              <p className="font-['Arad:Bold',sans-serif] text-[24px] sm:text-[26px] text-black">
                {book.title}
              </p>

              <p className="font-['Arad:Medium',sans-serif] text-[#3d3d3d] text-[18px] sm:text-[20px]">
                {book.author?.name || "نویسنده نامشخص"}
              </p>

              <p className="font-['Arad:Medium',sans-serif] text-[16px] sm:text-[18px] text-black">
                امتیاز:{" "}
                <span className="font-['AradFD:Medium',sans-serif]">
                  {bookRating.toFixed(1)}
                </span>
              </p>

              <button
                type="button"
                onClick={() => {
                  setErrorMessage("");
                  setShowLibraryModal(true);
                }}
                className={`${primaryButtonClass} mt-1 max-w-[260px]`}
              >
                افزودن به کتابخانه
              </button>

              <button
                type="button"
                onClick={() => {
                  setErrorMessage("");
                  setShowClipModal(true);
                }}
                className={`${primaryButtonClass} max-w-[260px]`}
              >
                افزودن بریده کتاب
              </button>

              <button
                type="button"
                onClick={() => {
                  setErrorMessage("");
                  setShowNoteModal(true);
                }}
                className={`${primaryButtonClass} max-w-[260px]`}
              >
                افزودن یادداشت
              </button>
            </div>
          </div>

          <div className="mt-[45px] sm:mt-[55px] w-full max-w-[820px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-y-7">
            {bookInfoItems.map((item, index) => (
              <div
                key={item.label}
                className={`flex flex-col items-center justify-start text-center min-w-0 px-4 ${
                  index !== bookInfoItems.length - 1
                    ? "sm:border-l sm:border-[#3d3d3d]"
                    : ""
                }`}
              >
                <p className="font-['Arad:Medium',sans-serif] text-[#3d3d3d] text-[14px] sm:text-[16px] whitespace-nowrap mb-[8px]">
                  {item.label}
                </p>

                <p
                  title={String(item.value)}
                  className="font-['Arad:SemiBold',sans-serif] text-[16px] sm:text-[18px] text-black text-center leading-[28px] max-w-[150px] sm:max-w-[165px] whitespace-normal break-words overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]"
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-[50px] sm:mt-[70px] w-full">
            <p className="font-['Arad:Bold',sans-serif] text-[18px] sm:text-[20px] text-black text-right mb-[18px]">
              توضیحات
            </p>

            <p className="font-['Arad:Medium',sans-serif] text-[14px] sm:text-[15px] text-black text-right leading-[28px] sm:leading-[26px]">
              {book.description || "توضیحاتی برای این کتاب ثبت نشده است."}
            </p>
          </div>
        </section>

        <section className="mt-[70px] sm:mt-[90px] max-w-[900px] mx-auto px-4 sm:px-6">
          <p className="font-['Arad:Bold',sans-serif] text-[18px] text-black text-right mb-[28px]">
            بریدۀ کتاب
          </p>

          {(book.quotes || []).length === 0 ? (
            <p className="text-center text-[#3d3d3d]">
              هنوز بریده‌ای برای این کتاب ثبت نشده است.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-y-[28px] sm:gap-y-[46px]">
              {(book.quotes || []).map((item) => {
                const isExpanded = expandedQuotes.includes(item.id);
                const text = item.text || "";
                const isLongText = text.length > TEXT_PREVIEW_LIMIT;

                const visibleText =
                  isExpanded || !isLongText
                    ? text
                    : `${text.slice(0, TEXT_PREVIEW_LIMIT)}...`;

                return (
                  <div
                    key={item.id}
                    className="bg-[#e8e8e8] rounded-[12px] px-5 sm:px-6 py-5 min-h-[150px]"
                  >
                    <div className="flex flex-row items-center justify-start gap-3 mb-4">
                      <div className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full border-[3px] border-[#236474] flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img
                          src={defaultAvatar}
                          alt={`پروفایل ${item.username}`}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>

                      <p className="font-['Arad:Medium',sans-serif] text-[18px] sm:text-[20px] text-black">
                        {item.username}
                      </p>
                    </div>

                    <p className="font-['Arad:Regular',sans-serif] text-[15px] sm:text-[16px] text-black text-right leading-[28px] sm:leading-[26px]">
                      {visibleText}
                    </p>

                    {isLongText && (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedQuotes((prev) =>
                            prev.includes(item.id)
                              ? prev.filter((id) => id !== item.id)
                              : [...prev, item.id],
                          )
                        }
                        className="mt-3 font-['Arad:Medium',sans-serif] text-[14px] text-[#236474] hover:text-[#4499AF] transition-colors cursor-pointer"
                      >
                        {isExpanded ? "نمایش کمتر" : "نمایش بیشتر"}
                      </button>
                    )}

                    {item.page_number !== null &&
                      item.page_number !== undefined && (
                        <p className="mt-3 text-left text-[13px] text-[#3d3d3d]">
                          صفحه {item.page_number}
                        </p>
                      )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="mt-[60px] sm:mt-[70px] max-w-[900px] mx-auto px-4 sm:px-6">
          <p className="font-['Arad:Bold',sans-serif] text-[18px] text-black text-right mb-[28px]">
            یادداشت ها
          </p>

          {(book.notes || []).length === 0 ? (
            <p className="text-center text-[#3d3d3d]">
              هنوز یادداشتی برای این کتاب ثبت نشده است.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-y-[28px] sm:gap-y-[46px]">
              {(book.notes || []).map((item) => {
                const isExpanded = expandedNotes.includes(item.id);
                const text = item.text || "";
                const isLongText = text.length > TEXT_PREVIEW_LIMIT;

                const visibleText =
                  isExpanded || !isLongText
                    ? text
                    : `${text.slice(0, TEXT_PREVIEW_LIMIT)}...`;

                return (
                  <div
                    key={item.id}
                    className="bg-[#e8e8e8] rounded-[12px] px-5 sm:px-6 py-5 min-h-[150px]"
                  >
                    <div className="flex flex-row items-center justify-start gap-3 mb-4">
                      <div className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full border-[3px] border-[#236474] flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img
                          src={defaultAvatar}
                          alt={`پروفایل ${item.username}`}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>

                      <p className="font-['Arad:Medium',sans-serif] text-[18px] sm:text-[20px] text-black">
                        {item.username}
                      </p>
                    </div>

                    <p className="font-['Arad:Regular',sans-serif] text-[15px] sm:text-[16px] text-black text-right leading-[28px] sm:leading-[26px]">
                      {visibleText}
                    </p>

                    {isLongText && (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedNotes((prev) =>
                            prev.includes(item.id)
                              ? prev.filter((id) => id !== item.id)
                              : [...prev, item.id],
                          )
                        }
                        className="mt-3 font-['Arad:Medium',sans-serif] text-[14px] text-[#236474] hover:text-[#4499AF] transition-colors cursor-pointer"
                      >
                        {isExpanded ? "نمایش کمتر" : "نمایش بیشتر"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {showLibraryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-[#236474] rounded-[29px] w-full max-w-[470px] p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={closeLibraryModal}
              className="absolute left-6 sm:left-8 top-6 sm:top-8 cursor-pointer hover:scale-110 transition-transform duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            <p className="font-['Arad:Medium',sans-serif] text-[20px] sm:text-[22px] text-black text-right mb-6">
              کتابخانه ها
            </p>

            <p className="font-['Arad:Medium',sans-serif] text-[17px] sm:text-[19px] text-black text-center mb-6">
              کتابخانه مورد نظرتان را انتخاب کنید :
            </p>

            {isLoadingLibraries && (
              <p className="text-center text-[15px] mb-6">
                در حال دریافت کتابخانه‌ها...
              </p>
            )}

            {!isLoadingLibraries && firstSectionLists.length === 0 && (
              <p className="text-center text-[15px] mb-6 text-[#3d3d3d]">
                کتابخانه‌ای برای شما ثبت نشده است.
              </p>
            )}

            {!isLoadingLibraries && firstSectionLists.length > 0 && (
              <div className="space-y-4 mb-6">
                {firstSectionLists.map((library) => (
                  <label
                    key={library.id}
                    className="flex flex-row items-center justify-start gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="library"
                      value={library.id}
                      checked={selectedLibraryId === library.id}
                      onChange={() => handleSelectLibrary(library)}
                      className="w-[18px] h-[18px] accent-[#236474] cursor-pointer"
                    />

                    <span className="font-['Arad:Regular',sans-serif] text-[18px] sm:text-[20px] text-black">
                      {library.name}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {secondSectionLists.length > 0 && (
              <>
                <hr className="border-[#3d3d3d] my-6" />

                <p className="font-['Arad:Medium',sans-serif] text-[17px] sm:text-[18px] text-black text-center mb-4">
                  کتابخانه های شخصی :
                </p>

                <div className="space-y-4 mb-6">
                  {secondSectionLists.map((library) => (
                    <label
                      key={library.id}
                      className="flex flex-row items-center justify-start gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="library"
                        value={library.id}
                        checked={selectedLibraryId === library.id}
                        onChange={() => handleSelectLibrary(library)}
                        className="w-[18px] h-[18px] accent-[#236474] cursor-pointer"
                      />

                      <span className="font-['Arad:Regular',sans-serif] text-[18px] sm:text-[20px] text-black">
                        {library.name}
                      </span>
                    </label>
                  ))}
                </div>
              </>
            )}

            {showRatingStars && (
              <div className="flex justify-center gap-2 mb-8" dir="ltr">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = star <= (hoveredStars || selectedStars);

                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredStars(star)}
                      onMouseLeave={() => setHoveredStars(0)}
                      onClick={() => {
                        setSelectedStars(star);
                        setErrorMessage("");
                      }}
                      className="cursor-pointer transition-transform duration-150 hover:scale-110"
                      aria-label={`${star} stars`}
                    >
                      <Star
                        className={`w-8 h-8 transition-colors duration-150 ${
                          active
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-transparent text-black"
                        }`}
                        strokeWidth={2.5}
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {errorMessage && (
              <p className="text-red-600 text-center text-[14px] mb-4">
                {errorMessage}
              </p>
            )}

            <button
              type="button"
              onClick={handleLibrarySubmit}
              disabled={
                !selectedLibraryId ||
                (showRatingStars && selectedStars === 0) ||
                isSubmittingLibrary
              }
              className={`${modalButtonClass} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none`}
            >
              {isSubmittingLibrary ? "در حال افزودن..." : "افزودن به کتابخانه"}
            </button>
          </div>
        </div>
      )}

      {pendingMove && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div
            className="bg-white border-4 border-[#236474] rounded-[29px] w-full max-w-[470px] p-6 sm:p-8 relative shadow-2xl"
            dir="rtl"
          >
            <button
              type="button"
              onClick={() => closeMoveConfirmation(false)}
              className="absolute left-6 sm:left-8 top-6 sm:top-8 cursor-pointer hover:scale-110 transition-transform duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            <p className="font-['Arad:Medium',sans-serif] text-[20px] sm:text-[22px] text-black text-right mb-6">
              انتقال کتاب
            </p>

            <p className="font-['Arad:Medium',sans-serif] text-[17px] sm:text-[19px] text-black text-center leading-8 mb-8">
              این کتاب در کتابخانه «{pendingMove.fromList.name}» قرار دارد.
              <br />
              آیا می‌خواهید آن را به کتابخانه «{pendingMove.toList.name}» منتقل
              کنید؟
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => closeMoveConfirmation(false)}
                className="h-[42px] w-full sm:w-[160px] rounded-[12px] border border-[#236474] text-[#236474] bg-white hover:bg-[#ebf5f7] transition-all duration-200 font-['Arad:Medium',sans-serif] text-[17px]"
              >
                انصراف
              </button>

              <button
                type="button"
                onClick={() => closeMoveConfirmation(true)}
                className="h-[42px] w-full sm:w-[180px] rounded-[12px] bg-[#6aa2b4] hover:bg-[#568fa1] active:bg-[#477f91] hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 font-['Arad:Medium',sans-serif] text-[17px] text-white"
              >
                بله، منتقل کن
              </button>
            </div>
          </div>
        </div>
      )}

      {showNoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-[#236474] rounded-[29px] w-full max-w-[470px] p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={closeNoteModal}
              className="absolute left-6 sm:left-8 top-6 sm:top-8 cursor-pointer hover:scale-110 transition-transform duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            <p className="font-['Arad:Medium',sans-serif] text-[20px] sm:text-[22px] text-black text-right mb-6">
              متن یادداشت
            </p>

            <p className="font-['Arad:Medium',sans-serif] text-[17px] sm:text-[19px] text-black text-center mb-4">
              یادداشت خود را بنویسید :
            </p>

            <textarea
              value={noteText}
              onChange={(e) => {
                setNoteText(e.target.value);
                setErrorMessage("");
              }}
              className="bg-[#eaeaea] w-full h-[210px] sm:h-[242px] rounded-[10px] p-4 font-['Arad:Medium',sans-serif] text-[16px] sm:text-[18px] text-black text-right resize-none outline-none mb-6"
              placeholder="یادداشت خود را اینجا بنویسید..."
            />

            {errorMessage && (
              <p className="text-red-600 text-center text-[14px] mb-4">
                {errorMessage}
              </p>
            )}

            <button
              type="button"
              onClick={handleNoteSubmit}
              disabled={!noteText.trim() || isSubmittingNote}
              className={`${modalButtonClass} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none`}
            >
              {isSubmittingNote ? "در حال افزودن..." : "افزودن یادداشت"}
            </button>
          </div>
        </div>
      )}

      {showClipModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-[#236474] rounded-[29px] w-full max-w-[470px] p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={closeQuoteModal}
              className="absolute left-6 sm:left-8 top-6 sm:top-8 cursor-pointer hover:scale-110 transition-transform duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            <p className="font-['Arad:Medium',sans-serif] text-[20px] sm:text-[22px] text-black text-right mb-6">
              بریده کتاب
            </p>

            <p className="font-['Arad:Medium',sans-serif] text-[17px] sm:text-[19px] text-black text-center mb-4">
              بریده کتاب مورد نظرتان را بنویسید :
            </p>

            <textarea
              value={quoteText}
              onChange={(e) => {
                setQuoteText(e.target.value);
                setErrorMessage("");
              }}
              className="bg-[#eaeaea] w-full h-[190px] sm:h-[195px] rounded-[10px] p-4 font-['Arad:Medium',sans-serif] text-[16px] sm:text-[18px] text-black text-right resize-none outline-none mb-4"
              placeholder="بریده کتاب را اینجا بنویسید..."
            />

            <input
              type="number"
              min="0"
              value={quotePageNumber}
              onChange={(e) => {
                setQuotePageNumber(e.target.value);
                setErrorMessage("");
              }}
              className="bg-[#eaeaea] w-full h-[45px] rounded-[10px] px-4 font-['Arad:Medium',sans-serif] text-[16px] sm:text-[18px] text-black text-right outline-none mb-6"
              placeholder="شماره صفحه، اختیاری"
            />

            {errorMessage && (
              <p className="text-red-600 text-center text-[14px] mb-4">
                {errorMessage}
              </p>
            )}

            <button
              type="button"
              onClick={handleQuoteSubmit}
              disabled={!quoteText.trim() || isSubmittingQuote}
              className={`${modalButtonClass} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none`}
            >
              {isSubmittingQuote ? "در حال افزودن..." : "افزودن بریده کتاب"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
