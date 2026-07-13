// const EXCERPTS = [
//   {
//     text: "آنچه که میتوانم ببینم چیزی جز یک پوسته‌ی ظاهری نیست.مهم‌ترین چیزهارا نمیشود با چشم دید... چون چشم‌ها قادر به دیدن نیستند،آدم ها باید با قلبشان ببینند...",
//     bookTitle: "عنوان کتاب",
//     author: "نویسنده",
//   },
//   {
//     text: "به‌من جوابی سربالا می‌دهی. خوشم نمی‌آید. یک روز، هرچه زودتر، باید یادگیری نه فقط یک فرسنگِ دورتر، بلکه دَه سال بعد را هم ببیني. اگر این را یادگیری، و به‌راستی دوستم داشته باشی، کشته شدن من، تو را هم خواهد کشت ــ دختر!",
//     bookTitle: "عنوان کتاب",
//     author: "نویسنده",
//   },
//   {
//     text: "در آن لحظه فهمیدم که چه بار سنگینی بر دوش می‌کشم. اما راهی جز ادامه دادن نبود...",
//     bookTitle: "عنوان کتاب",
//     author: "نویسنده",
//   },
// ];

// function NoteCard({
//   text,
//   bookTitle,
//   author,
// }: {
//   text: string;
//   bookTitle: string;
//   author: string;
// }) {
//   return (
//     <div className="bg-accent border border-border rounded-xl p-3 flex gap-3 w-72 shrink-0 min-h-[160px]">
//       <div className="w-[70px] shrink-0">
//         <div className="bg-input-background border border-border rounded-xl aspect-[3/4]" />
//         <p className="text-xs mt-1 text-right font-medium text-foreground truncate">{bookTitle}</p>
//         <p className="text-[10px] text-right text-muted-foreground truncate">{author}</p>
//       </div>

//       <p className="text-xs leading-relaxed text-right flex-1 text-foreground line-clamp-6">
//         {text}
//       </p>
//     </div>
//   );
// }

// export default function Excerpts() {
//   return (
//     <div className="py-3 sm:py-4 pb-10">
//       <p className="text-right font-bold mb-3 text-foreground">بریدۀ کتاب</p>

//       <div className="flex gap-3 overflow-x-auto">
//         {EXCERPTS.map((e, i) => (
//           <NoteCard key={i} {...e} />
//         ))}
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import type { UserQuote } from "./UserProfile";

// type ExcerptCardProps = {
//   quote: UserQuote;
// };

// function ExcerptCard({ quote }: ExcerptCardProps) {
//   return (
//     <div className="bg-accent border border-border rounded-xl p-3 flex gap-3 w-72 shrink-0 min-h-[160px]">
//       <div className="w-[70px] shrink-0">
//         {quote.cover_url ? (
//           <img
//             src={quote.cover_url}
//             alt={quote.book_title || "کتاب"}
//             className="bg-input-background border border-border rounded-xl aspect-[3/4] w-full object-cover"
//           />
//         ) : (
//           <div className="bg-input-background border border-border rounded-xl aspect-[3/4]" />
//         )}

//         <p className="text-xs mt-1 text-right font-medium text-foreground truncate">
//           {quote.book_title || "عنوان کتاب"}
//         </p>

//         <p className="text-[10px] text-right text-muted-foreground truncate">
//           {quote.author_name || "نویسنده"}
//         </p>
//       </div>

//       <div className="flex-1">
//         <p className="text-xs leading-relaxed text-right text-foreground line-clamp-6 whitespace-pre-line">
//           {quote.text}
//         </p>

//         {quote.page_number !== null && quote.page_number !== undefined && (
//           <p className="text-[10px] text-left text-muted-foreground mt-2">
//             صفحه {quote.page_number}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function Excerpts({ quotes }: { quotes: UserQuote[] }) {
//   return (
//     <div className="py-3 sm:py-4 pb-10">
//       <p className="text-right font-bold mb-3 text-foreground">بریدۀ کتاب</p>

//       {quotes.length === 0 ? (
//         <p className="text-sm text-muted-foreground text-right">
//           هنوز بریده‌ای ثبت نشده است.
//         </p>
//       ) : (
//         <div className="flex gap-3 overflow-x-auto">
//           {quotes.map((quote, index) => (
//             <ExcerptCard key={quote.id || index} quote={quote} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { Trash2, X } from "lucide-react";
import type { UserQuote } from "./UserProfile";

const TEXT_PREVIEW_LIMIT = 500;

type ExcerptCardProps = {
  quote: UserQuote;
  onDelete: (quoteId: number) => Promise<void>;
  isDeleting: boolean;
};

