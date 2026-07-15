import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import MainHeader from "./components/Header";
import HomePage from "./components/Home_Page";
import LogIn from "./components/login";
import Register from "./components/RegisterForm";
import UserProfile from "./components/UserProfile";
import Notes from "./components/Notes";
import Profile from "./components/UserProfile";
import BookDetails from "./components/BookDetail";
import ShowMore from "./components/ShowesMore";
import LibraryDetail from "./components/LibraryDetail";
import Footer from "./components/Footer";

function HomeLayout() {
  return (
    <>
      <MainHeader />
      <Outlet /> {/* اینجا جایی است که صفحات عوض می‌شوند */}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<HomePage />} />

            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/library/:id" element={<LibraryDetail />} />
            <Route path="/show-more" element={<ShowMore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Route>

          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<Notes />} />

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
