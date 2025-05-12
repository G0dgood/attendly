// "use client";
// import Image from "next/image";


// const Header = () => {



//   return (
//     <div id="header" className="!flex !justify-between !items-center">
//       <div></div>
//       <div className="flex items-center gap-[20px]">
//         <Image
//           src={require("../public/DashboardIcon/Bell_light.svg")}
//           alt="bell"
//         />
//         <div className="flex items-center gap-[10px]">
//           <div className="w-[40px] h-[40px] bg-[#F2F4F7] border border-[#E5E7EB] rounded-full box-border
//           flex items-center justify-center">
//             <Image
//               src={require("../public/DashboardIcon/Avatar.svg")}
//               alt="avatar"
//             />
//           </div>

//           <div>
//             <h3 className="font-medium text-[14px] leading-[150%] text-[#3A4050]">Mike Doe</h3>
//             <p className="font-normal text-[12px] leading-[150%] text-[#3A4050]">HR</p>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Header;
"use client";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const Header = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const userInitials =
    session?.user?.email
      ?.split("@")[0]
      ?.split(" ")
      .map((n) => n[0]?.toUpperCase())
      .join("") || "U";

  return (
    <div id="header" className="!flex !justify-between !items-center relative">
      <div></div>

      <div className="flex items-center gap-[20px] relative">
        <Image
          src={require("../public/DashboardIcon/Bell_light.svg")}
          alt="bell"
        />

        <div
          className="flex items-center gap-[10px] cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <div className="w-[40px] h-[40px] bg-[#F2F4F7] border border-[#E5E7EB] rounded-full box-border flex items-center justify-center text-[#3A4050] font-semibold text-sm">
            {userInitials}
          </div>

          <div>
            <h3 className="font-medium text-[14px] leading-[150%] text-[#3A4050]">
              {session?.user?.fullName || "Mike Doe"}
            </h3>
            <p className="font-normal text-[12px] leading-[150%] text-[#3A4050]">HR</p>
          </div>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 top-[60px] w-[200px] bg-white border border-gray-200   shadow-lg z-50">
            <div className="absolute top-[-6px] right-5 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-200"></div>
            <div className="p-4">
              <p className="text-sm text-gray-700 mb-1">Signed in as</p>
              <p className="text-sm font-medium text-gray-900 truncate mb-3">
                {session?.user?.email || "mike@example.com"}
              </p>
              <button
                onClick={() => signOut()}
                className="w-full px-4 py-2 text-sm text-white !bg-[#002DB3]   hover:bg-blue-700"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
