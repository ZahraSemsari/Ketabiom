import { useState } from "react";
import svgPaths from "../../imports/BookPage-2/svg-vov93fdi2z";
import imgLogo1 from "../../imports/BookPage-2/50a9a903443c3aef8e8e8ce55688630c424280c1.png";
import { X, Star } from "lucide-react";

const sampleBooks = [
  { id: 1, title: "شازده کوچولو", author: "آنتوان دوسنت اگزوپری" },
  { id: 2, title: "صد سال تنهایی", author: "گابریل گارسیا مارکز" },
  { id: 3, title: "کافکا در کرانه", author: "هاروکی موراکامی" },
  { id: 4, title: "ملت عشق", author: "الیف شافاک" },
  { id: 5, title: "جنایت و مکافات", author: "فئودور داستایوسکی" },
  { id: 6, title: "گلستان", author: "سعدی شیرازی" },
  { id: 7, title: "بوف کور", author: "صادق هدایت" },
  { id: 8, title: "سووشون", author: "سیمین دانشور" },
  { id: 9, title: "کلیدر", author: "محمود دولت‌آبادی" },
];

const primaryButtonClass =
  "bg-[#5fa8ba] hover:bg-[#4c94a7] active:bg-[#3f8496] hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 cursor-pointer h-[40px] w-full sm:w-[200px] rounded-[10px] font-['Arad:Medium',sans-serif] text-[16px] sm:text-[18px] text-white";

