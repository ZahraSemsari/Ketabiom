import { useState } from "react";

import HomePage_body1 from "./../components/HomePage_body1";
import HomePage_body2 from "./../components/HomePage_body2";
import React from "react";
import Header from "./Header";
export default function Home_Page() {
  return (
    <div className="soft-animated-bg min-h-screen w-full overflow-x-hidden" dir="rtl">
      <HomePage_body1 />
      <HomePage_body2 />
    </div>
  );
}
