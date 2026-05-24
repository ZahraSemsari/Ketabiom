import React from "react";
const FONT = "'Vazirmatn', sans-serif";

export default function BookCard({
  selected,
  onSelect,
}: {
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group outline-none"
      dir="rtl"
    >
      <div
        className={`w-[120px] sm:w-[140px] lg:w-[146px] h-[160px] sm:h-[180px] lg:h-[191px] rounded-[30px] transition-all duration-200 ${
          selected
            ? "bg-[#4499af] shadow-[0_4px_16px_rgba(68,153,175,0.5)] scale-105"
            : "bg-[#eaeaea] group-hover:bg-[#d0e9ee] group-hover:scale-[1.03]"
        }`}
      />
      <p
        className={`text-[16px] sm:text-[19px] lg:text-[21px] font-medium text-right whitespace-nowrap transition-colors ${
          selected ? "text-[#4499af]" : "text-black"
        }`}
        style={{ fontFamily: FONT }}
      >
        عنوان کتاب
      </p>
      <p
        className="text-[#3d3d3d] text-[13px] sm:text-[15px] lg:text-[17px] font-medium text-right whitespace-nowrap -mt-1"
        style={{ fontFamily: FONT }}
      >
        نویسنده
      </p>
    </button>
  );
}
