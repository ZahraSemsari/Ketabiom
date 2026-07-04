// import { BookOpen, Star, PenLine } from "lucide-react";
// import React
//  from "react";
// export default function Profile() {
//   return (
//     <>
//       <div className="pt-6 sm:pt-8 pb-2 flex items-center justify-start gap-3 sm:gap-4">
//       <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-[3px] border-ktb-dark bg-ktb-gray shrink-0" />    
//       <p className="text-xl sm:text-2xl md:text-4xl font-medium text-black tracking-tight text-left">
//         نام کاربری
//       </p>
//       </div>
//       <div className="mt-4 sm:mt-5">
//       <div className="border-t border-ktb-muted">
//         <div className="flex items-stretch py-2.5 sm:py-3">

//           {/* کتاب خوانده شده */}
//           <div className="flex-1 flex flex-col items-center justify-center gap-1 border-s border-ktb-muted">
//             <div className="flex items-center gap-1 sm:gap-1.5">
//               <span className="text-xs sm:text-sm md:text-base font-medium text-black">
//                 کتاب خوانده شده
//               </span>
//               <BookOpen size={13} />
//             </div>

//             <span className="font-bold">۵۱</span>
//           </div>

//           {/* امتیاز */}
//           <div className="flex-1 flex flex-col items-center justify-center gap-1 border-s border-ktb-muted">
//             <div className="flex items-center gap-1 sm:gap-1.5">
//               <span>امتیاز</span>
//               <Star size={13} />
//             </div>

//             <span className="font-bold">۲۱۸</span>
//           </div>

//           {/* یادداشت */}
//           <div className="flex-1 flex flex-col items-center justify-center gap-1 border-s border-e border-ktb-muted">
//             <div className="flex items-center gap-1 sm:gap-1.5">
//               <span>یادداشت</span>
//               <PenLine size={13} />
//             </div>

//             <span className="font-bold">۵</span>
//           </div>

//         </div>
//       </div>

//       <div className="border-t border-ktb-muted" />
//     </div>
//     </>
//   );
// }

import React from "react";
import { BookOpen, Star, PenLine } from "lucide-react";

type ProfileProps = {
  username: string;
  profileImage?: string | null;
  readBooksCount: number;
  score: number;
  notesCount: number;
};

export default function Profile({
  username,
  profileImage,
  readBooksCount,
  score,
  notesCount,
}: ProfileProps) {
  return (
    <>
      <div className="pt-6 sm:pt-8 pb-2 flex items-center justify-start gap-3 sm:gap-4">
        {profileImage ? (
          <img
            src={profileImage}
            alt={username}
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-[3px] border-[#236474] object-cover bg-[#f2f2f2] shrink-0"
          />
        ) : (
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-[3px] border-[#236474] bg-[#f2f2f2] shrink-0" />
        )}

        <p className="text-xl sm:text-2xl md:text-4xl font-medium text-black tracking-tight text-left">
          {username}
        </p>
      </div>

      <div className="mt-4 sm:mt-5">
        <div className="border-t border-border">
          <div className="flex items-stretch py-2.5 sm:py-3">
            <div className="flex-1 flex flex-col items-center justify-center gap-1 border-s border-border">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-xs sm:text-sm md:text-base font-medium text-black">
                  کتاب خوانده شده
                </span>
                <BookOpen size={13} />
              </div>

              <span className="font-bold">{readBooksCount}</span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-1 border-s border-border">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-xs sm:text-sm md:text-base font-medium text-black">
                  امتیاز
                </span>
                <Star size={13} />
              </div>

              <span className="font-bold">{score}</span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-1 border-s border-e border-border">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-xs sm:text-sm md:text-base font-medium text-black">
                  یادداشت
                </span>
                <PenLine size={13} />
              </div>

              <span className="font-bold">{notesCount}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border" />
      </div>
    </>
  );
}