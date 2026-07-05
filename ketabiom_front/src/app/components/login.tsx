// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom"; // 1. useNavigate اضافه شد
// import { BackIcon } from "./BackIcon";
// import React from "react";
// import axios from "axios";
// import { useAuth } from "./AuthContext";

// function BgPattern() {
//   return (
//     <div
//       className="absolute inset-0 overflow-hidden pointer-events-none z-0"
//       data-name="bg_pattern"
//     >
//       <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-[140vw] h-[140vh] min-w-[900px] min-h-[900px]">
//         <svg
//           className="block size-full"
//           fill="none"
//           preserveAspectRatio="none"
//           viewBox="0 0 2936 2523"
//         >
//           <defs>
//             {/* فیلترها باید قبل از استفاده تعریف شوند */}
//             <filter
//               colorInterpolationFilters="sRGB"
//               filterUnits="userSpaceOnUse"
//               height="1705"
//               id="filter0_f_1_43"
//               width="1706"
//               x="1230"
//               y="0"
//             >
//               <feFlood floodOpacity="0" result="BackgroundImageFix" />
//               <feBlend
//                 in="SourceGraphic"
//                 in2="BackgroundImageFix"
//                 mode="normal"
//                 result="shape"
//               />
//               {/* stdDeviation را کمتر کردم تا اثر blur بیشتر دیده شود */}
//               <feGaussianBlur
//                 result="effect1_foregroundBlur_1_43"
//                 stdDeviation="150"
//               />
//             </filter>
//             <filter
//               colorInterpolationFilters="sRGB"
//               filterUnits="userSpaceOnUse"
//               height="1353"
//               id="filter1_f_1_43"
//               width="1330"
//               x="0"
//               y="1170"
//             >
//               <feFlood floodOpacity="0" result="BackgroundImageFix" />
//               <feBlend
//                 in="SourceGraphic"
//                 in2="BackgroundImageFix"
//                 mode="normal"
//                 result="shape"
//               />
//               {/* stdDeviation را کمتر کردم */}
//               <feGaussianBlur
//                 result="effect1_foregroundBlur_1_43"
//                 stdDeviation="150"
//               />
//             </filter>
//           </defs>
//           <g id="bg_pattern">
//             <g filter="url(#filter0_f_1_43)" id="Ellipse 1">
//               <ellipse
//                 cx="2083"
//                 cy="852.5"
//                 // fillOpacity را کمی بیشتر کردم
//                 fill="rgb(6, 76, 69)"
//                 fillOpacity="0.3"
//                 rx="353"
//                 ry="352.5"
//               />
//             </g>
//             <g filter="url(#filter1_f_1_43)" id="Ellipse 2">
//               <ellipse
//                 cx="665"
//                 cy="1846.5"
//                 // fillOpacity را کمی بیشتر کردم
//                 fill="rgb(14, 77, 85)"
//                 fillOpacity="0.45"
//                 rx="165"
//                 ry="176.5"
//               />
//             </g>
//           </g>
//         </svg>
//       </div>
//     </div>
//   );
// }

// export default function LogIn() {
//   const navigate = useNavigate(); // 2. فراخوانی هوک
//   const { login } = useAuth(); // استفاده از تابع لاگین کانتکست

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     setError("");

//     if (!username || !password) {
//       setError("نام کاربری و رمز عبور را وارد کنید");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/accounts/login/`,
//         {
//           username: username,
//           password: password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("LOGIN SUCCESS:", res.data);
//       //token=when we login back send token that showes we loged in ***
//       // localStorage.setItem("accessToken", res.data.access);
//       // localStorage.setItem("refreshToken", res.data.refresh);

//       login(res.data.access, res.data.refresh, username);

//       // 3. هدایت کاربر به صفحه اصلی (یا هر صفحه‌ای که مد نظر دارید)
//       navigate("/");
//     } catch (err: any) {
//       console.log("LOGIN ERROR:", err.response?.data || err.message);

