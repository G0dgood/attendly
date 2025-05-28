"use client";
import React, { useEffect, useState } from 'react'
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options'
import Search from '@/components/Search'
import Image from "next/image";
import PageHeader from '@/components/PageHeader';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/utils/UserContext';
import AddEmployeeModalModal from '@/components/modals/AddEmployeeModal';
import { useAttendance } from '@/utils/AttendanceContext';
import ManualClockInModal from '@/components/modals/ManualClockInModal';
import { toast } from 'sonner';

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
	const { users, fetchUsers, isLoading, dataQR }: any = useUserContext();
	const attendanceContext: any = useAttendance();
	const { addAttendanceManual, isLoadingAttendance, successAttendance, errorAttendance, setSuccessAttendance, setErrorAttendance } = attendanceContext || {};

	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false);
	const [input, setInput] = useState({
		token: "",
		userId: "",
	});

	console.log("dataQR-errorAttendance", errorAttendance);

	useEffect(() => {
		fetchUsers();
	}, []);


	useEffect(() => {
		if (successAttendance) {
			setIsClockInModalOpen(false);
			fetchUsers();
			setSuccessAttendance(false);
			toast.success("Attendance added successfully!");
		} else if (errorAttendance) {
			toast.error(errorAttendance || "Failed to add attendance.");
			setErrorAttendance(null);
		}

	}, [successAttendance, errorAttendance]);


	const dataToRender = [
		...(users?.users || users || [])
	];


	// const handleAddAttendanceManual = (user: any) => {
	// 	setInput(prev => ({
	// 		...prev,
	// 		token: dataQR.data.token || "",
	// 		userId: user?.id || "",
	// 		officeId: dataQR.data.officeId || "",
	// 	}));

	// 	addAttendanceManual(input);
	// }



	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [isClockInModalOpen, setIsClockInModalOpen] = useState(false);

	const handleClockInClick = (user: any) => {
		setSelectedUser(user);
		setIsClockInModalOpen(true);
	};

	const confirmManualClockIn = () => {
		if (selectedUser) {
			setInput(prev => ({
				...prev,
				token: dataQR?.data?.token || "",
				userId: selectedUser?.id || "",
				officeId: dataQR?.data?.officeId || "",
			}));
			addAttendanceManual(input);
		}
	};




	return (
		<div>
			<PageHeader text={"Employee"} />

			<div className='flex flex-col md:flex-row justify-between gap-[20px] mt-[24px]'>
				<Search />
				<button
					onClick={() => setIsOpen(true)}
					className="cursor-pointer flex flex-col md:flex-row justify-center items-center  gap-2   md:w-[150px] h-[40px] !bg-[#2563EB]  font-normal text-[14px] leading-[150%] text-[#FFFFFF] rounded-none">
					Add Employee
				</button>
			</div>


			<div className='table-responsive-vertical'>
				<div className='table-container'>
					<table className="table"  >
						<thead>
							<tr>
								<th>Clock</th>
								<th>Full Name</th>
								<th>Gender</th>
								<th>Phone</th>
								<th>Status</th>
								<th>Designation</th>
								<th>Email address</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{isLoading ? (
								<SVGLoaderFetch colSpan={8} />
							) : dataToRender?.length === 0 ? (
								<NoRecordFound colSpan={8}>No employee records found!</NoRecordFound>
							) : (
								dataToRender.map((user: any) => (
									<tr key={user.id}>
										<td data-title="First Name">
											<button
												onClick={() => handleClockInClick(user)}
												className="cursor-pointer flex flex-row justify-center items-center px-[6px] py-[4px] w-[70px] h-[22px] 
      border font-medium text-[12px] leading-[18px] 
      bg-[#EFF6FF] border-[#93C5FD] text-[#1D4ED8] hover:bg-[#DBEAFE] transition"
												title="Copy Office ID"
											>
												<span className="mr-1">Clock In</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-3.5 w-3.5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M4 4a2 2 0 012-2h6a2 2 0 012 2v2h2a2 2 0 012 2v8a2 2 0 01-2 2h-6a2 2 0 01-2-2v-2H6a2 2 0 01-2-2V4z" />
												</svg>
											</button>
										</td>
										<td data-title="First Name">{user?.name}</td>
										<td data-title="Gender">{user?.gender}</td>
										<td data-title="Phone">{user?.phone}</td>
										<td data-title="Status">
											<div
												className={`flex flex-row justify-center items-center px-[6px] py-[4px] w-[46px] h-[22px] 
                    border font-medium text-[12px] leading-[18px] 
                    ${user?.isActive === "active"
														? "bg-[#ECFDF3] border-[#ABEFC6] text-[#067647]"
														: "bg-[#FEF2F2] border-[#FCA5A5] text-[#B91C1C]"}
                  `}
											>
												{user?.isActive === "active" ? "Active" : "Inactive"}
											</div>
										</td>
										<td data-title="Designation">{user?.role || "N/A"}</td>
										<td data-title="Email">{user?.email}</td>
										<td data-title="Action">
											<div className="flex flex-row gap-[20px]">
												<button className="cursor-pointer">
													<Image
														src={require("../../../public/Trash_light.svg")}
														alt="delete"
													/>
												</button>
												<button
													className="cursor-pointer"
													onClick={() => router.push(`/hr/viewemployee`)}
												>
													<Image
														src={require("../../../public/View_light.svg")}
														alt="view"
													/>
												</button>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
			<ManualClockInModal
				isOpen={isClockInModalOpen}
				onClose={() => setIsClockInModalOpen(false)}
				onConfirm={confirmManualClockIn}
				isLoadingAttendance={isLoadingAttendance}
			/>

			<AddEmployeeModalModal isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	)
}

export default EmployeeDashBoard
