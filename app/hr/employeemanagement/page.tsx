"use client";
import React, { useEffect, useState } from 'react'
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options'
import Search from '@/components/Search'
import Image from "next/image";
import PageHeader from '@/components/PageHeader';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/utils/UserContext';
import AddEmployeeModalModal from '@/components/modals/AddEmployeeModal';



const EmployeeDashBoard = () => {
	const { users, fetchUsers, isLoading }: any = useUserContext();
	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false);


	useEffect(() => {
		fetchUsers();
	}, []);


	// Merge API data with mock "soner"
	const dataToRender = [
		...(users?.users || users || [])
	];






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

			<AddEmployeeModalModal isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	)
}

export default EmployeeDashBoard
