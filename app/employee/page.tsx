"use client";
import React, { useEffect, useState } from 'react'
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options'
import PageHeader from '@/components/PageHeader'
import Search from '@/components/Search'
import { dummyEmployees } from '@/components/data';
import Image from "next/image";



const EmployeeDashBoard = () => {
	const [displayData, setDisplayData] = useState<any[]>(dummyEmployees)
	const [isLoading, setIsLoading] = useState<boolean>(false)



	return (
		<div>
			<PageHeader text={"Employee"} />

			<div className='flex flex-row justify-between gap-[20px] mt-[24px]'>
				<Search />
				<button className="flex flex-row justify-center items-center px-2 py-[8px] gap-2 w-[150px] h-[40px] !bg-[#002DB3]  font-normal text-[14px] leading-[150%] text-[#FFFFFF]">
					Add New Employee
				</button>
			</div>

			<div id='table-container'>
				<div className='table-responsive-vertical'>
					<div className='table-container'>
						<table className={true ? "table" : "table-hover table-mc-light-blue"}>
							<thead>
								<tr>
									<th>Employee ID</th>
									<th>First Name</th>
									<th>Middle Name</th>
									<th>Last Name</th>
									<th>Status</th>
									<th>Designation</th>
									<th>Email address</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{isLoading ? (
									<SVGLoaderFetch colSpan={8} />
								) : displayData?.length === 0 ? (
									<NoRecordFound colSpan={8}>No employee records found!</NoRecordFound>
								) : (
									displayData.map((user: any) => (
										<tr key={user._id}>
											<td data-title='Employee ID'>{user?.uid}</td>
											<td data-title='First Name'>{user?.firstName}</td>
											<td data-title='Middle Name'>{user?.middleName || '-'}</td>
											<td data-title='Last Name'>{user?.lastName}</td>
											<td data-title='Status'>
												<div
													className={`flex flex-row justify-center items-center px-[6px] py-[4px] w-[46px] h-[22px] 
    border font-medium text-[12px] leading-[18px] 
    ${user?.status === 'Active'
															? 'bg-[#ECFDF3] border-[#ABEFC6] text-[#067647]'
															: 'bg-[#FEF2F2] border-[#FCA5A5] text-[#B91C1C]'}
  `}
												>
													{user?.status || 'Active'}
												</div>

											</td>
											<td data-title='Designation'>{user?.designation || 'N/A'}</td>
											<td data-title='Email'>{user?.email}</td>
											<td data-title='Action'>
												<div className='flex flex-row gap-[10px]'>
													<button className='cursor-pointer'>
														<Image
															src={require("../../public/Trash_light.svg")}
															alt="search"
														/>
													</button>
													<button className='cursor-pointer'>
														<Image
															src={require("../../public/View_light.svg")}
															alt="search"
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
			</div>
		</div>
	)
}

export default EmployeeDashBoard
