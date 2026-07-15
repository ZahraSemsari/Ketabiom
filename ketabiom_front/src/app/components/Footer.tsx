import logo from "../../imports/HomePage-1/imgLogo.png";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0A5C6C] via-[#084D5B] to-[#093139] text-white">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4" dir="rtl">
            <img src={logo} alt="کتابیوم" className="w-14 h-14" />

            <div>
              <h3 className="text-2xl font-bold">کتابیوم</h3>

              <p className="text-white/80 mt-1">همراه مطالعه‌ی شما</p>
            </div>
          </div>

          <div className="space-y-3" dir="ltr">
            <div className="flex items-center justify-start gap-2 text-white/90">
              <span className="text-[20px]">☎️</span>
              <span className="text-[18px]">0912 123 4567</span>
            </div>

            <div className="flex items-center justify-start gap-2 text-white/90">
              <span className="text-[20px]">✉️</span>
              <span className="text-[18px]">info@ketabiom.ir</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-white/10 text-center text-sm text-white/60">
          © 2025 Ketabiom — تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
}
