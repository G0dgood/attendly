import Image from "next/image";

const statsData = [
	{
		title: "Total Employee",
		value: "2,420",
		trend: "40%",
		color: "#067647",
		chart: require("../../public/DashboardIcon/Chartmini.svg"),
	},
	{
		title: "Job Applicant",
		value: "420",
		trend: "40%",
		color: "#067647",
		chart: require("../../public/DashboardIcon/ChartminiRed.svg"),
	},
	{
		title: "Internal Staff",
		value: "20",
		trend: "40%",
		color: "#067647",
		chart: require("../../public/DashboardIcon/Chartmini.svg"),
	},
	{
		title: "Outsourced Staff",
		value: "120",
		trend: "40%",
		color: "#067647",
		chart: require("../../public/DashboardIcon/Chartmini.svg"),
	},
];

const StatsCards = () => {
	return (
		<div className="w-full md:w-[70%] flex flex-col gap-[24px]">
			{[0, 2].map((startIdx) => (
				<div key={startIdx} className="flex flex-col md:flex-row gap-[24px] md:space-y-0 space-y-6 h-auto">

					{statsData.slice(startIdx, startIdx + 2).map((item, index) => (
						<div
							key={index}
							className="flex flex-col items-start  gap-5 isolate w-[100%] md:w-[50%] h-full bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] p-3"
						>
							<div className="h-[30%] w-full">
								<h2 className="font-medium text-[16px] leading-[21px] text-[#3A4050]">
									{item.title}
								</h2>
								<div className="w-full flex flex-row justify-between items-center ">
									<h1 className="font-semibold text-[20px] leading-[46px] text-[#3A4050]">
										{item.value}
									</h1>
									<div className="flex flex-row items-center gap-[8px]">
										<Image
											src={require("../../public/DashboardIcon/trend-up.svg")}
											alt="trend-up"
										/>
										<p className="font-medium text-[14px] leading-[21px]" style={{ color: item.color }}>
											{item.trend}
										</p>
										<h6 className="font-medium text-[14px] leading-[21px] text-[#3A4050]">
											vs last month
										</h6>
									</div>
								</div>
							</div>
							<div className="w-full h-[70%] mt-[10px]">
								<div className="relative w-full h-full">
									<Image
										src={item.chart}
										alt="chart"
										fill
										className="object-cover"
									/>
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
