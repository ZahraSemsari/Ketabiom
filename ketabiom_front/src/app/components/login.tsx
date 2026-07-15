import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BackIcon } from "./BackIcon";
import axios from "axios";
import React from "react";
import { useAuth } from "./AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LogIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        },
      );

      console.log("LOGIN SUCCESS:", res.data);

      const accessToken = res.data.access;
      const refreshToken = res.data.refresh;

      // بعد از ورود، اطلاعات واقعی کاربر را از بک‌اند دریافت کن
      const userResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/accounts/me/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const realUsername = userResponse.data.username;

      // نام کاربری واقعی را ذخیره کن، نه ایمیلی که کاربر وارد کرده
      login(accessToken, refreshToken, realUsername);

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

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور"
                dir="rtl"
                className="w-full h-[50px] bg-white/95 border border-bordercol rounded-[15px]
               pr-4 pl-12
               text-right text-[16px] text-black
               placeholder:text-black/40
               outline-none focus:ring-2 focus:ring-buttons/40 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-0 flex items-center px-4 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
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
