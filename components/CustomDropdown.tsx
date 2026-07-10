"use client";

import React, { useState, useRef, useEffect } from "react";
import down from "../public/icon/down.svg";
import Image from "next/image";

// Support string or object options
type Option = string | { id: string; name: string };

interface CustomDropdownProps {
	label: string;
	options: Option[];
	right?: string;
	islabelone?: string;
	name: string;
	handleOnChange: (name: string, value: string) => void;
	loading?: boolean;
	value?: string;
}

const CustomDropdown = ({
	label,
	options,
	right,
	islabelone,
	name,
	handleOnChange,
	loading = false,
	value,
}: CustomDropdownProps) => {
	const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Sync selectedLabel with value prop
	useEffect(() => {
		if (value) {
			// Find the option that matches value
			const option = options.find(opt =>
				(typeof opt === "string" ? opt === value : opt.id === value)
			);
			if (option) {
				setSelectedLabel(typeof option === "string" ? option : option.name);
			}
		}
	}, [value, options]);

	const toggleDropdown = () => {
		if (!loading) setIsOpen(!isOpen);
	};

	const handleSelect = (option: Option) => {
		if (typeof option === "string") {
			setSelectedLabel(option);
			handleOnChange(name, option);
		} else {
			setSelectedLabel(option.name);
			handleOnChange(name, option.id);
		}
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
				className={`rounded-none box-border flex flex-row items-center px-[12px] py-[8px] gap-[8px] w-full h-[40px] bg-white border ${loading ? "border-gray-300" : "border-[#E5E7EB]"
					} rounded cursor-pointer`}
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
					{options?.map((option, i) => {
						const label = typeof option === "string" ? option : option.name;
						return (
							<div
								key={typeof option === "string" ? option : option.id}
								className="p-1 text-[16px] text-[#344054] hover:bg-[#F9FAFB] hover:text-[#2563EB] cursor-pointer transition-colors duration-150"
								onClick={() => handleSelect(option)}
							>
								{label}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

interface DropdownsProps {
	label: string;
	right?: string;
	options: Option[];
	islabelone?: string;
	name: string;
	handleOnChange: (name: string, value: string) => void;
	loading?: boolean;
	value?: string;
}

const Dropdowns = ({
	label,
	right,
	options,
	islabelone,
	name,
	handleOnChange,
	loading,
	value,
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
			value={value}
		/>
	);
};

export default Dropdowns;
