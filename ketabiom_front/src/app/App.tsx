import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import MainHeader from "./components/Header";
import HomePage from "./components/Home_Page";
import LogIn from "./components/LogIn";
import Register from "./components/RegisterForm";
import UserProfile from "./components/UserProfile";
import Notes from "./components/Notes";
import Profile from "./components/UserProfile";


//  کامپوننت‌های زیر را بر اساس مسیر و نام دقیق فایل‌های خودت از کامنت خارج و اصلاح کن:
import BookDetails from "./components/BookDetail";
import ShowMore from "./components/ShowesMore";
import LibraryDetail from "./components/LibraryDetail";

// یک Layout ساده که هدر همیشه بالای آن است
function HomeLayout() {
  return (
    <>
      <MainHeader />
      <Outlet /> {/* اینجا جایی است که صفحات عوض می‌شوند */}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* مسیرهایی که به هدر نیاز دارند */}
          <Route element={<HomeLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          {/* مسیرهایی که هدر نمی‌خواهند */}
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<Notes />} />
          {/* <Route path="/LibraryDetail" element={<LibraryDetail />} /> */}
          <Route path="/library/:id" element={<LibraryDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/show-more" element={<ShowMore />} />

          {/* روت پشتیبان برای آدرس‌های اشتباه (صفحه 404) */}
          <Route
            path="*"
            element={
              <div style={{ padding: "20px", textAlign: "center" }}>
                صفحه مورد نظر یافت نشد (404)
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
