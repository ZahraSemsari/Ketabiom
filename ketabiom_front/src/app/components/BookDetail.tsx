// import { useState } from "react";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { X, Star } from "lucide-react";
// import MainHeader from "../components/Header";
// import React from "react";

// const primaryButtonClass =
//   "bg-[#5fa8ba] hover:bg-[#4c94a7] active:bg-[#3f8496] hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 cursor-pointer h-[40px] w-full sm:w-[200px] rounded-[10px] font-['Arad:Medium',sans-serif] text-[16px] sm:text-[18px] text-white";

// const modalButtonClass =
//   "bg-[#6aa2b4] hover:bg-[#568fa1] active:bg-[#477f91] hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 cursor-pointer h-[42px] w-full sm:w-[220px] rounded-[12px] font-['Arad:Medium',sans-serif] text-[18px] sm:text-[20px] text-white mx-auto block";

// export default function BookDetail() {
//   const { id } = useParams();

//   const [book, setBook] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [showLibraryModal, setShowLibraryModal] = useState(false);
//   const [showNoteModal, setShowNoteModal] = useState(false);
//   const [showClipModal, setShowClipModal] = useState(false);

//   const [selectedLibrary, setSelectedLibrary] = useState<string | null>(null);
//   const [selectedStars, setSelectedStars] = useState(0);
//   const [hoveredStars, setHoveredStars] = useState(0);

//   const [bookRating, setBookRating] = useState(3.5);
//   const [isSubmittingLibrary, setIsSubmittingLibrary] = useState(false);
//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");
//         //------------
//         // console.log(id);
//         // const res = await axios.get(`${baseUrl}/books/books/${id}/`);
//         const res = await axios.get(`${baseUrl}/api/books/books/${id}/`);
//         console.log("Book:", res.data);
//         console.log("Cover URL:", res.data.cover_url);
//         setBook(res.data);
//         //-------------
//         // console.log(`${baseUrl}/books/books/${id}/`);
//         setBook(res.data);
//         setBookRating(res.data.average_rating);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBook();
//   }, [id]);
//   const showRatingStars = selectedLibrary === "خوانده شده";

//   // const handleLibrarySubmit = async () => {
//   //   if (!selectedLibrary) return;
//   //   if (showRatingStars && selectedStars === 0) return;

//   //   const ratingOutOf10 = showRatingStars ? selectedStars * 2 : null;

//   //   const payload = {
//   //     bookId: book.id,
//   //     libraryName: selectedLibrary,
//   //     rating: ratingOutOf10,
//   //   };

//   //   try {
//   //     setIsSubmittingLibrary(true);

//   //     /*
//   //       وقتی API بک‌اند آماده شد، آدرس را جایگزین کن.

//   //       const response = await fetch('/api/library/add-book', {
//   //         method: 'POST',
//   //         headers: { 'Content-Type': 'application/json' },
//   //         body: JSON.stringify(payload),
//   //       });

//   //       const data = await response.json();

//   //       اگر بک‌اند امتیاز جدید کتاب را برگرداند:
//   //       setBookRating(data.bookRating);
//   //     */

//   //     console.log("Send this payload to backend:", payload);

//   //     // فقط برای تست فرانت تا وقتی بک‌اند وصل نشده:
//   //     if (ratingOutOf10 !== null) {
//   //       setBookRating(ratingOutOf10 / 2);
//   //     }

//   //     setShowLibraryModal(false);
//   //     setSelectedLibrary(null);
//   //     setSelectedStars(0);
//   //     setHoveredStars(0);
//   //   } catch (error) {
//   //     console.error("Error adding book to library:", error);
//   //   } finally {
//   //     setIsSubmittingLibrary(false);
//   //   }
//   // };
//   const handleLibrarySubmit = async () => {
//     if (!selectedLibrary) return;
//     if (showRatingStars && selectedStars === 0) return;

//     const ratingOutOf10 =
//       selectedLibrary === "خوانده شده" ? selectedStars * 2 : null;

//     try {
//       setIsSubmittingLibrary(true);

//       const token = localStorage.getItem("access");

