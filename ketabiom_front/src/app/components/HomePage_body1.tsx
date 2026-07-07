import React from "react";
import { useState } from "react";
import imgLogo3 from "../../imports/HomePage-1/imgLogo3.png";
//const FONT = "'Vazirmatn', sans-serif";
import tailwindConfig from "../../../tailwind.config";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage_body1() {
  return (
    <main className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-48 py-3 sm:py-6 lg:py-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 sm:gap-0 lg:gap-0 items-center justify-items-center mb-6 sm:mb-8 lg:mb-10">
        {/* Right Side - Text & Button */}
        <div className="order-2 lg:order-2 text-left space-y-2 sm:space-y-3 lg:space-y-4 w-full flex flex-col items-center justify-center">
          <h1 className="font-['Arad:Bold',sans-serif] text-bordercol text-[34px] sm:text-[40px] lg:text-[52px] leading-tight drop-shadow-[6px_7px_10px_rgba(0,0,0,0.25)] max-w-[450px] text-center">
            شبکه اجتماعی <br /> کتاب دوستان
          </h1>
          <Link to="/register">
            <button className="bg-buttons h-[48px] sm:h-[52px] lg:h-[58px] px-7 sm:px-8 lg:px-10 rounded-[50px] shadow-[-2px_6px_8px_0px_rgba(0,0,0,0.25)] hover:bg-[#3a8599] transition-colors">
              <p className="font-['Arad:Bold',sans-serif] text-[18px] sm:text-[20px] lg:text-[24px] text-white">
                به ما بپیوندید
              </p>
            </button>
          </Link>
        </div>

        {/* Left Side - Logo & Title */}
        <div className="order-1 lg:order-1 flex flex-col items-center justify-center gap-0.5 sm:gap-1 lg:gap-2">
          <img
            src={imgLogo3}
            alt="کتابیوم لوگو بزرگ"
            className="w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[340px] h-auto object-contain"
          />
        </div>
      </div>
    </main>
  );
}
