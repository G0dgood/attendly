"use client";
import Image from "next/image";
import dashboard from "../public/DashboardIcon/darhboard.svg";
import employee from "../public/DashboardIcon/employee.svg";
import employeeWhite from "../public/DashboardIcon/employeeWhite.svg";
import time from "../public/DashboardIcon/time.svg";
import timeWhite from "../public/DashboardIcon/timeWhite.svg";
import dashboardWhite from "../public/DashboardIcon/dashboardWhite.svg";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";


const SideNav: React.FC = () => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);


  const menuItems = [
    { label: "Dashboard", icon: dashboard, iconWhite: dashboardWhite, path: "/dashboard" },
    { label: "Employee", icon: employee, iconWhite: employeeWhite, path: "/employee" },
    { label: "Document Management", icon: time, iconWhite: timeWhite, path: "/document-management" },
  ];


  return (
    <div id="side-nav" className="!flex !flex-col !h-full"  >
      <div className="w-[100%] flex justify-center mb-[40px]">
        <Image
          src={require("../public/img/logo.png")}
          alt="Logo"
          className="w-[149px] h-[55px]"
        />
      </div>


      <div className="flex flex-col flex-1 mt-8 gap-[10px] px-4">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          const isHovered = hoveredItem === item.label;

          return (
            <Link
              key={item.label}
              href={item.path}
              className={`flex items-center gap-[10px] px-3 py-[8px]   p-[10px] cursor-pointer transition-all ${isActive || isHovered
                ? "bg-[#002DB3]"
                : "hover:bg-[#002DB3]"
                }`}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Image
                src={(isActive || isHovered) ? item.iconWhite : item.icon}
                alt={item.label}
                width={24}
                height={24}
              />
              <p
                className={`font-medium text-[14px] leading-[150%] ${isActive || isHovered ? "text-[#fff]" : "text-[#3A4050]"
                  }`}
              >
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
