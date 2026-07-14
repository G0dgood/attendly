'use client';

import React, { useEffect, useState } from 'react';
import { SVGLoader } from '../SVGLoader';

interface ManualClockInModalProps {
	isOpen: boolean;
	isLoadingAttendance: boolean;
	onClose: () => void;
	onConfirm: () => void;
	type?: 'CHECK_IN' | 'CHECK_OUT';
}

const ManualClockInModal: React.FC<ManualClockInModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	isLoadingAttendance,
	type = 'CHECK_IN'
}) => {
	const [currentTime, setCurrentTime] = useState<string>("");

	useEffect(() => {
		const updateClock = () => {
			const now = new Date();
			const formatted = now.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			});
			setCurrentTime(formatted);
		};

		updateClock();
		const interval = setInterval(updateClock, 1000);
		return () => clearInterval(interval);
	}, []);

	if (!isOpen) return null;

	const isCheckIn = type === 'CHECK_IN';

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000051] bg-opacity-50   ">
			<div className="w-full max-w-md   !bg-[#fff] border border-blue-300  shadow-2xl p-8 transform transition-all duration-300 scale-100 rounded-none">
				<h2 className="text-3xl font-bold text-center !text-blue-800 mb-2">
					Confirm Manual {isCheckIn ? 'Clock-In' : 'Clock-Out'}
				</h2>
				<p className="text-center text-gray-700 text-sm mb-6">
					This action will manually register the employee’s {isCheckIn ? 'clock-in' : 'clock-out'} at the current time. Please
					confirm if you'd like to proceed.
				</p>

				<div className="flex justify-center items-center mb-6 rounded-none">
					<div className="text-4xl font-mono font-semibold !text-purple-800 bg-white px-6 py-3   shadow-md border border-purple-200 rounded-none">
						{currentTime}
					</div>
				</div>

				<div className="flex flex-col sm:flex-row justify-center gap-4 mt-2">

					<button
						onClick={onClose}
						className="px-6 py-3   !bg-red-500 !hover:bg-red-600 text-white font-semibold transition shadow-md w-full sm:w-auto rounded-none cursor-pointer"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="px-6 py-3   !bg-green-500 !hover:bg-green-600 text-white font-semibold transition shadow-md w-full sm:w-auto rounded-none cursor-pointer"
					>
						{isLoadingAttendance ? <SVGLoader width={"30px"} height={"30px"} color={"#0866FF"} /> : (isCheckIn ? "Clock In" : "Clock Out")}

					</button>
				</div>
			</div>
		</div>
	);
};

export default ManualClockInModal;
