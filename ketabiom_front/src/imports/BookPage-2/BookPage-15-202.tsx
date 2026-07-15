import svgPaths from "./svg-vov93fdi2z";
import imgLogo1 from "./50a9a903443c3aef8e8e8ce55688630c424280c1.png";
import React from "react";
function Btn() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="btn1"
    >
      <div
        className="bg-[#4499af] col-1 h-[40px] ml-0 mt-0 relative rounded-[12px] row-1 w-[200px]"
        data-name="btn1"
      />
      <p
        className="[word-break:break-word] col-1 font-['Arad:Medium',sans-serif] h-[27px] leading-[normal] ml-0 mt-[6px] not-italic relative row-1 text-[20px] text-center text-white w-[186px]"
        dir="auto"
      >
        افزودن به کتابخانه
      </p>
    </div>
  );
}

function Btn1() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="btn2"
    >
      <div
        className="bg-[#4499af] col-1 h-[40px] ml-0 mt-0 relative rounded-[12px] row-1 w-[200px]"
        data-name="btn2"
      />
      <p
        className="[word-break:break-word] col-1 font-['Arad:Medium',sans-serif] h-[27px] leading-[normal] ml-0 mt-[6px] not-italic relative row-1 text-[20px] text-center text-white w-[186px]"
        dir="auto"
      >
        افزودن یادداشت
      </p>
    </div>
  );
}

function Btn2() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="btn3"
    >
      <div
        className="bg-[#4499af] col-1 h-[40px] ml-0 mt-0 relative rounded-[12px] row-1 w-[200px]"
        data-name="btn2"
      />
      <p
        className="[word-break:break-word] col-1 font-['Arad:Medium',sans-serif] h-[27px] leading-[normal] ml-0 mt-[6.35px] not-italic relative row-1 text-[20px] text-center text-white w-[200px]"
        dir="auto"
      >
        افزودن بریده کتاب
      </p>
    </div>
  );
}

function BookInfo() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[22px] h-[347.294px] items-center justify-center left-[789px] top-[204px] w-[200px]"
      data-name="book_info"
    >
      <p
        className="[word-break:break-word] font-['Arad:Bold',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[30px] text-black text-right w-[min-content]"
        dir="auto"
      >{`عنوان کتاب `}</p>
      <p
        className="[word-break:break-word] font-['Arad:Medium',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#3d3d3d] text-[25px] text-right w-[min-content]"
        dir="auto"
      >
        نویسنده کتاب
      </p>
      <p
        className="[word-break:break-word] font-['Arad:Medium',sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[0px] text-black text-right w-[min-content]"
        dir="auto"
      >
        <span className="leading-[normal] text-[22px]">امتیاز :</span>
        <span className="font-['AradFD:Medium',sans-serif] leading-[normal] text-[22px]">{` 3.5`}</span>
      </p>
      <Btn />
      <Btn1 />
      <Btn2 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[789px] top-[193px]">
      <div
        className="absolute bg-[#eaeaea] h-[369px] left-[1054px] rounded-[30px] top-[193px] w-[260px]"
        data-name="image"
      />
      <BookInfo />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute contents left-0 top-[-2px]" data-name="header">
      <div
        className="absolute bg-[#fafafa] h-[100px] left-0 shadow-[0px_1px_8px_0px_#236474] top-0 w-[1440px]"
        data-name="header"
      />
      <div
        className="-translate-y-1/2 absolute aspect-[20.249996185302734/16.642120361328125] left-[93.4%] right-[4.03%] top-[calc(50%-595.5px)]"
        data-name="Vector"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 37 30"
        >
          <path
            d={svgPaths.p33639e80}
            fill="var(--fill-0, #236474)"
            id="Vector"
          />
        </svg>
      </div>
      <div className="-translate-x-1/2 absolute bg-[#ebf5f7] h-[50px] left-[calc(50%-0.5px)] rounded-[74px] shadow-[0px_1px_3px_1px_#236474] top-[25px] w-[753px]" />
      <p
        className="-translate-x-full [word-break:break-word] absolute font-['Arad:Medium',sans-serif] leading-[normal] left-[1033px] not-italic text-[#4499af] text-[21px] text-right top-[35px] whitespace-nowrap"
        dir="auto"
      >
        جستجو
      </p>
      <div
        className="-translate-y-1/2 absolute aspect-[20.616125106811523/20.61614990234375] left-[73.06%] right-[25.42%] top-[calc(50%-595.5px)]"
        data-name="Vector"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 22 22"
        >
          <path
            clipRule="evenodd"
            d={svgPaths.p228bc000}
            fill="var(--fill-0, #4499AF)"
            fillRule="evenodd"
            id="Vector"
          />
        </svg>
      </div>
      <div
        className="absolute h-[91px] left-[32px] top-[-2px] w-[137px]"
        data-name="logo 1"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgLogo1}
        />
      </div>
      <p
        className="-translate-x-full [word-break:break-word] absolute font-['B_Esfehan:Bold',sans-serif] leading-[normal] left-[134px] not-italic text-[#236474] text-[20px] text-right top-[68px] whitespace-nowrap"
        dir="auto"
      >
        کتابیوم
      </p>
    </div>
  );
}

