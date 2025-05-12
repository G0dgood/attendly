"use client";
import React, { useState } from "react";

import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { DateDetailModal } from "./DateDetailModal";

const getDaysInMonth = (month: number, year: number) => {
	return new Date(year, month + 1, 0).getDate();
};

const getAttendanceData = (month: number): Record<number, { status: 'present' | 'absent' | 'leave'; time?: string }> => {
	// Dummy data for April (month === 3), May (month === 4), etc.
	if (month === 3) { // April
		return {
			1: { status: 'present', time: '8:00am - 5:00pm' },
			2: { status: 'present', time: '8:00am - 5:00pm' },
			3: { status: 'leave', time: 'Medical Leave' },
			5: { status: 'absent' },
			10: { status: 'present', time: '9:00am - 4:00pm' },
			13: { status: 'leave', time: 'Annual Leave' },
			14: { status: 'present', time: '8:00am - 5:00pm' },
		};
	} else if (month === 4) { // May
		return {
			1: { status: 'present', time: '8:30am - 5:30pm' },
			2: { status: 'present', time: '9:00am - 6:00pm' },
			3: { status: 'absent' },
			4: { status: 'present', time: '8:00am - 5:00pm' },
			6: { status: 'leave', time: 'Vacation' },
			7: { status: 'present', time: '9:00am - 4:00pm' },
			10: { status: 'present', time: '8:00am - 5:00pm' },
		};
	}
	return {}; // Default empty
};

const getStatusColor = (status: string) => {
	switch (status) {
		case "present":
			return "bg-[#ECFDF3] border border-[#ABEFC6]";
		case "absent":
			return "bg-[#FFD4D4] border border-[#EF4444]";
		case "leave":
			return "bg-[#FEF3F2] border border-[#FECDCA]";
		default:
			return "bg-[#F9FAFB] border border-[#E5E7EB]";
	}
};

const monthNames = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];

const EmployeeDashBoard = () => {
	const today = new Date();
	const [month, setMonth] = useState(today.getMonth());
	const [year, setYear] = useState(today.getFullYear());
	const attendanceData = getAttendanceData(month);
	const [selectedDay, setSelectedDay] = useState<number | null>(null);
	const [modalData, setModalData] = useState<{ status: string; time?: string } | null>(null);


	const handleMonthChange = (direction: "prev" | "next") => {
		let newMonth = month + (direction === "next" ? 1 : -1);
		let newYear = year;

		if (newMonth < 0) {
			newMonth = 11;
			newYear -= 1;
		} else if (newMonth > 11) {
			newMonth = 0;
			newYear += 1;
		}

		setMonth(newMonth);
		setYear(newYear);
	};

	const getCalendarDays = (year: number, month: number) => {
		const firstDayOfMonth = new Date(year, month, 1).getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
		const totalDays = getDaysInMonth(year, month);

		// Adjust firstDayOfMonth to align with Monday as 0 (Mon, Tue, ..., Sun)
		const adjustedFirstDay = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); // Shift Sunday (0) to 6, Monday (1) to 0, etc.

		const daysArray = [];

		// Add empty slots for days before the 1st of the month
		for (let i = 0; i < adjustedFirstDay; i++) {
			daysArray.push(null);
		}

		// Add actual days
		for (let i = 1; i <= totalDays; i++) {
			daysArray.push(i);
		}

		return daysArray;
	};

	const calendarDays = getCalendarDays(year, month);

	return (
		<div>
			<PageHeader text="Attendance" />

			<div className="flex items-center mt-[24px] gap-[20px] w-[300px] justify-between">
				<h1 className="font-medium text-[20px] leading-[150%] text-[#3A4050]">
					{monthNames[month]} {year}
				</h1>
				<div className="flex items-center gap-[20px]">
					<button onClick={() => handleMonthChange("prev")}>
						<Image src={require("../../public/icon/leftcircle.svg")} alt="left" />
					</button>
					<button onClick={() => handleMonthChange("next")}>
						<Image src={require("../../public/icon/leftright.svg")} alt="right" />
					</button>
				</div>
			</div>

			<div className="mt-[50px]">
				<div className="grid grid-cols-7 gap-2 sm:gap-[20px] mt-[24px] text-xs sm:text-base">
					{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
						<div key={day} className="text-center font-medium text-[#6B7280]">
							{day}
						</div>
					))}
				</div>



				<div className="grid grid-cols-7 gap-2 sm:gap-[20px] mt-[24px] text-sm sm:text-base">
					{calendarDays.map((day, index) => {
						if (day === null) {
							return <div key={`empty-${index}`} className="w-full h-[85px]" />;
						}
						const record = attendanceData[day];
						const boxStyle = getStatusColor(record?.status || "");

						const isToday =
							day === today.getDate() &&
							month === today.getMonth() &&
							year === today.getFullYear();

						return (
							<div
								key={day}
								onClick={() => {
									setSelectedDay(day);
									setModalData(record || { status: "No record" });
								}}
								className={`cursor-pointer transition hover:scale-105 duration-200 flex flex-col justify-between p-2 sm:p-[8px] w-full h-[85px] text-[12px] sm:text-[14px] ${boxStyle} ${isToday ? 'ring-2 ring-yellow-400 font-bold bg-yellow-100' : ''}`}
							>
								<p className="text-[16px] sm:text-[20px] leading-[150%] text-[#3A4050]">
									{day}
								</p>
								<span className="text-[12px] sm:text-[14px] text-[#3A4050] whitespace-nowrap overflow-hidden text-ellipsis">
									{record ? record.time || "Absent" : ""}
								</span>
							</div>

						);
					})}
				</div>
				<DateDetailModal
					isOpen={selectedDay !== null}
					onClose={() => setSelectedDay(null)}
					day={selectedDay || 0}
					status={modalData?.status || ""}
					time={modalData?.time}
				/>

			</div>
			<div className='flex flex-wrap gap-6 mt-10'>
				{[
					{ color: '#ABEFC6', label: 'On Time' },
					{ color: '#FECDCA', label: 'Late' },
					{ color: '#EF4444', label: 'Absent' },
					{ color: '#3B82F6', label: 'Holiday' }
				].map(({ color, label }) => (
					<div key={label} className='flex items-center gap-2'>
						<div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
						<p className='text-sm text-[#3A4050]'>{label}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default EmployeeDashBoard;