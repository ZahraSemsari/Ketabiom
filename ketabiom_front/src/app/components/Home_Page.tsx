
import HomeHero from "./../components/HomeHero";
import HomePage_body2 from "./../components/HomePage_body2";
import { useAuth } from "./AuthContext";
import React from "react";
export default function Home_Page() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="w-full overflow-x-hidden" dir="rtl">
      <HomeHero showButton={!isLoggedIn} />

      <div className="bg-[#CFE8ED]">
        <HomePage_body2 />
      </div>
    </div>
  );
}
