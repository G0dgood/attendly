// "use client";
// import Image from "next/image";
// import dashboard from "../public/DashboardIcon/darhboard.svg";
// import employee from "../public/DashboardIcon/employee.svg";
// import employeeWhite from "../public/DashboardIcon/employeeWhite.svg";
// import time from "../public/DashboardIcon/time.svg";
// import timeWhite from "../public/DashboardIcon/timeWhite.svg";
// import filedock from "../public/DashboardIcon/File_dock_light.svg";
// import dashboardWhite from "../public/DashboardIcon/dashboardWhite.svg";
// import { useState } from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";


// const SideNav: React.FC = () => {
//   const pathname = usePathname();
//   const [hoveredItem, setHoveredItem] = useState<string | null>(null);


//   const menuItems = [
//     { label: "Dashboard", icon: dashboard, iconWhite: dashboardWhite, path: "/dashboard" },
//     { label: "Employee", icon: employee, iconWhite: employeeWhite, path: "/employee" },
//     { label: "Document Management", icon: filedock, iconWhite: timeWhite, path: "/documentmanagement" },
//     { label: "Attendance", icon: time, iconWhite: timeWhite, path: "/attendance" },
//   ];


//   return (
//     <div id="side-nav" className="!flex !flex-col !h-full"  >
//       <div className="w-[100%] flex justify-center mb-[40px] mt-[10px]">
//         <Image
//           src={require("../public/img/logo.png")}
//           alt="Logo"
//           className="w-[149px] h-[50px]"
//         />
//       </div>


//       <div className="flex flex-col flex-1 mt-8 gap-[10px] px-4">
//         {menuItems.map((item) => {
//           const isActive = pathname.startsWith(item.path);
//           const isHovered = hoveredItem === item.label;

//           return (
//             <Link
//               key={item.label}
//               href={item.path}
//               className={`flex items-center gap-[10px] px-3 py-[8px]   p-[10px] cursor-pointer transition-all ${isActive || isHovered
//                 ? "bg-[#002DB3]"
//                 : "hover:bg-[#002DB3]"
//                 }`}
//               onMouseEnter={() => setHoveredItem(item.label)}
//               onMouseLeave={() => setHoveredItem(null)}
//             >
//               <Image
//                 src={(isActive || isHovered) ? item.iconWhite : item.icon}
//                 alt={item.label}
//                 width={24}
//                 height={24}
//               />
//               <p
//                 className={`font-medium text-[14px] leading-[150%] ${isActive || isHovered ? "text-[#fff]" : "text-[#3A4050]"
//                   }`}
//               >
//                 {item.label}
//               </p>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default SideNav;

