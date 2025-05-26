"use client";
import Image from "next/image";
import dashboard from "../public/DashboardIcon/darhboard.svg";
import employee from "../public/DashboardIcon/employee.svg";
import employeeWhite from "../public/DashboardIcon/employeeWhite.svg";
import time from "../public/DashboardIcon/time.svg";
import timeWhite from "../public/DashboardIcon/timeWhite.svg";
import filedock from "../public/DashboardIcon/File_dock_light.svg";
import dashboardWhite from "../public/DashboardIcon/dashboardWhite.svg";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaCalendarCheck } from "react-icons/fa";

const SideNav: React.FC = () => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    { label: "Dashboard", icon: dashboard, iconWhite: dashboardWhite, path: "/dashboard" },
    { label: "Employee", icon: employee, iconWhite: employeeWhite, path: "/hr/employeemanagement" },
    { label: "Attendance", icon: time, iconWhite: timeWhite, path: "/attendances" },
    { label: "Office Location", icon: employee, iconWhite: employeeWhite, path: "/officelocation" },

  ];



  return (
    <div id="side-nav" className="!flex !flex-col !h-full !bg-[#fff]">
      <div className="w-full flex  mb-[20px] mt-[15px] p-4">
        <div className="flex items-center gap-2 font-semibold text-gray-900 ">
          <div className="bg-[#2563EB] p-2 rounded-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 
        2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm0 
        16H5V10h14Zm0-11H5V5h14Z" />
            </svg>
          </div>
          <span className="text-xl tracking-tight">Attendly</span>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-[10px] px-4">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          const isHovered = hoveredItem === item.label;

          return (
            <Link
              key={item.label}
              href={item.path}
              className={`flex items-center gap-[10px] px-3 py-[8px] p-[10px] cursor-pointer transition-all ${isActive || isHovered ? "bg-[#2563EB]" : "hover:bg-[#2563EB]"}`}
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



      </div>
    </div>
  );
};

export default SideNav;