//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/library-books/`,
//         {
//           book: Number(id),
//           status: selectedLibrary,
//           rating: ratingOutOf10,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (ratingOutOf10 !== null) {
//         setBookRating(ratingOutOf10 / 2);
//       }

//       setShowLibraryModal(false);
//       setSelectedLibrary(null);
//       setSelectedStars(0);
//       setHoveredStars(0);
//     } catch (err: any) {
//       console.log(err.response?.data || err.message);
//     } finally {
//       setIsSubmittingLibrary(false);
//     }
//   };
//   if (loading) {
//     return (
//       <div dir="rtl" className="min-h-screen flex items-center justify-center">
//         در حال دریافت اطلاعات...
//       </div>
//     );
//   }

//   if (!book) {
//     return (
//       <div dir="rtl" className="min-h-screen flex items-center justify-center">
//         کتاب پیدا نشد.
//       </div>
//     );
//   }
//   return (
//     <div className="bg-[#fafafa] min-h-screen relative" dir="rtl">
//       <MainHeader />

//       <main className="relative pt-[40px] sm:pt-[55px] pb-16">
//         <section className="max-w-[1100px] mx-auto px-4 sm:px-6">
//           <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-[28px] md:gap-[95px]">
//             <img
//               src={book.cover_url}
//               alt={book.title}
//               className="h-[260px] w-[185px] sm:h-[340px] sm:w-[240px] rounded-[20px] object-cover bg-[#d9d9d9]"
//             />
//             <div className="flex flex-col items-center md:items-start gap-[14px] md:pt-[18px] flex-shrink-0 w-full sm:w-auto">
//               <p className="font-['Arad:Bold',sans-serif] text-[24px] sm:text-[26px] text-black">
//                 {book.title}
//               </p>
//               <p className="font-['Arad:Medium',sans-serif] text-[#3d3d3d] text-[18px] sm:text-[20px]">
//                 {book.author.name}{" "}
//               </p>
//               <p className="font-['Arad:Medium',sans-serif] text-[16px] sm:text-[18px] text-black">
//                 امتیاز:{" "}
//                 <span className="font-['AradFD:Medium',sans-serif]">
//                   {/* {bookRating.toFixed(1)} */}
//                   {/* {book.average_rating} */}
//                   {bookRating.toFixed(1)}
//                 </span>
//               </p>

//               <button
//                 type="button"
//                 onClick={() => setShowLibraryModal(true)}
//                 className={`${primaryButtonClass} mt-1 max-w-[260px]`}
//               >
//                 افزودن به کتابخانه
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setShowNoteModal(true)}
//                 className={`${primaryButtonClass} max-w-[260px]`}
//               >
//                 افزودن یادداشت
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setShowClipModal(true)}
//                 className={`${primaryButtonClass} max-w-[260px]`}
//               >
//                 افزودن بریده کتاب
//               </button>
//             </div>
//           </div>

//           <div className="mt-[45px] sm:mt-[55px] w-full max-w-[730px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-y-7 sm:flex sm:items-start sm:justify-between">
//             {[
//               [
//                 "دسته‌بندی",
//                 book.categories.map((c: any) => c.title).join("، "),
//               ],
//               ["ناشر", book.publisher.name],
//               ["تعدادصفحه‌ها", book.pages_count],
//               ["سال انتشار", book.published_year],
//             ].map(([label, value], index) => (
//               <div key={label} className="flex items-start justify-center">
//                 <div className="w-[115px] flex flex-col items-center gap-[8px]">
//                   <p className="font-['Arad:Medium',sans-serif] text-[#3d3d3d] text-[14px] sm:text-[16px] whitespace-nowrap">
//                     {label}
//                   </p>
//                   <p className="font-['Arad:SemiBold',sans-serif] text-[16px] sm:text-[18px] text-black whitespace-nowrap">
//                     {value}
//                   </p>
//                 </div>