//       if (err.response?.status === 401) {
//         setError("نام کاربری یا رمز عبور اشتباه است");
//       } else if (err.response?.status === 400) {
//         setError("اطلاعات وارد شده معتبر نیست");
//       } else {
//         setError("خطا در اتصال به سرور");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="relative min-h-screen bg-[#fafafa] flex items-center justify-center p-4 overflow-hidden"
//       dir="rtl"
//     >
//       <BgPattern />

//       <div className="relative z-10 w-full max-w-[420px] bg-white border-2 border-bordercol rounded-[30px] p-8 shadow-xl">
//         <BackIcon />
//         <div className="space-y-5">
//           <div>
//             <label className="block text-right text-sm font-semibold mb-2">
//               نام کاربری یا ایمیل
//             </label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="نام کاربری / ایمیل"
//               className="w-full h-[50px] bg-white border border-bordercol rounded-[15px] px-4 text-right text-[16px] text-black placeholder:text-black/40 outline-none focus:ring-2 focus:ring-buttons/40 transition"
//               dir="rtl"
//             />
//           </div>
//           <div>
//             <label className="block text-right text-sm font-semibold mb-2">
//               رمز عبور
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="رمز عبور"
//               className="w-full h-[50px] bg-white border border-bordercol rounded-[15px] px-4 text-right text-[16px] text-black placeholder:text-black/40 outline-none focus:ring-2 focus:ring-buttons/40 transition"
//               dir="rtl"
//             />
//           </div>

//           {error && (
//             <p className="text-red-600 text-sm text-center mb-4">{error}</p>
//           )}

//           <button
//             type="button"
//             onClick={handleLogin}
//             disabled={loading}
//             className="w-full h-[50px] bg-buttons border border-bordercol rounded-[15px] shadow-[0px_5px_5px_0px_rgba(0,0,0,0.25)] text-white text-[22px] sm:text-[25px] font-semibold hover:bg-bordercol active:bg-bordercol transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {loading ? "در حال ورود..." : "ورود"}
//           </button>
//         </div>
//         <p className="text-center mt-6">
//           حساب ندارید؟{" "}
//           <Link to="/register" className="text-[#2B9BAD] font-bold">
//             ثبت نام
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BackIcon } from "./BackIcon";
import axios from "axios";
import { useAuth } from "./AuthContext";

export default function LogIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!username || !password) {
      setError("نام کاربری و رمز عبور را وارد کنید");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/accounts/login/`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("LOGIN SUCCESS:", res.data);

      login(res.data.access, res.data.refresh, username);

      navigate("/");
    } catch (err: any) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        setError("نام کاربری یا رمز عبور اشتباه است");
      } else if (err.response?.status === 400) {
        setError("اطلاعات وارد شده معتبر نیست");
      } else {
        setError("خطا در اتصال به سرور");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="soft-animated-bg min-h-screen w-full flex items-center justify-center p-4 overflow-hidden"
      dir="rtl"
    >
      <div className="relative z-10 w-full max-w-[420px] bg-white/85 backdrop-blur-md border-2 border-bordercol rounded-[30px] p-8 shadow-xl">
        <BackIcon />

        <div className="space-y-5">
          <div>
            <label className="block text-right text-sm font-semibold mb-2">
              نام کاربری یا ایمیل
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="نام کاربری / ایمیل"
              className="w-full h-[50px] bg-white/95 border border-bordercol rounded-[15px] px-4 text-right text-[16px] text-black placeholder:text-black/40 outline-none focus:ring-2 focus:ring-buttons/40 transition"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-right text-sm font-semibold mb-2">
              رمز عبور
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور"
              className="w-full h-[50px] bg-white/95 border border-bordercol rounded-[15px] px-4 text-right text-[16px] text-black placeholder:text-black/40 outline-none focus:ring-2 focus:ring-buttons/40 transition"
              dir="rtl"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-[50px] bg-buttons border border-bordercol rounded-[15px] shadow-[0px_5px_5px_0px_rgba(0,0,0,0.25)] text-white text-[22px] sm:text-[25px] font-semibold hover:bg-bordercol active:bg-bordercol transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </div>

        <p className="text-center mt-6">
          حساب ندارید؟{" "}
          <Link to="/register" className="text-[#2B9BAD] font-bold">
            ثبت نام
          </Link>
        </p>
      </div>
    </div>
  );
}
