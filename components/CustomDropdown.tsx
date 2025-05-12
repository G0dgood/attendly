"use client";

import React, { useState, useRef, useEffect } from "react";
import down from "../public/icon/down.svg";
import Image from 'next/image'

interface CustomDropdownProps {
	label: string;
	options: string[];
	right?: string;
	islabelone?: string;
}

const CustomDropdown = ({ label, options, right, islabelone }: CustomDropdownProps) => {
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleSelect = (option: string) => {

		setSelectedOption(option);
		setIsOpen(false);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative w-full " ref={dropdownRef}>
			{/* Dropdown Button */}
			<label className="font-medium text-[15px] leading-5 text-gray-600 ">{islabelone}</label>
			<div
				className={`box-border flex flex-row items-center px-[12px] py-[8px] gap-[8px] w-[100%] h-[40px] bg-white border border-[#E5E7EB]`}
				onClick={toggleDropdown}
			>

				{/* {right && <div className='view_content_table mr-2'>JB</div>} */}
				<span className="text-gray-600">{selectedOption || label}</span>
				<span className="ml-auto text-gray-500">
					<Image src={down} alt='down' />
				</span>
			</div>

			{/* Dropdown List */}
			{isOpen && (
				<div className="absolute w-full mt-2 p-[10px] z-10 bg-white border border-[#E5E7EB] shadow-lg overflow-hidden bg-[#fff">
					{options.map((option) => (
						<div
							key={option}
							className=" p-1 text-[16px] text-[#344054] hover:bg-[#F9FAFB] hover:text-[#002DB3] cursor-pointer transition-colors duration-150"
							onClick={() => handleSelect(option)}
						>
							{option}
						</div>
					))}
				</div>

			)}
		</div>
	);
};

interface DropdownsProps {
	label: string;
	right?: string;
	options: string[];
	islabelone?: string;
}

const Dropdowns = ({ label, right, options, islabelone }: DropdownsProps) => {
	return (

		<CustomDropdown label={label} options={options} right={right} islabelone={islabelone} />

	);
};

export default Dropdowns;
