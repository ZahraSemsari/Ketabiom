import React from "react";
import svgPaths from "./svg-245haf1nzk";

function BgPattern() {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 absolute h-[1523px] left-[calc(50%+51px)] top-[calc(50%-35.5px)] w-[1936px]"
      data-name="bg_pattern"
    >
      <div className="absolute inset-[-32.83%_-25.83%]">
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

function Top() {
  return (
    <div
      className="content-stretch flex gap-[16px] items-center justify-end relative shrink-0 w-[355px]"
      data-name="top"
    >
      <div className="[word-break:break-word] flex flex-col font-['Arad:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[27px] text-black text-right w-[238px]">
        {/* <p className="leading-[normal]" dir="auto"> */}
        <p className="leading-[normal]" dir="auto">
          ثبت نام
        </p>
      </div>
      <div className="h-[26px] relative shrink-0 w-[31px]" data-name="Vector">
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
      </div>
    </div>
  );
}

function UserName() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="User_name"
    >
      <div
        className="bg-[#fafafa] border border-[#6e2948] border-solid col-1 h-[50px] ml-0 mt-[36px] relative rounded-[15px] row-1 w-[355px]"
        data-name="user_name"
      />
      <div className="[word-break:break-word] col-1 flex flex-col font-['Arad:Medium',sans-serif] justify-center ml-[283px] mt-0 not-italic relative row-1 text-[18px] text-black text-right whitespace-nowrap">
        <p className="leading-[normal]" dir="auto">
          نام کاربری
        </p>
      </div>
      <div className="[word-break:break-word] col-1 flex flex-col font-['Arad:Medium',sans-serif] justify-center ml-[261px] mt-[51px] not-italic relative row-1 text-[18px] text-[rgba(0,0,0,0.4)] text-right whitespace-nowrap">
        <p className="leading-[normal]" dir="auto">{`نام کاربری `}</p>
      </div>
    </div>
  );
}

function UserName1() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="User_name"
    >
      <div
        className="bg-[#fafafa] border border-[#6e2948] border-solid col-1 h-[50px] ml-0 mt-[36px] relative rounded-[15px] row-1 w-[355px]"
        data-name="user_name"
      />
      <div className="[word-break:break-word] col-1 flex flex-col font-['Arad:Medium',sans-serif] justify-center ml-[312px] mt-0 not-italic relative row-1 text-[18px] text-black text-right whitespace-nowrap">
        <p className="leading-[normal]" dir="auto">
          ایمیل
        </p>
      </div>
      <div className="[word-break:break-word] col-1 flex flex-col font-['Arad:Medium',sans-serif] justify-center ml-[290px] mt-[51px] not-italic relative row-1 text-[18px] text-[rgba(0,0,0,0.4)] text-right whitespace-nowrap">
        <p className="leading-[normal]" dir="auto">
          ایمیل
        </p>
      </div>
    </div>
  );
}

function Password() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="password"
    >
      <div
        className="bg-[#fafafa] border border-[#6e2948] border-solid col-1 h-[50px] ml-0 mt-[36px] relative rounded-[15px] row-1 w-[355px]"
        data-name="password"
      />
      <div className="[word-break:break-word] col-1 flex flex-col font-['Arad:Medium',sans-serif] justify-center ml-[296px] mt-0 not-italic relative row-1 text-[18px] text-black text-right whitespace-nowrap">
        <p className="leading-[normal]" dir="auto">{`رمز عبور `}</p>
      </div>
      <div className="[word-break:break-word] col-1 flex flex-col font-['Arad:Medium',sans-serif] justify-center ml-[275px] mt-[51px] not-italic relative row-1 text-[18px] text-[rgba(0,0,0,0.4)] text-right whitespace-nowrap">
        <p className="leading-[normal]" dir="auto">
          رمز عبور
        </p>
      </div>
    </div>
  );
}

function Password1() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="password"
    >
      <div
        className="bg-[#fafafa] border border-[#6e2948] border-solid col-1 h-[50px] ml-0 mt-[36px] relative rounded-[15px] row-1 w-[355px]"
        data-name="password"
      />
      <div className="[word-break:break-word] col-1 flex flex-col font-['Arad:Medium',sans-serif] justify-center ml-[260px] mt-0 not-italic relative row-1 text-[18px] text-black text-right whitespace-nowrap">
        <p className="leading-[normal]" dir="auto">
          تکرار رمز عبور
        </p>
      </div>
      <div className="[word-break:break-word] col-1 flex flex-col font-['Arad:Medium',sans-serif] justify-center ml-[275px] mt-[51px] not-italic relative row-1 text-[18px] text-[rgba(0,0,0,0.4)] text-right whitespace-nowrap">
        <p className="leading-[normal]" dir="auto">
          رمز عبور
        </p>
      </div>
    </div>
  );
}

function EnterBtn() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="enter_btn"
    >
      <div
        className="bg-[#ba3873] border border-[rgba(110,41,72,0.88)] border-solid col-1 h-[50px] ml-0 mt-0 relative rounded-[15px] row-1 shadow-[0px_5px_5px_0px_rgba(0,0,0,0.25)] w-[355px]"
        data-name="user_name"
      />
      <div className="[word-break:break-word] col-1 flex flex-col font-['Arad:SemiBold',sans-serif] justify-center ml-[139px] mt-[9px] not-italic relative row-1 text-[25px] text-right text-white whitespace-nowrap">
        <p className="leading-[normal]" dir="auto">
          ثبت نام
        </p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[24px] h-[620px] items-center justify-center left-1/2 top-[calc(50%+10px)] w-[500px]">
      <Top />
      <UserName />
      <UserName1 />
      <Password />
      <Password1 />
      <EnterBtn />
    </div>
  );
}

export default function Register() {
  return (
    <div className="bg-[#fafafa] relative size-full" data-name="Register">
      <BgPattern />
      <div
        className="-translate-x-1/2 -translate-y-1/2 absolute bg-white border-4 border-[#6e2948] border-solid h-[620px] left-1/2 rounded-[50px] top-[calc(50%+10px)] w-[500px]"
        data-name="box"
      />
      <Frame />
    </div>
  );
}
