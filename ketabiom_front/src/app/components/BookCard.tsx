// // import React from "react";
// // const FONT = "'Vazirmatn', sans-serif";

// // export default function BookCard({
// //   selected,
// //   onSelect,
// // }: {
// //   selected: boolean;
// //   onSelect: () => void;
// // }) {
// //   return (
// //     <button
// //       onClick={onSelect}
// //       className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group outline-none"
// //       dir="rtl"
// //     >
// //       <div
// //         className={`w-[120px] sm:w-[140px] lg:w-[146px] h-[160px] sm:h-[180px] lg:h-[191px] rounded-[30px] transition-all duration-200 ${
// //           selected
// //             ? "bg-[#4499af] shadow-[0_4px_16px_rgba(68,153,175,0.5)] scale-105"
// //             : "bg-[#eaeaea] group-hover:bg-[#d0e9ee] group-hover:scale-[1.03]"
// //         }`}
// //       />
// //       <p
// //         className={`text-[16px] sm:text-[19px] lg:text-[21px] font-medium text-right whitespace-nowrap transition-colors ${
// //           selected ? "text-[#4499af]" : "text-black"
// //         }`}
// //         style={{ fontFamily: FONT }}
// //       >
// //         عنوان کتاب
// //       </p>
// //       <p
// //         className="text-[#3d3d3d] text-[13px] sm:text-[15px] lg:text-[17px] font-medium text-right whitespace-nowrap -mt-1"
// //         style={{ fontFamily: FONT }}
// //       >
// //         نویسنده
// //       </p>
// //     </button>
// //   );
// // }
// import React from "react";

// const FONT = "'Vazirmatn', sans-serif";

// interface Book {
//   id: number;
//   title: string;
//   author_name: string;
//   cover_url: string | null;
// }

// interface BookCardProps {
//   book: Book;
//   selected: boolean;
//   onSelect: () => void;
// }

// export default function BookCard({ book, selected, onSelect }: BookCardProps) {
//   return (
//     <button
//       onClick={onSelect}
//       className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group outline-none"
//       dir="rtl"
//     >
//       {/* تصویر کتاب */}
//       {book.cover_url ? (
//         <img
//           src={book.cover_url}
//           alt={book.title}
//           className={`w-[120px] sm:w-[140px] lg:w-[146px] h-[160px] sm:h-[180px] lg:h-[191px] rounded-[30px] object-cover transition-all duration-200 ${
//             selected
//               ? "shadow-[0_4px_16px_rgba(68,153,175,0.5)] scale-105"
//               : "group-hover:scale-[1.03]"
//           }`}
//         />
//       ) : (
//         <div
//           className={`w-[120px] sm:w-[140px] lg:w-[146px] h-[160px] sm:h-[180px] lg:h-[191px] rounded-[30px] transition-all duration-200 ${
//             selected
//               ? "bg-[#4499af] shadow-[0_4px_16px_rgba(68,153,175,0.5)] scale-105"
//               : "bg-[#eaeaea] group-hover:bg-[#d0e9ee] group-hover:scale-[1.03]"
//           }`}
//         />
//       )}

//       {/* عنوان */}
//       <p
//         className={`text-[16px] sm:text-[19px] lg:text-[21px] font-medium text-right whitespace-nowrap transition-colors ${
//           selected ? "text-[#4499af]" : "text-black"
//         }`}
//         style={{ fontFamily: FONT }}
//       >
//         {book.title}
//       </p>

//       {/* نویسنده */}
//       <p
//         className="text-[#3d3d3d] text-[13px] sm:text-[15px] lg:text-[17px] font-medium text-right whitespace-nowrap -mt-1"
//         style={{ fontFamily: FONT }}
//       >
//         {book.author_name}
//       </p>
//     </button>
//   );
// }

import { useNavigate } from "react-router-dom";
import React from "react";
interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/book/${book.id}`)}
      className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group"
      dir="rtl"
    >
      <img
        src={book.cover}
        alt={book.title}
        className="w-[146px] h-[191px] rounded-[30px] object-cover transition-all duration-200 group-hover:scale-105"
      />

      <p className="text-[21px] font-medium">{book.title}</p>

      <p className="text-[#3d3d3d] text-[17px]">{book.author}</p>
    </button>
  );
}
