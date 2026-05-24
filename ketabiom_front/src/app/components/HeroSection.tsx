//@=src
import React from "react";
import logoImg from "@/imports/HomePage-1/50a9a903443c3aef8e8e8ce55688630c424280c1.png";
const FONT = "'Vazirmatn', sans-serif";

import Logo from "./logo";

const POPULAR_BOOKS = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

export default function HeroSection() {
  return (
    <section className="w-full bg-[#fafafa] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Left: Text + CTA */}
          <div
            className="flex flex-col items-center lg:items-start gap-6 lg:max-w-xl"
            dir="rtl"
          >
            <h1
              className="text-[#236474] text-4xl sm:text-5xl lg:text-6xl font-bold leading-snug text-center lg:text-right"
              style={{
                fontFamily: FONT,
                textShadow: "4px 4px 8px rgba(0,0,0,0.15)",
              }}
            >
              شبکه اجتماعی کتاب دوستان
            </h1>
            <button
              className="bg-[#4499af] text-white rounded-full px-8 py-4 text-xl sm:text-2xl font-bold hover:bg-[#3a8a9e] transition-all shadow-lg"
              style={{ fontFamily: FONT }}
            >
              به ما بپیوندید
            </button>
          </div>

          {/* Right: Logo + Brand name */}
          <div className="flex flex-col items-center" dir="rtl">
            <h2
              className="text-[#236474] text-5xl sm:text-7xl lg:text-8xl font-bold leading-none"
              style={{ fontFamily: FONT }}
            >
              کتابیوم
            </h2>
            <div className="w-48 sm:w-64 lg:w-80 aspect-square relative mt-2">
              <img
                src={logoImg}
                alt="کتابیوم"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// export default function HeroSection() {
//   return (
//     <section className="w-full bg-[#fafafa] py-10 sm:py-16">
//       <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
//         <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-8">
//           {/* Left: Text + CTA */}
//           <div
//             className="flex flex-col items-center sm:items-start gap-6 sm:max-w-[460px]"
//             dir="rtl"
//           >
//             <h1
//               className="text-[#236474] text-[48px] sm:text-[64px] lg:text-[80px] font-bold leading-tight text-center sm:text-right"
//               style={{
//                 fontFamily: FONT,
//                 textShadow: "6px 7px 10px rgba(0,0,0,0.25)",
//               }}
//             >
//               شبکه اجتماعی کتاب دوستان
//             </h1>
//             <button
//               className="bg-[#4499af] text-white rounded-[50px] shadow-[-2px_6px_8px_0px_rgba(0,0,0,0.25)] px-10 h-[72px] text-[28px] sm:text-[36px] font-bold hover:bg-[#3a8a9e] transition-colors"
//               style={{ fontFamily: FONT }}
//             >
//               به ما بپیوندید
//             </button>
//           </div>

//           {/* Right: Logo + Brand name */}
//           {/* <Logo /> */}
//           <div className="flex flex-col items-center" dir="rtl">
//             <h2
//               className="text-[#236474] text-[80px] sm:text-[110px] lg:text-[130px] font-bold leading-none text-right"
//               style={{ fontFamily: FONT }}
//             >
//               کتابیوم
//             </h2>
//             <div className="w-[220px] sm:w-[320px] lg:w-[400px] aspect-square relative -mt-4">
//               <img
//                 src={logoImg}
//                 alt="کتابیوم"
//                 className="absolute inset-0 w-full h-full object-contain"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
