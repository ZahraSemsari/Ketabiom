//@=src
import React from "react";
import logoImg from "@/imports/HomePage-1/50a9a903443c3aef8e8e8ce55688630c424280c1.png";
const FONT = "'Vazirmatn', sans-serif";

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
