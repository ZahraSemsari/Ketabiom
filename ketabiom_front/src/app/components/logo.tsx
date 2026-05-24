import React from "react";
import logoImg from "@/imports/HomePage-1/50a9a903443c3aef8e8e8ce55688630c424280c1.png";
const FONT = "'Vazirmatn', sans-serif";

export default function Logo() {
  return (
    <div className="flex flex-col items-center" dir="rtl">
      <h2
        className="text-[#236474] text-[80px] sm:text-[110px] lg:text-[130px] font-bold leading-none text-right"
        style={{ fontFamily: FONT }}
      >
        کتابیوم
      </h2>
      <div className="w-[220px] sm:w-[320px] lg:w-[400px] aspect-square relative -mt-4">
        <img
          src={logoImg}
          alt="کتابیوم"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