//                 {index !== 3 && (
//                   <div className="hidden sm:block h-[58px] w-[1px] bg-[#3d3d3d] mx-[28px]" />
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="mt-[50px] sm:mt-[70px] w-full">
//             <p className="font-['Arad:Bold',sans-serif] text-[18px] sm:text-[20px] text-black text-right mb-[18px]">
//               توضیحات
//             </p>
//             {/* <p className="font-['Arad:Medium',sans-serif] text-[14px] sm:text-[15px] text-black text-right leading-[28px] sm:leading-[26px]">
//               داستان شازده کوچولو با زبانی تلخ و گزنده نوشته شده و در واقع یک
//               خلبان خاطرات خود را به یاد دوست کوچکش، شازده کوچولو نوشته است.
//               تخیل در داستان بسیار زیاد است و منطق داستان براساس تخیل کودکان پیش
//               می‌رود، نه واقع‌گرایی بی‌نقص بزرگسالان. در داستان شازده کوچولو،
//               راوی ـ خلبان ـ می‌گوید در صحرا کنار هواپیمای سقوط‌کرده‌اش گیر
//               افتاده بود. این قضیه به تجربه‌ی خود اگزوپری برمی‌گردد که در کتاب
//               خاطراتش آن را نوشته است. هواپیمایش در عملیاتی سقوط کرد و به مدت سه
//               روز در صحرا گرفتار بود؛ در حالی که مقدار آبی که داشت همان روز اول
//               تمام شده بود. روز سوم شروع به دیدن سراب کرد و سرانجام یک
//               بادیه‌نشین آن‌ها را پیدا کرد و جانشان را نجات داد. بسیاری از
//               منتقدان گفته‌اند گل رز محبوب شازده کوچولو که بسیار مهربان بود؛ از
//               همسر سنت اگزوپری الهام گرفته شده است.
//             </p> */}
//             {book.description}
//           </div>
//         </section>

//         <section className="mt-[70px] sm:mt-[90px] max-w-[980px] mx-auto px-4 sm:px-6">
//           <p className="font-['Arad:Bold',sans-serif] text-[18px] text-black text-right mb-[28px]">
//             بریدۀ کتاب
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60px] gap-y-[28px] sm:gap-y-[46px]">
//             {book.quotes.map((item: any) => (
//               <div
//                 key={item.id}
//                 className="bg-[#e8e8e8] rounded-[12px] px-5 sm:px-6 py-5 min-h-[150px]"
//               >
//                 <div className="flex flex-row items-center justify-start gap-3 mb-4">
//                   <div className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full border-[3px] border-[#236474] flex items-center justify-center flex-shrink-0">
//                     <div className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#d9d9d9]" />
//                   </div>
//                   <p className="font-['Arad:Medium',sans-serif] text-[18px] sm:text-[20px] text-black">
//                     {item.username}
//                   </p>
//                 </div>

//                 <p className="font-['Arad:Regular',sans-serif] text-[15px] sm:text-[16px] text-black text-right leading-[28px] sm:leading-[26px]">
//                   {/* {item === 1
//                     ? "حیرت زده گفت: چی؟ تو از آسمان افتاده ای؟ با فروتنی گفتم: آره. گفت: اوه، این دیگر خیلی عجیب است!"
//                     : "آنچه که میتوانم ببینم چیزی جز یک پوسته‌ی ظاهری نیست. مهم‌ترین چیزها را نمیشود با چشم دید... چون چشم‌ها قادر به دیدن نیستند، آدم ها باید با قلبشان ببینند..."} */}
//                   {item.text}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="mt-[60px] sm:mt-[70px] max-w-[980px] mx-auto px-4 sm:px-6">
//           <p className="font-['Arad:Bold',sans-serif] text-[18px] text-black text-right mb-[28px]">
//             یادداشت ها
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60px] gap-y-[28px] sm:gap-y-[46px]">
//             {book.notes.map((item: any) => (
//               <div
//                 key={item.id}
//                 className="bg-[#e8e8e8] rounded-[12px] px-5 sm:px-6 py-5 min-h-[150px]"
//               >
//                 <div className="flex flex-row items-center justify-start gap-3 mb-4">
//                   <div className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full border-[3px] border-[#236474] flex items-center justify-center flex-shrink-0">
//                     <div className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#d9d9d9]" />
//                   </div>
//                   <p className="font-['Arad:Medium',sans-serif] text-[18px] sm:text-[20px] text-black">
//                     {item.username}{" "}
//                   </p>
//                 </div>

