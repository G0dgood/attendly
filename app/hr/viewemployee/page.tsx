"use client";
import React, { useState } from 'react'
import Image from "next/image";
import PageHeader from '@/components/PageHeader';
import PersonalInformationView from './PersonalInformationView';
import { useSelector } from 'react-redux';




const EmployeeDashBoard = () => {
	const [activeTabs, setActiveTabs] = useState(1);
	const { user } = useSelector((state: any) => state.auth);


	return (
		<div className=''>
			<div className='flex flex-row justify-between gap-[20px] border border-[#fff] border-b-[#E5E7EB] pb-[20px]'>
				<PageHeader
					text={user?.fullName}
					textsup={user?.role}
					textsupSmall={user?.email} />
				<button
					// onClick={() => router.push('/hr/addnewemployee')}
					className="cursor-pointer flex flex-row justify-center items-center px-4 py-[8px] gap-2 h-[40px] !bg-[#2563EB]  font-normal text-[14px] leading-[150%] text-[#FFFFFF] rounded-none">
					<Image
						src={require("../../../public/icon/Edit_light.svg")}
						alt="Logo"
					/>
					Edit Profile
				</button>
			</div>


			<div className='flex flex-row justify-between gap-[20px] mt-[24px]'>
				<div className='w-[100%] md:w-[80%]'>

					<div >
						<div className='flex flex-row  gap-[20px] w-full pt-[10px] border border-[#fff] border-b-[#E5E7EB]'>
							<button
								onClick={() => setActiveTabs(1)}
								className={`rounded-none cursor-pointer relative px-[4px] py-[5px] text-[16px] leading-[150%] whitespace-nowrap font-medium ${activeTabs === 1 ? 'text-[#2563EB] border-b border-[#2563EB]' : 'text-[#3A4050]'
									}`}
							>
								Personal Information
							</button>
						</div>

					<div className='w-full'>
						<PersonalInformationView user={user} />
					</div>
					</div>


				</div>

			</div>


		</div>
	)
}

export default EmployeeDashBoard
