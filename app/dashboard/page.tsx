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





	return (
		<div className='w-full'>
			<PageHeader text={"Welcome back Jane "} />
			<div className='flex flex-col md:flex-row gap-[24px] mt-[24px]'>
				<StatsCards />
				<div className='w-[100%] md:w-[30%] h-67'>
					<div className="flex flex-col items-start h-full justify-between gap-5 w-[100%]  bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] 
					p-[10px]">
						<div className='flex flex-col justify-between w-full '>
							<div className='h-60'>
								<Image
									src={require("../../public/Barcode.svg")}
									alt="megaphone"
									className='w-[100%] h-[100%]'
								/>
							</div>
						</div>
					</div>
				</div>
			</div >

			<div className='mt-[40px] w-full'>
				<h3>Employee Stats</h3>

				<div className='mt-[20px] h-[315px] w-full flex flex-col md:flex-row gap-[24px]'>
					<div className='bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] w-[70%] h-full'>dd</div>
					<div className='bg-white border border-[#E5E7EB] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] w-[30%] h-full'>vv</div>
					{/* <HRLineChart /> */}
				</div>

			</div>

		</div >
	)
}

export default EmployeeDashBoard
