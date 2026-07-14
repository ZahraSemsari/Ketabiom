import React from "react";
import { Link } from "react-router-dom";
import { Users, Star } from "lucide-react";
import heroImage from "../../imports/HomePage-1/HomePageImg.png";

/* ===========================
      Floating Decorations
=========================== */

function FloatingDot({ size, color, className }) {
  return (
    <span
      className={`absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
      }}
    />
  );
}

function Feature({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center">
        <Icon className="w-6 h-6 text-teal-600" />
      </div>

      <div className="text-center">
        <p className="text-sm font-bold text-slate-700">{title}</p>

        <span className="text-xs text-slate-500">{subtitle}</span>
      </div>
    </div>
  );
}

/* ===========================
            Hero
=========================== */

export default function HomeHero({ showButton = true }) {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-[#F5FCFD] min-h-[50vh] md:min-h-[90vh] pb-8 md:pb-20"
    >
      {/* اینجااا این رنگگگ بالاااا */}
      {/* نورها */}

      <div className="absolute -left-44 -top-40 w-[520px] h-[520px] rounded-full bg-[#c8f0ea] blur-[140px] opacity-40" />

      <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full bg-[#eafaf6] blur-[120px] opacity-70" />

      <div className="relative z-20 max-w-[1500px] mx-auto px-8 lg:px-12 xl:px-16 pt-16 lg:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] items-center gap-0">
          {" "}
          {/* ستون تصویر */}
          {/* <div className="relative order-2 lg:order-2 flex justify-center lg:justify-end"> */}
          {/* <div className="relative order-1 lg:order-2 flex justify-center"> */}
          <div
            className="
hidden
md:flex
relative
justify-start
translate-x-[-130px]
"
          >
            {/* هاله پشت تصویر */}

            {/* <div
              className="
    absolute
    w-[330px]
    h-[330px]
    lg:w-[500px]
    lg:h-[500px]
    rounded-full
    bg-gradient-to-br
    from-teal-100
    via-emerald-50
    to-cyan-50
    opacity-70
    blur-2xl
  "
            /> */}

            {/* کارت‌ها */}
            {/* 
            <div className="hidden lg:block">
              <QuoteCard />
              <RatingCard />
              <ReadingCard />
            </div> */}

            {/* نقطه‌ها */}

            <FloatingDot
              size={14}
              color="#14b8a6"
              className="top-8 left-44 float1"
            />

            <FloatingDot
              size={10}
              color="#34d399"
              className="top-28 right-24 float2"
            />

            <FloatingDot
              size={18}
              color="#99f6e4"
              className="bottom-20 left-44 float3"
            />

            <FloatingDot
              size={12}
              color="#2dd4bf"
              className="bottom-28 right-24 float4"
            />

            {/* برگ‌ها */}

            <div className="hidden lg:block absolute top-16 right-12 rotate-12">
              <div className="w-6 h-10 rounded-full bg-emerald-400 rotate-12" />
            </div>

            <div className="hidden lg:block absolute bottom-24 left-16 -rotate-12">
              <div className="w-5 h-9 rounded-full bg-teal-500" />
            </div>

            {/* تصویر */}
            <img
              src={heroImage}
              alt="کتابیوم"
              className="
    relative
    z-20
    hidden
    md:block
    w-full
    max-w-none
    scale-150
    lg:scale-[1.65]
    object-contain
    select-none
    pointer-events-none
  "
            />
          </div>
          {/* ستون متن */}
          <div
            className="
    flex
    flex-col
    w-full
    max-w-[620px]
    mx-auto
    md:mr-20
    lg:mr-28
    xl:mr-36
    text-center
    md:text-right
    items-center
    md:items-start
  "
          >
            <h1
              className="
    mt-4
    w-full
    font-['Arad:Bold',sans-serif]
    leading-tight
    text-4xl
    sm:text-5xl
    lg:text-6xl
    xl:text-7xl
  "
            >
              <span className="text-slate-800"> همراه مطالعه شما</span>

              <br />

              <span className="bg-gradient-to-r from-teal-700 to-emerald-500 bg-clip-text text-transparent">
                کتاب دوستان
              </span>
            </h1>
            <p
              className="
    mt-5
    w-full
    max-w-[520px]
    text-slate-600
    leading-9
    text-[18px]
    lg:text-[21px]
  "
            >
              کتاب بخوان، یادداشت بردار، به اشتراک بگذار و با دیگران درباره‌ی
              کتاب‌ها گفتگو کن.
            </p>
            {/* CTA */}
            {showButton && (
              <Link
                to="/register"
                className="
    mt-8
    self-center
    md:self-start
    lg:translate-x-[-70px]
    xl:translate-x-[-90px]
  "
              >
                {" "}
                <button
                  className="
      relative
      overflow-hidden
      group
      h-[62px]
      px-12
      rounded-full
      bg-gradient-to-r
      from-teal-600
      via-teal-500
      to-emerald-500
      text-white
      shadow-[0_15px_35px_rgba(20,184,166,.35)]
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-[0_20px_45px_rgba(20,184,166,.45)]
      "
                >
                  <span
                    className="
        absolute
        inset-0
        opacity-0
        group-hover:opacity-100
        transition
        bg-gradient-to-r
        from-teal-700
        via-teal-600
        to-emerald-600
        "
                  />

                  <span
                    className="
        relative
        flex
        items-center
        gap-3
        font-['Arad:Bold',sans-serif]
        text-[22px]
        "
                  >
                    {/* <Users className="w-5 h-5" /> */}
                    به کتابیوم بپیوندید
                  </span>
                </button>
              </Link>
            )}
            {/* Feature ها */}
            {/* 
            <div
              className="
mt-16
grid
grid-cols-2
md:grid-cols-4
gap-8
w-full
border-t
border-teal-100
pt-10
"
            >
              <Feature icon={BookOpen} title="کتابخانه" subtitle="شخصی" />

              <Feature
                icon={MessageCircle}
                title="یادداشت"
                subtitle="روی کتاب"
              />

              <Feature icon={Users} title="دوستان" subtitle="کتابخوان" />

              <Feature icon={Star} title="امتیاز" subtitle="و نقد" />
            </div> */}
          </div>
        </div>
      </div>

      {/* موج پایین */}
      <div
        className="
absolute
bottom-[-1px]
left-0
w-full
overflow-hidden
leading-none
"
      >
        {/* موج دسکتاپ */}
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="hidden md:block w-full h-[170px]"
        >
          <path
            fill="#2F8C9F"
            d="
      M0,25
      C220,120
      470,150
      760,90
      C980,45
      1210,60
      1440,40
      L1440,180
      L0,180
      Z
      "
          />
        </svg>

        {/* موج موبایل */}
        <svg
          viewBox="0 0 390 120"
          preserveAspectRatio="none"
          className="block md:hidden w-full h-[90px]"
        >
          <path
            fill="#2F8C9F"
            d="
      M0,25
      C70,80
      150,110
      240,70
      C310,40
      350,50
      390,35
      L390,120
      L0,120
      Z
      "
          />
        </svg>
      </div>
    </section>
  );
}
