// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// // import RootLayout from "./components/RootLayout";
// import Home_Page from "./components/Home_Page";
// import BookDetail from "./components/BookDetail";
// import LoginPage from "./components/login";

// const router = createBrowserRouter([
//   { path: "/", element: <Home_Page /> },
//   // { path: "/", element: <BookDetail /> },

//   { path: "/login", element: <LoginPage /> },
//   { path: "/register", element: <RegisterPage /> },
// ]);

// export default function App() {
//   return <RouterProvider router={router} />;
// }
import Register from "./components/RegisterForm";
import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import MainHeader from "./components/Header";
import HomePage from "./components/Home_Page";
import LogIn from "./components/LogIn";

// یک Layout ساده که هدر همیشه بالای آن است
function Layout() {
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
      {" "}
      {/* کل برنامه داخل رادیو قرار می‌گیرد */}
      <BrowserRouter>
        <Routes>
          {/* مسیرهایی که هدر می‌خواهند */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            {/* بقیه صفحات را اینجا اضافه کن */}
          </Route>

          {/* مسیرهایی که هدر نمی‌خواهند */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
