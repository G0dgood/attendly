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
			<PageHeader text={"Welcome back Jane "} />

			{/* <div className='flex flex-row justify-between gap-[20px] mt-[24px]'>
				<Search />
				<button className="flex flex-row justify-center items-center px-2 py-[8px] gap-2 w-[150px] h-[40px] !bg-[#002DB3]  font-normal text-[14px] leading-[150%] text-[#FFFFFF]">
					Add New Employee
				</button>
			</div> */}
			<div className='flex flex-row   gap-[24px] mt-[24px]'>
				<div className='w-[70%] flex	flex-col gap-[24px]'>
					<div className='flex	flex-row gap-[24px] '>
						<div className="flex flex-col items-start !p-6 gap-5 isolate w-[50%] h-[225px] bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] rounded-lg"
							style={{ padding: '24px' }}>
							<div className=' h-[40%] w-full'>
								<h2 className=" font-medium text-[14px] leading-[21px] text-[#3A4050]">
									Total Employee
								</h2>
								<div className='w-full flex flex-row justify-between items-center mt-[5px]'>
									<h1 className="font-semibold text-[40px] leading-[56px] text-[#3A4050]">2,420</h1>

									<div className='flex flex-row items-center gap-[8px]'>
										<Image
											src={require("../../public/DashboardIcon/trend-up.svg")}
											alt="trend-up"
										/>
										<p className='font-medium text-[14px] leading-[21px] text-center text-[#067647]'>40%</p>
										<h6 className='font-medium text-[14px] leading-[21px] text-[#3A4050]'>vs last month</h6>
									</div>
								</div>
							</div>
							<div className='w-full h-[60%] mt-[10px]'>
								<Image
									src={require("../../public/DashboardIcon/Chartmini.svg")}
									alt="trend-up"
									className='w-full h-[100px]'
								/>
							</div>
						</div>
						<div className="flex flex-col items-start !p-6 gap-5 isolate w-[50%] h-[225px] bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] rounded-lg"
							style={{ padding: '24px' }}>
							<div className=' h-[40%] w-full'>
								<h2 className=" font-medium text-[14px] leading-[21px] text-[#3A4050]">
									Job Applicant
								</h2>
								<div className='w-full flex flex-row justify-between items-center mt-[5px]'>
									<h1 className="font-semibold text-[40px] leading-[56px] text-[#3A4050]">420</h1>

									<div className='flex flex-row items-center gap-[8px]'>
										<Image
											src={require("../../public/DashboardIcon/trend-up.svg")}
											alt="trend-up"
										/>
										<p className='font-medium text-[14px] leading-[21px] text-center text-[#067647]'>40%</p>
										<h6 className='font-medium text-[14px] leading-[21px] text-[#3A4050]'>vs last month</h6>
									</div>
								</div>
							</div>
							<div className='w-full h-[60%] mt-[10px]'>
								<Image
									src={require("../../public/DashboardIcon/ChartminiRed.svg")}
									alt="trend-up"
									className='w-full h-[100px]'
								/>
							</div>
						</div>
					</div>
					<div className='  flex	flex-row gap-[24px]'>
						<div className="flex flex-col items-start !p-6 gap-5 isolate w-[50%] h-[225px] bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] rounded-lg"
							style={{ padding: '24px' }}>
							<div className=' h-[40%] w-full'>
								<h2 className=" font-medium text-[14px] leading-[21px] text-[#3A4050]">
									Internal Staff
								</h2>
								<div className='w-full flex flex-row justify-between items-center mt-[5px]'>
									<h1 className="font-semibold text-[40px] leading-[56px] text-[#3A4050]">20</h1>

									<div className='flex flex-row items-center gap-[8px]'>
										<Image
											src={require("../../public/DashboardIcon/trend-up.svg")}
											alt="trend-up"
										/>
										<p className='font-medium text-[14px] leading-[21px] text-center text-[#067647]'>40%</p>
										<h6 className='font-medium text-[14px] leading-[21px] text-[#3A4050]'>vs last month</h6>
									</div>
								</div>
							</div>
							<div className='w-full h-[60%] mt-[10px]'>
								<Image
									src={require("../../public/DashboardIcon/Chartmini.svg")}
									alt="trend-up"
									className='w-full h-[100px]'
								/>
							</div>
						</div>
						<div className="flex flex-col items-start !p-6 gap-5 isolate w-[50%] h-[225px] bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] rounded-lg"
							style={{ padding: '24px' }}>
							<div className=' h-[40%] w-full'>
								<h2 className=" font-medium text-[14px] leading-[21px] text-[#3A4050]">
									Outsourced Staff
								</h2>
								<div className='w-full flex flex-row justify-between items-center mt-[5px]'>
									<h1 className="font-semibold text-[40px] leading-[56px] text-[#3A4050]">120</h1>

									<div className='flex flex-row items-center gap-[8px]'>
										<Image
											src={require("../../public/DashboardIcon/trend-up.svg")}
											alt="trend-up"
										/>
										<p className='font-medium text-[14px] leading-[21px] text-center text-[#067647]'>40%</p>
										<h6 className='font-medium text-[14px] leading-[21px] text-[#3A4050]'>vs last month</h6>
									</div>
								</div>
							</div>
							<div className='w-full h-[60%] mt-[10px]'>
								<Image
									src={require("../../public/DashboardIcon/Chartmini.svg")}
									alt="trend-up"
									className='w-full h-[100px]'
								/>
							</div>
						</div>

					</div>
				</div>
				<div className='w-[30%]'>
					<div className="flex flex-col items-start p-6 gap-5 isolate w-[100%] h-[225px] bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] rounded-lg">
						{/* Content goes here */}
					</div>
				</div>
			</div>

		</div>
	)
}

export default EmployeeDashBoard