//                 <p className="font-['Arad:Regular',sans-serif] text-[15px] sm:text-[16px] text-black text-right leading-[28px] sm:leading-[26px]">
//                   {/* {item === 1
//                     ? "شازده کوچولو: آدمها میچپند توی قطارهای تندرو اما نمیدانند دنبال چه میگردند. این است که بنا میکنند دور خودشان چرخک زدن .."
//                     : "از آن دسته کتاب‌هایی است که محدودیت زمانی ندارد! در هر دوره‌ای جذاب است! چقدر ترجمه احمد شاملو روان بود."} */}

//                   {item.text}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>

//       {showLibraryModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white border-4 border-[#236474] rounded-[29px] w-full max-w-[470px] p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
//             <button
//               type="button"
//               onClick={() => setShowLibraryModal(false)}
//               className="absolute left-6 sm:left-8 top-6 sm:top-8 cursor-pointer hover:scale-110 transition-transform duration-200"
//             >
//               <X className="w-6 h-6" />
//             </button>

//             <p className="font-['Arad:Medium',sans-serif] text-[20px] sm:text-[22px] text-black text-right mb-6">
//               کتابخانه ها
//             </p>

//             <p className="font-['Arad:Medium',sans-serif] text-[17px] sm:text-[19px] text-black text-center mb-6">
//               کتابخانه مورد نظرتان را انتخاب کنید :
//             </p>

//             <div className="space-y-4 mb-6">
//               {["خوانده شده", "در حال خواندن", "خواهم خواند"].map((library) => (
//                 <label
//                   key={library}
//                   className="flex flex-row items-center justify-start gap-3 cursor-pointer"
//                 >
//                   <input
//                     type="radio"
//                     name="library"
//                     value={library}
//                     checked={selectedLibrary === library}
//                     onChange={(e) => {
//                       setSelectedLibrary(e.target.value);
//                       if (e.target.value !== "خوانده شده") {
//                         setSelectedStars(0);
//                         setHoveredStars(0);
//                       }
//                     }}
//                     className="w-[18px] h-[18px] accent-[#236474] cursor-pointer"
//                   />
//                   <span className="font-['Arad:Regular',sans-serif] text-[18px] sm:text-[20px] text-black">
//                     {library}
//                   </span>
//                 </label>
//               ))}
//             </div>

//             <hr className="border-[#3d3d3d] my-6" />

//             <p className="font-['Arad:Medium',sans-serif] text-[17px] sm:text-[18px] text-black text-center mb-4">
//               کتابخانه های شخصی :
//             </p>

//             <div className="space-y-4 mb-6">
//               {["کلاسیک", "کتاب های رضا امیرخانی"].map((library) => (
//                 <label
//                   key={library}
//                   className="flex flex-row items-center justify-start gap-3 cursor-pointer"
//                 >
//                   <input
//                     type="radio"
//                     name="library"
//                     value={library}
//                     checked={selectedLibrary === library}
//                     onChange={(e) => {
//                       setSelectedLibrary(e.target.value);
//                       setSelectedStars(0);
//                       setHoveredStars(0);
//                     }}
//                     className="w-[18px] h-[18px] accent-[#236474] cursor-pointer"
//                   />
//                   <span className="font-['Arad:Regular',sans-serif] text-[18px] sm:text-[20px] text-black">
//                     {library}
//                   </span>
//                 </label>
//               ))}
//             </div>

//             {showRatingStars && (
//               <div className="flex justify-center gap-2 mb-8" dir="ltr">
//                 {[1, 2, 3, 4, 5].map((star) => {
//                   const active = star <= (hoveredStars || selectedStars);

//                   return (
//                     <button
//                       key={star}
//                       type="button"
//                       onMouseEnter={() => setHoveredStars(star)}
//                       onMouseLeave={() => setHoveredStars(0)}
//                       onClick={() => setSelectedStars(star)}
//                       className="cursor-pointer transition-transform duration-150 hover:scale-110"
//                       aria-label={`${star} stars`}
//                     >
//                       <Star
//                         className={`w-8 h-8 transition-colors duration-150 ${
//                           active
//                             ? "fill-yellow-400 text-yellow-400"
//                             : "fill-transparent text-black"
//                         }`}
//                         strokeWidth={2.5}
//                       />
//                     </button>
//                   );
//                 })}
//               </div>
//             )}

