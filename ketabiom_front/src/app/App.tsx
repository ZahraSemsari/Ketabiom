import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import RootLayout from "./components/RootLayout";
import HomePage from "./components/HomePage";
import LoginPage from "./components/login";
import RegisterPage from "./components/RegisterForm";
import React from "react";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);

// // در رندر اصلی:
export default function App() {
  return <RouterProvider router={router} />;
}

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />, // لایوت ثابت
//     children: [
//       { path: "/", element: <HomePage /> },
//       { path: "/login", element: <LoginPage /> },
//       { path: "/register", element: <RegisterPage /> },
//     ],
//   },
// ]);

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import HomePage from "./components/HomePage"; // فایلی که فرستادید
// import LoginPage from "./components/Login"; // کامپوننت صفحه ورود
// import RegisterPage from "./components/RegisterForm"; // کامپوننت صفحه ثبت‌نام
// import React from "react";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />,
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
//   {
//     path: "/register",
//     element: <RegisterPage />,
//   },
// ]);

// export default function App() {
//   return <RouterProvider router={router} />;
// }

// export default function App() {
//   return (
//     <div className="size-full">
//       <HomePage />
//     </div>
//   );
// }
