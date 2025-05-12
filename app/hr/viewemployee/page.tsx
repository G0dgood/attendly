"use client";
import React, { useEffect, useState } from 'react'
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options'
import Search from '@/components/Search'
import { dummyEmployees } from '@/components/data';
import Image from "next/image";
import PageHeader from '@/components/PageHeader';
import { useRouter } from 'next/navigation';
import NavButtons from './NavButtons';
import Documents from './Documents';
import PersonalInformationView from './PersonalInformationView';
import ProfessionalInformationView from './ProfessionalInformationView';
import EmplayeeAttendance from './EmplayeeAttendance';




const EmployeeDashBoard = () => {
	const router = useRouter()
	const [activeTab, setActiveTab] = useState(1);
	const [activeTabs, setActiveTabs] = useState(1);
	const [displayData, setDisplayData] = useState<any[]>(dummyEmployees)
	const [isLoading, setIsLoading] = useState<boolean>(false)



	return (
		<div className=''>
			<div className='flex flex-row justify-between gap-[20px] border border-[#fff] border-b-[#E5E7EB] pb-[20px]'>
				<PageHeader
					text={"Funke Simeon"}
					textsup={"Project Manager"}
					textsupSmall={"funkesimeon@uconnect.com"} />
				<button
					onClick={() => router.push('/hr/addnewemployee')}
					className="cursor-pointer flex flex-row justify-center items-center px-2 py-[8px] gap-2 h-[40px] !bg-[#002DB3]  font-normal text-[14px] leading-[150%] text-[#FFFFFF]">
					<Image
						src={require("../../../public/icon/Edit_light.svg")}
						alt="Logo"
					/>
					Edit Profile
				</button>
			</div>


			<div className='flex flex-row justify-between gap-[20px] mt-[24px]'>

				<div className="hidden md:flex w-[20%] flex-col gap-[5px]">
					<NavButtons
						active={activeTab === 1}
						label="Profile"
						onClick={() => setActiveTab(1)}
					/>
					<NavButtons
						active={activeTab === 2}
						label="Attendance"
						onClick={() => setActiveTab(2)}
					/>
				</div>
				<div className='w-[100%] md:w-[80%]'>
					{activeTab === 1 ? (
						<div >
							<div className='flex flex-row  gap-[20px] w-full pt-[10px] border border-[#fff] border-b-[#E5E7EB]'>
								<button
									onClick={() => setActiveTabs(1)}
									className={`cursor-pointer relative px-[4px] py-[5px] text-[16px] leading-[150%] whitespace-nowrap font-medium ${activeTabs === 1 ? 'text-[#003399] border-b border-[#003399]' : 'text-[#3A4050]'
										}`}
								>
									Personal Information
								</button>
								<button
									onClick={() => setActiveTabs(2)}
									className={`cursor-pointer relative px-[4px] py-[5px] text-[16px] leading-[150%] whitespace-nowrap font-medium ${activeTabs === 2 ? 'text-[#003399] border-b border-[#003399]' : 'text-[#3A4050]'
										}`}
								>
									Professional Information
								</button>
								<button
									onClick={() => setActiveTabs(3)}
									className={`cursor-pointer relative px-[4px] py-[5px] text-[16px] leading-[150%] whitespace-nowrap font-medium ${activeTabs === 3 ? 'text-[#003399] border-b border-[#003399]' : 'text-[#3A4050]'
										}`}
								>
									Documents
								</button>
							</div>

							<div className='w-full'>

								{activeTabs === 1 ? (<PersonalInformationView />) : activeTabs === 2 ? (<ProfessionalInformationView />) : activeTabs === 3 ?
									(<Documents />) : null}

							</div>
						</div>
					) : (<EmplayeeAttendance />)}


				</div>

			</div>


		</div>
	)
}

export default EmployeeDashBoard
