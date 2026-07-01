"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useUserPrivileges } from "@/utils/userPrivileges";
import dashboard from "../public/DashboardIcon/darhboard.svg";
import dashboardBlue from "../public/DashboardIcon/dashboardBlue.svg";
import employee from "../public/DashboardIcon/employee.svg";
import employeeBlue from "../public/DashboardIcon/employeeBlue.svg";
import time from "../public/DashboardIcon/time.svg";
import timeBlue from "../public/DashboardIcon/timeBlue.svg";


const Footer = () => {
	const pathname = usePathname();
	const { user } = useUserPrivileges();
	const [hoveredItem, setHoveredItem] = useState<string | null>(null);

	const userRole = user?.role?.toUpperCase();

	const navItems = [
		{ label: "Dashboard", icon: dashboard, iconWhite: dashboardBlue, path: "/dashboard", restricted: true },
		{ label: "Employee", icon: employee, iconWhite: employeeBlue, path: "/hr/employeemanagement", restricted: true },
		{ label: "Attendance", icon: time, iconWhite: timeBlue, path: "/attendances", restricted: true },
		{ label: "Summary", icon: time, iconWhite: timeBlue, path: "/attendancesummary", restricted: true },
		{ label: "Office", icon: employee, iconWhite: timeBlue, path: "/officelocation", restricted: true },
	];

	const visibleNavItems = navItems.filter(item => {
		if (userRole === "AGENT" && item.restricted) {
			return false;
		}
		return true;
	});

	return (
		<div id="footer" className="!flex !justify-between !items-center">
			<div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex justify-around items-center h-[64px] shadow-[0_0_10px_rgba(0,0,0,0.1)]">
				{visibleNavItems.map((item) => {
					const isActive = pathname.startsWith(item.path);
					const isHovered = hoveredItem === item.label;

					return (
						<Link
							key={item.label}
							href={item.path}
							onMouseEnter={() => setHoveredItem(item.label)}
							onMouseLeave={() => setHoveredItem(null)}
							className="flex flex-col items-center justify-center gap-1 transition-all"
						>
							<Image
								src={isActive || isHovered ? item.iconWhite : item.icon}
								alt={item.label}
								width={24}
								height={24}
							/>
							<span className={`text-xs font-medium ${isActive || isHovered ? "text-[#2563EB]" : "text-[#3A4050]"}`}>
								{item.label}
							</span>
						</Link>
					);
				})}
			</div>

		</div>
	);
};

export default Footer;
