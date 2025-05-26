import Image from "next/image";



const StatsCards = ({ attendanceRecords, users }: any) => {

	// Total employees from user list
	const totalEmployees = users?.length || 0;

	// Step 1: Filter to only today's CHECK_IN records
	const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
	const dataToRender = [
		...(attendanceRecords?.data?.data || attendanceRecords || [])
	];

	// Step 2: Keep only the earliest CHECK_IN per user for today
	const checkInRecords = dataToRender
		.filter((record: any) => {
			if (!record?.timestamp) return false;

			const isCheckIn = record?.type === "CHECK_IN";
			const recordDate = new Date(record?.timestamp);
			if (isNaN(recordDate.getTime())) return false; // skip invalid dates

			const isToday = recordDate.toISOString().startsWith(today);
			return isCheckIn && isToday;
		})
		.reduce((acc: any, curr: any) => {
			const userId = curr?.userId;
			if (!acc[userId] || new Date(curr?.timestamp) < new Date(acc[userId]?.timestamp)) {
				acc[userId] = curr;
			}
			return acc;
		}, {});


	const checkIns = Object.values(checkInRecords);

	// Step 3: Categorize check-ins
	let presentToday = 0;
	let lateArrivals = 0;

	checkIns.forEach((record: any) => {
		const date = new Date(record?.timestamp);
		const timeInMinutes = date.getHours() * 60 + date.getMinutes();

		if (timeInMinutes <= 480 && timeInMinutes >= 360) {
			// Between 6:00 AM and 8:00 AM
			presentToday++;
		} else if (timeInMinutes > 480) {
			lateArrivals++;
		}
	});

	// Step 4: Compute absentees = total - check-ins
	const absentToday = totalEmployees - checkIns?.length;


	const statsData = [
		{
			title: "Total Employees",
			value: totalEmployees.toLocaleString(),
			color: "#067647",
			img: <Image src={require("../../public/hugeicons_user-group.svg")} alt="megaphone" />
		},
		{
			title: "Absent Today",
			value: absentToday.toLocaleString(),
			color: "#067647",
			img: <Image src={require("../../public/solar_user-cross-broken.svg")} alt="user" />
		},
		{
			title: "Present Today",
			value: presentToday.toLocaleString(),
			color: "#067647",
			img: <Image src={require("../../public/solar_user-check-broken.svg")} alt="present" />
		},
		{
			title: "Late Arrivals",
			value: lateArrivals.toLocaleString(),
			color: "#067647",
			img: <Image src={require("../../public/solar_user-minus-broken.svg")} alt="late" />
		},
	];
	return (
		<div className="w-full md:w-[80%] flex flex-col gap-[24px]">
			{[0, 2].map((startIdx) => (
				<div key={startIdx} className="flex flex-col md:flex-row gap-[24px] md:space-y-0 space-y-6 h-auto">

					{statsData.slice(startIdx, startIdx + 2).map((item, index) => (
						<div
							key={index}
							className="flex flex-col items-start  gap-5 isolate w-[100%] md:w-[50%] h-full bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] p-5"
						>
							<div className="h-[30%] w-full">
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

										<p className="font-medium text-[14px] leading-[21px]" style={{ color: item.color }}>
										</p>
									</div>
								</div>
							</div>
							<div className="w-full h-[70%] mt-[10px]">
								<div className="relative w-full h-full">

								</div>
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default StatsCards;
