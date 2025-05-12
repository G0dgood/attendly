import { CheckCircle, XCircle, Clock, Info } from "lucide-react";

export const DateDetailModal = ({
	isOpen,
	onClose,
	day,
	status,
	time
}: {
	isOpen: boolean;
	onClose: () => void;
	day: number;
	status: string;
	time?: string;
}) => {
	if (!isOpen) return null;

	const statusStyles = {
		present: {
			color: "text-green-600",
			bg: "bg-green-50",
			icon: <CheckCircle className="text-green-500" size={20} />
		},
		absent: {
			color: "text-red-600",
			bg: "bg-red-50",
			icon: <XCircle className="text-red-500" size={20} />
		},
		leave: {
			color: "text-yellow-600",
			bg: "bg-yellow-50",
			icon: <Clock className="text-yellow-500" size={20} />
		},
		default: {
			color: "text-gray-600",
			bg: "bg-gray-100",
			icon: <Info className="text-gray-400" size={20} />
		}
	};

	const style = statusStyles[status as keyof typeof statusStyles] || statusStyles.default;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
			<div className="bg-white  shadow-2xl w-full max-w-md mx-4 p-6 animate-fadeIn border border-gray-200">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-[#1F2937]">Attendance Info</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition"
					>
						<span className="text-lg">✕</span>
					</button>
				</div>

				<div className="space-y-5">
					<div className="flex items-center gap-3">
						<span className="text-sm text-gray-500">Date:</span>
						<span className="font-medium text-lg text-[#111827]">{`Day ${day}`}</span>
					</div>

					<div className={`flex items-center gap-3 px-3 py-2 rounded-xl ${style.bg}`}>
						{style.icon}
						<span className={`text-sm font-medium capitalize ${style.color}`}>
							{status || "No Record"}
						</span>
					</div>

					{time && (
						<div className="text-sm text-gray-600 border-t pt-3">
							<span className="block font-semibold text-gray-800 mb-1">Time</span>
							<span>{time}</span>
						</div>
					)}
				</div>

				<button
					onClick={onClose}
					className="mt-8 w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium py-2.5 rounded-xl transition"
				>
					Close
				</button>
			</div>
		</div>
	);
};
