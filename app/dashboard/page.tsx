"use client";
import React, { useEffect, useState } from 'react'
import PageHeader from '@/components/PageHeader'
import { useSession } from 'next-auth/react';
import StatsCards from './StatsCards';
import CustomDateDropdown from '@/components/CustomDateDropdown';
import AttendanceList from './component/AttendanceList';
import Chart from './component/Chart';
import { useAttendance } from '@/utils/AttendanceContext';
import { toast } from 'sonner';
import { useUserContext } from '@/utils/UserContext';
import QrScanner from './component/QrScanner';
import { useOfficeLocation } from '@/utils/OfficeLocationContext';
import Dropdowns from '@/components/CustomDropdown';
import { SVGLoader } from '@/components/SVGLoader';
import { useRouter } from 'next/navigation';



const EmployeeDashBoard = () => {
	const router = useRouter();
	const { data: session }: any = useSession();
	const { attendanceRecords, fetchAttendance, isLoading, error, getCalender, attendanceRecordsCalender }: any = useAttendance();
	const { users, fetchUsers, qrToken, isLoadingQR, successQR, setSuccessQR, dataQR }: any = useUserContext();
	const { officeLocations, isLoading: newisLoading, fetchOfficeLocations } = useOfficeLocation()!;
	const [inputs, setInputs] = useState({
		officeId: "",
		type: ""
	});
	const [selectedDateFilter, setSelectedDateFilter] = useState("Today");

	console.log("officeLocations-dataQR", dataQR);


	useEffect(() => {
		if (successQR) {
			toast.success("QR Create!");
			setSuccessQR(false)
		}
	}, [successQR]);


	useEffect(() => {
		if (session?.user?.officeId) {
			setInputs(prev => ({
				...prev,
				officeId: session.user.officeId,
			}));
		}
	}, [session?.user?.officeId]);

	// Merge API data with mock "soner"
	const employee = [
		...(users?.users || users || [])
	];
	// Merge API data - use filtered calendar data if date filter is active, otherwise use regular records
	const attendanceRecord = selectedDateFilter !== "Today" && attendanceRecordsCalender?.data
		? [
			...(attendanceRecordsCalender?.data?.data || attendanceRecordsCalender || [])
		]
		: [
			...(attendanceRecords?.data?.data || attendanceRecords || [])
		];





	useEffect(() => {
		const controller = new AbortController();

		const fetchData = async () => {
			try {
				await fetchUsers();
				await fetchAttendance();
				await fetchOfficeLocations();
			} catch (error: any) {
				// toast.error(error.message);
			}
		};

		fetchData();

		return () => {

			controller.abort();
		};
	}, []);

	// Fetch attendance when date filter changes
	useEffect(() => {
		if (getCalender) {
			const dateRange = getDateRange(selectedDateFilter);
			getCalender({
				page: 1,
				limit: 50,
				filterByDate: 'range',
				startDate: dateRange.start,
				endDate: dateRange.end,
			});
		}
	}, [selectedDateFilter]);




	const handleOnChange = (input: string, value: string) => {
		setInputs((prevState) => ({
			...prevState,
			[input]: value,
		}));
	};




	const handleSubmit = () => {

		qrToken(inputs)
	}

	const handleSubmits = () => {
		getCalender({
			page: 1,
			limit: 50,
			filterByDate: 'range',
			startDate: '2025-05-01',
			endDate: '2025-05-30',
		})
	}

	// Date filter functions
	const getDateRange = (filter: string) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		switch (filter) {
			case "Today":
				const todayEnd = new Date(today);
				todayEnd.setHours(23, 59, 59, 999);
				return {
					start: today.toISOString().split('T')[0],
					end: todayEnd.toISOString().split('T')[0],
					label: "Today"
				};
			case "Yesterday":
				const yesterday = new Date(today);
				yesterday.setDate(yesterday.getDate() - 1);
				const yesterdayEnd = new Date(yesterday);
				yesterdayEnd.setHours(23, 59, 59, 999);
				return {
					start: yesterday.toISOString().split('T')[0],
					end: yesterdayEnd.toISOString().split('T')[0],
					label: "Yesterday"
				};
			case "Last Week":
				const lastWeekStart = new Date(today);
				lastWeekStart.setDate(today.getDate() - 7);
				return {
					start: lastWeekStart.toISOString().split('T')[0],
					end: today.toISOString().split('T')[0],
					label: "Last Week"
				};
			case "Last Month":
				const lastMonthStart = new Date(today);
				lastMonthStart.setMonth(today.getMonth() - 1);
				return {
					start: lastMonthStart.toISOString().split('T')[0],
					end: today.toISOString().split('T')[0],
					label: "Last Month"
				};
			default:
				return {
					start: today.toISOString().split('T')[0],
					end: today.toISOString().split('T')[0],
					label: "Today"
				};
		}
	};

	const handleDateFilter = (filter: string) => {
		setSelectedDateFilter(filter);
	};


	return (
		<div className='w-full'>
			<div className='flex flex-col md:flex-row justify-between items-center'>
				<div>
					<PageHeader text={"Dashboard Overview"} />
				</div>
				<div className='flex flex-col md:flex-row justify-between items-center gap-4  p-4 bg-gray-50 rounded-none'>
					<div className='flex flex-col md:flex-row gap-2'>
						<span className="text-sm text-gray-600">{getDateRange(selectedDateFilter).label}</span>
					</div>
					<div className='flex flex-row gap-2'>
						<button
							onClick={() => handleDateFilter("Today")}
							className={`px-3 py-1 text-xs rounded-none border ${selectedDateFilter === "Today"
									? "!bg-blue-600 text-white !border-blue-600"
									: "!bg-white !text-gray-700 !border-gray-300 !hover:bg-gray-50"
								}`}
						>
							Today
						</button>
						<button
							onClick={() => handleDateFilter("Yesterday")}
							className={`px-3 py-1 text-xs rounded-none border ${selectedDateFilter === "Yesterday"
									? "!bg-blue-600 text-white !border-blue-600"
									: "!bg-white !text-gray-700 !border-gray-300 !hover:bg-gray-50"
								}`}
						>
							Yesterday
						</button>
						<button
							onClick={() => handleDateFilter("Last Week")}
							className={`px-3 py-1 text-xs rounded-none border ${selectedDateFilter === "Last Week"
									? "!bg-blue-600 text-white !border-blue-600"
									: "!bg-white !text-gray-700 !border-gray-300 !hover:bg-gray-50"
								}`}
						>
							Last Week
						</button>
						<button
							onClick={() => handleDateFilter("Last Month")}
							className={`px-3 py-1 text-xs rounded-none border ${selectedDateFilter === "Last Month"
									? "!bg-blue-600 text-white !border-blue-600"
									: "!bg-white !text-gray-700 !border-gray-300 !hover:bg-gray-50"
								}`}
						>
							Last Month
						</button>
					</div>
				</div>
				<div className='flex flex-row gap-2 w-[100%]  md:w-[27%] pt-[20px] md:p-[0px]'>
					<Dropdowns
						label="Clock Type"
						options={["CHECK_IN", "CHECK_OUT"]}
						name="type"
						handleOnChange={handleOnChange}
					/>
					<button
						className={`flex flex-row justify-center items-center px-[6px] py-[4px] h-[40px] w-[150px]   border font-medium text-[12px] leading-[18px]  
												  !bg-[#2563EB] border-[#B9E6FE] text-[#fff] rounded-none
									`}
						onClick={handleSubmit}
						disabled={isLoadingQR}
					>
						Create
					</button>
				</div>
			</div>
			<div className='flex flex-col md:flex-row gap-[24px] mt-[24px]  '>
				<StatsCards
					attendanceRecords={attendanceRecord}
					users={employee}
					dateFilter={selectedDateFilter}
					dateRange={getDateRange(selectedDateFilter)}
				/>
				<div className='w-[100%] md:w-[30%] h-full md:h-[268px] flex flex-col gap-2'>
					<QrScanner dataQR={dataQR} isLoadingQR={isLoadingQR} />

				</div>
			</div >


			<div className=' mt-[60px] h-full md:h-[350px] w-full flex flex-col md:flex-row gap-[24px]'>
				<div className='w-full md:w-[70%] h-full'>
					<div className='flex flex-row  justify-between mb-8'>
						<h3 className="font-montserrat font-medium text-[20px] leading-6 text-[#141414] flex items-center order-0 flex-none grow-0">
							Attendance list
						</h3>
						<button
							onClick={() => router.push('/attendances')}
							className="font-bold text-[16px] leading-[17px] text-[#2563EB] cursor-pointer	flex items-center   flex-none  px-4 py-2 bg-white"
						>
							View All
						</button>

					</div>
					<AttendanceList />
				</div>

				<div className='w-full md:w-[30%] h-full '>
					<div className=' mb-4'>
						<CustomDateDropdown label={''} name={''} handleOnChange={handleOnChange} />

					</div>

					<div className='bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]  w-full h-full '>
						<Chart chartdata={attendanceRecord} dateRange={getDateRange(selectedDateFilter)} />
					</div>
				</div>
			</div>

		</div>
	)
}

export default EmployeeDashBoard
