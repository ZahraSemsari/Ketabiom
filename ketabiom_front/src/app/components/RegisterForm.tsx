// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import svgPaths from "../../imports/Register/svg-245haf1nzk";
// import React from "react";

// interface FormData {
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// function BgPattern() {
//   return (
//     <div
//       className="absolute inset-0 overflow-hidden pointer-events-none"
//       data-name="bg_pattern"
//     >
//       <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-[150vw] h-[150vh] min-w-[1000px] min-h-[1000px]">
//         <svg
//           className="block size-full"
//           fill="none"
//           preserveAspectRatio="none"
//           viewBox="0 0 2936 2523"
//         >
//           <g id="bg_pattern">
//             <g filter="url(#filter0_f_1_43)" id="Ellipse 1">
//               <ellipse
//                 cx="2083"
//                 cy="852.5"
//                 fill="var(--fill-0, #BA3873)"
//                 fillOpacity="0.15"
//                 rx="353"
//                 ry="352.5"
//               />
//             </g>
//             <g filter="url(#filter1_f_1_43)" id="Ellipse 2">
//               <ellipse
//                 cx="665"
//                 cy="1846.5"
//                 fill="var(--fill-0, #BA3873)"
//                 fillOpacity="0.31"
//                 rx="165"
//                 ry="176.5"
//               />
//             </g>
//           </g>
//           <defs>
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
//               <feGaussianBlur
//                 result="effect1_foregroundBlur_1_43"
//                 stdDeviation="250"
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
//               <feGaussianBlur
//                 result="effect1_foregroundBlur_1_43"
//                 stdDeviation="250"
//               />
//             </filter>
//           </defs>
//         </svg>
//       </div>
//     </div>
//   );
// }

// function Top({ onBack }: { onBack?: () => void }) {
//   return (
//     <div
//       className="content-stretch flex gap-3 items-center justify-end relative shrink-0 w-full px-4 mb-4"
//       data-name="top"
//     >
//       <div className="[word-break:break-word] flex flex-col font-['Arad:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-xl sm:text-2xl text-black text-right">
//         <p className="leading-[normal]" dir="auto">
//           ثبت نام
//         </p>
//       </div>
//       <button
//         type="button"
//         onClick={onBack}
//         className="h-5 sm:h-6 relative shrink-0 w-6 sm:w-7 cursor-pointer transition-transform hover:scale-110 active:scale-95"
//         data-name="Vector"
//         aria-label="بازگشت"
//       >
//         <svg
//           className="absolute block inset-0 size-full"
//           fill="none"
//           preserveAspectRatio="none"
//           viewBox="0 0 31 26"
//         >
//           <path
//             d={svgPaths.p1e010800}
//             fill="var(--fill-0, black)"
//             id="Vector"
//           />
//         </svg>
//       </button>
//     </div>
//   );
// }

// interface InputFieldProps {
//   label: string;
//   placeholder: string;
//   type?: string;
//   error?: string;
//   register: any;
//   name: string;
// }

// function InputField({
//   label,
//   placeholder,
//   type = "text",
//   error,
//   register,
//   name,
// }: InputFieldProps) {
//   return (
//     <div className="w-full px-4 relative mb-2">
//       <div className="relative mt-6">
//         <div
//           className={`bg-[#fafafa] border ${
//             error ? "border-red-500" : "border-[#6e2948]"
//           } border-solid h-11 sm:h-12 relative rounded-xl w-full`}
//         >
//           <input
//             type={type}
//             {...register(name)}
//             className="w-full h-full bg-transparent border-none outline-none pr-3 pl-3 text-right font-['Arad:Medium',sans-serif] text-sm sm:text-base text-black"
//             dir="rtl"
//           />
//         </div>
//         <div className="absolute -top-3 right-3 bg-white px-2 py-1">
//           <p
//             className="font-['Arad:Medium',sans-serif] text-sm sm:text-base text-black"
//             dir="auto"
//           >
//             {label}
//           </p>
//         </div>
//       </div>
//       {error && (
//         <div className="mt-2 text-red-500 text-xs sm:text-sm font-['Arad:Medium',sans-serif] text-right px-1">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// }

// export default function RegisterForm() {
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<FormData>();

//   const password = watch("password");

//   const onSubmit = (data: FormData) => {
//     console.log("Form submitted:", data);
//     setIsSubmitted(true);
//     setTimeout(() => setIsSubmitted(false), 2000);
//   };

//   const handleBack = () => {
//     console.log("Back button clicked");
//   };

//   return (
//     <div
//       className="bg-[#fafafa] relative size-full min-h-screen flex items-center justify-center p-4 sm:p-6"
//       data-name="Register"
//     >
//       <BgPattern />

//       <div className="relative w-full max-w-md">
//         <div
//           className="bg-white border-2 sm:border-4 border-[#6e2948] border-solid rounded-3xl sm:rounded-[50px] py-8 sm:py-10 px-2"
//           data-name="box"
//         >
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="flex flex-col gap-5 sm:gap-6"
//           >
//             <Top onBack={handleBack} />

//             <InputField
//               label="نام کاربری"
//               placeholder="نام کاربری"
//               name="username"
//               register={register}
//               error={errors.username?.message}
//             />

//             <InputField
//               label="ایمیل"
//               placeholder="ایمیل"
//               type="email"
//               name="email"
//               register={register}
//               error={errors.email?.message}
//             />

//             <InputField
//               label="رمز عبور"
//               placeholder="رمز عبور"
//               type="password"
//               name="password"
//               register={register}
//               error={errors.password?.message}
//             />

