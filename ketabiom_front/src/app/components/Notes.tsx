// const NOTES = [
//   {
//     text: "شازده کوچولو:آدمها میچیند توی قطارهای تندرو اما نمیدانند دنبال چه میگردند.این است که بنا میکنند دور خودشان چرخک زدن ..",
//     bookTitle: "عنوان کتاب",
//     author: "نویسنده",
//   },
//   {
//     text: "از آن دسته کتابهایی است که محدودیت زمانی ندارد!\nدر هر دورهای جذاب است!\nچقدر ترجمه احمد شاملو روان بود! در دوره ما کتابهای زیادی با ترجمه شاملو منتشر میشد. برخی ...",
//     bookTitle: "عنوان کتاب",
//     author: "نویسنده",
//   },
//   {
//     text: "آنچه که میتوانم ببینم چیزی جز یک پوسته‌ی ظاهری نیست. مهم‌ترین چیزهارا نمیشود با چشم دید...",
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

// export default function Notes() {
//   return (
//     <div className="py-3 sm:py-4">
//       <p className="text-right font-bold mb-3 text-foreground">یادداشت ها</p>

//       <div className="flex gap-3 overflow-x-auto">
//         {NOTES.map((n, i) => (
//           <NoteCard key={i} {...n} />
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import type { UserNote } from "./UserProfile";

const TEXT_PREVIEW_LIMIT = 500;

type NoteCardProps = {
  note: UserNote;
};

function NoteCard({ note }: NoteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const text = note.text || "";
  const isLongText = text.length > TEXT_PREVIEW_LIMIT;

  const visibleText =
    isExpanded || !isLongText
      ? text
      : `${text.slice(0, TEXT_PREVIEW_LIMIT)}...`;

  return (
    <div className="bg-[#e8e8e8] rounded-[18px] px-5 sm:px-6 py-5 min-h-[170px] w-full border border-[#d6d6d6]">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="w-full sm:w-[155px] flex sm:flex-col flex-row items-start sm:items-center gap-4 sm:gap-2 shrink-0">
          {note.cover_url ? (
            <img
              src={note.cover_url}
              alt={note.book_title || "کتاب"}
              className="w-[82px] h-[118px] sm:w-[90px] sm:h-[130px] rounded-[14px] object-cover bg-[#d9d9d9] shrink-0"
            />
          ) : (
            <div className="w-[82px] h-[118px] sm:w-[90px] sm:h-[130px] rounded-[14px] bg-[#d9d9d9] shrink-0" />
          )}

          <div className="min-w-0 flex-1 sm:w-full text-right sm:text-center">
            <p className="font-['Arad:SemiBold',sans-serif] text-[13px] sm:text-[14px] text-black leading-[24px] whitespace-normal break-words">
              {note.book_title || "عنوان کتاب"}
            </p>

            <p className="font-['Arad:Regular',sans-serif] text-[12px] sm:text-[13px] text-[#3d3d3d] leading-[22px] whitespace-normal break-words mt-1">
              {note.author_name || "نویسنده نامشخص"}
            </p>
          </div>
        </div>

        <div className="flex-1 min-w-0 w-full">
          {note.username && (
            <p className="font-['Arad:Medium',sans-serif] text-[17px] sm:text-[19px] text-black mb-4 text-right">
              {note.username}
            </p>
          )}

          <p className="font-['Arad:Regular',sans-serif] text-[15px] sm:text-[16px] text-black text-right leading-[30px] whitespace-pre-line">
            {visibleText}
          </p>

          {isLongText && (
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="mt-4 font-['Arad:Medium',sans-serif] text-[14px] text-[#236474] hover:text-[#4499AF] transition-colors cursor-pointer"
            >
              {isExpanded ? "نمایش کمتر" : "نمایش بیشتر"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Notes({ notes }: { notes: UserNote[] }) {
  return (
    <section className="mt-[60px] sm:mt-[70px] w-full">
      <p className="font-['Arad:Bold',sans-serif] text-[18px] text-black text-right mb-[28px]">
        یادداشت ها
      </p>

      {notes.length === 0 ? (
        <p className="text-center text-[#3d3d3d]">
          هنوز یادداشتی ثبت نشده است.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-y-[28px] sm:gap-y-[34px]">
          {notes.map((note, index) => (
            <NoteCard key={note.id || index} note={note} />
          ))}
        </div>
      )}
    </section>
  );
}
