const NOTES = [
  {
    text: "شازده کوچولو:آدمها میچیند توی قطارهای تندرو اما نمیدانند دنبال چه میگردند.این است که بنا میکنند دور خودشان چرخک زدن ..",
    bookTitle: "عنوان کتاب",
    author: "نویسنده",
  },
  {
    text: "از آن دسته کتابهایی است که محدودیت زمانی ندارد!\nدر هر دورهای جذاب است!\nچقدر ترجمه احمد شاملو روان بود! در دوره ما کتابهای زیادی با ترجمه شاملو منتشر میشد. برخی ...",
    bookTitle: "عنوان کتاب",
    author: "نویسنده",
  },
  {
    text: "آنچه که میتوانم ببینم چیزی جز یک پوسته‌ی ظاهری نیست. مهم‌ترین چیزهارا نمیشود با چشم دید...",
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

export default function Notes() {
  return (
    <div className="py-3 sm:py-4">
      <p className="text-right font-bold mb-3 text-foreground">یادداشت ها</p>

      <div className="flex gap-3 overflow-x-auto">
        {NOTES.map((n, i) => (
          <NoteCard key={i} {...n} />
        ))}
      </div>
    </div>
  );
}