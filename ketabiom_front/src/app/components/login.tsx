import { useState } from "react";
import React from "react";

function BackIcon() {
  return (
    <svg
      width="22"
      height="18"
      viewBox="0 0 31 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <path
        d="M16.9084 3.33377L24.4666 11.0471H1.91358C1.84752 11.0471 1.78226 11.0505 1.71792 11.0573C0.752986 11.1572 0 11.9889 0 13C0 14.0786 0.856733 14.9529 1.91358 14.9529H24.4666L16.9084 22.6662C16.1612 23.429 16.1612 24.6654 16.9084 25.4281C17.6558 26.1906 18.8673 26.1906 19.6147 25.4281L30.4396 14.3809C31.1868 13.6183 31.1868 12.3818 30.4396 11.6191L19.6147 0.571981C19.6031 0.560061 19.5913 0.548344 19.5793 0.536798C19.496 0.45598 19.4074 0.384302 19.3145 0.321747C18.7839 -0.0357539 18.1174 -0.0953247 17.5414 0.142989C17.3112 0.23832 17.0953 0.381318 16.9084 0.571981C16.8968 0.583902 16.8853 0.595931 16.874 0.60807C16.1614 1.37316 16.1728 2.58304 16.9084 3.33377Z"
        fill="black"
      />
    </svg>
  );
}

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white"
      style={{ fontFamily: "'Vazirmatn', sans-serif" }}
      dir="rtl"
    >
      {/* Background blurred ellipses */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 706,
            height: 705,
            top: "5%",
            right: "-10%",
            background: "rgba(186,56,115,0.15)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 330,
            height: 353,
            bottom: "5%",
            left: "-5%",
            background: "rgba(186,56,115,0.15)",
            filter: "blur(120px)",
          }}
        />
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-[460px] mx-4 sm:mx-auto">
        <div className="bg-white border-4 border-bordercol rounded-[40px] sm:rounded-[50px] px-8 sm:px-12 py-10 sm:py-12 shadow-sm">
          {/* Top row: back button + title on the right */}
          <div className="flex items-center justify-start gap-3 mb-8">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-bordercol/10 active:bg-bordercol/20 transition-colors cursor-pointer"
              aria-label="بازگشت"
            >
              <BackIcon />
            </button>
            <h1 className="text-2xl sm:text-[27px] font-semibold text-black leading-normal">
              ورود
            </h1>
          </div>

          {/* Username field */}
          <div className="relative mb-5">
            <label className="block text-right text-[17px] sm:text-[18px] font-medium text-black mb-2">
              نام کاربری یا ایمیل
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="نام کاربری / ایمیل"
              className="w-full h-[50px] bg-white border border-bordercol rounded-[15px] px-4 text-right text-[16px] text-black placeholder:text-black/40 outline-none focus:ring-2 focus:ring-buttons/40 transition"
              dir="rtl"
            />
          </div>

          {/* Password field */}
          <div className="relative mb-8">
            <label className="block text-right text-[17px] sm:text-[18px] font-medium text-black mb-2">
              رمز عبور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور"
              className="w-full h-[50px] bg-white border border-bordercol rounded-[15px] px-4 text-right text-[16px] text-black placeholder:text-black/40 outline-none focus:ring-2 focus:ring-buttons/40 transition"
              dir="rtl"
            />
          </div>

          {/* Submit button */}
          <button
            type="button"
            className="w-full h-[50px] bg-buttons border border-[rgba(110,41,72,0.88)] rounded-[15px] shadow-[0px_5px_5px_0px_rgba(0,0,0,0.25)] text-white text-[22px] sm:text-[25px] font-semibold hover:bg-[#a03265] active:bg-[#8e2b59] transition-colors cursor-pointer"
          >
            ورود
          </button>
        </div>
      </div>
    </div>
  );
}
