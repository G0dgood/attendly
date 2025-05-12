"use client";
import React, { useEffect, useState } from 'react'
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options'
import Search from '@/components/Search'
import { dummyEmployees } from '@/components/data';
import Image from "next/image";
import PageHeader from '@/components/PageHeader';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Dropdowns from '@/components/CustomDropdown';
import PersonalInformation from './PersonalInformation';
import ProfessionalInformation from './ProfessionalInformation';



const EmployeeDashBoard = () => {
	const router = useRouter()
	const [displayData, setDisplayData] = useState<any[]>(dummyEmployees)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [activeTab, setActiveTab] = useState('personal');
	const [input, setInput] = useState({
		value1: "",
		value2: "",
		value3: "",
		value4: ""
	});

	const handleOnChange = (input: string, value: string) => {
		setInput((prevState) => ({
			...prevState,
			[input]: value,
		}));
	};

	return (
		<div  >
			<PageHeader text={"Add New Employee"} />

			<div className="bg-[#fff] mt-[32px] flex flex-col items-start gap-[10px] w-full border border-[#E5E7EB] p-[20px]">
				<div className='flex flex-row  gap-[20px] w-full pt-[10px] border border-[#fff] border-b-[#E5E7EB]'>
					<button
						onClick={() => setActiveTab('personal')}
						className={`relative px-[4px] py-[5px] text-[16px] leading-[150%] whitespace-nowrap font-medium ${activeTab === 'personal' ? 'text-[#003399] border-b border-[#003399]' : 'text-[#3A4050]'
							}`}
					>
						Personal Information
					</button>
					<button
						onClick={() => setActiveTab('professional')}
						className={`relative px-[4px] py-[5px] text-[16px] leading-[150%] whitespace-nowrap font-medium ${activeTab === 'professional' ? 'text-[#003399] border-b border-[#003399]' : 'text-[#3A4050]'
							}`}
					>
						Professional Information
					</button>
				</div>
				{activeTab === 'personal' ? (<PersonalInformation input={input} handleOnChange={handleOnChange} />)
					: (<ProfessionalInformation input={input} handleOnChange={handleOnChange} />)}


				<div className='flex flex-row  justify-end gap-[20px] mt-[24px] w-full'>
					<div className='flex flex-row gap-[20px]'>
						<button className="flex flex-row justify-center items-center  py-[8px] gap-[8px]  px-[20px]  bg-white border border-[#E5E7EB]  font-medium text-[12px] leading-[150%] text-[#3A4050] font-lato">
							Cancel
						</button>
						<button className="flex flex-row justify-center items-center  py-[8px] gap-2  px-[20px] !bg-[#002DB3]   text-[14px] leading-[150%] text-[#FFFFFF]">
							Next
						</button>
					</div>

				</div>
			</div >

		</div >
	)
}

export default EmployeeDashBoard