const modalButtonClass =
  "bg-[#6aa2b4] hover:bg-[#568fa1] active:bg-[#477f91] hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 cursor-pointer h-[42px] w-full sm:w-[220px] rounded-[12px] font-['Arad:Medium',sans-serif] text-[18px] sm:text-[20px] text-white mx-auto block";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllResults, setShowAllResults] = useState(false);
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showClipModal, setShowClipModal] = useState(false);

  const [selectedLibrary, setSelectedLibrary] = useState<string | null>(null);
  const [selectedStars, setSelectedStars] = useState(0);
  const [hoveredStars, setHoveredStars] = useState(0);

  const [bookRating, setBookRating] = useState(3.5);
  const [isSubmittingLibrary, setIsSubmittingLibrary] = useState(false);

  const displayedBooks = showAllResults ? sampleBooks : sampleBooks.slice(0, 3);
  const isSearching = searchQuery.trim().length > 0;
  const showRatingStars = selectedLibrary === "خوانده شده";

  const handleLibrarySubmit = async () => {
    if (!selectedLibrary) return;
    if (showRatingStars && selectedStars === 0) return;

    const ratingOutOf10 = showRatingStars ? selectedStars * 2 : null;

    const payload = {
      bookId: 1,
      libraryName: selectedLibrary,
      rating: ratingOutOf10,
    };

    try {
      setIsSubmittingLibrary(true);

      /*
        وقتی API بک‌اند آماده شد، آدرس را جایگزین کن.

        const response = await fetch('/api/library/add-book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        اگر بک‌اند امتیاز جدید کتاب را برگرداند:
        setBookRating(data.bookRating);
      */

      console.log("Send this payload to backend:", payload);

      // فقط برای تست فرانت تا وقتی بک‌اند وصل نشده:
      if (ratingOutOf10 !== null) {
        setBookRating(ratingOutOf10 / 2);
      }

      setShowLibraryModal(false);
      setSelectedLibrary(null);
      setSelectedStars(0);
      setHoveredStars(0);
    } catch (error) {
      console.error("Error adding book to library:", error);
    } finally {
      setIsSubmittingLibrary(false);
    }
  };

  return (
    <div className="bg-[#fafafa] min-h-screen relative" dir="rtl">
      <header className="bg-[#fafafa] h-[72px] shadow-[0px_1px_8px_0px_rgba(35,100,116,0.3)] relative">
        <div className="absolute right-[16px] sm:right-[37px] top-1/2 -translate-y-1/2 cursor-pointer">
          <svg
            className="w-[30px] sm:w-[37px] h-[26px] sm:h-[30px]"
            fill="none"
            viewBox="0 0 37 30"
          >
            <path d={svgPaths.p33639e80} fill="#236474" />
          </svg>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[45vw] sm:w-[520px] max-w-[520px] min-w-[180px]">
          <div className="bg-[#ebf5f7] h-[38px] sm:h-[44px] rounded-[74px] shadow-[0px_1px_3px_1px_rgba(35,100,116,0.3)] relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو"
              className="w-full h-full bg-transparent px-5 text-right text-[14px] sm:text-[18px] font-['Arad:Medium',sans-serif] text-[#4499af] outline-none placeholder:text-[#4499af]"
            />
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
              <svg
                className="w-[17px] sm:w-[20px] h-[17px] sm:h-[20px]"
                fill="none"
                viewBox="0 0 22 22"
              >
                <path
                  clipRule="evenodd"
                  d={svgPaths.p228bc000}
                  fill="#4499AF"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="absolute left-[12px] sm:left-[32px] top-1/2 -translate-y-1/2 flex items-center gap-1 sm:gap-2">
          <div className="h-[40px] w-[40px] sm:h-[50px] sm:w-[50px]">
            <img
              alt="کتابیوم"
              className="object-contain size-full"
              src={imgLogo1}
            />
          </div>
          <p className="hidden sm:block font-['B_Esfehan:Bold',sans-serif] text-[#236474] text-[16px]">
            کتابیوم
          </p>
        </div>
      </header>

      {isSearching && (
        <div className="absolute left-1/2 -translate-x-1/2 top-[72px] w-[90vw] sm:w-[520px] bg-[#eaeaea] rounded-b-[14px] shadow-lg z-50 px-4">
          <div className="py-6">
            <div
              className={`grid gap-6 ${
                showAllResults
                  ? "grid-cols-2 sm:grid-cols-4"
                  : "grid-cols-2 sm:grid-cols-3"
              } justify-items-center`}
            >
              {displayedBooks.map((book) => (
                <div key={book.id} className="flex flex-col items-center">
                  <div className="bg-[#d9d9d9] h-[130px] sm:h-[150px] w-[95px] sm:w-[110px] rounded-[20px]" />
                  <p className="font-['Arad:Medium',sans-serif] text-[14px] sm:text-[16px] text-black text-center mt-3 whitespace-nowrap">
                    {book.title}
                  </p>
                  <p className="font-['Arad:Medium',sans-serif] text-[#3d3d3d] text-[12px] sm:text-[14px] text-center mt-1 whitespace-nowrap">
                    {book.author}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowAllResults(!showAllResults)}
              className="mx-auto block mt-6 bg-[#eaeaea] hover:bg-[#dcdcdc] active:bg-[#d0d0d0] hover:shadow-md transition-all duration-200 cursor-pointer border-3 border-[#236474] h-[45px] w-[140px] rounded-[15px] font-['Arad:Bold',sans-serif] text-[18px] text-[#236474]"
            >
              {showAllResults ? "نتایج کمتر" : "نتایج بیشتر"}
            </button>
          </div>
        </div>
      )}

      <main className="relative pt-[40px] sm:pt-[55px] pb-16">
        <section className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-[28px] md:gap-[95px]">
            <div className="bg-[#d9d9d9] h-[260px] w-[185px] sm:h-[340px] sm:w-[240px] rounded-[20px] flex-shrink-0" />

            <div className="flex flex-col items-center md:items-start gap-[14px] md:pt-[18px] flex-shrink-0 w-full sm:w-auto">
              <p className="font-['Arad:Bold',sans-serif] text-[24px] sm:text-[26px] text-black">
                عنوان کتاب
              </p>
              <p className="font-['Arad:Medium',sans-serif] text-[#3d3d3d] text-[18px] sm:text-[20px]">
                نویسنده کتاب
              </p>
              <p className="font-['Arad:Medium',sans-serif] text-[16px] sm:text-[18px] text-black">
                امتیاز:{" "}
                <span className="font-['AradFD:Medium',sans-serif]">
                  {bookRating.toFixed(1)}
                </span>
              </p>

              <button
                type="button"
                onClick={() => setShowLibraryModal(true)}
                className={`${primaryButtonClass} mt-1 max-w-[260px]`}
              >
                افزودن به کتابخانه
              </button>

              <button
                type="button"
                onClick={() => setShowNoteModal(true)}
                className={`${primaryButtonClass} max-w-[260px]`}
              >
                افزودن یادداشت
              </button>

              <button
                type="button"
                onClick={() => setShowClipModal(true)}
                className={`${primaryButtonClass} max-w-[260px]`}
              >
                افزودن بریده کتاب
              </button>
            </div>
          </div>

          <div className="mt-[45px] sm:mt-[55px] w-full max-w-[730px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-y-7 sm:flex sm:items-start sm:justify-between">
            {[
              ["دسته‌بندی", "خاطرات"],
              ["ناشر", "امیرکبیر"],
              ["تعدادصفحه‌ها", "۱۱۲"],
              ["سال انتشار", "۱۳۹۸"],
            ].map(([label, value], index) => (
              <div key={label} className="flex items-start justify-center">
                <div className="w-[115px] flex flex-col items-center gap-[8px]">
                  <p className="font-['Arad:Medium',sans-serif] text-[#3d3d3d] text-[14px] sm:text-[16px] whitespace-nowrap">
                    {label}
                  </p>
                  <p className="font-['Arad:SemiBold',sans-serif] text-[16px] sm:text-[18px] text-black whitespace-nowrap">
                    {value}
                  </p>
                </div>

                {index !== 3 && (
                  <div className="hidden sm:block h-[58px] w-[1px] bg-[#3d3d3d] mx-[28px]" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-[50px] sm:mt-[70px] w-full">
            <p className="font-['Arad:Bold',sans-serif] text-[18px] sm:text-[20px] text-black text-right mb-[18px]">
              توضیحات
            </p>
            <p className="font-['Arad:Medium',sans-serif] text-[14px] sm:text-[15px] text-black text-right leading-[28px] sm:leading-[26px]">
              داستان شازده کوچولو با زبانی تلخ و گزنده نوشته شده و در واقع یک
              خلبان خاطرات خود را به یاد دوست کوچکش، شازده کوچولو نوشته است.
              تخیل در داستان بسیار زیاد است و منطق داستان براساس تخیل کودکان پیش
              می‌رود، نه واقع‌گرایی بی‌نقص بزرگسالان. در داستان شازده کوچولو،
              راوی ـ خلبان ـ می‌گوید در صحرا کنار هواپیمای سقوط‌کرده‌اش گیر
              افتاده بود. این قضیه به تجربه‌ی خود اگزوپری برمی‌گردد که در کتاب
              خاطراتش آن را نوشته است. هواپیمایش در عملیاتی سقوط کرد و به مدت سه
              روز در صحرا گرفتار بود؛ در حالی که مقدار آبی که داشت همان روز اول
              تمام شده بود. روز سوم شروع به دیدن سراب کرد و سرانجام یک
              بادیه‌نشین آن‌ها را پیدا کرد و جانشان را نجات داد. بسیاری از
              منتقدان گفته‌اند گل رز محبوب شازده کوچولو که بسیار مهربان بود؛ از
              همسر سنت اگزوپری الهام گرفته شده است.
            </p>
          </div>
        </section>

        <section className="mt-[70px] sm:mt-[90px] max-w-[980px] mx-auto px-4 sm:px-6">
          <p className="font-['Arad:Bold',sans-serif] text-[18px] text-black text-right mb-[28px]">
            بریدۀ کتاب
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60px] gap-y-[28px] sm:gap-y-[46px]">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-[#e8e8e8] rounded-[12px] px-5 sm:px-6 py-5 min-h-[150px]"
              >
                <div className="flex flex-row items-center justify-start gap-3 mb-4">
                  <div className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full border-[3px] border-[#236474] flex items-center justify-center flex-shrink-0">
                    <div className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#d9d9d9]" />
                  </div>
                  <p className="font-['Arad:Medium',sans-serif] text-[18px] sm:text-[20px] text-black">
                    نام کاربری
                  </p>
                </div>

                <p className="font-['Arad:Regular',sans-serif] text-[15px] sm:text-[16px] text-black text-right leading-[28px] sm:leading-[26px]">
                  {item === 1
                    ? "حیرت زده گفت: چی؟ تو از آسمان افتاده ای؟ با فروتنی گفتم: آره. گفت: اوه، این دیگر خیلی عجیب است!"
                    : "آنچه که میتوانم ببینم چیزی جز یک پوسته‌ی ظاهری نیست. مهم‌ترین چیزها را نمیشود با چشم دید... چون چشم‌ها قادر به دیدن نیستند، آدم ها باید با قلبشان ببینند..."}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-[60px] sm:mt-[70px] max-w-[980px] mx-auto px-4 sm:px-6">
          <p className="font-['Arad:Bold',sans-serif] text-[18px] text-black text-right mb-[28px]">
            یادداشت ها
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60px] gap-y-[28px] sm:gap-y-[46px]">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-[#e8e8e8] rounded-[12px] px-5 sm:px-6 py-5 min-h-[150px]"
              >
                <div className="flex flex-row items-center justify-start gap-3 mb-4">
                  <div className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full border-[3px] border-[#236474] flex items-center justify-center flex-shrink-0">
                    <div className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#d9d9d9]" />
                  </div>
                  <p className="font-['Arad:Medium',sans-serif] text-[18px] sm:text-[20px] text-black">
                    نام کاربری
                  </p>
                </div>

                <p className="font-['Arad:Regular',sans-serif] text-[15px] sm:text-[16px] text-black text-right leading-[28px] sm:leading-[26px]">
                  {item === 1
                    ? "شازده کوچولو: آدمها میچپند توی قطارهای تندرو اما نمیدانند دنبال چه میگردند. این است که بنا میکنند دور خودشان چرخک زدن .."
                    : "از آن دسته کتاب‌هایی است که محدودیت زمانی ندارد! در هر دوره‌ای جذاب است! چقدر ترجمه احمد شاملو روان بود."}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {showLibraryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-[#236474] rounded-[29px] w-full max-w-[470px] p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowLibraryModal(false)}
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

            <div className="space-y-4 mb-6">
              {["خوانده شده", "در حال خواندن", "خواهم خواند"].map((library) => (
                <label
                  key={library}
                  className="flex flex-row items-center justify-start gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="library"
                    value={library}
                    checked={selectedLibrary === library}
                    onChange={(e) => {
                      setSelectedLibrary(e.target.value);
                      if (e.target.value !== "خوانده شده") {
                        setSelectedStars(0);
                        setHoveredStars(0);
                      }
                    }}
                    className="w-[18px] h-[18px] accent-[#236474] cursor-pointer"
                  />
                  <span className="font-['Arad:Regular',sans-serif] text-[18px] sm:text-[20px] text-black">
                    {library}
                  </span>
                </label>
              ))}
            </div>

            <hr className="border-[#3d3d3d] my-6" />

            <p className="font-['Arad:Medium',sans-serif] text-[17px] sm:text-[18px] text-black text-center mb-4">
              کتابخانه های شخصی :
            </p>

            <div className="space-y-4 mb-6">
              {["کلاسیک", "کتاب های رضا امیرخانی"].map((library) => (
                <label
                  key={library}
                  className="flex flex-row items-center justify-start gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="library"
                    value={library}
                    checked={selectedLibrary === library}
                    onChange={(e) => {
                      setSelectedLibrary(e.target.value);
                      setSelectedStars(0);
                      setHoveredStars(0);
                    }}
                    className="w-[18px] h-[18px] accent-[#236474] cursor-pointer"
                  />
                  <span className="font-['Arad:Regular',sans-serif] text-[18px] sm:text-[20px] text-black">
                    {library}
                  </span>
                </label>
              ))}
            </div>

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
                      onClick={() => setSelectedStars(star)}
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

            <button
              type="button"
              onClick={handleLibrarySubmit}
              disabled={
                !selectedLibrary ||
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

      {showNoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-[#236474] rounded-[29px] w-full max-w-[470px] p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowNoteModal(false)}
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
              className="bg-[#eaeaea] w-full h-[210px] sm:h-[242px] rounded-[10px] p-4 font-['Arad:Medium',sans-serif] text-[16px] sm:text-[18px] text-black text-right resize-none outline-none mb-6"
              placeholder="یادداشت خود را اینجا بنویسید..."
            />

            <button type="button" className={modalButtonClass}>
              افزودن یادداشت
            </button>
          </div>
        </div>
      )}

      {showClipModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-[#236474] rounded-[29px] w-full max-w-[470px] p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowClipModal(false)}
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
              className="bg-[#eaeaea] w-full h-[190px] sm:h-[195px] rounded-[10px] p-4 font-['Arad:Medium',sans-serif] text-[16px] sm:text-[18px] text-black text-right resize-none outline-none mb-6"
              placeholder="بریده کتاب را اینجا بنویسید..."
            />

            <button type="button" className={modalButtonClass}>
              افزودن بریده کتاب
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
