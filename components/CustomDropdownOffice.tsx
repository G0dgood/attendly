"use client";

import React, { useState, useRef, useEffect } from "react";
import down from "../public/icon/down.svg";
import Image from 'next/image';

interface LocationOption {
	id: string;
	name: string;
	address: string;
}

interface CustomDropdownProps {
	label: string;
	options: LocationOption[];
	right?: string;
	islabelone?: string;
	name: string;
	handleOnChange: (name: string, value: string) => void;
	loading?: boolean;
}

const CustomDropdown = ({
	label,
	options,
	right,
	islabelone,
	name,
	handleOnChange,
	loading = false
}: CustomDropdownProps) => {
	const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => {
		if (!loading) setIsOpen(!isOpen);
	};

	const handleSelect = (option: LocationOption) => {
		setSelectedLabel(option.name);
		handleOnChange(name, option.id); // return the ID
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
				className="rounded-none box-border flex flex-row items-center px-[12px] py-[8px] gap-[8px] w-full h-[40px] bg-white border border-[#E5E7EB] cursor-pointer"
				onClick={toggleDropdown}
			>
				<span className="text-gray-600">
					{loading ? "Loading..." : selectedLabel || label}
				</span>
				<span className="ml-auto text-gray-500">
					<Image src={down} alt="down" />
				</span>
			</div>

			{isOpen && !loading && (
				<div className="absolute w-full mt-2 p-[10px] z-10 bg-white border border-[#E5E7EB] shadow-lg max-h-[150px] overflow-auto">
					{options.map((option) => (
						<div
							key={option.id}
							className="p-1 text-[16px] text-[#344054] hover:bg-[#F9FAFB] hover:text-[#2563EB] cursor-pointer transition-colors duration-150"
							onClick={() => handleSelect(option)}
						>
							{option.name}
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
	options: LocationOption[];
	islabelone?: string;
	name: string;
	handleOnChange: (name: string, value: string) => void;
	loading?: boolean;
}

const CustomDropdownOffice = ({
	label,
	right,
	options,
	islabelone,
	name,
	handleOnChange,
	loading
}: DropdownsProps) => {
	return (
		<CustomDropdown
			label={label}
			options={options}
			right={right}
			islabelone={islabelone}
			name={name}
			handleOnChange={handleOnChange}
			loading={loading}
		/>
	);
};

export default CustomDropdownOffice;
