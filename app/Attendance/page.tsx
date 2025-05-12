"use client";
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import PageHeader from '@/components/PageHeader';
import Search from '@/components/Search';
import { docData } from '@/components/data';
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options';



const DocumentManagement = () => {
	const [displayData, setDisplayData] = useState<any[]>(docData)
	const [isLoading, setIsLoading] = useState<boolean>(false)



	return (
		<div>
			<PageHeader text={"Document Management"} />

			<div className='flex flex-row justify-between gap-5 mt-6'>
				<Search />
				<button className="flex flex-row justify-center items-center  py-[8px] gap-2  px-5 !bg-[#002DB3]  font-normal text-[14px] leading-[150%] text-[#FFFFFF]">
					Upload
				</button>
			</div>

			<div id='table-container'>
				<div className='table-responsive-vertical'>
					<div className='table-container'>
						<table className={true ? "table" : "table-hover table-mc-light-blue"}>
							<thead>
								<tr>
									<th>Name</th>
									<th>Upload By</th>
									<th>Date Uploaded</th>
									<th>Number of Pages</th>
									<th>Size</th>
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
											<td data-title='Date Uploaded'>{user?.dateUploaded}</td>
											<td data-title='Last Name'>{user?.numberofPages}</td>
											<td data-title='Email'>{user?.size}</td>
											<td data-title='Action'>
												<div className='flex flex-row gap-[20px]'>
													<button className='cursor-pointer'>
														<Image
															src={require("../../public/Download_light.svg")}
															alt="search"
														/>
													</button>
													<button className='cursor-pointer'>
														<Image
															src={require("../../public/Trash_light.svg")}
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

export default DocumentManagement
