// components/FilterDropdown.tsx
import React from 'react';

interface FilterDropdownProps {
	startDate: string;
	endDate: string;
	limit: number;
	setStartDate: (val: string) => void;
	setEndDate: (val: string) => void;
	setLimit: (val: number) => void;
	onApply: () => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
	startDate,
	endDate,
	limit,
	setStartDate,
	setEndDate,
	setLimit,
	onApply,
}) => {
	return (
		<div className="absolute mt-2 bg-white border border-gray-200 shadow-lg rounded-none p-4 z-50 w-64 right-24 top-9">
			<div className="flex flex-col gap-4">
				<label className="text-sm font-medium text-gray-700">
					Start Date
					<input
						type="date"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						className="mt-1 w-full px-3 py-2 border rounded-none text-sm"
					/>
				</label>

				<label className="text-sm font-medium text-gray-700">
					End Date
					<input
						type="date"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						className="mt-1 w-full px-3 py-2 border rounded-none text-sm"
					/>
				</label>

				<label className="text-sm font-medium text-gray-700">
					Limit
					<input
						type="number"
						value={limit}
						onChange={(e) => setLimit(parseInt(e.target.value))}
						className="mt-1 w-full px-3 py-2 border rounded-none text-sm"
						min={1}
					/>
				</label>

				<button
					onClick={onApply}
					className="w-full !bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700 rounded-none"
				>
					Filters
				</button>
			</div>
		</div>
	);
};

export default FilterDropdown;
