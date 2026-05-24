// import { Search } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// //@=src
// import React from "react";
// // import logoImg from "@/imports/HomePage-1/50a9a903443c3aef8e8e8ce55688630c424280c1.png";
// import BookCard from "./BookCard";
// import Header from "./Header";
// import HeroSection from "./HeroSection";

// const POPULAR_BOOKS = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
// const FONT = "'Vazirmatn', sans-serif";

// function PopularBooks() {
//   const [selectedId, setSelectedId] = useState<number | null>(null);

//   return (
//     <section className="w-full bg-[#fafafa] pb-16">
//       <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
//         <p
//           className="text-black text-[24px] sm:text-[29px] lg:text-[31px] font-semibold text-right mb-6 tracking-tight"
//           dir="rtl"
//           style={{ fontFamily: FONT }}
//         >
//           کتاب های محبوب :
//         </p>
//         <div className="flex flex-row justify-between gap-3 overflow-x-auto pb-2">
//           {POPULAR_BOOKS.map((book) => (
//             <BookCard
//               key={book.id}
//               selected={selectedId === book.id}
//               onSelect={() =>
//                 setSelectedId(selectedId === book.id ? null : book.id)
//               }
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-[#fafafa] flex flex-col">
//       <Header />
//       <main className="flex-1">
//         <HeroSection />
//         <PopularBooks />
//       </main>
//     </div>
//   );
// }
import React, { useState } from "react";
import BookCard from "./BookCard";
import Header from "./Header";
import HeroSection from "./HeroSection";

const POPULAR_BOOKS = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
const FONT = "'Vazirmatn', sans-serif";

function PopularBooks() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <section className="w-full bg-[#fafafa] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <p
          className="text-black text-xl sm:text-2xl font-semibold text-right mb-8"
          dir="rtl"
          style={{ fontFamily: FONT }}
        >
          کتاب های محبوب:
        </p>
        {/* استفاده از grid برای ریسپانسیو بهتر در موبایل و دسکتاپ */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {POPULAR_BOOKS.map((book) => (
            <BookCard
              key={book.id}
              selected={selectedId === book.id}
              onSelect={() =>
                setSelectedId(selectedId === book.id ? null : book.id)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PopularBooks />
      </main>
    </div>
  );
}
