import Image from "next/image";

const StatsCards = ({ attendanceRecords, users, dateFilter, dateRange }: any) => {
	const totalEmployees = users?.length || 0;

	const dataToRender = [
		...(attendanceRecords?.data?.data || attendanceRecords || [])
	];

	// Filter CHECK_IN records based on selected date range
	const checkInRecords = dataToRender
		.filter((record: any) => {
			if (!record?.timestamp) return false;
			if (record?.type !== "CHECK_IN") return false;

			const recordDate = new Date(record.timestamp);
			if (isNaN(recordDate.getTime())) return false;

			// Get date in YYYY-MM-DD format for comparison
			const recordDateStr = recordDate.toISOString().split('T')[0];
			
			// Filter based on date range
			if (dateRange) {
				const { start, end } = dateRange;
				return recordDateStr >= start && recordDateStr <= end;
			}
			
			// Fallback to today if no date range provided
			const today = new Date().toISOString().split("T")[0];
			return recordDateStr === today;
		})
		.reduce((acc: any, curr: any) => {
			const userId = curr?.userId;
			const currTime = new Date(curr.timestamp);
			const existing = acc[userId];

			if (!existing || currTime < new Date(existing.timestamp)) {
				acc[userId] = curr;
			}

			return acc;
		}, {});

	const checkIns = Object.values(checkInRecords);

	// Categorization
	let presentToday = 0;
	let lateArrivals = 0;
	let earlyArrivals = 0;

	checkIns.forEach((record: any) => {
		const localDate = new Date(new Date(record?.timestamp).getTime() - new Date().getTimezoneOffset() * 60000);
		const timeInMinutes = localDate.getHours() * 60 + localDate.getMinutes();

		presentToday++;

		if (timeInMinutes < 480) {
			earlyArrivals++;
		} else {
			lateArrivals++;
		}
	});

	const absentToday = totalEmployees - checkIns.length;

	const statsData = [
		{
			title: "Total Employees",
			value: totalEmployees,
			color: "#067647",
			img: <Image src={require("../../public/hugeicons_user-group.svg")} alt="employees" />
		},
		{
			title: dateFilter === "Today" ? "Absent Today" : "Absent",
			value: absentToday,
			color: "#B42318",
			img: <Image src={require("../../public/solar_user-cross-broken.svg")} alt="absent" />
		},
		{
			title: "Early Arrivals",
			value: earlyArrivals,
			color: "#067647",
			img: <Image src={require("../../public/solar_user-check-broken.svg")} alt="early" />
		},
		{
			title: "Late Arrivals",
			value: lateArrivals,
			color: "#B54708",
			img: <Image src={require("../../public/solar_user-minus-broken.svg")} alt="late" />
		}
	];

	return (
		<div className="w-full md:w-[80%] flex flex-col gap-[24px]">
			{[0, 2].map((startIdx) => (
				<div key={startIdx} className="flex flex-col md:flex-row gap-[24px] md:space-y-0 space-y-6 h-auto">
					{statsData.slice(startIdx, startIdx + 2).map((item, index) => (
						<div
							key={index}
							className="flex flex-col items-start gap-5 isolate w-full md:w-[50%] h-full bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] p-5"
						>
							<div className="h-[50px] w-full">
								<div className="flex flex-row gap-2">
									{item.img}
									<h2 className="font-montserrat font-semibold text-[18px] leading-6 text-gray-500">
										{item.title}
									</h2>
								</div>
								<div className="w-full flex flex-row justify-between items-center mt-4">
									<h1 className="font-semibold text-[40px] leading-[48px] text-[#141414]">
										{item.value}
									</h1>
									<div className="flex flex-row items-center gap-[8px]">
										<p className="font-medium text-[14px] leading-[21px]" style={{ color: item.color }}></p>
									</div>
								</div>
							</div>
							<div className="w-full h-[70%] mt-[10px]">
								<div className="relative w-full h-full"></div>
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default StatsCards;