function Component() {
  return (
    <div
      className="[word-break:break-word] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] not-italic place-items-start relative shrink-0 text-right whitespace-nowrap"
      data-name="سال انتشار"
    >
      <p
        className="col-1 font-['Arad:Medium',sans-serif] ml-0 mt-0 relative row-1 text-[#3d3d3d] text-[0px]"
        dir="auto"
      >
        <span className="leading-[normal] text-[18px]">سال</span>
        <span className="leading-[normal] text-[18px] tracking-[-1.8px]">{` `}</span>
        <span className="leading-[normal] text-[18px]">انتشار</span>
      </p>
      <p
        className="col-1 font-['AradFD:SemiBold',sans-serif] leading-[normal] ml-[20px] mt-[29px] relative row-1 text-[20px] text-black"
        dir="auto"
      >
        1398
      </p>
    </div>
  );
}

function Component1() {
  return (
    <div
      className="[word-break:break-word] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] not-italic place-items-start relative shrink-0 text-right whitespace-nowrap"
      data-name="تعداد صفحه"
    >
      <p
        className="col-1 font-['Arad:Medium',sans-serif] ml-0 mt-0 relative row-1 text-[#3d3d3d] text-[0px]"
        dir="auto"
      >
        <span className="leading-[normal] text-[18px]">تعداد</span>
        <span className="leading-[normal] text-[18px] tracking-[-3.06px]">{` `}</span>
        <span className="leading-[normal] text-[18px]">صفحه</span>
        <span className="leading-[normal] text-[18px] tracking-[-3.6px]">{` `}</span>
        <span className="leading-[normal] text-[18px]">ها</span>
      </p>
      <p
        className="col-1 font-['AradFD:SemiBold',sans-serif] leading-[normal] ml-[42px] mt-[31px] relative row-1 text-[20px] text-black"
        dir="auto"
      >
        112
      </p>
    </div>
  );
}

function Component2() {
  return (
    <div
      className="[word-break:break-word] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] not-italic place-items-start relative shrink-0 text-right whitespace-nowrap"
      data-name="ناشر"
    >
      <p
        className="col-1 font-['Arad:Medium',sans-serif] leading-[normal] ml-[16px] mt-0 relative row-1 text-[#3d3d3d] text-[18px]"
        dir="auto"
      >
        ناشر
      </p>
      <p
        className="col-1 font-['Arad:SemiBold',sans-serif] leading-[normal] ml-0 mt-[35px] relative row-1 text-[20px] text-black"
        dir="auto"
      >
        امیرکبیر
      </p>
    </div>
  );
}

function Component3() {
  return (
    <div
      className="[word-break:break-word] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] not-italic place-items-start relative shrink-0 text-right whitespace-nowrap"
      data-name="دسته بندی"
    >
      <p
        className="col-1 font-['Arad:Bold',sans-serif] ml-0 mt-0 relative row-1 text-[#3d3d3d] text-[0px]"
        dir="auto"
      >
        <span className="font-['Arad:Medium',sans-serif] leading-[normal] text-[18px]">
          دسته
        </span>
        <span className="font-['Arad:Medium',sans-serif] leading-[normal] text-[18px] tracking-[-3.24px]">{` `}</span>
        <span className="font-['Arad:Medium',sans-serif] leading-[normal] text-[18px]">
          بندی
        </span>
      </p>
      <p
        className="col-1 font-['Arad:SemiBold',sans-serif] leading-[normal] ml-[8px] mt-[35px] relative row-1 text-[20px] text-black"
        dir="auto"
      >
        خاطرات
      </p>
    </div>
  );
}

