import { useState } from "react";
// import svgPaths from "../../imports/HomePage-1/svg-mc69sns2lc";
// import imgLogo3 from "../imports/HomePage-1/imgLogo3.png";
// import svgPathsSearch from "../../imports/SearchBar/svg-jqxuipwkm2";
import tailwindConfig from "../../../tailwind.config";
//import Header_HomePage from "./../components/Header_HomePage";
import HomePage_body1_login from "./HomePage_body1_login";
import HomePage_body2 from "./HomePage_body2";
//import Main_Header from "./Main_Header";
import Home_Page_Login_Header from "./Home_Page_Login_Header";

export default function Home_Page_Login() {
  // const [searchQuery, setSearchQuery] = useState("");
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [selectedBook, setSelectedBook] = useState<number | null>(null);

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);
  //   setIsDropdownOpen(e.target.value.length > 0);
  //};

  // const handleBookClick = (bookId: number) => {
  //   setSelectedBook(bookId);
  // };

  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden" dir="rtl">
      <Home_Page_Login_Header />
      <HomePage_body1_login />
      <HomePage_body2 />
    </div>
  );
}
