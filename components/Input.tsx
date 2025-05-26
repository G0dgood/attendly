import React, { ChangeEvent } from 'react';


interface InputProps {
	value: string;
	handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
	label: string;
	placeholder: string;
	type: string;
	required?: boolean;
}

const Input: React.FC<InputProps> = ({
	value,
	handleOnChange,
	label,
	placeholder
}) => {



	return (
		<div className={`flex flex-col items-start    w-full `}>
			{label && (
				<label className="text-[#3A4050] font-medium text-[14px] leading-[21px]">
					{label}
				</label>
			)}
			<input
				type="text"
				value={value}
				onChange={handleOnChange}
				style={{ padding: '8px 16px' }} // Equivalent to py-2 px-4
				className="w-full h-full border border-[#E5E7EB] bg-white text-[#3A4050] text-[14px] leading-[21px] focus:outline-none focus:ring-1 focus:ring-[#2563EB] rounded-none"
				placeholder={placeholder}
			/>
		</div>
	);
};

export default Input;
