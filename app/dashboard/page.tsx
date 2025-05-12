"use client";
import React, { useEffect, useState } from 'react'
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options'
import PageHeader from '@/components/PageHeader'
import Search from '@/components/Search'
import { dummyEmployees } from '@/components/data';
import Image from "next/image";
import HRLineChart from './component/HRLineChart';
import { useSession } from 'next-auth/react';
import StatsCards from './StatsCards';



const EmployeeDashBoard = () => {
	const [displayData, setDisplayData] = useState<any[]>(dummyEmployees)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { data: session } = useSession();
	console.log('session-session', session)




	return (
		<div className='w-full'>
			<PageHeader text={"Welcome back Jane "} />
			<div className='flex flex-col md:flex-row gap-[24px] mt-[24px]'>
				<StatsCards />
				<div className='w-[100%] md:w-[30%]'>
					<div className="flex flex-col items-start  justify-between gap-5 w-[100%]  bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] 
					p-[10px]">
						<div className='flex flex-row justify-between   w-full '>
							<div>
								<h1 className=" font-medium text-[20px] leading-[150%] text-[#3A4050] ">Create Announcement</h1>
								<p className=" font-normal text-[14px] leading-[150%] text-[#6D7280] ">Make an announcement to your co-workers</p>
							</div>
							<div>
								<Image
									src={require("../../public/DashboardIcon/megaphone.svg")}
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
