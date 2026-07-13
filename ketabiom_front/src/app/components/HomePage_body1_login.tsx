// import React from "react";
// import { useState } from "react";
// import imgLogo3 from "../../imports/HomePage-1/imgLogo3.png";
// //const FONT = "'Vazirmatn', sans-serif";
// import tailwindConfig from "../../../tailwind.config";
// import Header_HomePage from "./Header_HomePage";
// export default function HomePage_body1() {
//   return (
//     <main className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-48 py-3 sm:py-6 lg:py-8">
//       {/* Hero Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 sm:gap-0 lg:gap-0 items-center justify-items-center mb-6 sm:mb-8 lg:mb-10">
//         {/* Right Side - Text & Button */}
//         <div className="order-2 lg:order-2 text-left space-y-2 sm:space-y-3 lg:space-y-4 w-full flex flex-col items-center justify-center">
//           <h1 className="font-['Arad:Bold',sans-serif] text-bordercol text-[34px] sm:text-[40px] lg:text-[52px] leading-tight drop-shadow-[6px_7px_10px_rgba(0,0,0,0.25)] max-w-[450px] text-center">
//             شبکه اجتماعی <br /> کتاب دوستان
//           </h1>
//         </div>

//         {/* Left Side - Logo & Title */}
//         <div className="order-1 lg:order-1 flex flex-col items-center justify-center gap-0.5 sm:gap-1 lg:gap-2">
//           <img
//             src={imgLogo3}
//             alt="کتابیوم لوگو بزرگ"
//             className="w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[340px] h-auto object-contain"
//           />
//         </div>
//       </div>
//     </main>
//   );
// }
import React from "react";
import heroImage from "../../imports/HomePage-1/66.png";

export default function HomePage_body1_login() {
  return (
    <main className="max-w-[1500px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-24 py-10 lg:py-16">
      <section className="grid lg:grid-cols-2 grid-cols-1 items-center gap-10">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-right">
          <h1
            className="font-['Arad:Bold',sans-serif] text-bordercol leading-[1.25]
          text-[40px] sm:text-[52px] xl:text-[68px]"
          >
            شبکه اجتماعی
            <br />
            کتاب دوستان
          </h1>

          <p
            className="mt-6 max-w-[540px] text-gray-700
          text-[18px] lg:text-[22px] leading-10"
          >
            کتاب بخوان، یادداشت بردار، به اشتراک بگذار و با دیگران
            <br />
            درباره‌ی کتاب‌ها گفتگو کن.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <img
            src={heroImage}
            alt="کتابیوم"
            className="w-full
            max-w-[360px]
            sm:max-w-[500px]
            lg:max-w-[650px]
            xl:max-w-[760px]
            object-contain"
          />
        </div>
      </section>
    </main>
  );
}
