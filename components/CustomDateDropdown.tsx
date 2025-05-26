"use client";

import React, { useState, useRef, useEffect } from "react";
import date from "../public/icon/Date_today_duotone_line.svg";
import Image from "next/image";

interface DateDropdownProps {
	label: string;
	islabelone?: string;
	right?: string;
	name: string; // key in the input object (e.g., "dateOfBirth")
	handleOnChange: (name: string, value: string) => void;
}

const CustomDateDropdown = ({ label, islabelone, name, handleOnChange }: DateDropdownProps) => {
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
		setTimeout(() => inputRef.current?.showPicker?.(), 0);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedDate(e.target.value);
		handleOnChange(name, e.target.value);
		setIsOpen(false);
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative w-full" ref={dropdownRef}>
			{islabelone && (
				<label className="font-medium text-[15px] leading-5 text-gray-600 mb-[6px] block">
					{islabelone}
				</label>
			)}

			<div
				className="box-border flex flex-row items-center px-[12px] py-[8px] gap-[8px] w-full h-[40px] bg-white border border-[#E5E7EB] rounded-none cursor-pointer"
				onClick={toggleDropdown}
			>
				<span className="text-gray-600 text-sm">
					{selectedDate || label}
				</span>
				<span className="ml-auto text-gray-500">
					<Image src={date} alt="calendar" />
				</span>
			</div>

			<input
				ref={inputRef}
				type="date"
				value={selectedDate || ''}
				onChange={handleDateChange}
				className="absolute opacity-0 pointer-events-none"
			/>
		</div>
	);
};

export default CustomDateDropdown;
