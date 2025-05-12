"use client";
import React, { useEffect, useState } from 'react'
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options'
import PageHeader from '@/components/PageHeader'
import Search from '@/components/Search'
import { dummyEmployees } from '@/components/data';
import Image from "next/image";
import Progress from '@/components/Progress';
import Input from '@/components/Input';



const EmployeeDashBoard = () => {
	const [displayData, setDisplayData] = useState<any[]>(dummyEmployees)
	const [isLoading, setIsLoading] = useState<boolean>(false)
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
		<div>
			<PageHeader text={"Verification Progress"} />

			<div className='flex flex-col  gap-[10px] mt-[24px]'>
				<Progress progress={80} />
				<div className='flex flex-row justify-end'>
					<span className=" text-sm font-medium leading-[20px] text-[#344054] flex items-center">
						Percentage
					</span>
				</div>
			</div>

			<div className='flex flex-col md:flex-row gap-5 mt-2' >
				<div className="box-border w-[100%] md:w-[50%] h-[217px] bg-white border-l-[4px] border-[#067647] shadow-[0_0_10px_rgba(0,0,0,0.15)] p-6">
					<div>
						<div className='border border-white border-b-[#E5E7EB] pb-4'>
							<div className='flex justify-between'>
								<h3 className='font-medium text-[18px] leading-[150%] text-[#3A4050]'>NYSC Certificate</h3>
								<button className="  w-[68px] h-[22px] flex flex-row justify-center items-center px-2 py-[2px] bg-[#ECFDF3] border border-[#ABEFC6] rounded-[16px] mix-blend-multiply font-normal text-[12px] leading-[150%] text-[#067647]">Approved</button>
							</div>

							<div className='flex flex-row gap-1 mt-1'>
								<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>Submitted: Apr 15, 2025</p>
								<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>• Reviewed: Apr 17, 2025</p>
							</div>
						</div>
						<div>
							<h3 className='font-normal text-[14px] leading-[150%] text-[#6D7280] mt-4'>Document verified successfully.</h3>
						</div>
					</div>
				</div>

				<div className="box-border w-[100%] md:w-[50%] h-[217px] bg-white border-l-[4px] border-[#067647] shadow-[0_0_10px_rgba(0,0,0,0.15)] p-6">
					<div>
						<div className='border border-white border-b-[#E5E7EB] pb-4'>
							<div className='flex justify-between'>
								<h3 className='font-medium text-[18px] leading-[150%] text-[#3A4050]'>NYSC Certificate</h3>
								<button className="  w-[68px] h-[22px] flex flex-row justify-center items-center px-2 py-[2px] bg-[#ECFDF3] border border-[#ABEFC6] rounded-[16px] mix-blend-multiply font-normal text-[12px] leading-[150%] text-[#067647]">Approved</button>
							</div>

							<div className='flex flex-row gap-1 mt-1'>
								<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>Submitted: Apr 15, 2025</p>
								<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>• Reviewed: Apr 17, 2025</p>
							</div>
						</div>
						<div>
							<h3 className='font-normal text-[14px] leading-[150%] text-[#6D7280] mt-4'>Document verified successfully.</h3>
						</div>
					</div>
				</div>
			</div>



			<div className='flex flex-col md:flex-row gap-5 mt-4' >
				<div className="box-border w-[100%] md:w-[50%] h-[217px] bg-white border-l-[4px] border-[#067647] shadow-[0_0_10px_rgba(0,0,0,0.15)] p-6">
					<div>
						<div className='border border-white border-b-[#E5E7EB] pb-4'>
							<div className='flex justify-between'>
								<h3 className='font-medium text-[18px] leading-[150%] text-[#3A4050]'>NYSC Certificate</h3>
								<button className="  w-[68px] h-[22px] flex flex-row justify-center items-center px-2 py-[2px] bg-[#ECFDF3] border border-[#ABEFC6] rounded-[16px] mix-blend-multiply font-normal text-[12px] leading-[150%] text-[#067647]">Approved</button>
							</div>

							<div className='flex flex-row gap-1 mt-1'>
								<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>Submitted: Apr 15, 2025</p>
								<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>• Reviewed: Apr 17, 2025</p>
							</div>
						</div>
						<div>
							<h3 className='font-normal text-[13px] leading-[150%] text-[#6D7280] mt-4'>The signature on the document is not clear. Please resubmit with a clearer copy.</h3>

							<div className='flex items-center gap-3 mt-5'>
								< Input value={input.value1}
									handleOnChange={(e) => handleOnChange("value1", e.target.value)}
									label={''} placeholder={'Choose File'} type={''} />

								<button
									className="flex flex-row justify-center items-center px-4 py-[10px] gap-2 w-[100px] h-[40px]  border border-[#002DB3] text-[#fff] !bg-[#002DB3] hover:bg-[#002DB3] transition whitespace-nowrap" >Upload</button>
							</div>
						</div>
					</div>
				</div>

				<div className="box-border w-[100%] md:w-[50%] h-[217px] bg-white border-l-[4px] border-[#067647] shadow-[0_0_10px_rgba(0,0,0,0.15)] p-6">
					<div>
						<div className='border border-white border-b-[#E5E7EB] pb-4'>
							<div className='flex justify-between'>
								<h3 className='font-medium text-[18px] leading-[150%] text-[#3A4050]'>NYSC Certificate</h3>
								<button className="  w-[68px] h-[22px] flex flex-row justify-center items-center px-2 py-[2px] bg-[#ECFDF3] border border-[#ABEFC6] rounded-[16px] mix-blend-multiply font-normal text-[12px] leading-[150%] text-[#067647]">Approved</button>
							</div>

							<div className='flex flex-row gap-1 mt-1'>
								<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>Submitted: Apr 15, 2025</p>
								<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>• Reviewed: Apr 17, 2025</p>
							</div>
						</div>
						<div>
							<h3 className='font-normal text-[14px] leading-[150%] text-[#6D7280] mt-4'>Document verified successfully.</h3>
						</div>
					</div>
				</div>


			</div>
			<div className='flex flex-col md:flex-row gap-5 mt-4' >
				<div className="box-border w-[100%] md:w-[50%] h-[217px] bg-white border-l-[4px] border-[#067647] shadow-[0_0_10px_rgba(0,0,0,0.15)] p-6">
					<div>
						<div className='border border-white border-b-[#E5E7EB] pb-4'>
							<div className='flex justify-between'>
								<h3 className='font-medium text-[18px] leading-[150%] text-[#3A4050]'>NYSC Certificate</h3>
								<button className="  w-[68px] h-[22px] flex flex-row justify-center items-center px-2 py-[2px] bg-[#ECFDF3] border border-[#ABEFC6] rounded-[16px] mix-blend-multiply font-normal text-[12px] leading-[150%] text-[#067647]">Approved</button>
							</div>

							<div className='flex flex-row gap-1 mt-1'>
								<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>Submitted: Apr 15, 2025</p>
								<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>• Reviewed: Apr 17, 2025</p>
							</div>
						</div>
						<div>
							<h3 className='font-normal text-[13px] leading-[150%] text-[#6D7280] mt-4'>The signature on the document is not clear. Please resubmit with a clearer copy.</h3>

							<div className='flex items-center gap-3 mt-5'>
								< Input value={input.value1}
									handleOnChange={(e) => handleOnChange("value1", e.target.value)}
									label={''} placeholder={'Choose File'} type={''} />

								<button
									className="flex flex-row justify-center items-center px-4 py-[10px] gap-2 w-[100px] h-[40px]  border border-[#002DB3] text-[#fff] !bg-[#002DB3] hover:bg-[#002DB3] transition whitespace-nowrap" >Upload</button>
							</div>
						</div>
					</div>
				</div>

				<div className="box-border w-[100%] md:w-[50%] h-[217px] bg-white border-l-[4px] border-[#067647] shadow-[0_0_10px_rgba(0,0,0,0.15)] p-6">
					<div>
						<div className='border border-white border-b-[#E5E7EB] pb-4'>
							<div className='flex justify-between'>
								<h3 className='font-medium text-[18px] leading-[150%] text-[#3A4050]'>NYSC Certificate</h3>
								<button className="  w-[68px] h-[22px] flex flex-row justify-center items-center px-2 py-[2px] bg-[#ECFDF3] border border-[#ABEFC6] rounded-[16px] mix-blend-multiply font-normal text-[12px] leading-[150%] text-[#067647]">Approved</button>
							</div>

							<div className='flex flex-row gap-1 mt-1'>
								<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>Submitted: Apr 15, 2025</p>
								<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>• Reviewed: Apr 17, 2025</p>
							</div>
						</div>
						<div>
							<h3 className='font-normal text-[14px] leading-[150%] text-[#6D7280] mt-4'>Document verified successfully.</h3>
						</div>
					</div>
				</div>


			</div>
			<div className='flex flex-row gap-[30px] mt-[24px] justify-end'>
				<button
					className="flex flex-row justify-center items-center px-4 py-[10px] gap-2 w-[153px] h-[40px]  border border-[#002DB3] text-[#fff] !bg-[#002DB3] hover:bg-[#002DB3] transition mt-5" >Submit documents</button>
			</div>
		</div>
	)
}

export default EmployeeDashBoard