//             <InputField
//               label="تکرار رمز عبور"
//               placeholder="رمز عبور"
//               type="password"
//               name="confirmPassword"
//               register={register}
//               error={errors.confirmPassword?.message}
//             />

//             <div className="w-full px-4 mt-4">
//               <button
//                 type="submit"
//                 className={`${
//                   isSubmitted ? "bg-green-600" : "bg-[#ba3873]"
//                 } border border-[rgba(110,41,72,0.88)] border-solid h-11 sm:h-12 w-full rounded-xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer`}
//               >
//                 <span className="font-['Arad:SemiBold',sans-serif] text-lg sm:text-xl text-white">
//                   {isSubmitted ? "✓ ثبت شد" : "ثبت نام"}
//                 </span>
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useForm } from "react-hook-form";
import svgPaths from "../../imports/Register/svg-245haf1nzk";
import React from "react";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function BgPattern() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      data-name="bg_pattern"
    >
      <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-[140vw] h-[140vh] min-w-[900px] min-h-[900px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 2936 2523"
        >
          <g id="bg_pattern">
            <g filter="url(#filter0_f_1_43)" id="Ellipse 1">
              <ellipse
                cx="2083"
                cy="852.5"
                fill="var(--fill-0, #BA3873)"
                fillOpacity="0.15"
                rx="353"
                ry="352.5"
              />
            </g>
            <g filter="url(#filter1_f_1_43)" id="Ellipse 2">
              <ellipse
                cx="665"
                cy="1846.5"
                fill="var(--fill-0, #BA3873)"
                fillOpacity="0.31"
                rx="165"
                ry="176.5"
              />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="1705"
              id="filter0_f_1_43"
              width="1706"
              x="1230"
              y="0"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feGaussianBlur
                result="effect1_foregroundBlur_1_43"
                stdDeviation="250"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="1353"
              id="filter1_f_1_43"
              width="1330"
              x="0"
              y="1170"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
                result="shape"
              />
              <feGaussianBlur
                result="effect1_foregroundBlur_1_43"
                stdDeviation="250"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Top({ onBack }: { onBack?: () => void }) {
  return (
    <div
      className="flex gap-2 items-center justify-end relative w-full px-3 mb-2"
      data-name="top"
    >
      <div className="font-['Arad:SemiBold',sans-serif] text-lg sm:text-xl text-black text-right">
        <p className="leading-normal" dir="auto">
          ثبت نام
        </p>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="h-5 w-5 sm:h-6 sm:w-6 relative cursor-pointer transition-transform hover:scale-110 active:scale-95"
        data-name="Vector"
        aria-label="بازگشت"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 31 26"
        >
          <path
            d={svgPaths.p1e010800}
            fill="var(--fill-0, black)"
            id="Vector"
          />
        </svg>
      </button>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  error?: string;
  register: any;
  name: string;
}

function InputField({
  label,
  placeholder,
  type = "text",
  error,
  register,
  name,
}: InputFieldProps) {
  return (
    <div className="w-full px-3 relative">
      <div className="relative mt-4">
        <div
          className={`bg-[#fafafa] border ${
            error ? "border-red-500" : "border-[#6e2948]"
          } h-10 sm:h-11 rounded-lg w-full`}
        >
          <input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            className="w-full h-full bg-transparent border-none outline-none pr-3 pl-3 text-right font-['Arad:Medium',sans-serif] text-sm text-black"
            dir="rtl"
          />
        </div>

        {/* ch */}
        <div className="absolute -top-7 right-0 bg-white px-2">
          <p
            className="font-['Arad:Medium',sans-serif] text-xs sm:text-sm text-black"
            dir="auto"
          >
            {label}
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-1 text-red-500 text-[11px] sm:text-xs font-['Arad:Medium',sans-serif] text-right px-1">
          {error}
        </div>
      )}
    </div>
  );
}

export default function RegisterForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const password = watch("password");

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 2000);
  };

  const handleBack = () => {
    console.log("Back button clicked");
  };

  return (
    <div
      className="bg-[#fafafa] relative h-screen overflow-hidden flex items-center justify-center px-4 py-10 sm:py-14"
      data-name="Register"
    >
      <BgPattern />

      <div className="relative w-full max-w-[290px] sm:max-w-[320px] md:max-w-[340px]">
        <div
          className="bg-white border-2 sm:border-[3px] border-[#6e2948] border-solid rounded-[24px] sm:rounded-[30px] px-2 py-5 sm:py-6 shadow-sm"
          data-name="box"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 sm:gap-4"
          >
            <Top onBack={handleBack} />

            <InputField
              label="نام کاربری"
              placeholder="نام کاربری"
              name="username"
              register={register}
              error={errors.username?.message}
            />

            <InputField
              label="ایمیل"
              placeholder="ایمیل"
              type="email"
              name="email"
              register={register}
              error={errors.email?.message}
            />

            <InputField
              label="رمز عبور"
              placeholder="رمز عبور"
              type="password"
              name="password"
              register={register}
              error={errors.password?.message}
            />

            <InputField
              label="تکرار رمز عبور"
              placeholder="تکرار رمز عبور"
              type="password"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword?.message}
            />

            <div className="w-full px-3 mt-2">
              <button
                type="submit"
                className={`${
                  isSubmitted ? "bg-green-600" : "bg-[#ba3873]"
                } border border-[rgba(110,41,72,0.88)] h-10 sm:h-11 w-full rounded-lg shadow-[0px_4px_10px_rgba(0,0,0,0.15)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer`}
              >
                <span className="font-['Arad:SemiBold',sans-serif] text-base sm:text-lg text-white">
                  {isSubmitted ? "✓ ثبت شد" : "ثبت نام"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
