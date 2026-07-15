import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";

type BookList = {
  id: number;
  title: string;
  author_name?: string;
  publisher_name?: string;
  cover_url?: string | null;
  pages_count?: number;
  published_year?: number | null;
  average_rating?: number;
  reviews_count?: number;
};

type ReadingListItem = {
  id: number;
  book: BookList;
  created_at?: string;
};

export type ReadingList = {
  id: number;
  name: string;
  list_type?: string;
  books_count?: string | number;
  items?: ReadingListItem[];
  created_at?: string;
};

type LibrariesProps = {
  readingLists: ReadingList[];
  onCreateLibrary: (name: string) => Promise<void>;
};

function sortReadingLists(lists: ReadingList[]) {
  const orderMap: Record<string, number> = {
    read: 1,
    finished: 1,
    done: 1,
    reading: 2,
    currently_reading: 2,
    want_to_read: 3,
    to_read: 3,
  };

  return [...lists].sort((a, b) => {
    const aType = String(a.list_type || "").toLowerCase();
    const bType = String(b.list_type || "").toLowerCase();

    const aName = a.name?.trim();
    const bName = b.name?.trim();

    const aOrder =
      orderMap[aType] ||
      (aName === "خوانده شده"
        ? 1
        : aName === "در حال خواندن"
          ? 2
          : aName === "خواهم خواند"
            ? 3
            : 10);

    const bOrder =
      orderMap[bType] ||
      (bName === "خوانده شده"
        ? 1
        : bName === "در حال خواندن"
          ? 2
          : bName === "خواهم خواند"
            ? 3
            : 10);

    return aOrder - bOrder;
  });
}

function LibraryBookGrid({ list }: { list: ReadingList }) {
  const items = list.items || [];
  const firstFourItems = items.slice(0, 4);
  const emptySlots = Math.max(0, 4 - firstFourItems.length);

  return (
    <div
      className="
        absolute
        inset-2
        grid
        grid-cols-2
        grid-rows-2
        gap-1.5
        min-w-0
        min-h-0
        overflow-hidden
      "
    >
      {firstFourItems.map((item) => {
        const book = item.book;

        return (
          <div
            key={item.id}
            className="
              min-w-0
              min-h-0
              overflow-hidden
              rounded-xl
              border
              border-border
              bg-input-background
            "
          >
            {book?.cover_url ? (
              <img
                src={book.cover_url}
                alt={book.title}
                className="
                  block
                  w-full
                  h-full
                  min-w-0
                  min-h-0
                  object-cover
                "
              />
            ) : (
              <div className="w-full h-full bg-input-background" />
            )}
          </div>
        );
      })}

      {Array.from({ length: emptySlots }).map((_, index) => (
        <div
          key={`empty-${index}`}
          className="
            min-w-0
            min-h-0
            overflow-hidden
            rounded-xl
            border
            border-border
            bg-input-background
          "
        />
      ))}
    </div>
  );
}

function LibraryCard({ list }: { list: ReadingList }) {
  const navigate = useNavigate();

  const count = Number(list.books_count);
  const booksCount = Number.isNaN(count) ? list.items?.length || 0 : count;

  return (
    <button
      type="button"
      onClick={() => navigate(`/library/${list.id}`)}
      className="flex flex-col items-center shrink-0 text-right group"
    >
      <div
        className="
    relative
    overflow-hidden
    bg-shadow
    rounded-lg
    w-24 h-40
    sm:w-32 sm:h-48
    md:w-36 md:h-52
    border
    border-border
    transition-transform
    group-hover:-translate-y-1
    group-hover:shadow-md
  "
      >
        <LibraryBookGrid list={list} />
      </div>

      <p className="mt-2 text-xs sm:text-sm md:text-base text-foreground text-center font-medium whitespace-nowrap">
        {list.name}
      </p>

      <p className="mt-1 text-[10px] sm:text-xs text-muted-foreground">
        {booksCount} کتاب
      </p>
    </button>
  );
}

function AddLibraryModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (name: string) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setErrorMessage("عنوان کتابخانه را وارد کنید.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await onAdd(trimmedName);

      setName("");
      onClose();
    } catch (err: any) {
      console.log("CREATE LIBRARY ERROR:", err.response?.data || err.message);
      setErrorMessage("ساخت کتابخانه با خطا مواجه شد.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative bg-card border-4 border-primary rounded-[29px] w-full max-w-sm p-6 sm:p-8"
        dir="rtl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center justify-start gap-2 mb-6">
          <p className="text-lg sm:text-xl font-medium text-foreground">
            کتابخانه جدید
          </p>
        </div>

        <p className="text-center mb-3 text-foreground">
          عنوان کتابخانه را وارد کنید:
        </p>

        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrorMessage("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="bg-searchbg w-full bg-input-background border border-border rounded-xl h-14 px-4 text-right text-foreground outline-none focus:ring-2 focus:ring-ring"
          autoFocus
        />

        {errorMessage && (
          <p className="text-red-600 text-center text-sm mt-3">
            {errorMessage}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!name.trim() || isSubmitting}
          className="bg-buttons mt-6 w-full text-primary-foreground hover:opacity-90 transition-opacity rounded-xl h-10 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "در حال افزودن..." : "افزودن کتابخانه"}
        </button>
      </div>
    </div>
  );
}

export default function Libraries({
  readingLists,
  onCreateLibrary,
}: LibrariesProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };
  const sortedLists = sortReadingLists(readingLists);

  return (
    <div className="py-5 sm:py-6">
      <p className="text-right font-bold text-base sm:text-lg mb-4 text-foreground">
        کتابخانه
      </p>

      {/* <div className="flex gap-3 sm:gap-5 overflow-x-auto pb-2"> */}
      <div className="relative">
        {/* فلش راست */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronRight size={24} />
        </button>

        {/* فلش چپ */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronLeft size={24} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-5 overflow-x-auto scrollbar-hide scroll-smooth px-10 pb-2"
        >
          {sortedLists.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              هنوز کتابخانه‌ای ثبت نشده است.
            </p>
          ) : (
            sortedLists.map((list) => <LibraryCard key={list.id} list={list} />)
          )}

          <div className="flex flex-col items-center justify-center shrink-0 pt-1">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="w-12 h-12 flex items-center justify-center bg-shadow text-foreground hover:bg-muted rounded-xl transition-colors border border-border"
            >
              <Plus size={28} />
            </button>

            <p className="text-xs mt-2 text-foreground">افزودن کتابخانه</p>
          </div>
        </div>
      </div>
      {modalOpen && (
        <AddLibraryModal
          onClose={() => setModalOpen(false)}
          onAdd={onCreateLibrary}
        />
      )}
    </div>
  );
}