function Info() {
  return (
    <div
      className="-translate-x-1/2 absolute content-stretch flex gap-[33px] items-center justify-center left-[calc(50%-267px)] top-[212px]"
      data-name="info 2"
    >
      <Component />
      <div className="flex h-[62px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[62px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 62 1"
              >
                <line
                  id="Line 3"
                  stroke="var(--stroke-0, black)"
                  x2="62"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Component1 />
      <div className="flex h-[62px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[62px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 62 1"
              >
                <line
                  id="Line 3"
                  stroke="var(--stroke-0, black)"
                  x2="62"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Component2 />
      <div className="flex h-[62px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[62px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 62 1"
              >
                <line
                  id="Line 3"
                  stroke="var(--stroke-0, black)"
                  x2="62"
                  y1="0.5"
                  y2="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Component3 />
    </div>
  );
}

function Component4() {
  return (
    <div
      className="[word-break:break-word] absolute contents left-[199px] not-italic text-black text-right top-[306px]"
      data-name="توضیحات"
    >
      <p
        className="-translate-x-full absolute font-['Arad:Bold',sans-serif] h-[27px] leading-[normal] left-[716px] text-[20px] top-[306px] w-[91px]"
        dir="auto"
      >
        توضیحات
      </p>
      <p
        className="-translate-x-full absolute font-['Arad:Medium',sans-serif] h-[212px] leading-[23px] left-[709px] text-[16px] top-[350px] tracking-[-0.64px] w-[510px] whitespace-pre-wrap"
        dir="auto"
      >{`داستان شازده کوچولو با زبانی تلخ و گزنده نوشته شده و در واقع یک خلبان خاطرات خود را به یاد دوست کوچکش، شازده کوچولو نوشته است. تخیل در داستان بسیار زیاد است و منطق داستان براساس تخیل کودکان پیش می‌رود، نه واقع‌گرایی بی‌نقص بزرگسالان.  در داستان شازده کوچولو، راوی ـ خلبان ـ می‌گوید در صحرا کنار هواپیمای سقوط‌کرده‌اش گیر افتاده بود. این قضیه به تجربه‌ی خود اگزوپری برمی‌گردد که در کتاب خاطراتش آن را نوشته است. هواپیمایش در عملیاتی سقوط کرد و به مدت سه روز در صحرا گرفتار بود؛ در حالی که مقدار آبی که داشت همان روز اول تمام شده بود. روز سوم شروع به دیدن سراب کرد و سرانجام یک بادیه‌نشین آن‌ها را پیدا کرد و جانشان را نجات داد. بسیاری از منتقدان گفته‌اند گل رز محبوب شازده کوچولو که بسیار مهربان بود؛ از همسر سنت اگزوپری الهام گرفته شده است.`}</p>
    </div>
  );
}

function ProfilePhoto() {
  return (
    <div
      className="absolute left-[1233.21px] size-[52.241px] top-[681.88px]"
      data-name="profile_photo"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 52.2414 52.2414"
      >
        <g id="profile_photo">
          <ellipse
            cx="26.1207"
            cy="26.1207"
            fill="var(--fill-0, #236474)"
            id="Ellipse 3"
            rx="26.1207"
            ry="26.1207"
          />
          <ellipse
            cx="26.1207"
            cy="26.121"
            fill="var(--fill-0, #EAEAEA)"
            id="Ellipse 4"
            rx="22.3892"
            ry="22.3892"
          />
        </g>
      </svg>
    </div>
  );
}

function UserInfo() {
  return (
    <div
      className="absolute contents left-[1131.86px] top-[681.88px]"
      data-name="user_info"
    >
      <ProfilePhoto />
      <p
        className="-translate-x-full [word-break:break-word] absolute font-['Arad:Medium',sans-serif] h-[34.479px] leading-[normal] left-[1224.85px] not-italic text-[25px] text-black text-right top-[690.24px] tracking-[-1.25px] w-[92.99px]"
        dir="auto"
      >
        نام کاربری
      </p>
    </div>
  );
}

