"use client";
import React, { useEffect } from 'react'
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options'
import PageHeader from '@/components/PageHeader'
import Search from '@/components/Search'
import Image from "next/image";
import { useAttendance } from '@/utils/AttendanceContext';



const Attendance = () => {
	const attendanceContext: any = useAttendance();
	const { attendanceRecords, fetchAttendance, isLoading, error } = attendanceContext || {};


	useEffect(() => {
		if (fetchAttendance) {
			fetchAttendance();
		}
	}, []);


	// Merge API data with mock "soner"
	const dataToRender = [
		...(attendanceRecords?.data?.data || attendanceRecords || [])
	];


	return (
		<div className='w-full'>
			<PageHeader text={"Attendance"} />

			<div className='flex flex-col md:flex-row justify-between gap-5 mt-6'>
				<Search />

				<div className='flex flex-col md:flex-row gap-5'>
					<button className="flex flex-row justify-center items-center px-5 py-[8px] gap-2 bg-white border border-[#E5E7EB]   font-medium text-[12px] leading-[150%] text-[#3A4050] rounded-none">
						<Image
							src={require("../../public/icon/Filter_alt.svg")}
							alt="search"
						/>
						Filter
					</button>
					<button className="flex flex-row justify-center items-center px-5 py-[8px] gap-2 !bg-[#2563EB]  font-normal text-[14px] leading-[150%] text-[#FFFFFF] rounded-none">
						Export
					</button>
				</div>

			</div>


			<div className='table-responsive-vertical'>
				<div className='table-container'>
					<table className={true ? "table" : "table-hover table-mc-light-blue"}>
						<thead>
							<tr>
								<th>Employee Name</th>
								<th>Email</th>
								<th>Check In</th>
								<th>Check Out</th>
								<th>Total Hour</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{isLoading ? (
								<SVGLoaderFetch colSpan={6} />
							) : dataToRender?.length === 0 ? (
								<NoRecordFound colSpan={6} />
							) : (
								dataToRender.map((record: any) => {
									const checkIn = record.clockIn
										? new Date(record.clockIn).toLocaleTimeString()
										: '—';
									const checkOut = record.clockOut
										? new Date(record.clockOut).toLocaleTimeString()
										: '—';

									const totalHour = record.clockIn && record.clockOut
										? (
											(new Date(record.clockOut).getTime() -
												new Date(record.clockIn).getTime()) /
											(1000 * 60 * 60)
										).toFixed(2)
										: '—';

									const employeeName = record.user?.name || 'N/A';
									const employeeEmail = record.user?.email || '—';
									const status = record.status || 'On Time'; // Default status if not present

									return (
										<tr key={record.id}>
											<td data-title='Full Name'>{employeeName}</td>
											<td data-title='Email'>{employeeEmail}</td>
											<td data-title='Check In'>{checkIn}</td>
											<td data-title='Check Out'>{checkOut}</td>
											<td data-title='Total Hour'>{totalHour}</td>
											<td data-title='Status'>
												<div
													className={`whitespace-nowrap flex flex-row justify-center items-center px-[6px] py-[4px] w-[60px] h-[22px] 
                border font-medium text-[12px] leading-[18px] 
                ${status === 'On Time'
															? 'bg-[#ECFDF3] border-[#ABEFC6] text-[#067647]'
															: status === 'Late'
																? 'bg-[#FEF3F2] border-[#FECDCA] text-[#B42318]'
																: status === 'Absent'
																	? 'bg-[#FFFAF0] border-[#FEDF89] text-[#B54708]'
																	: status === 'On Leave'
																		? 'bg-[#F0F9FF] border-[#B9E6FE] text-[#026AA2]'
																		: 'bg-[#FEF2F2] border-[#FCA5A5] text-[#B91C1C]'
														}`}
												>
													{status}
												</div>
											</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>

				</div>
			</div>

			<div className='flex flex-row justify-between w-full mt-5'>
				<button className="flex flex-row justify-center items-center py-2 gap-2  px-5  bg-white border border-[#E5E7EB] font-medium text-3 leading-[150%] text-[#3A4050]">
					<Image
						src={require("../../public/icon/arrow-left.svg")}
						alt="Next"
					/> Previous</button>
				<div className="flex flex-row items-center gap-[10px]">
					<button className="w-5 h-5 bg-[#F9FAFB] flex justify-center items-center border border-[#E5E7EB]
				text-3 leading-5 text-center text-[#050711] font-inter">1</button>
					<button className="text-3 leading-5 text-center text-[#050711] font-inter">2</button>
					<button className="text-3 leading-5 text-center text-[#050711] font-inter">3</button>
					<div>
						<Image
							src={require("../../public/icon/Number.svg")}
							alt="Next"
						/>
					</div>
					<button className="text-3 leading-5 text-center text-[#050711] font-inter">8</button>
					<button className="text-3 leading-5 text-center text-[#050711] font-inter">9</button>
					<button className="text-3 leading-5 text-center text-[#050711] font-inter">10</button>
				</div>
				<button className="flex flex-row justify-center items-center   py-2 gap-2  px-5  bg-white border border-[#E5E7EB]   font-medium text-[12px] leading-[150%] text-[#3A4050]">
					Next
					<Image
						src={require("../../public/icon/arrow-right.svg")}
						alt="Next"
					/>
				</button>
			</div>
		</div>
	)
}

export default Attendance
