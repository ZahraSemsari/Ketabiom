import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 1. useNavigate اضافه شد
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { BackIcon } from "./BackIcon";
import axios from "axios";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const navigate = useNavigate(); // 2. هوک را تعریف کردیم
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    setServerError("");
    setIsSubmitted(false);
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/accounts/register/`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
          password2: data.confirmPassword,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("REGISTER SUCCESS:", response.data);
      setIsSubmitted(true);

      // 3. هدایت کاربر به صفحه ورود پس از ثبت‌نام موفق
      setTimeout(() => {
        navigate("/login");
      }, 1000); // یک ثانیه تأخیر برای اینکه کاربر پیام "ثبت شد" را ببیند
    } catch (err: any) {
      console.log("REGISTER ERROR:", err.response?.data || err.message);
      const errorData = err.response?.data;
      if (errorData?.username)
        setServerError(`نام کاربری: ${errorData.username[0]}`);
      else if (errorData?.email) setServerError(`ایمیل: ${errorData.email[0]}`);
      else if (errorData?.password)
        setServerError(`رمز عبور: ${errorData.password[0]}`);
      else if (errorData?.password2)
        setServerError(`تکرار رمز عبور: ${errorData.password2[0]}`);
      else setServerError("خطا در ثبت‌نام یا اتصال به سرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="soft-animated-bg min-h-screen bg-[#fafafa] flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="w-full max-w-[420px] bg-white border-2 border-bordercol rounded-[30px] p-8 shadow-xl">
        <BackIcon />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {[
            { name: "username", label: "نام کاربری" },
            { name: "email", label: "ایمیل" },
            { name: "password", label: "رمز عبور" },
            { name: "confirmPassword", label: "تکرار رمز عبور" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-right text-sm font-semibold mb-2">
                {field.label}
              </label>
              <input
                {...register(field.name as keyof FormData, {
                  required: true,
                  validate:
                    field.name === "confirmPassword"
                      ? (v) => v === password || "رمز عبور مطابقت ندارد"
                      : undefined,
                })}
                type={field.name.includes("password") ? "password" : "text"}
                className="w-full h-12 border border-bordercol rounded-xl px-4 outline-none focus:ring-2 focus:ring-buttons/20"
              />
              {errors[field.name as keyof FormData] && (
                <p className="text-red-500 text-xs mt-1 text-right">
                  {errors[field.name as keyof FormData]?.message ||
                    "این فیلد الزامی است"}
                </p>
              )}
            </div>
          ))}

          {serverError && (
            <p className="text-red-500 text-xs text-center">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-buttons text-white rounded-xl font-bold text-lg hover:opacity-90 transition"
          >
            {loading ? "در حال ثبت..." : isSubmitted ? "✓ ثبت شد" : "ثبت نام"}
          </button>
        </form>
        <p className="text-center mt-6">
          حساب دارید؟{" "}
          <Link to="/login" className="text-[#2B9BAD] font-bold">
            ورود
          </Link>
        </p>
      </div>
    </div>
  );
}
