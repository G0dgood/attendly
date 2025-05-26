import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);



const options = {
	responsive: true,
	maintainAspectRatio: false,
	cutout: '60%',
	plugins: {
		legend: {
			display: false
		},
		title: {
			display: false
		}
	}
};


const Chart = ({ chartdata }: any) => {

	// Filter only CHECK_IN entries and group by userId (latest per person)
	const checkInRecords = chartdata
		.filter((record: any) => record.type === 'CHECK_IN')
		.reduce((acc: any, curr: any) => {
			// Use only the earliest check-in for each user per day
			const userId = curr.userId;
			if (!acc[userId] || new Date(curr.timestamp) < new Date(acc[userId].timestamp)) {
				acc[userId] = curr;
			}
			return acc;
		}, {});

	const checkIns = Object.values(checkInRecords);

	// Categorize into present and late
	const presentCount = checkIns.filter((record: any) => {
		const hour = new Date(record.timestamp).getHours();
		const minute = new Date(record.timestamp).getMinutes();
		const timeInMinutes = hour * 60 + minute;

		return timeInMinutes >= 360 && timeInMinutes <= 480; // 6:00 AM to 8:00 AM
	}).length;

	const lateCount = checkIns.filter((record: any) => {
		const hour = new Date(record.timestamp).getHours();
		const minute = new Date(record.timestamp).getMinutes();
		const timeInMinutes = hour * 60 + minute;

		return timeInMinutes > 480; // after 8:00 AM
	}).length;


	const data = {
		labels: ['Present', 'Late'],
		datasets: [{
			data: [presentCount, lateCount],
			backgroundColor: ['#2563EB', '#97BAFF'],
			borderWidth: 1
		}]
	};
	return (
		<div className=' p-6 flex flex-col justify-between h-full gap-6 items-center'>
			<div className='h-full md:h-[315px]'>
				<Doughnut data={data} options={options} />
			</div>
			<div className='flex flex-row items-center gap-6'>
				<div className='flex flex-row items-center gap-2'>
					<div className="w-[14px] h-[14px] bg-[#2563EB] rounded-[2px]"></div>
					<div className=" font-montserrat font-medium text-[14px] leading-[18px] text-[#141414] flex items-center">
						Present
					</div>
				</div>

				<div className='flex flex-row items-center gap-2'>
					<div className="w-[14px] h-[14px] bg-[#97BAFF] rounded-[2px]"></div>
					<div className=" font-montserrat font-medium text-[14px] leading-[18px] text-[#141414] flex items-center">
						Absent
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chart;
