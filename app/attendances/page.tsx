"use client";
import React, { useEffect, useState } from 'react'
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options'
import PageHeader from '@/components/PageHeader'
import Search from '@/components/Search'
import Image from "next/image";
import { useAttendance } from '@/utils/AttendanceContext';
import RealPagination from '@/components/RealPagination';
import { toast } from 'sonner';
import FilterDropdown from '@/components/FilterDropdown';



const Attendance = () => {
	const attendanceContext: any = useAttendance();
	const { attendanceRecords, fetchAttendance, isLoading, error, getAttendanceParams, attendanceRecordsCalender, loadingAttendanceParams } = attendanceContext || {};
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


	useEffect(() => {
		handleAttendanceParams({ page: currentPage, limit: limit });

	}, [currentPage, limit]);



	const pagination = attendanceRecordsCalender?.data
	const dataToRender: any = [
		...(attendanceRecordsCalender?.data?.data || attendanceRecordsCalender || [])
	];

	useEffect(() => {
		setCurrentPage(dataToRender)
	}, []);
	console.log("attendanceRecordsCalender", attendanceRecordsCalender);
	// console.log("dataToRender", attendanceRecords.data);

	const handleAttendanceParams = async ({ page, limit }: { page: number; limit: number }) => {

		await getAttendanceParams({
			page,
			limit,
			// Uncomment below if needed
			// filterByDate: 'range',
			// startDate: '2025-05-01',
			// endDate: '2025-05-30',
		});
	};








	// Error Handling Effect
	// useEffect(() => {
	// 	if (allisError) {
	// 		toast.error(allmessage, { toastId: customId });
	// 	} 
	// }, [allisError, allmessage, dispatch]);


	// useEffect(() => {
	// 	const datas = { startDate: startDate1, endDate: endDate1 };

	// 	handleAttendanceParams({ page: currentPage, limit: 5 });

	// }, [endDate1, startDate1]);




	const handleCustomFilters = () => {
		const datas = { startDate, endDate }
		// @ts-ignore
		getAllResponses(datas)
		setDropFilter(false)
	}



	useEffect(() => {
		setFilterd(dataToRender);
		setFilter(dataToRender);

	}, []);

	// useEffect(() => {
	// 	const results = filter?.filter(
	// 		(data: { user: { userId: string; }; customer: { loan_id: string; }; }) =>
	// 			data?.user?.userId?.toLowerCase()?.includes(result) ||
	// 			data?.customer?.loan_id?.toLowerCase()?.includes(result)
	// 	);
	// 	setData(results);
	// }, [result, filter]);

	const handleChangeFilter = (e: { target: { value: React.SetStateAction<string>; }; }) => {
		setResult(e.target.value);
	};

	const handlePagination = (page: string | number) => {
		const totalPages = pagination.pages; // Use pre-calculated pages
		const currentPage = pagination.currentPage;

		if (typeof page === 'string') {
			switch (page) {
				case 'prev':
					if (currentPage > 1) {
						handleAttendanceParams({ page: currentPage - 1, limit });
					}
					break;
				case 'next':
					if (currentPage < totalPages) {
						handleAttendanceParams({ page: currentPage + 1, limit });
					}
					break;
				default:
					break;
			}
		} else if (typeof page === 'number' && page >= 1 && page <= totalPages) {
			handleAttendanceParams({ page, limit });
		}
	};




	return (
		<div className='w-full'>
			<PageHeader text={"Attendance"} />

			<div className='flex flex-col md:flex-row justify-between gap-5 mt-6'>
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
									// @ts-ignore
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
					<table className="table">
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
							{loadingAttendanceParams ? (
								<SVGLoaderFetch colSpan={6} />
							) : dataToRender?.length === 0 ? (
								<NoRecordFound colSpan={6} />
							) : (
								dataToRender?.map((record: any) => {
									const checkIn = record?.clockIn
										? new Date(record?.clockIn).toLocaleTimeString()
										: '—';
									const checkOut = record?.clockOut
										? new Date(record?.clockOut).toLocaleTimeString()
										: '—';

									const totalHour = record?.clockIn && record?.clockOut
										? (
											(new Date(record?.clockOut).getTime() -
												new Date(record?.clockIn).getTime()) /
											(1000 * 60 * 60)
										).toFixed(2)
										: '—';

									const employeeName = record?.user?.name || 'N/A';
									const employeeEmail = record?.user?.email || '—';

									const clockInDate = record?.clockIn ? new Date(record?.clockIn) : null;
									const isEarly = clockInDate && (clockInDate.getHours() < 8 || (clockInDate.getHours() === 8 && clockInDate.getMinutes() === 0));
									const status = clockInDate ? (isEarly ? 'Early' : 'Late') : 'Absent';

									return (
										<tr key={record?.id}>
											<td className='whitespace-nowrap'>{employeeName}</td>
											<td>{employeeEmail}</td>
											<td>{checkIn}</td>
											<td>{checkOut}</td>
											<td>{totalHour}</td>
											<td>
												<div
													className={`whitespace-nowrap flex flex-row justify-center items-center px-[6px] py-[4px] w-[60px] h-[22px] 
					border font-medium text-[12px] leading-[18px] 
					${status === 'Early'
															? 'bg-[#ECFDF3] border-[#ABEFC6] text-[#067647]'
															: status === 'Late'
																? 'bg-[#FEF3F2] border-[#FECDCA] text-[#B42318]'
																: 'bg-[#FFFAF0] border-[#FEDF89] text-[#B54708]'}
					`}
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
			{pagination?.total > 1 && (
				<div className="w-full ">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
						<h3 className="text-base font-semibold text-[#050711]">
							Total {pagination?.data?.length} of {pagination?.total} Attendance
							<span className="text-sm font-normal text-gray-500 ml-2">
								Page {pagination?.currentPage} of {pagination?.pages}
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

export default Attendance
