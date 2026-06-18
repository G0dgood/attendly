import React, { ChangeEvent } from 'react';


interface InputProps {
	value: string;
	handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
	label: string;
	placeholder: string;
	type: string;
	required?: boolean;
	disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
	value,
	handleOnChange,
	label,
	placeholder,
	type = "text",
	disabled = false,
}) => {

	return (
		<div className={`flex flex-col items-start w-full ${disabled ? 'opacity-60' : ''}`}>
			{label && (
				<label className="text-[#3A4050] font-medium text-[14px] leading-[21px] mb-[6px]">
					{label}
				</label>
			)}
			<input
				type={type}
				value={value}
				onChange={handleOnChange}
				disabled={disabled}
				className={`custom-input-field w-full h-[40px] !border !border-[#E5E7EB] text-[#3A4050] text-[14px] leading-[21px] focus:outline-none focus:ring-1 focus:ring-[#2563EB] !rounded-none !pl-[16px] !pr-[16px] !py-[8px] ${
					disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
				}`}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default Input;