"use client";
import Image from "next/image";
import dashboard from "../public/DashboardIcon/darhboard.svg";
import employee from "../public/DashboardIcon/employee.svg";
import employeeWhite from "../public/DashboardIcon/employeeWhite.svg";
import time from "../public/DashboardIcon/time.svg";
import timeWhite from "../public/DashboardIcon/timeWhite.svg";
import filedock from "../public/DashboardIcon/File_dock_light.svg";
import dashboardWhite from "../public/DashboardIcon/dashboardWhite.svg";
import arrowDown from "../public/DashboardIcon/Expand_up.svg";
import arrowUp from "../public/DashboardIcon/Expand_up.svg";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideNav: React.FC = () => {
 const pathname = usePathname();
 const [hoveredItem, setHoveredItem] = useState<string | null>(null);
 const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);

 const menuItems = [
  { label: "Dashboard", icon: dashboard, iconWhite: dashboardWhite, path: "/dashboard" },
  { label: "Employee", icon: employee, iconWhite: employeeWhite, path: "/hr/employeemanagement" },
  { label: "Employee", icon: employee, iconWhite: employeeWhite, path: "/employee" },
  { label: "Document Management", icon: filedock, iconWhite: timeWhite, path: "/documentmanagement" },
  { label: "Document Upload", icon: filedock, iconWhite: timeWhite, path: "/employee/documentupload" },
  { label: "Attendance", icon: time, iconWhite: timeWhite, path: "/employeeattendance" },
  { label: "Performance Evaluation", icon: time, iconWhite: timeWhite, path: "/performanceevaluation" },
  { label: "Performance Evaluation", icon: time, iconWhite: timeWhite, path: "/performanceevaluation/useperformanceevaluation" },
 ];

 const attendanceSubItems = [
  { label: "Internal Employee", path: "/internalemployee" },
  { label: "Outsourced Employee", path: "/outsourcedemployee" },
 ];

 return (
  <div id="side-nav" className="!flex !flex-col !h-full !bg-[#fff]">
   <div className="w-full flex justify-center mb-[40px] mt-[10px]">
    <Image
     src={require("../public/img/logo.png")}
     alt="Logo"
     className="w-[149px] h-[50px]"
    />
   </div>

   <div className="flex flex-col flex-1 gap-[10px] px-4">
    {menuItems.map((item) => {
     const isActive = pathname.startsWith(item.path);
     const isHovered = hoveredItem === item.label;

     return (
      <Link
       key={item.label}
       href={item.path}
       className={`flex items-center gap-[10px] px-3 py-[8px] p-[10px] cursor-pointer transition-all ${isActive || isHovered ? "bg-[#002DB3]" : "hover:bg-[#002DB3]"}`}
       onMouseEnter={() => setHoveredItem(item.label)}
       onMouseLeave={() => setHoveredItem(null)}
      >
       <Image
        src={isActive || isHovered ? item.iconWhite : item.icon}
        alt={item.label}
        width={24}
        height={24}
       />
       <p
        className={`font-medium text-[14px] leading-[150%] ${isActive || isHovered ? "text-[#fff]" : "text-[#3A4050]"}`}>
        {item.label}
       </p>
      </Link>
     );
    })}

    {/* Attendance Dropdown */}
    <div
     className="flex flex-col gap-[10px] transition-all"
     onMouseEnter={() => setHoveredItem("Attendance")}
     onMouseLeave={() => setHoveredItem(null)}
    >
     <div
      className={`flex items-center justify-between gap-[10px] px-3 py-[8px] cursor-pointer transition-all w-full
      ${pathname.startsWith("/attendance") || isAttendanceOpen || hoveredItem === "Attendance"
        ? "bg-[#002DB3]"
        : "hover:bg-[#002DB3]"
       }`}
      onClick={() => setIsAttendanceOpen(!isAttendanceOpen)}
     >
      <div className="flex items-center gap-[10px]">
       <Image
        src={
         pathname.startsWith("/attendance") || isAttendanceOpen || hoveredItem === "Attendance"
          ? timeWhite
          : time
        }
        alt="Attendance"
        width={24}
        height={24}
       />
       <p
        className={`font-medium text-[14px] leading-[150%] ${pathname.startsWith("/attendance") || isAttendanceOpen || hoveredItem === "Attendance"
         ? "text-white"
         : "text-[#3A4050]"
         }`}
       >
        Attendance
       </p>
      </div>
      <Image
       src={isAttendanceOpen ? arrowUp : arrowDown}
       alt="Toggle Dropdown"
       width={16}
       height={16}
      />
     </div>

     {isAttendanceOpen && (
      <div className="flex flex-col gap-[10px] px-3 py-[8px]">
       {attendanceSubItems.map((subItem) => {
        const isSubActive = pathname === subItem.path;
        return (
         <Link
          key={subItem.label}
          href={subItem.path}
          className={`px-3 py-[8px]  transition-all text-[14px] font-medium cursor-pointer
              ${isSubActive
            ? "bg-[#002DB3] text-white"
            : "text-[#3A4050] hover:bg-[#002DB3] hover:text-white"
           }`}
         >
          {subItem.label}
         </Link>
        );
       })}
      </div>
     )}
    </div>

   </div>
  </div>
 );
};

export default SideNav;


