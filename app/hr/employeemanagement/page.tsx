"use client";

import React, { useEffect, useState } from 'react';
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options';
import Search from '@/components/Search';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { useRouter } from 'next/navigation';
import AddEmployeeModal from '@/components/modals/AddEmployeeModal';
import ManualClockInModal from '@/components/modals/ManualClockInModal';
import { toast } from 'sonner';
import RealPagination from '@/components/RealPagination';
import FilterDropdown from '@/components/FilterDropdown';
import { useGetAttendanceQuery, useAddAttendanceManualMutation, useGetUsersParamsQuery, useQrTokenMutation } from '@/utils/APISlice/api';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorAttendance, setSuccessAttendance } from '@/utils/APISlice/attendanceSlice';

export const dynamic = 'force-dynamic';

interface User {
	id: string;
	name?: string;
	gender?: string;
	phone?: string;
	isActive?: string;
	role?: string;
	email?: string;
}

const EmployeeDashBoard = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [dropFilter, setDropFilter] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [isClockInModalOpen, setIsClockInModalOpen] = useState(false);

	const { dataQR } = useSelector((state: any) => state.user);
	const { successAttendance, errorAttendance } = useSelector((state: any) => state.attendance);

	const { data: usersParamsData, isLoading: isLoadingparams, refetch: refetchUsers } = useGetUsersParamsQuery({
		page: currentPage,
		limit,
		filterByDate: startDate && endDate ? 'range' : undefined,
		startDate,
		endDate,
	}, {
		skip: !currentPage || !limit, // Skip if params aren't ready
	});
	const { data: attendanceRecords } = useGetAttendanceQuery();
	const [addAttendanceManual, { isLoading: isLoadingAttendance }] = useAddAttendanceManualMutation();
	const [triggerQrToken, { isLoading: isLoadingQR }] = useQrTokenMutation();

	const usersParams = usersParamsData?.data || usersParamsData;

	useEffect(() => {
		if (successAttendance) {
			setIsClockInModalOpen(false);
			refetchUsers();
			dispatch(setSuccessAttendance(null));
			toast.success('Attendance added successfully!');
		} else if (errorAttendance) {
			toast.error(errorAttendance || 'Failed to add attendance.');
			dispatch(setErrorAttendance(null));
		}
	}, [successAttendance, errorAttendance]);

	const handleClockInClick = (user: any) => {
		setSelectedUser(user);
		setIsClockInModalOpen(true);
	};

	const confirmManualClockIn = async () => {
		if (selectedUser) {
			const token = dataQR?.data?.token || '';
			const officeId = dataQR?.data?.officeId || '';
			const userId = selectedUser.id;
			try {
				await addAttendanceManual({ token, userId, officeId }).unwrap();
				dispatch(setSuccessAttendance(true));
			} catch (error: any) {
				const errorMsg = error?.data?.message || 'Failed to add attendance';
				dispatch(setErrorAttendance(errorMsg));
			}
		}
	};

	const handlePagination = (page: string | number) => {
		const totalPages = usersParams?.pages;
		const currentPageNum = usersParams?.currentPage;

		if (typeof page === 'string') {
			if (page === 'prev' && currentPageNum > 1) {
				setCurrentPage(currentPageNum - 1);
			} else if (page === 'next' && currentPageNum < totalPages) {
				setCurrentPage(currentPageNum + 1);
			}
		} else if (typeof page === 'number' && page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const getStatus = (clockIn: string | null) => {
		if (!clockIn) return 'Absent';
		const clockInDate = new Date(clockIn);
		const cutoffDate = new Date(clockInDate);
		cutoffDate.setHours(8, 0, 0, 0);
		return clockInDate > cutoffDate ? 'Late' : 'On Time';
	};

	const getUserStatus = (userId: string) => {
		const attendanceRecord = attendanceRecords?.data?.data?.find((record: any) => record.userId === userId);
		return getStatus(attendanceRecord?.clockIn || null);
	};

	const pagination = usersParams;
	const dataToRender = [...(usersParams?.users || usersParams || [])];


	const handleAttendanceParams = async ({ page, limit, filterByDate, startDate, endDate }: { page: number; limit: number; filterByDate: string; startDate: string; endDate: string }) => {
		setCurrentPage(page);
		setLimit(limit);
		setStartDate(startDate);
		setEndDate(endDate);
	};


	return (
		<div>
			<PageHeader text="Employee" />

			<div className='flex flex-col md:flex-row justify-between gap-5 mt-6 '>
				<Search />
				<div className='flex flex-col md:flex-row gap-5 relative'>
					<button
						onClick={() => setIsOpen(true)}
						className="cursor-pointer flex flex-col md:flex-row justify-center items-center gap-2 md:w-[150px] h-[40px] !bg-[#2563EB] font-normal text-[14px] leading-[150%] text-[#FFFFFF] rounded-none"
					>
						Add Employee
					</button>
					<button
						onClick={() => setDropFilter(!dropFilter)}
						className="flex flex-row justify-center items-center px-5 py-[8px] gap-2 bg-white border border-[#E5E7EB] font-medium text-[12px] leading-[150%] text-[#3A4050] rounded-none cursor-pointer"
					>
						<Image src={require("../../../public/icon/Filter_alt.svg")} alt="filter" />
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

			<div className="table-responsive-vertical mt-5">
				<div className="table-container">
					<table className="table">
						<thead>
							<tr>
								<th>Clock</th>
								<th>Full Name</th>
								<th>Gender</th>
								<th>Phone</th>
								<th>Status</th>
								<th>Attendance</th>
								<th>Designation</th>
								<th>Email address</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{isLoadingparams ? (
								<SVGLoaderFetch colSpan={9} />
							) : dataToRender?.length === 0 ? (
								<NoRecordFound colSpan={9}>No employee records found!</NoRecordFound>
							) : (
								dataToRender.map((user: any) => {
									const status = getUserStatus(user.id);
									const statusStyle = {
										'On Time': 'bg-[#ECFDF3] border-[#ABEFC6] text-[#067647]',
										Late: 'bg-[#FEF3F2] border-[#FECDCA] text-[#B42318]',
										Absent: 'bg-[#FFFAF0] border-[#FEDF89] text-[#B54708]',
										'On Leave': 'bg-[#F0F9FF] border-[#B9E6FE] text-[#026AA2]',
										Unknown: 'bg-[#FEF2F2] border-[#FCA5A5] text-[#B91C1C]',
									}[status] || 'bg-gray-100 text-gray-600';

									return (
										<tr key={user.id}>
											<td data-title="Clock">
												<button
													onClick={() => handleClockInClick(user)}
													className="cursor-pointer flex flex-row justify-center items-center px-[6px] py-[4px] w-[70px] h-[22px] border font-medium text-[12px] leading-[18px] bg-[#EFF6FF] border-[#93C5FD] text-[#1D4ED8] hover:bg-[#DBEAFE] transition"
													title="Copy Office ID"
												>
													<span className="mr-1">Clock In</span>
													<svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
														<path d="M4 4a2 2 0 012-2h6a2 2 0 012 2v2h2a2 2 0 012 2v8a2 2 0 01-2 2h-6a2 2 0 01-2-2v-2H6a2 2 0 01-2-2V4z" />
													</svg>
												</button>
											</td>
											<td className='whitespace-nowrap'>{user?.name}</td>
											<td >{user?.gender}</td>
											<td >{user?.phone}</td>
											<td >
												<div
													className={`flex flex-row justify-center items-center px-[6px] py-[4px] w-[46px] h-[22px] border font-medium text-[12px] leading-[18px] ${user?.isActive === 'active'
														? 'bg-[#ECFDF3] border-[#ABEFC6] text-[#067647]'
														: 'bg-[#FEF2F2] border-[#FCA5A5] text-[#B91C1C]'
														}`}
												>
													{user?.isActive === 'active' ? 'Active' : 'Inactive'}
												</div>
											</td>
											<td data-title="Attendance">
												<div
													className={`whitespace-nowrap flex flex-row justify-center items-center px-[6px] py-[4px] w-[60px] h-[22px] border font-medium text-[12px] leading-[18px] ${statusStyle}`}
												>
													{status}
												</div>
											</td>
											<td>{user?.role || 'N/A'}</td>
											<td>{user?.email}</td>
											<td>
												<div className="flex flex-row gap-[20px]">
													<button className="cursor-pointer">
														<Image src={require('../../../public/Trash_light.svg')} alt="delete" />
													</button>
													<button className="cursor-pointer" onClick={() => router.push(`/hr/viewemployee`)}>
														<Image src={require('../../../public/View_light.svg')} alt="view" />
													</button>
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
				<div className="w-full">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
						<h3 className="text-base font-semibold text-[#050711]">
							Total {pagination?.data?.length} of {pagination?.total} Employees
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

			<ManualClockInModal
				isOpen={isClockInModalOpen}
				onClose={() => setIsClockInModalOpen(false)}
				onConfirm={confirmManualClockIn}
				isLoadingAttendance={isLoadingAttendance}
			/>

			{typeof window !== 'undefined' && <AddEmployeeModal isOpen={isOpen} setIsOpen={setIsOpen} />}
		</div>
	);
};

export default EmployeeDashBoard;