function Component7() {
  return (
    <div
      className="absolute contents left-[790px] top-[668px]"
      data-name="یادداشت1"
    >
      <div className="-translate-x-1/2 absolute bg-[#eaeaea] h-[186px] left-[calc(50%+332px)] rounded-[10px] top-[668px] w-[524px]" />
      <p
        className="-translate-x-full [word-break:break-word] absolute font-['Arad:Regular',sans-serif] h-[92px] leading-[normal] left-[1298.34px] not-italic text-[20px] text-black text-right top-[748px] w-[492.342px]"
        dir="auto"
      >
        شازده کوچولو:آدمها میچیند توی قطارهای تندرو اما نمیدانند دنبال چه
        میگردند.این است که بنا میکنند دور خودشان چرخک زدن ..
      </p>
      <UserInfo />
    </div>
  );
}

function Component6() {
  return (
    <div
      className="absolute contents left-[790px] top-[668px]"
      data-name="یادداشت 1"
    >
      <Component7 />
    </div>
  );
}

function ProfilePhoto1() {
  return (
    <div
      className="absolute left-[626.21px] size-[52.241px] top-[681.88px]"
      data-name="profile_photo"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 52.2414 52.2414"
      >
        <g id="profile_photo">
          <ellipse
            cx="26.1207"
            cy="26.1207"
            fill="var(--fill-0, #236474)"
            id="Ellipse 3"
            rx="26.1207"
            ry="26.1207"
          />
          <ellipse
            cx="26.1207"
            cy="26.1207"
            fill="var(--fill-0, #EAEAEA)"
            id="Ellipse 4"
            rx="22.3892"
            ry="22.3892"
          />
        </g>
      </svg>
    </div>
  );
}

function UserInfo1() {
  return (
    <div
      className="absolute contents left-[524.86px] top-[681.88px]"
      data-name="user_info"
    >
      <ProfilePhoto1 />
      <p
        className="-translate-x-full [word-break:break-word] absolute font-['Arad:Medium',sans-serif] h-[34.479px] leading-[normal] left-[617.85px] not-italic text-[25px] text-black text-right top-[690.24px] tracking-[-1.25px] w-[92.99px]"
        dir="auto"
      >
        نام کاربری
      </p>
    </div>
  );
}

function Component8() {
  return (
    <div
      className="absolute contents left-[183px] top-[668px]"
      data-name="یادداشت 2"
    >
      <div className="-translate-x-1/2 absolute bg-[#eaeaea] h-[206px] left-[calc(50%-275px)] rounded-[10px] top-[668px] w-[524px]" />
      <div className="-translate-x-full [word-break:break-word] absolute font-['Arad:Regular',sans-serif] h-[92px] leading-[0] left-[691.34px] not-italic text-[20px] text-black text-right top-[750px] w-[492.342px]">
        <p className="leading-[normal] mb-0" dir="auto">
          از آن دسته کتابهایی است که محدودیت زمانی ندارد!
        </p>
        <p className="leading-[normal] mb-0" dir="auto">
          در هر دورهای جذاب است!
        </p>
        <p className="leading-[normal]" dir="auto">
          چقدر ترجمه احمد شاملو روان بود! در دوره ما کتابهای زیادی با ترجمه
          شاملو منتشر میشد. برخی ...
        </p>
      </div>
      <UserInfo1 />
    </div>
  );
}

function Component5() {
  return (
    <div
      className="absolute contents left-[183px] top-[620px]"
      data-name="یادداشت ها"
    >
      <p
        className="-translate-x-1/2 [word-break:break-word] absolute font-['Arad:Bold',sans-serif] leading-[normal] left-[1265.5px] not-italic text-[20px] text-black text-center top-[620px] whitespace-nowrap"
        dir="auto"
      >
        یادداشت ها
      </p>
      <Component6 />
      <Component8 />
    </div>
  );
}

function ProfilePhoto2() {
  return (
    <div
      className="absolute left-[1233.21px] size-[52.241px] top-[967.88px]"
      data-name="profile_photo"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 52.2414 52.2414"
      >
        <g id="profile_photo">
          <ellipse
            cx="26.1207"
            cy="26.1207"
            fill="var(--fill-0, #236474)"
            id="Ellipse 3"
            rx="26.1207"
            ry="26.1207"
          />
          <ellipse
            cx="26.1207"
            cy="26.121"
            fill="var(--fill-0, #EAEAEA)"
            id="Ellipse 4"
            rx="22.3892"
            ry="22.3892"
          />
        </g>
      </svg>
    </div>
  );
}

