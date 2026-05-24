import React from "react";
import { Link } from "react-router-dom";

export function BackIcon() {
  return (
    <div className="flex items-center w-full mb-8">
      <Link
        to="/"
        className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-3"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="black"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <h1 className="text-xl sm:text-2xl font-bold text-black">خانه</h1>
    </div>
  );
}
