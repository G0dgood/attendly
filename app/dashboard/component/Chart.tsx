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


const Chart = ({ chartdata, dateRange }: any) => {
	// Filter records by date range if provided
	const filteredData = dateRange 
		? chartdata.filter((record: any) => {
			if (!record.clockIn) return false;
			const recordDate = new Date(record.clockIn);
			if (isNaN(recordDate.getTime())) return false;
			// Format record date as local YYYY-MM-DD to match dateRange
			const recordDateStr = `${recordDate.getFullYear()}-${String(recordDate.getMonth() + 1).padStart(2, '0')}-${String(recordDate.getDate()).padStart(2, '0')}`;
			return recordDateStr >= dateRange.start && recordDateStr <= dateRange.end;
		})
		: chartdata.filter((record: any) => record.clockIn);

	// Group by userId to get earliest clock-in per user (for the selected period)
	const checkInRecords = filteredData
		.reduce((acc: any, curr: any) => {
			const userId = curr.userId;
			if (!acc[userId] || new Date(curr.clockIn) < new Date(acc[userId].clockIn)) {
				acc[userId] = curr;
			}
			return acc;
		}, {});

	const checkIns = Object.values(checkInRecords);

	// Categorize early vs. late (cutoff 8:00 AM = 480 mins)
	const earlyCount = checkIns.filter((record: any) => {
		const date = new Date(record.clockIn);
		const minutes = date.getHours() * 60 + date.getMinutes();
		return minutes <= 480;
	}).length;

	const lateCount = checkIns.filter((record: any) => {
		const date = new Date(record.clockIn);
		const minutes = date.getHours() * 60 + date.getMinutes();
		return minutes > 480;
	}).length;

	const data = {
		labels: ['Early', 'Late'],
		datasets: [{
			data: [earlyCount, lateCount],
			backgroundColor: ['#2563EB', '#e8776f'],
			borderWidth: 1
		}]
	};

	return (
		<div className='p-6 flex flex-col justify-between h-full gap-6 items-center'>
			<div className='h-full md:h-[315px]'>
				<Doughnut data={data} options={options} />
			</div>
			<div className='flex flex-row items-center gap-6'>
				<div className='flex flex-row items-center gap-2'>
					<div className="w-[14px] h-[14px] bg-[#2563EB] rounded-[2px]"></div>
					<div className="font-montserrat font-medium text-[14px] leading-[18px] text-[#141414]">
						Early
					</div>
				</div>
				<div className='flex flex-row items-center gap-2'>
					<div className="w-[14px] h-[14px] bg-[#e8776f] rounded-[2px]"></div>
					<div className="font-montserrat font-medium text-[14px] leading-[18px] text-[#141414]">
						Late
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chart;
