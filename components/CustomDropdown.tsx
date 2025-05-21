"use client";

import React, { useState, useRef, useEffect } from "react";
import down from "../public/icon/down.svg";
import Image from 'next/image';

interface CustomDropdownProps {
	label: string;
	options: string[];
	right?: string;
	islabelone?: string;
	name: string; // key to update in parent state
	handleOnChange: (name: string, value: string) => void;
}

const CustomDropdown = ({ label, options, right, islabelone, name, handleOnChange }: CustomDropdownProps) => {
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleSelect = (option: string) => {
		setSelectedOption(option);
		handleOnChange(name, option); // Call parent handler
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
		<div className="relative w-full" ref={dropdownRef}>
			{islabelone && (
				<label className="font-medium text-[15px] leading-5 text-gray-600 mb-[6px] block">
					{islabelone}
				</label>
			)}

			<div
				className="box-border flex flex-row items-center px-[12px] py-[8px] gap-[8px] w-full h-[40px] bg-white border border-[#E5E7EB] rounded cursor-pointer"
				onClick={toggleDropdown}
			>
				<span className="text-gray-600">{selectedOption || label}</span>
				<span className="ml-auto text-gray-500">
					<Image src={down} alt="down" />
				</span>
			</div>

			{isOpen && (
				<div className="absolute w-full mt-2 p-[10px] z-10 bg-white border border-[#E5E7EB] shadow-lg max-h-[150px] overflow-auto">
					{options.map((option) => (
						<div
							key={option}
							className="p-1 text-[16px] text-[#344054] hover:bg-[#F9FAFB] hover:text-[#002DB3] cursor-pointer transition-colors duration-150"
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
	name: string;
	handleOnChange: (name: string, value: string) => void;
}

const Dropdowns = ({ label, right, options, islabelone, name, handleOnChange }: DropdownsProps) => {
	return (
		<CustomDropdown
			label={label}
			options={options}
			right={right}
			islabelone={islabelone}
			name={name}
			handleOnChange={handleOnChange}
		/>
	);
};

export default Dropdowns;