function UserInfo2() {
  return (
    <div
      className="absolute contents left-[1131.86px] top-[967.88px]"
      data-name="user_info"
    >
      <ProfilePhoto2 />
      <p
        className="-translate-x-full [word-break:break-word] absolute font-['Arad:Medium',sans-serif] h-[34.479px] leading-[normal] left-[1224.85px] not-italic text-[25px] text-black text-right top-[976.24px] tracking-[-1.25px] w-[92.99px]"
        dir="auto"
      >
        نام کاربری
      </p>
    </div>
  );
}

function Component11() {
  return (
    <div
      className="absolute contents left-[790px] top-[954px]"
      data-name="یادداشت1"
    >
      <div className="-translate-x-1/2 absolute bg-[#eaeaea] h-[186px] left-[calc(50%+332px)] rounded-[10px] top-[954px] w-[524px]" />
      <div className="-translate-x-full [word-break:break-word] absolute font-['Arad:Regular',sans-serif] h-[92px] leading-[0] left-[1298.34px] not-italic text-[20px] text-black text-right top-[1034px] w-[492.342px]">
        <p className="leading-[normal] mb-0" dir="auto">
          حيرت زده گفت: چى؟ تواز اسمان افتاده ای؟
        </p>
        <p className="leading-[normal] mb-0" dir="auto">
          با فروتنی گفتم :آره
        </p>
        <p className="leading-[normal]" dir="auto">
          گفت:اوه،این دیگر خیلی عجيب است!
        </p>
      </div>
      <UserInfo2 />
    </div>
  );
}

function Component10() {
  return (
    <div
      className="absolute contents left-[790px] top-[954px]"
      data-name="یادداشت 1"
    >
      <Component11 />
    </div>
  );
}

function ProfilePhoto3() {
  return (
    <div
      className="absolute left-[642.21px] size-[52.241px] top-[967.88px]"
      data-name="profile_photo"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 52.2414 52.2414"
      >
        <g id="profile_photo">
          <ellipse
            cx="26.1207"
            cy="26.1207"
            fill="var(--fill-0, #236474)"
            id="Ellipse 3"
            rx="26.1207"
            ry="26.1207"
          />
          <ellipse
            cx="26.1207"
            cy="26.1207"
            fill="var(--fill-0, #EAEAEA)"
            id="Ellipse 4"
            rx="22.3892"
            ry="22.3892"
          />
        </g>
      </svg>
    </div>
  );
}

function UserInfo3() {
  return (
    <div
      className="absolute contents left-[540.86px] top-[967.88px]"
      data-name="user_info"
    >
      <ProfilePhoto3 />
      <p
        className="-translate-x-full [word-break:break-word] absolute font-['Arad:Medium',sans-serif] h-[34.479px] leading-[normal] left-[633.85px] not-italic text-[25px] text-black text-right top-[976.24px] tracking-[-1.25px] w-[92.99px]"
        dir="auto"
      >
        نام کاربری
      </p>
    </div>
  );
}

function Component12() {
  return (
    <div
      className="absolute contents left-[199px] top-[954px]"
      data-name="یادداشت 2"
    >
      <div className="-translate-x-1/2 absolute bg-[#eaeaea] h-[206px] left-[calc(50%-259px)] rounded-[10px] top-[954px] w-[524px]" />
      <p
        className="-translate-x-full [word-break:break-word] absolute font-['Arad:Regular',sans-serif] h-[92px] leading-[normal] left-[707.34px] not-italic text-[20px] text-black text-right top-[1036px] w-[492.342px]"
        dir="auto"
      >
        آنچه که میتوانم ببینم چیزی جز یک پوسته‌ی ظاهری نیست.مهم‌ترین چیزهارا
        نمیشود با چشم دید... چون چشم‌ها قادر به دیدن نیستند،آدم ها باید با
        قلبشان ببینند...
      </p>
      <UserInfo3 />
    </div>
  );
}

function Component9() {
  return (
    <div
      className="absolute contents left-[199px] top-[906px]"
      data-name="یادداشت ها"
    >
      <p
        className="-translate-x-1/2 [word-break:break-word] absolute font-['Arad:Bold',sans-serif] leading-[normal] left-[1265px] not-italic text-[20px] text-black text-center top-[906px] whitespace-nowrap"
        dir="auto"
      >
        بریدۀ کتاب‌
      </p>
      <Component10 />
      <Component12 />
    </div>
  );
}

export default function BookPage() {
  return (
    <div className="bg-[#fafafa] relative size-full" data-name="book_page">
      <Group />
      <Header />
      <Info />
      <Component4 />
      <Component5 />
      <Component9 />
    </div>
  );
}
