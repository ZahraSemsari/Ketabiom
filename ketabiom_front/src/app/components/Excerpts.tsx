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


import React from "react";
import type { UserQuote } from "./UserProfile";

type ExcerptCardProps = {
  quote: UserQuote;
};

function ExcerptCard({ quote }: ExcerptCardProps) {
  return (
    <div className="bg-accent border border-border rounded-xl p-3 flex gap-3 w-72 shrink-0 min-h-[160px]">
      <div className="w-[70px] shrink-0">
        {quote.cover_url ? (
          <img
            src={quote.cover_url}
            alt={quote.book_title || "کتاب"}
            className="bg-input-background border border-border rounded-xl aspect-[3/4] w-full object-cover"
          />
        ) : (
          <div className="bg-input-background border border-border rounded-xl aspect-[3/4]" />
        )}

        <p className="text-xs mt-1 text-right font-medium text-foreground truncate">
          {quote.book_title || "عنوان کتاب"}
        </p>

        <p className="text-[10px] text-right text-muted-foreground truncate">
          {quote.author_name || "نویسنده"}
        </p>
      </div>

      <div className="flex-1">
        <p className="text-xs leading-relaxed text-right text-foreground line-clamp-6 whitespace-pre-line">
          {quote.text}
        </p>

        {quote.page_number !== null && quote.page_number !== undefined && (
          <p className="text-[10px] text-left text-muted-foreground mt-2">
            صفحه {quote.page_number}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Excerpts({ quotes }: { quotes: UserQuote[] }) {
  return (
    <div className="py-3 sm:py-4 pb-10">
      <p className="text-right font-bold mb-3 text-foreground">بریدۀ کتاب</p>

      {quotes.length === 0 ? (
        <p className="text-sm text-muted-foreground text-right">
          هنوز بریده‌ای ثبت نشده است.
        </p>
      ) : (
        <div className="flex gap-3 overflow-x-auto">
          {quotes.map((quote, index) => (
            <ExcerptCard key={quote.id || index} quote={quote} />
          ))}
        </div>
      )}
    </div>
  );
}