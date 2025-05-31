"use client";
import React, { useEffect, useState } from 'react'
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options'
import PageHeader from '@/components/PageHeader'
import Search from '@/components/Search'
import Image from "next/image";
import { useAttendance } from '@/utils/AttendanceContext';
import RealPagination from '@/components/RealPagination';
import FilterDropdown from '@/components/FilterDropdown';



const AttendanceSummary = () => {
	const attendanceContext: any = useAttendance();
	const { attendanceRecords, attendanceSummary, loadingAttendanceSummary, error, getAttendanceSummary } = attendanceContext || {};


	const endDates = new Date();
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const formattedEndDate = endDates.toISOString().split('T')[0];
	const totalPages = attendanceRecords?.data?.pages || 1;
	const [currentPage, setCurrentPage] = useState(1);
	const [dropFilter, setDropFilter] = useState(false);
	const [selectedRadio, setSelectedRadio] = useState("Today");
	const [data, setData] = useState<any>([]);
	const [limit, setLimit] = useState(10);
	const [filtered, setFilterd] = useState([]);
	const [filter, setFilter] = useState<any>([]);
	const [result, setResult] = useState("");

	const [startDate1] = useState(formattedEndDate);
	const [endDate1] = useState(formattedEndDate);


	useEffect(() => {// @ts-ignore
		handleAttendanceParams({ page: currentPage, limit: limit });
	}, [currentPage, limit]);



	const pagination = attendanceSummary?.data
	const dataToRender: any = [
		...(attendanceSummary.data?.data || attendanceSummary || [])
	];

	useEffect(() => {
		setCurrentPage(dataToRender)
	}, []);
	console.log("attendanceSummary", attendanceSummary);


	const handleAttendanceParams = async ({ page, limit, filterByDate, startDate, endDate }: { page: number; limit: number; filterByDate: string; startDate: string; endDate: string }) => {

		await getAttendanceSummary({
			page,
			limit,
			filterByDate: filterByDate,
			startDate: startDate,
			endDate: endDate,
		});
	};



	const handleChangeFilter = (e: { target: { value: React.SetStateAction<string>; }; }) => {
		setResult(e.target.value);
	};

	const handlePagination = (page: string | number) => {
		const totalPages = pagination.pages; // Use pre-calculated pages
		const currentPage = pagination.currentPage;

		if (typeof page === 'string') {
			switch (page) {
				case 'prev':
					if (currentPage > 1) {// @ts-ignore
						handleAttendanceParams({ page: currentPage - 1, limit });
					}
					break;
				case 'next':
					if (currentPage < totalPages) {// @ts-ignore
						handleAttendanceParams({ page: currentPage + 1, limit });
					}
					break;
				default:
					break;
			}
		} else if (typeof page === 'number' && page >= 1 && page <= totalPages) {// @ts-ignore
			handleAttendanceParams({ page, limit });
		}
	};
	const getClockInStatus = (clockIn: string | null): string => {
		if (!clockIn) return "Absent";

		const clockInTime = new Date(clockIn);
		const officialStartTime = new Date(clockInTime);
		officialStartTime.setHours(9, 0, 0); // Assume office starts at 9:00 AM

		if (clockInTime <= officialStartTime) return "On Time";
		if (clockInTime > officialStartTime) return "Late";

		return "Unknown";
	};





	return (
		<div className='w-full '>
			<PageHeader text={"Attendance Summary"} />

			<div className='flex flex-col md:flex-row justify-between gap-5 mt-6 '>
				<Search />

				<div className='flex flex-col md:flex-row gap-5 relative'>
					<button className="flex flex-row justify-center items-center px-5 py-[8px] gap-2 !bg-[#2563EB]  font-normal text-[14px] leading-[150%] text-[#FFFFFF] rounded-none">
						Export
					</button>
					<button
						onClick={() => setDropFilter(!dropFilter)}
						className="flex flex-row justify-center items-center px-5 py-[8px] gap-2 bg-white border border-[#E5E7EB] font-medium text-[12px] leading-[150%] text-[#3A4050] rounded-none"
					>
						<Image src={require("../../public/icon/Filter_alt.svg")} alt="filter" />
						Filter
					</button>

					{dropFilter && (
						<FilterDropdown
							startDate={startDate}
							endDate={endDate}
							limit={limit}
							setStartDate={setStartDate}
							setEndDate={setEndDate}
							setLimit={setLimit}
							onApply={() => {
								handleAttendanceParams({
									page: 1,
									limit,
									filterByDate: 'range',
									startDate,
									endDate,
								});
								setDropFilter(false);
							}}
						/>
					)}

				</div>

			</div>


			<div className='table-responsive-vertical mt-5'>
				<div className='table-container'>
					<table className="table" >
						<thead>
							<tr>
								<th>Full Name</th>
								<th>Email</th>
								<th className='whitespace-nowrap'>Office Location</th>
								<th className='whitespace-nowrap'>Office Address</th>
								<th>Date</th>
								<th>Check In</th>
								<th>Check Out</th>
								<th>Total Hour</th>
								<th>Status</th>
							</tr>
						</thead>

						<tbody>
							{loadingAttendanceSummary ? (
								<SVGLoaderFetch colSpan={9} />
							) : dataToRender?.length === 0 ? (
								<NoRecordFound colSpan={9} />
							) : dataToRender?.map((record: any) => {
								const checkIn = record.clockIn
									? new Date(record.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
									: '—';

								const checkOut = record.clockOut
									? new Date(record.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
									: '—';

								const checkInDate = record?.clockIn
									? new Date(record.clockIn).toLocaleDateString(undefined, {
										weekday: 'short',
										year: 'numeric',
										month: 'short',
										day: 'numeric'
									})
									: '—';

								const totalHour = record.clockIn && record.clockOut
									? (
										(new Date(record.clockOut).getTime() -
											new Date(record.clockIn).getTime()) /
										(1000 * 60 * 60)
									).toFixed(2)
									: '—';

								const employeeName = record?.name || 'N/A';
								const employeeEmail = record?.email || '—';
								const officeLocation = record?.office?.name || '—';
								const officeAddress = record?.office?.address || '—';
								const status = getClockInStatus(record.clockIn);

								return (
									<tr key={record.id}>
										<td className='whitespace-nowrap'>{employeeName}</td>
										<td>{employeeEmail}</td>
										<td>{officeLocation}</td>
										<td>{officeAddress}</td>
										<td>{checkInDate}</td>
										<td>{checkIn}</td>
										<td>{checkOut}</td>
										<td>{totalHour}</td>
										<td>
											<div
												className={`whitespace-nowrap flex flex-row justify-center items-center px-[6px] py-[4px] w-[60px] h-[22px] 
						border font-medium text-[12px] leading-[18px] 
						${status === 'On Time'
														? 'bg-[#ECFDF3] border-[#ABEFC6] text-[#067647]'
														: status === 'Late'
															? 'bg-[#FEF3F2] border-[#FECDCA] text-[#B42318]'
															: status === 'Absent'
																? 'bg-[#FFFAF0] border-[#FEDF89] text-[#B54708]'
																: 'bg-[#FEF2F2] border-[#FCA5A5] text-[#B91C1C]'
													}`}
											>
												{status}
											</div>
										</td>
									</tr>
								);
							})
							}
						</tbody>
					</table>

				</div>
			</div>

			{pagination?.total > 1 && (
				<div className="w-full ">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
						<h3 className="text-base font-semibold text-[#050711]">
							Total {pagination?.data?.length} of {pagination?.total} Attendance Summary
							<span className="text-sm font-normal text-gray-500 ml-2">
								Page {pagination?.currentPage} of {pagination?.totalPages}
							</span>
						</h3>
					</div>

					<div className="flex justify-between w-full mt-6">
						<RealPagination handlePagination={handlePagination} pagination={pagination} />
					</div>
				</div>
			)}
		</div>
	)
}

export default AttendanceSummary