//             <button
//               type="button"
//               onClick={handleLibrarySubmit}
//               disabled={
//                 !selectedLibrary ||
//                 (showRatingStars && selectedStars === 0) ||
//                 isSubmittingLibrary
//               }
//               className={`${modalButtonClass} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none`}
//             >
//               {isSubmittingLibrary ? "در حال افزودن..." : "افزودن به کتابخانه"}
//             </button>
//           </div>
//         </div>
//       )}

//       {showNoteModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white border-4 border-[#236474] rounded-[29px] w-full max-w-[470px] p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
//             <button
//               type="button"
//               onClick={() => setShowNoteModal(false)}
//               className="absolute left-6 sm:left-8 top-6 sm:top-8 cursor-pointer hover:scale-110 transition-transform duration-200"
//             >
//               <X className="w-6 h-6" />
//             </button>

//             <p className="font-['Arad:Medium',sans-serif] text-[20px] sm:text-[22px] text-black text-right mb-6">
//               متن یادداشت
//             </p>

//             <p className="font-['Arad:Medium',sans-serif] text-[17px] sm:text-[19px] text-black text-center mb-4">
//               یادداشت خود را بنویسید :
//             </p>

//             <textarea
//               className="bg-[#eaeaea] w-full h-[210px] sm:h-[242px] rounded-[10px] p-4 font-['Arad:Medium',sans-serif] text-[16px] sm:text-[18px] text-black text-right resize-none outline-none mb-6"
//               placeholder="یادداشت خود را اینجا بنویسید..."
//             />

//             <button type="button" className={modalButtonClass}>
//               افزودن یادداشت
//             </button>
//           </div>
//         </div>
//       )}

//       {showClipModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white border-4 border-[#236474] rounded-[29px] w-full max-w-[470px] p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
//             <button
//               type="button"
//               onClick={() => setShowClipModal(false)}
//               className="absolute left-6 sm:left-8 top-6 sm:top-8 cursor-pointer hover:scale-110 transition-transform duration-200"
//             >
//               <X className="w-6 h-6" />
//             </button>

//             <p className="font-['Arad:Medium',sans-serif] text-[20px] sm:text-[22px] text-black text-right mb-6">
//               بریده کتاب
//             </p>

//             <p className="font-['Arad:Medium',sans-serif] text-[17px] sm:text-[19px] text-black text-center mb-4">
//               بریده کتاب مورد نظرتان را بنویسید :
//             </p>

//             <textarea
//               className="bg-[#eaeaea] w-full h-[190px] sm:h-[195px] rounded-[10px] p-4 font-['Arad:Medium',sans-serif] text-[16px] sm:text-[18px] text-black text-right resize-none outline-none mb-6"
//               placeholder="بریده کتاب را اینجا بنویسید..."
//             />

//             <button type="button" className={modalButtonClass}>
//               افزودن بریده کتاب
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// //-----------------not hard code -----------------------------

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { X, Star } from "lucide-react";
import MainHeader from "../components/Header";

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

