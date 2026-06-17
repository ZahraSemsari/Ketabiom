const EXCERPTS = [
  {
    text: "آنچه که میتوانم ببینم چیزی جز یک پوسته‌ی ظاهری نیست.مهم‌ترین چیزهارا نمیشود با چشم دید... چون چشم‌ها قادر به دیدن نیستند،آدم ها باید با قلبشان ببینند...",
    bookTitle: "عنوان کتاب",
    author: "نویسنده",
  },
  {
    text: "به‌من جوابی سربالا می‌دهی. خوشم نمی‌آید. یک روز، هرچه زودتر، باید یادگیری نه فقط یک فرسنگِ دورتر، بلکه دَه سال بعد را هم ببیني. اگر این را یادگیری، و به‌راستی دوستم داشته باشی، کشته شدن من، تو را هم خواهد کشت ــ دختر!",
    bookTitle: "عنوان کتاب",
    author: "نویسنده",
  },
  {
    text: "در آن لحظه فهمیدم که چه بار سنگینی بر دوش می‌کشم. اما راهی جز ادامه دادن نبود...",
    bookTitle: "عنوان کتاب",
    author: "نویسنده",
  },
];

function NoteCard({
  text,
  bookTitle,
  author,
}: {
  text: string;
  bookTitle: string;
  author: string;
}) {
  return (
    <div className="bg-accent border border-border rounded-xl p-3 flex gap-3 w-72 shrink-0 min-h-[160px]">
      <div className="w-[70px] shrink-0">
        <div className="bg-input-background border border-border rounded-xl aspect-[3/4]" />
        <p className="text-xs mt-1 text-right font-medium text-foreground truncate">{bookTitle}</p>
        <p className="text-[10px] text-right text-muted-foreground truncate">{author}</p>
      </div>

      <p className="text-xs leading-relaxed text-right flex-1 text-foreground line-clamp-6">
        {text}
      </p>
    </div>
  );
}

export default function Excerpts() {
  return (
    <div className="py-3 sm:py-4 pb-10">
      <p className="text-right font-bold mb-3 text-foreground">بریدۀ کتاب</p>

      <div className="flex gap-3 overflow-x-auto">
        {EXCERPTS.map((e, i) => (
          <NoteCard key={i} {...e} />
        ))}
      </div>
    </div>
  );
}