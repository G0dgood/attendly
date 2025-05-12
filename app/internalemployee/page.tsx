"use client";
import React, { useState } from 'react'
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options'
import PageHeader from '@/components/PageHeader'
import Search from '@/components/Search'
import { timeData } from '@/components/data';
import Image from "next/image";



const InternalEmployee = () => {
	const [displayData, setDisplayData] = useState<any[]>(timeData)
	const [isLoading, setIsLoading] = useState<boolean>(false)



	return (
		<div className='w-full'>
			<PageHeader text={"Internal Employee Attendance"} />

			<div className='flex flex-col md:flex-row justify-between gap-5 mt-6'>
				<Search />

				<div className='flex flex-col md:flex-row gap-5'>
					<button className="flex flex-row justify-center items-center px-5 py-[8px] gap-2 bg-white border border-[#E5E7EB]   font-medium text-[12px] leading-[150%] text-[#3A4050] font-lato">
						<Image
							src={require("../../public/icon/Filter_alt.svg")}
							alt="search"
						/>
						Filter
					</button>
					<button className="flex flex-row justify-center items-center px-5 py-[8px] gap-2 !bg-[#002DB3]  font-normal text-[14px] leading-[150%] text-[#FFFFFF]">
						Export
					</button>
				</div>

			</div>

			<div id='table-container'>
				<div className='table-responsive-vertical'>
					<div className='table-container'>
						<table className={true ? "table" : "table-hover table-mc-light-blue"}>
							<thead>
								<tr>
									<th>Employee ID</th>
									<th>Employee Name</th>
									<th>Check In</th>
									<th>Check Out</th>
									<th>Total Hour</th>
									<th>Status</th>
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
											<td data-title='Date Uploaded'>{user?.checkIn}</td>
											<td data-title='Last Name'>{user?.checkOut}</td>
											<td data-title='Email'>{user?.totalHour}</td>
											<td data-title='Action'>
												<div
													className={`flex flex-row justify-center items-center px-[6px] py-[4px] w-[60px] h-[22px] 
              border font-medium text-[12px] leading-[18px] 
              ${user?.status === 'On Time'
															? 'bg-[#ECFDF3] border-[#ABEFC6] text-[#067647]'
															: user?.status === 'Late'
																? 'bg-[#FEF3F2] border-[#FECDCA] text-[#B42318]'
																: user?.status === 'Absent'
																	? 'bg-[#FFFAF0] border-[#FEDF89] text-[#B54708]'
																	: user?.status === 'On Leave'
																		? 'bg-[#F0F9FF] border-[#B9E6FE] text-[#026AA2]'
																		: 'bg-[#FEF2F2] border-[#FCA5A5] text-[#B91C1C]'
														}`}
												>
													{user?.status || 'Absent'}
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

export default InternalEmployee
