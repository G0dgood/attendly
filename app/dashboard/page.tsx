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
	const { attendanceRecords, fetchAttendance, isLoading, error, getCalender }: any = useAttendance();
	const { users, fetchUsers, qrToken, isLoadingQR, successQR, setSuccessQR, dataQR }: any = useUserContext();
	const { officeLocations, isLoading: newisLoading, fetchOfficeLocations } = useOfficeLocation()!;
	const [inputs, setInputs] = useState({
		officeId: "",
		type: ""
	});

	console.log("officeLocations-dataQR", dataQR);


	useEffect(() => {
		if (successQR) {
			toast.success("QR Create!");
			setSuccessQR(false)
		}
	}, [successQR]);


	useEffect(() => {
		setInputs(prev => ({
			...prev,
			officeId: session.user.officeId,
		}));
	}, [session.user.officeId]);

	// Merge API data with mock "soner"
	const employee = [
		...(users?.users || users || [])
	];
	// Merge API data with mock "soner"
	const attendanceRecord = [
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


	return (
		<div className='w-full'>
			<div className='flex flex-col md:flex-row justify-between'>
				<div className='w-[100%] md:w-[50%]'>
					<PageHeader text={"Dashboard Overview"} />
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
				/>
				<div className='w-[100%] md:w-[30%] h-full md:h-[345px] flex flex-col gap-2'>
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
						<Chart chartdata={attendanceRecord} />
					</div>
				</div>
			</div>

		</div>
	)
}

export default EmployeeDashBoard
