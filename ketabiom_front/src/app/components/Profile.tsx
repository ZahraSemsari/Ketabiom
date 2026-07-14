import React, { useEffect, useRef, useState } from "react";

import {
  BookOpen,
  Star,
  PenLine,
  MoreVertical,
  Pencil,
  Mail,
  KeyRound,
  X,
  Eye,
  EyeOff,
} from "lucide-react";

import defaultAvatar from "../../assets/default-avatar.png";

type EditMode = "username" | "email" | "password" | null;

type PasswordUpdateData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type ProfileProps = {
  username: string;
  email: string;
  profileImage?: string | null;
  readBooksCount: number;
  score: number;
  notesCount: number;

  onUpdateUsername: (username: string) => Promise<void>;
  onUpdateEmail: (email: string) => Promise<void>;
  onUpdatePassword: (data: PasswordUpdateData) => Promise<void>;
};

export default function Profile({
  username,
  email,
  profileImage,
  readBooksCount,
  score,
  notesCount,
  onUpdateUsername,
  onUpdateEmail,
  onUpdatePassword,
}: ProfileProps) {
  const [imageError, setImageError] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState<EditMode>(null);

  const [usernameValue, setUsernameValue] = useState(username);

  const [emailValue, setEmailValue] = useState(email);

  const [oldPassword, setOldPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formError, setFormError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);

  const avatarSrc = !imageError && profileImage ? profileImage : defaultAvatar;

  useEffect(() => {
    setUsernameValue(username);
  }, [username]);

  useEffect(() => {
    setEmailValue(email);
  }, [email]);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", closeMenu);
    }

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, [menuOpen]);

  const openEditor = (mode: Exclude<EditMode, null>) => {
    setMenuOpen(false);
    setEditMode(mode);
    setFormError("");
    setSuccessMessage("");

    setUsernameValue(username);
    setEmailValue(email);

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const closeEditor = () => {
    if (isSubmitting) return;

    setEditMode(null);
    setFormError("");
    setSuccessMessage("");

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setFormError("");
    setSuccessMessage("");

    try {
      setIsSubmitting(true);

      if (editMode === "username") {
        const trimmedUsername = usernameValue.trim();

        if (!trimmedUsername) {
          throw new Error("نام کاربری را وارد کنید.");
        }

        if (trimmedUsername.length > 150) {
          throw new Error("نام کاربری نباید بیشتر از ۱۵۰ کاراکتر باشد.");
        }

        const usernamePattern = /^[\p{L}\p{N}@._+\-]+$/u;

        if (!usernamePattern.test(trimmedUsername)) {
          throw new Error(
            "نام کاربری نباید فاصله داشته باشد و فقط می‌تواند شامل حروف، عدد و علامت‌های @ . + - _ باشد."
          );
        }

        await onUpdateUsername(trimmedUsername);
      }

      if (editMode === "email") {
        const trimmedEmail = emailValue.trim();

        if (!trimmedEmail) {
          throw new Error("ایمیل را وارد کنید.");
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(trimmedEmail)) {
          throw new Error("فرمت ایمیل معتبر نیست.");
        }

        await onUpdateEmail(trimmedEmail);
      }

      if (editMode === "password") {
        if (!oldPassword || !newPassword || !confirmPassword) {
          throw new Error("تمام فیلدهای رمز عبور را وارد کنید.");
        }

        if (newPassword !== confirmPassword) {
          throw new Error("رمز عبور جدید و تکرار آن یکسان نیستند.");
        }

        if (oldPassword === newPassword) {
          throw new Error("رمز عبور جدید باید با رمز فعلی متفاوت باشد.");
        }

        const passwordPattern = /^(?=.*[A-Za-z])(?=(?:.*\d){6,}).+$/;

        if (!passwordPattern.test(newPassword)) {
          throw new Error("رمز جدید باید حداقل یک حرف و ۶ عدد داشته باشد.");
        }

        await onUpdatePassword({
          oldPassword,
          newPassword,
          confirmPassword,
        });
      }

      setSuccessMessage("تغییرات با موفقیت ذخیره شد.");

      window.setTimeout(() => {
        setEditMode(null);
        setSuccessMessage("");
      }, 700);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "ثبت تغییرات با خطا مواجه شد.";

      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalTitle =
    editMode === "username"
      ? "ویرایش نام کاربری"
      : editMode === "email"
      ? "ویرایش ایمیل"
      : "ویرایش رمز عبور";

  return (
    <>
      <section className="relative">
        {/* سه‌نقطه در بالا و سمت چپ */}
        <div ref={menuRef} className="absolute left-0 top-8 sm:top-14 z-30">
          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            className="w-8 h-8 flex items-center justify-center rounded-full text-bordercol hover:bg-gray-100 transition-colors"
            aria-label="ویرایش اطلاعات حساب"
          >
            <MoreVertical size={30} strokeWidth={3} />
          </button>

          {menuOpen && (
            <div
              dir="rtl"
              className="absolute left-0 top-11 w-[220px] overflow-hidden rounded-[18px] border border-gray-100 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.16)]"
            >
              <button
                type="button"
                onClick={() => openEditor("username")}
                className="w-full flex items-center gap-3 px-4 py-4 text-right text-[15px] text-black hover:bg-[#eef7f9] transition-colors"
              >
                <Pencil size={19} className="text-[#236474]" />

                <span>ویرایش نام کاربری</span>
              </button>

              <button
                type="button"
                onClick={() => openEditor("email")}
                className="w-full flex items-center gap-3 border-t border-gray-100 px-4 py-4 text-right text-[15px] text-black hover:bg-[#eef7f9] transition-colors"
              >
                <Mail size={19} className="text-[#236474]" />

                <span>ویرایش ایمیل</span>
              </button>

              <button
                type="button"
                onClick={() => openEditor("password")}
                className="w-full flex items-center gap-3 border-t border-gray-100 px-4 py-4 text-right text-[15px] text-black hover:bg-[#eef7f9] transition-colors"
              >
                <KeyRound size={19} className="text-[#236474]" />

                <span>ویرایش رمز عبور</span>
              </button>
            </div>
          )}
        </div>

        {/* مشخصات کاربر */}
        <div className="pt-6 sm:pt-8 pb-2 flex items-center justify-start gap-3 sm:gap-4">
          <img
            src={avatarSrc}
            alt={username}
            onError={() => setImageError(true)}
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-[3px] border-[#236474] object-cover bg-[#f2f2f2] shrink-0"
          />

          <p className="font-['Poppins',sans-serif] text-xl sm:text-2xl md:text-4xl font-medium text-black tracking-[0.2px] text-left">
            {username}
          </p>
        </div>

        {/* آمار پروفایل */}
        <div className="mt-4 sm:mt-5">
          <div className="border-t border-border">
            <div className="flex items-stretch py-2.5 sm:py-3">
              <div className="flex-1 flex flex-col items-center justify-center gap-1 border-s border-border">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <BookOpen size={13} />

                  <span className="text-xs sm:text-sm md:text-base font-medium text-black">
                    کتاب خوانده شده
                  </span>
                </div>

                <span className="font-bold">{readBooksCount}</span>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-1 border-s border-border">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <Star size={13} />

                  <span className="text-xs sm:text-sm md:text-base font-medium text-black">
                    امتیاز
                  </span>
                </div>

                <span className="font-bold">{score}</span>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-1 border-s border-e border-border">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <PenLine size={13} />

                  <span className="text-xs sm:text-sm md:text-base font-medium text-black">
                    یادداشت
                  </span>
                </div>

                <span className="font-bold">{notesCount}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-border" />
        </div>
      </section>

      {/* مودال ویرایش */}
      {editMode && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/45 px-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeEditor();
            }
          }}
        >
          <form
            onSubmit={handleSubmit}
            dir="rtl"
            className="relative w-full max-w-[440px] rounded-[28px] border-[3px] border-[#236474] bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={closeEditor}
              disabled={isSubmitting}
              className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-black/70 hover:bg-gray-100 hover:text-black disabled:opacity-50"
              aria-label="بستن"
            >
              <X size={23} />
            </button>

            <h2 className="mb-7 text-center font-['Arad:Bold',sans-serif] text-[21px] text-black">
              {modalTitle}
            </h2>

            {editMode === "username" && (
              <div>
                <label className="mb-2 block text-right text-sm font-medium">
                  نام کاربری جدید
                </label>

                <input
                  type="text"
                  value={usernameValue}
                  onChange={(event) => {
                    setUsernameValue(event.target.value);
                    setFormError("");
                  }}
                  className="h-12 w-full rounded-[13px] border border-[#b8b8b8] px-4 text-right outline-none focus:border-[#236474] focus:ring-2 focus:ring-[#236474]/20"
                  autoFocus
                />
              </div>
            )}

            {editMode === "email" && (
              <div>
                <label className="mb-2 block text-right text-sm font-medium">
                  ایمیل جدید
                </label>

                <input
                  type="email"
                  value={emailValue}
                  onChange={(event) => {
                    setEmailValue(event.target.value);
                    setFormError("");
                  }}
                  className="h-12 w-full rounded-[13px] border border-[#b8b8b8] px-4 text-left outline-none focus:border-[#236474] focus:ring-2 focus:ring-[#236474]/20"
                  dir="ltr"
                  autoFocus
                />
              </div>
            )}

            {editMode === "password" && (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-right text-sm font-medium">
                    رمز عبور فعلی
                  </label>

                  <div className="relative">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      value={oldPassword}
                      onChange={(event) => {
                        setOldPassword(event.target.value);
                        setFormError("");
                      }}
                      className="h-12 w-full rounded-[13px] border border-[#b8b8b8] px-4 pl-12 outline-none focus:border-[#236474] focus:ring-2 focus:ring-[#236474]/20"
                      autoFocus
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowOldPassword((previous) => !previous)
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full text-[#236474] hover:bg-[#eef7f9]"
                      aria-label={
                        showOldPassword ? "مخفی کردن رمز" : "نمایش رمز"
                      }
                    >
                      {showOldPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-right text-sm font-medium">
                    رمز عبور جدید
                  </label>

                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(event) => {
                        setNewPassword(event.target.value);
                        setFormError("");
                      }}
                      className="h-12 w-full rounded-[13px] border border-[#b8b8b8] px-4 pl-12 outline-none focus:border-[#236474] focus:ring-2 focus:ring-[#236474]/20"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword((previous) => !previous)
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full text-[#236474] hover:bg-[#eef7f9]"
                      aria-label={
                        showNewPassword ? "مخفی کردن رمز" : "نمایش رمز"
                      }
                    >
                      {showNewPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-right text-sm font-medium">
                    تکرار رمز عبور جدید
                  </label>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        setFormError("");
                      }}
                      className="h-12 w-full rounded-[13px] border border-[#b8b8b8] px-4 pl-12 outline-none focus:border-[#236474] focus:ring-2 focus:ring-[#236474]/20"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((previous) => !previous)
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full text-[#236474] hover:bg-[#eef7f9]"
                      aria-label={
                        showConfirmPassword ? "مخفی کردن رمز" : "نمایش رمز"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {formError && (
              <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-center text-sm text-red-600">
                {formError}
              </p>
            )}

            {successMessage && (
              <p className="mt-4 rounded-xl bg-green-50 px-3 py-2 text-center text-sm text-green-700">
                {successMessage}
              </p>
            )}

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={closeEditor}
                disabled={isSubmitting}
                className="h-11 flex-1 rounded-[12px] border border-[#236474] bg-white text-[#236474] hover:bg-[#eef7f9] disabled:opacity-50"
              >
                انصراف
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 flex-1 rounded-[12px] bg-[#4499AF] text-white hover:bg-[#367f92] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