type ReadingList = {
  id: number;
  name: string;
  list_type?: string;
  books_count?: string;
  items?: unknown[];
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
  const [selectedLibraryName, setSelectedLibraryName] = useState("");

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

  const showRatingStars = selectedLibraryName === "خوانده شده";

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
    const name = list.name?.trim();
    const type = String(list.list_type || "").toLowerCase();

    return (
      name === "خوانده شده" ||
      name === "در حال خواندن" ||
      name === "خواهم خواند" ||
      type === "read" ||
      type === "reading" ||
      type === "want_to_read" ||
      type === "to_read" ||
      type === "finished"
    );
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
    setSelectedLibraryName(library.name);
    setErrorMessage("");

    if (library.name !== "خوانده شده") {
      setSelectedStars(0);
      setHoveredStars(0);
    }
  };

  const addBookToLibrary = async () => {
    if (!selectedLibraryId) {
      throw new Error("No selected library");
    }

    const selectedList = readingLists.find(
      (list) => list.id === selectedLibraryId,
    );

    const url = `${apiBaseUrl}/books/books/${id}/add-to-list/`;

    const payload =
      selectedList?.list_type && selectedList.list_type !== "custom"
        ? {
            list_type: selectedList.list_type,
          }
        : {
            list_id: selectedLibraryId,
          };

    console.log("ADD TO LIST PAYLOAD:", payload);

    return await authPost(url, payload);
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
      setSelectedLibraryName("");
      setSelectedStars(0);
      setHoveredStars(0);

      await fetchBook();
    } catch (err: any) {
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
    setSelectedLibraryName("");
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

  return (
    <div className="bg-[#fafafa] min-h-screen relative" dir="rtl">
      <MainHeader />

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
                  setShowNoteModal(true);
                }}
                className={`${primaryButtonClass} max-w-[260px]`}
              >
                افزودن یادداشت
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
            </div>
          </div>

          <div className="mt-[45px] sm:mt-[55px] w-full max-w-[730px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-y-7 sm:flex sm:items-start sm:justify-between">
            {[
              [
                "دسته‌بندی",
                (book.categories || []).map((c) => c.title).join("، ") ||
                  "نامشخص",
              ],
              ["ناشر", book.publisher?.name || "نامشخص"],
              ["تعدادصفحه‌ها", book.pages_count || "نامشخص"],
              ["سال انتشار", book.published_year || "نامشخص"],
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
              {book.description || "توضیحاتی برای این کتاب ثبت نشده است."}
            </p>
          </div>
        </section>

        <section className="mt-[70px] sm:mt-[90px] max-w-[980px] mx-auto px-4 sm:px-6">
          <p className="font-['Arad:Bold',sans-serif] text-[18px] text-black text-right mb-[28px]">
            بریدۀ کتاب
          </p>

          {(book.quotes || []).length === 0 ? (
            <p className="text-center text-[#3d3d3d]">
              هنوز بریده‌ای برای این کتاب ثبت نشده است.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60px] gap-y-[28px] sm:gap-y-[46px]">
              {(book.quotes || []).map((item) => (
                <div
                  key={item.id}
                  className="bg-[#e8e8e8] rounded-[12px] px-5 sm:px-6 py-5 min-h-[150px]"
                >
                  <div className="flex flex-row items-center justify-start gap-3 mb-4">
                    <div className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full border-[3px] border-[#236474] flex items-center justify-center flex-shrink-0">
                      <div className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#d9d9d9]" />
                    </div>

                    <p className="font-['Arad:Medium',sans-serif] text-[18px] sm:text-[20px] text-black">
                      {item.username}
                    </p>
                  </div>

                  <p className="font-['Arad:Regular',sans-serif] text-[15px] sm:text-[16px] text-black text-right leading-[28px] sm:leading-[26px]">
                    {item.text}
                  </p>

                  {item.page_number !== null &&
                    item.page_number !== undefined && (
                      <p className="mt-3 text-left text-[13px] text-[#3d3d3d]">
                        صفحه {item.page_number}
                      </p>
                    )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-[60px] sm:mt-[70px] max-w-[980px] mx-auto px-4 sm:px-6">
          <p className="font-['Arad:Bold',sans-serif] text-[18px] text-black text-right mb-[28px]">
            یادداشت ها
          </p>

          {(book.notes || []).length === 0 ? (
            <p className="text-center text-[#3d3d3d]">
              هنوز یادداشتی برای این کتاب ثبت نشده است.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60px] gap-y-[28px] sm:gap-y-[46px]">
              {(book.notes || []).map((item) => (
                <div
                  key={item.id}
                  className="bg-[#e8e8e8] rounded-[12px] px-5 sm:px-6 py-5 min-h-[150px]"
                >
                  <div className="flex flex-row items-center justify-start gap-3 mb-4">
                    <div className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full border-[3px] border-[#236474] flex items-center justify-center flex-shrink-0">
                      <div className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-full bg-[#d9d9d9]" />
                    </div>

                    <p className="font-['Arad:Medium',sans-serif] text-[18px] sm:text-[20px] text-black">
                      {item.username}
                    </p>
                  </div>

                  <p className="font-['Arad:Regular',sans-serif] text-[15px] sm:text-[16px] text-black text-right leading-[28px] sm:leading-[26px]">
                    {item.text}
                  </p>
                </div>
              ))}
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
