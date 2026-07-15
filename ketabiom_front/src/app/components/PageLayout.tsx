import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function PageLayout({ children }: Props) {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#D8EEF2] via-[#EEF7F9] to-[#F8FBFC]"
      dir="rtl"
    >
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-[28px] shadow-xl p-6 md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