function ExcerptCard({ quote, onDelete, isDeleting }: ExcerptCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const text = quote.text || "";
  const isLongText = text.length > TEXT_PREVIEW_LIMIT;

  const visibleText =
    isExpanded || !isLongText
      ? text
      : `${text.slice(0, TEXT_PREVIEW_LIMIT)}...`;

  return (
    <>
      {/* کارت بریده کتاب */}
      <div className="relative bg-searchbg rounded-[18px] px-5 sm:px-6 py-5 min-h-[170px] w-full border border-[#d6d6d6]">
        {/* دکمه حذف */}
        <button
          type="button"
          disabled={isDeleting}
          onClick={() => setShowDeleteModal(true)}
          className="
          absolute
          left-4
          top-4
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          text-red-600
          transition
          hover:bg-red-50
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
          aria-label="حذف بریده کتاب"
          title="حذف بریده کتاب"
        >
          <Trash2 size={19} />
        </button>

        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* اطلاعات کتاب */}
          <div className="w-full sm:w-[155px] flex sm:flex-col flex-row items-start sm:items-center gap-4 sm:gap-2 shrink-0">
            {quote.cover_url ? (
              <img
                src={quote.cover_url}
                alt={quote.book_title || "کتاب"}
                className="w-[82px] h-[118px] sm:w-[90px] sm:h-[130px] rounded-[14px] object-cover bg-gray2 shrink-0"
              />
            ) : (
              <div className="w-[82px] h-[118px] sm:w-[90px] sm:h-[130px] rounded-[14px] bg-gray2 shrink-0" />
            )}

            <div className="min-w-0 flex-1 sm:w-full text-right sm:text-center">
              <p className="font-['Arad:SemiBold',sans-serif] text-[13px] sm:text-[14px] text-black leading-[24px] whitespace-normal break-words">
                {quote.book_title || "عنوان کتاب"}
              </p>

              <p className="font-['Arad:Regular',sans-serif] text-[12px] sm:text-[13px] text-[#3d3d3d] leading-[22px] whitespace-normal break-words mt-1">
                {quote.author_name || "نویسنده نامشخص"}
              </p>
            </div>
          </div>

          {/* متن بریده */}
          <div className="flex-1 min-w-0 w-full">
            {quote.username && (
              <p className="font-['Arad:Medium',sans-serif] text-[17px] sm:text-[19px] text-black mb-4 text-right">
                {quote.username}
              </p>
            )}

            <p className="font-['Arad:Regular',sans-serif] text-[15px] sm:text-[16px] text-black text-right leading-[30px] whitespace-pre-line">
              {visibleText}
            </p>

            {isLongText && (
              <button
                type="button"
                onClick={() => setIsExpanded((previous) => !previous)}
                className="mt-4 font-['Arad:Medium',sans-serif] text-[14px] text-[#236474] hover:text-[#4499AF] transition-colors cursor-pointer"
              >
                {isExpanded ? "نمایش کمتر" : "نمایش بیشتر"}
              </button>
            )}

            {quote.page_number !== null && quote.page_number !== undefined && (
              <p className="mt-4 text-left text-[13px] text-[#3d3d3d]">
                صفحه {quote.page_number}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* مودال تأیید حذف */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/50 px-4"
          onClick={(event) => {
            if (event.target === event.currentTarget && !isDeleting) {
              setShowDeleteModal(false);
            }
          }}
        >
          <div
            dir="rtl"
            className="relative w-full max-w-[430px] rounded-[28px] border-[3px] border-[#236474] bg-white px-6 py-8 shadow-2xl sm:px-8"
          >
            {/* دکمه بستن */}
            <button
              type="button"
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
              className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-black/60 transition hover:bg-gray-100 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="بستن"
            >
              <X size={24} />
            </button>

            {/* آیکن حذف */}
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 size={30} />
            </div>

            <h2 className="text-center font-['Arad:Bold',sans-serif] text-[21px] text-black">
              حذف بریده کتاب
            </h2>

            <p className="mt-4 text-center font-['Arad:Medium',sans-serif] text-[16px] leading-7 text-[#3d3d3d]">
              آیا مطمئن هستید که می‌خواهید این بریده کتاب را حذف کنید؟
            </p>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="h-12 flex-1 rounded-[13px] border border-[#236474] bg-white font-['Arad:Medium',sans-serif] text-[17px] text-[#236474] transition hover:bg-[#eef7f9] disabled:cursor-not-allowed disabled:opacity-50"
              >
                انصراف
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={async () => {
                  try {
                    await onDelete(quote.id);
                    setShowDeleteModal(false);
                  } catch {
                    // پیام خطا در UserProfile نمایش داده می‌شود
                  }
                }}
                className="h-12 flex-1 rounded-[13px] bg-red-600 font-['Arad:Medium',sans-serif] text-[17px] text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? "در حال حذف..." : "حذف بریده"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

type ExcerptsProps = {
  quotes: UserQuote[];
  onDelete: (quoteId: number) => Promise<void>;
  deletingId: number | null;
};

export default function Excerpts({
  quotes,
  onDelete,
  deletingId,
}: ExcerptsProps) {
  return (
    <section className="mt-[60px] sm:mt-[70px] w-full pb-10">
      <p className="font-['Arad:Bold',sans-serif] text-[18px] text-black text-right mb-[28px]">
        بریدۀ کتاب
      </p>

      {quotes.length === 0 ? (
        <p className="text-center text-[#3d3d3d]">
          هنوز بریده‌ای ثبت نشده است.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-y-[28px] sm:gap-y-[34px]">
          {quotes.map((quote, index) => (
            <ExcerptCard
              key={quote.id || index}
              quote={quote}
              onDelete={onDelete}
              isDeleting={deletingId === quote.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}
