"use client";
import React, { useEffect, useState } from 'react'
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options'
import PageHeader from '@/components/PageHeader'
import Search from '@/components/Search'
import { dummyEmployees } from '@/components/data';
import Image from "next/image";
import HRLineChart from './component/HRLineChart';
import { useSession } from 'next-auth/react';



const EmployeeDashBoard = () => {
	const [displayData, setDisplayData] = useState<any[]>(dummyEmployees)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { data: session } = useSession();
	console.log('session-session', session)

	return (
		<div className='w-full'>
			<PageHeader text={"Welcome back Jane "} />
			<div className='flex flex-col md:flex-row gap-[24px] mt-[24px]'>
				<div className='w-full md:w-[70%] flex	flex-col gap-[24px]'>
					<div className='flex flex-col	md:flex-row gap-[24px] '>
						<div className="flex flex-col items-start !p-6 gap-5 isolate  w-[100%] md:w-[50%] h-full bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]  "
							style={{ padding: '12px' }}>
							<div className=' h-[40%] w-full'>
								<h2 className=" font-medium text-[18px] leading-[21px] text-[#3A4050]">
									Total Employee
								</h2>
								<div className='w-full flex flex-row justify-between items-center'>
									<h1 className="font-semibold text-[30px] leading-[46px] text-[#3A4050]">2,420</h1>

									<div className='flex flex-row items-center gap-[8px]'>
										<Image
											src={require("../../../public/DashboardIcon/trend-up.svg")}
											alt="trend-up"
										/>
										<p className='font-medium text-[14px] leading-[21px] text-center text-[#067647]'>40%</p>
										<h6 className='font-medium text-[14px] leading-[21px] text-[#3A4050]'>vs last month</h6>
									</div>
								</div>
							</div>
							<div className='w-full h-[60%] mt-[10px]'>
								<Image
									src={require("../../../public/DashboardIcon/Chartmini.svg")}
									alt="trend-up"
									className='w-full h-full'
								/>
							</div>
						</div>
						<div className="flex flex-col items-start !p-6 gap-5 isolate w-[100%] md:w-[50%] h-full bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]  "
							style={{ padding: '12px' }}>
							<div className=' h-[40%] w-full'>
								<h2 className=" font-medium text-[18px] leading-[21px] text-[#3A4050]">
									Job Applicant
								</h2>
								<div className='w-full flex flex-row justify-between items-center mt-[5px]'>
									<h1 className="font-semibold text-[30px] leading-[46px] text-[#3A4050]">420</h1>

									<div className='flex flex-row items-center gap-[8px]'>
										<Image
											src={require("../../../public/DashboardIcon/trend-up.svg")}
											alt="trend-up"
										/>
										<p className='font-medium text-[14px] leading-[21px] text-center text-[#067647]'>40%</p>
										<h6 className='font-medium text-[14px] leading-[21px] text-[#3A4050]'>vs last month</h6>
									</div>
								</div>
							</div>
							<div className='w-full h-[60%] mt-[10px]'>
								<Image
									src={require("../../../public/DashboardIcon/ChartminiRed.svg")}
									alt="trend-up"
									className='w-full h-full'
								/>
							</div>
						</div>
					</div>
					<div className='flex	flex-col md:flex-row  gap-[24px]'>
						<div className="flex flex-col items-start !p-5 gap-5 w-[100%] md:w-[50%] h-full bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]  "
							style={{ padding: '12px' }}>
							<div className=' h-[20%] w-full'>
								<h2 className=" font-medium text-[18px] leading-[21px] text-[#3A4050]">
									Internal Staff
								</h2>
								<div className='w-full flex flex-row justify-between items-center mt-[5px]'>
									<h1 className="font-semibold text-[30px] leading-[46px] text-[#3A4050]">20</h1>

									<div className='flex flex-row items-center gap-[8px]'>
										<Image
											src={require("../../../public/DashboardIcon/trend-up.svg")}
											alt="trend-up"
										/>
										<p className='font-medium text-[14px] leading-[21px] text-center text-[#067647]'>40%</p>
										<h6 className='font-medium text-[14px] leading-[21px] text-[#3A4050]'>vs last month</h6>
									</div>
								</div>
							</div>
							<div className='w-full  mt-2.5'>
								<Image
									src={require("../../../public/DashboardIcon/Chartmini.svg")}
									alt="trend-up"
									className='w-full h-full'
								/>
							</div>
						</div>
						<div className="flex flex-col items-start !p-6 gap-5 isolate w-[100%] md:w-[50%] h-full bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]  "
							style={{ padding: '12px' }}>
							<div className=' h-[40%] w-full'>
								<h2 className=" font-medium text-[18px] leading-[21px] text-[#3A4050]">
									Outsourced Staff
								</h2>
								<div className='w-full flex flex-row justify-between items-center mt-[5px]'>
									<h1 className="font-semibold text-[30px] leading-[46px] text-[#3A4050]">120</h1>

									<div className='flex flex-row items-center gap-[8px]'>
										<Image
											src={require("../../../public/DashboardIcon/trend-up.svg")}
											alt="trend-up"
										/>
										<p className='font-medium text-[14px] leading-[21px] text-center text-[#067647]'>40%</p>
										<h6 className='font-medium text-[14px] leading-[21px] text-[#3A4050]'>vs last month</h6>
									</div>
								</div>
							</div>
							<div className='w-full h-[60%] mt-[10px]'>
								<Image
									src={require("../../../public/DashboardIcon/Chartmini.svg")}
									alt="trend-up"
									className='w-full h-full'
								/>
							</div>
						</div>

					</div>
				</div>
				<div className='w-[100%] md:w-[30%]'>
					<div className="flex flex-col items-start  justify-between gap-5 w-[100%] h-[150px] bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] 
					p-[10px]">
						<div className='flex flex-row justify-between items-center w-full '>
							<div>
								<h1 className="w-[218px] h-[30px] font-medium text-[20px] leading-[150%] text-[#3A4050] ">Create Announcement</h1>
								<p className="w-[218px] h-[42px] font-normal text-[14px] leading-[150%] text-[#6D7280] ">Make an announcement to your co-workers</p>
							</div>
							<div>
								<Image
									src={require("../../../public/DashboardIcon/megaphone.svg")}
									alt="megaphone"
									className='w-[50px] h-[50px]'
								/>
							</div>
						</div>
						<button className="box-border flex flex-row justify-center items-center px-4 py-2 gap-2 w-[171px] h-[40px] bg-white border border-[#002DB3] font-normal text-[14px] leading-[150%] text-[#002DB3] ">
							Create announcement
						</button>
					</div>
				</div>
			</div>

			<div className='mt-[50px] w-full'>
				<h3>Employee Growth</h3>

				<div className='mt-[20px] h-[315px] w-full bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] '>
					<HRLineChart />
				</div>

			</div>

		</div>
	)
}

export default EmployeeDashBoard
