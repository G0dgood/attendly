import React from 'react';

interface ProgressProps {
	progress: number; // More specific than 'any'
}

const Progress = ({ progress }: ProgressProps) => {
	return (
		<div className="w-full h-[8px] bg-[#EAECF0] rounded-[4px] relative">
			<div
				className="h-[8px] bg-[#002DB3] rounded-[4px] absolute top-0 left-0"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
};

export default Progress;
