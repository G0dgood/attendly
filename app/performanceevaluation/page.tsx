"use client";
import React, { useEffect, useState } from 'react'
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options'
import PageHeader from '@/components/PageHeader'
import Search from '@/components/Search'
import { evaluationData, timeData } from '@/components/data';
import Image from "next/image";
import { useRouter } from 'next/navigation';



const InternalEmployee = () => {
	const [displayData, setDisplayData] = useState<any[]>(evaluationData)
	const [isLoading, setIsLoading] = useState<boolean>(false)


	const router = useRouter()
	const handleLogin = () => {
		router.push('/performanceevaluation/erperformanceevaluation')
	}
	return (
		<div>
			<PageHeader text={"Performance Evaluation"} />

			<div className='flex flex-col md:flex-row justify-between gap-5 mt-6'>
				<Search />

				<div className='flex flex-row gap-5'>
					<button className=" w-full !bg-[#fff] flex flex-row justify-center items-center py-2 gap-4  px-4 border border-[#E5E7EB] font-medium text-[12px] leading-[150%] text-[#3A4050]">
						<Image
							src={require("../../public/icon/Filter_alt.svg")}
							alt="search"
						/>
						Filter
					</button>
					{/* <button className="flex flex-row justify-center items-center px-2 py-[8px] gap-2  px-[20px] !bg-[#002DB3]  font-normal text-[14px] leading-[150%] text-[#FFFFFF]">
						Export
					</button> */}
				</div>

			</div>

			<div id='table-container'>
				<div className='table-responsive-vertical'>
					<div className='table-container'>
						<table className={true ? "table" : "table-hover table-mc-light-blue"}>
							<thead>
								<tr>
									<th>Employee</th>
									<th>Role</th>
									<th>Department</th>
									<th>Manager</th>
									<th>Overall Rating</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{isLoading ? (
									<SVGLoaderFetch colSpan={8} />
								) : displayData.length === 0 ? (
									<NoRecordFound colSpan={8} />
								) : (
									displayData.map((user: any) => (
										<tr key={user._id}>
											<td data-title='Employee ID'>{user?.uid}</td>
											<td data-title='First Name'>{user?.role}</td>
											<td data-title='Date Uploaded'>{user?.department}</td>
											<td data-title='Last Name'>{user?.manager}</td>
											<td data-title='Overall Rating'>
												<div className='flex flex-row items-center gap-[8px]'>
													<span className='font-medium text-[14px] leading-[150%] text-[#002DB3] '>
														{user?.overallrating}
													</span>
													<span className='flex flex-row gap-[2px]'>
														<Image
															src={require("../../public/icon/Star_fill.svg")}
															alt="star"
														/>
														<Image
															src={require("../../public/icon/Star_fill.svg")}
															alt="star"
														/>
														<Image
															src={require("../../public/icon/Star_fill.svg")}
															alt="star"
														/>
														<Image
															src={require("../../public/icon/Star_fill.svg")}
															alt="star"
														/>
														<Image
															src={require("../../public/icon/Star_light.svg")}
															alt="star"
														/>
													</span>
												</div>

											</td>
											<td data-title='Action'>
												<button
													className='font-medium text-[14px] leading-[150%] text-[#002DB3] cursor-pointer'
													onClick={handleLogin}>
													{user?.action}
												</button>
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

export default InternalEmployee
