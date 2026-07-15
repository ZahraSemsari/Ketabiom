import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BackIcon } from "./BackIcon";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function collectApiMessages(value: any): string[] {
  if (!value) return [];

  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectApiMessages);
  }

  if (typeof value === "object") {
    return Object.values(value).flatMap(collectApiMessages);
  }

  return [];
}

function translateApiMessage(message: string, fieldName?: string) {
  const normalizedMessage = message.toLowerCase().trim();

  if (
    fieldName === "username" &&
    (normalizedMessage.includes("already exists") ||
      normalizedMessage.includes("already taken") ||
      normalizedMessage.includes("unique"))
  ) {
    return "این نام کاربری قبلاً ثبت شده است.";
  }

  if (
    normalizedMessage.includes("a user with that username already exists") ||
    normalizedMessage.includes("user with that username already exists") ||
    normalizedMessage.includes("user with this username already exists") ||
    normalizedMessage.includes("username already exists") ||
    normalizedMessage.includes("username is already taken") ||
    (normalizedMessage.includes("username") &&
      normalizedMessage.includes("already exists"))
  ) {
    return "این نام کاربری قبلاً ثبت شده است.";
  }

  if (
    fieldName === "email" &&
    (normalizedMessage.includes("already exists") ||
      normalizedMessage.includes("already taken") ||
      normalizedMessage.includes("unique"))
  ) {
    return "این ایمیل قبلاً ثبت شده است.";
  }

  if (
    normalizedMessage.includes("user with this email address already exists") ||
    normalizedMessage.includes("user with that email address already exists") ||
    normalizedMessage.includes("a user with this email already exists") ||
    normalizedMessage.includes("a user with that email already exists") ||
    normalizedMessage.includes("email address already exists") ||
    normalizedMessage.includes("email already exists") ||
    normalizedMessage.includes("email is already taken") ||
    normalizedMessage.includes("this email is already in use") ||
    normalizedMessage.includes("account with this email already exists") ||
    (normalizedMessage.includes("email") &&
      normalizedMessage.includes("already exists"))
  ) {
    return "این ایمیل قبلاً ثبت شده است.";
  }

  if (
    normalizedMessage.includes("enter a valid email") ||
    normalizedMessage.includes("valid email address") ||
    normalizedMessage.includes("invalid email")
  ) {
    return "ایمیل وارد شده معتبر نیست.";
  }

  if (
    normalizedMessage.includes("password fields didn't match") ||
    normalizedMessage.includes("passwords do not match") ||
    normalizedMessage.includes("password mismatch")
  ) {
    return "رمز عبور و تکرار آن یکسان نیستند.";
  }

  if (
    normalizedMessage.includes("this password is too short") ||
    normalizedMessage.includes("at least 8 characters")
  ) {
    return "رمز عبور باید حداقل ۸ کاراکتر داشته باشد.";
  }

  if (normalizedMessage.includes("this password is too common")) {
    return "این رمز عبور بیش از حد ساده و رایج است.";
  }

  if (normalizedMessage.includes("this password is entirely numeric")) {
    return "رمز عبور نباید فقط شامل عدد باشد.";
  }

  if (normalizedMessage.includes("the password is too similar to the")) {
    return "رمز عبور بیش از حد به اطلاعات حساب کاربری شما شبیه است.";
  }

  if (
    normalizedMessage.includes("this field may not be blank") ||
    normalizedMessage.includes("this field is required") ||
    normalizedMessage.includes("required")
  ) {
    return "این فیلد الزامی است.";
  }

  return message;
}

function getRegisterErrorMessage(errorData: any) {
  if (!errorData) {
    return "خطا در ثبت‌نام یا اتصال به سرور.";
  }

  const usernameMessages = collectApiMessages(errorData.username);

  if (usernameMessages.length > 0) {
    return translateApiMessage(usernameMessages[0], "username");
  }

  const emailMessages = collectApiMessages(errorData.email);

  if (emailMessages.length > 0) {
    return translateApiMessage(emailMessages[0], "email");
  }

  const passwordMessages = collectApiMessages(errorData.password);

  if (passwordMessages.length > 0) {
    return translateApiMessage(passwordMessages[0], "password");
  }

  const password2Messages = collectApiMessages(errorData.password2);

  if (password2Messages.length > 0) {
    return translateApiMessage(password2Messages[0], "password2");
  }

  const allMessages = collectApiMessages(errorData);

  if (allMessages.length > 0) {
    const translatedMessages = allMessages
      .map((message) => translateApiMessage(message))
      .filter((message, index, array) => array.indexOf(message) === index);

    return translatedMessages.join(" ");
  }

  return "خطا در ثبت‌نام یا اتصال به سرور.";
}

export default function RegisterForm() {
  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        `${import.meta.env.VITE_API_URL}/api/accounts/register/`,
        {
          username: data.username.trim(),
          email: data.email.trim(),
          password: data.password,
          password2: data.confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("REGISTER SUCCESS:", response.data);
      setIsSubmitted(true);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err: any) {
      console.log("REGISTER ERROR:", err.response?.data || err.message);

      setServerError(getRegisterErrorMessage(err.response?.data));
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

              <div className="relative">
                <input
                  {...register(field.name as keyof FormData, {
                    required: "این فیلد الزامی است",
                    validate: (value) => {
                      if (field.name === "email") {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                        return emailPattern.test(value) || "ایمیل معتبر نیست";
                      }

                      if (field.name === "password") {
                        const passwordRegex =
                          /^(?=.*[A-Za-z])(?=(?:.*\d){6,}).+$/;

                        return (
                          passwordRegex.test(value) ||
                          "رمز باید شامل حداقل یک حرف و ۶ عدد باشد"
                        );
                      }

                      if (field.name === "confirmPassword") {
                        return value === password || "رمز عبور مطابقت ندارد";
                      }

                      return true;
                    },
                  })}
                  type={
                    field.name === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : field.name === "confirmPassword"
                      ? showConfirmPassword
                        ? "text"
                        : "password"
                      : field.name === "email"
                      ? "email"
                      : "text"
                  }
                  dir={
                    field.name === "password" ||
                    field.name === "confirmPassword"
                      ? "rtl"
                      : "ltr"
                  }
                  style={{
                    textAlign:
                      field.name === "password" ||
                      field.name === "confirmPassword"
                        ? "right"
                        : "left",
                    direction:
                      field.name === "password" ||
                      field.name === "confirmPassword"
                        ? "rtl"
                        : "ltr",
                  }}
                  className={`w-full h-12 border border-bordercol rounded-xl outline-none
    focus:ring-2 focus:ring-buttons/20
    ${
      field.name === "password" || field.name === "confirmPassword"
        ? "pr-4 pl-12 text-right"
        : "px-4 text-left"
    }`}
                />

                {field.name === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 left-0 flex items-center px-4 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                )}

                {field.name === "confirmPassword" && (
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 left-0 flex items-center px-4 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                )}
              </div>

              {errors[field.name as keyof FormData] && (
                <p className="text-red-500 text-xs mt-1 text-right">
                  {errors[field.name as keyof FormData]?.message}
                </p>
              )}
            </div>
          ))}

          {serverError && (
            <p className="text-red-500 text-sm text-center leading-7">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-buttons text-white rounded-xl font-bold text-lg hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
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
