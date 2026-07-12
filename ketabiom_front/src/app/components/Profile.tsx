

// import React from "react";
// import { BookOpen, Star, PenLine } from "lucide-react";

// type ProfileProps = {
//   username: string;
//   profileImage?: string | null;
//   readBooksCount: number;
//   score: number;
//   notesCount: number;
// };

// export default function Profile({
//   username,
//   profileImage,
//   readBooksCount,
//   score,
//   notesCount,
// }: ProfileProps) {
//   return (
//     <>
//       <div className="pt-6 sm:pt-8 pb-2 flex items-center justify-start gap-3 sm:gap-4">
//         {profileImage ? (
//           <img
//             src={profileImage}
//             alt={username}
//             className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-[3px] border-[#236474] object-cover bg-[#f2f2f2] shrink-0"
//           />
//         ) : (
//           <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-[3px] border-[#236474] bg-[#f2f2f2] shrink-0" />
//         )}

//         <p className="text-xl sm:text-2xl md:text-4xl font-medium text-black tracking-tight text-left">
//           {username}
//         </p>
//       </div>

//       <div className="mt-4 sm:mt-5">
//         <div className="border-t border-border">
//           <div className="flex items-stretch py-2.5 sm:py-3">
//             <div className="flex-1 flex flex-col items-center justify-center gap-1 border-s border-border">
//               <div className="flex items-center gap-1 sm:gap-1.5">
//                 <BookOpen size={13} />
//                 <span className="text-xs sm:text-sm md:text-base font-medium text-black">
//                   کتاب خوانده شده
//                 </span>
//               </div>

//               <span className="font-bold">{readBooksCount}</span>
//             </div>

//             <div className="flex-1 flex flex-col items-center justify-center gap-1 border-s border-border">
//               <div className="flex items-center gap-1 sm:gap-1.5">
//                 <Star size={13} />
//                 <span className="text-xs sm:text-sm md:text-base font-medium text-black">
//                   امتیاز
//                 </span>
//               </div>

//               <span className="font-bold">{score}</span>
//             </div>

//             <div className="flex-1 flex flex-col items-center justify-center gap-1 border-s border-e border-border">
//               <div className="flex items-center gap-1 sm:gap-1.5">
//                 <PenLine size={13} />
//                 <span className="text-xs sm:text-sm md:text-base font-medium text-black">
//                   یادداشت
//                 </span>
//               </div>

//               <span className="font-bold">{notesCount}</span>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-border" />
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import { BookOpen, Star, PenLine } from "lucide-react";
import defaultAvatar from "../../assets/default-avatar.png";

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
  const [imageError, setImageError] = useState(false);

  const avatarSrc = !imageError && profileImage ? profileImage : defaultAvatar;

  return (
    <>
      <div className="pt-6 sm:pt-8 pb-2 flex items-center justify-start gap-3 sm:gap-4">
        <img
          src={avatarSrc}
          alt={username}
          onError={() => setImageError(true)}
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-[3px] border-[#236474] object-cover bg-[#f2f2f2] shrink-0"
        />

        <p className="text-xl sm:text-2xl md:text-4xl font-medium text-black tracking-tight text-left">
          {username}
        </p>
      </div>

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
    </>
  );
}