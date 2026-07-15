import { Search, ArrowRight } from "lucide-react";
import React from "react";
export default function ProfHeader() {
  return (
    <header
      className="bg-card border-b border-border h-14 sm:h-16 flex items-center justify-between gap-3 px-4 sm:px-6 sticky top-0 z-40"
      dir="ltr"
    >
      <div className="flex items-center gap-1 shrink-0">
        {/* رنگ آیکون‌ها از primary برداشته می‌شود */}
        <button className="text-primary hover:opacity-70 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M6 6h10M6 10h10" />
          </svg>
        </button>
      </div>

      <div className="flex-1 flex justify-center px-2">
        {/* کادر سرچ با پس‌زمینه خاکستری روشن پروژه شما */}
        <div
          className="bg-input-background border border-border rounded-full h-9 sm:h-10 flex items-center justify-between px-4 w-full max-w-lg"
          dir="rtl"
        >
          <input
            type="text"
            placeholder="جستجو"
            className="bg-transparent text-right text-sm sm:text-base text-foreground outline-none w-full placeholder:text-foreground/50"
          />
          <Search size={16} className="text-primary shrink-0 mr-2" />
        </div>
      </div>

      <button className="shrink-0 text-primary hover:opacity-70 transition-opacity">
        <ArrowRight size={22} />
      </button>
    </header>
  );
}
