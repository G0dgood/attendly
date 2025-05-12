"use client";
import PageHeader from '@/components/PageHeader'
import arrowUp from "../public/DashboardIcon/Expand_up.svg";
import Image from "next/image";
import React, { useState } from 'react'
import Progress from './Progress';

const HrPerformanceEvaluation = () => {
	const [evaluationSummaryHistory, setEvaluationSummaryHistory] = useState(false);
	const [feedbackAndComment, setFeedbackAndComment] = useState(false);
	const [notes, setNotes] = useState(false);

	return (
		<div>
			<div className='flex flex-row justify-between'>
				<PageHeader text={"Employee Evaluation Details"} />
				<div className='flex flex-row gap-[20px]'>
					<button className="flex flex-row justify-center items-center py-[8px] gap-[8px]  px-[20px]  bg-white border border-[#E5E7EB]  font-medium text-[12px] leading-[150%] text-[#3A4050] font-lato">
						<Image
							src={require("../../../public/icon/Print_light.svg")}
							alt="search"
						/>
						Print
					</button>
					<button className="flex flex-row justify-center items-center  py-[8px] gap-[8px]  px-[20px] !bg-[#002DB3]  font-normal text-[14px] leading-[150%] text-[#FFFFFF]">
						<Image
							src={require("../../../public/icon/Message_light.svg")}
							alt="Message"
						/>
						Email
					</button>
				</div>
			</div>

			<div className=" w-[100%] h-[312px] mt-[32px] !bg-[#F9FAFB] border border-[#E5E7EB] box-border p-[24px] flex">
				<div className='w-[400px] flex	flex-row gap-[24px]'>
					<div className='w-[200px] h-full flex	flex-col justify-between'>
						<p className='font-medium text-[14px] leading-[150%] text-[#6D7280]'>Employee Name:</p>
						<p className='font-medium text-[14px] leading-[150%] text-[#6D7280]'>Role:</p>
						<p className='font-medium text-[14px] leading-[150%] text-[#6D7280]'>Employee ID:</p>
						<p className='font-medium text-[14px] leading-[150%] text-[#6D7280]'>Department:</p>
						<p className='font-medium text-[14px] leading-[150%] text-[#6D7280]'>Manager:</p>
						<p className='font-medium text-[14px] leading-[150%] text-[#6D7280]'>Evaluation Date:</p>
						<p className='font-medium text-[14px] leading-[150%] text-[#6D7280]'>Evaluation Period:</p>
					</div>
					<div className='w-[200px] h-full flex	flex-col justify-between justify-items-flex-end direction-rtl text-right'>
						<p className='font-medium text-[14px] leading-[150%] text-[#6D7280]'>Olivia Ike</p>
						<p className='font-medium text-[14px] leading-[150%] text-[#6D7280]'>Product Designer</p>
						<p className='font-medium text-[14px] leading-[150%] text-[#6D7280]'>EMP1234</p>
						<p className='font-medium text-[14px] leading-[150%] text-[#6D7280]'>IT</p>
						<p className='font-medium text-[14px] leading-[150%] text-[#6D7280]'>Ernest Ugo</p>
						<p className='font-medium text-[14px] leading-[150%] text-[#6D7280]'>13/03/2025</p>
						<p className='font-medium text-[14px] leading-[150%] text-[#6D7280]'>Q1 (Jan - Mar 2025)</p>
					</div>
				</div>
			</div>


			<div className="w-ful bg-white border border-[#E5E7EB] mt-[20px]">
				<div className="w-ful h-[56px]  !bg-[#F9FAFB] flex	flex-row items-center justify-between px-[24px]">
					<div className='text-[15px] leading-[30px] font-medium text-[#3A4050]'>Evaluation Summary History</div>
					<div>
						<button onClick={() => setEvaluationSummaryHistory(!evaluationSummaryHistory)}>
							<Image
								src={require("../../../public/DashboardIcon/Expand_up.svg")}
								alt="expand"
							/>
						</button>
					</div>
				</div>
				{evaluationSummaryHistory &&
					<div className="w-auto  bg-white flex flex-col gap-[24px] mx-[24px] py-[16px]">
						<div className='flex flex-col  gap-[8px] border-b border-[#E5E7EB] pb-[12px]'>
							<h1 className='text-[16px] leading-[24px] font-medium text-[#3A4050]'>Q1 (Jan - Mar 2025)</h1>
							<div className='flex flex-row items-center justify-between gap-[24px]'>
								<Progress progress={80} />
								<p className=' text-sm font-medium leading-[20px] text-[#344054] flex items-center'>4/5.0</p>
							</div>
							<p className='text-[14px] leading-[21px] font-normal text-[#6D7280]'>Completed: January 15, 2025</p>
						</div>
						<div className='flex flex-col  gap-[8px] border-b border-[#E5E7EB] pb-[12px]'>
							<h1 className='text-[16px] leading-[24px] font-medium text-[#3A4050]'>Q4 (Oct - Dec 2024)</h1>
							<div className='flex flex-row items-center justify-between gap-[24px]'>
								<Progress progress={70} />
								<p className=' text-sm font-medium leading-[20px] text-[#344054] flex items-center'>3.5/5.0</p>
							</div>
							<p className='text-[14px] leading-[21px] font-normal text-[#6D7280]'>Completed: December 15, 2024</p>
						</div>
						<div className='flex flex-col  gap-[8px] border-b border-[#E5E7EB] pb-[12px]'>
							<h1 className='text-[16px] leading-[24px] font-medium text-[#3A4050]'>Q3 (Jul - Sept 2024)</h1>
							<div className='flex flex-row items-center justify-between gap-[24px]'>
								<Progress progress={60} />
								<p className=' text-sm font-medium leading-[20px] text-[#344054] flex items-center'>3/5.0</p>
							</div>
							<p className='text-[14px] leading-[21px] font-normal text-[#6D7280]'>Completed: September 15, 2024</p>
						</div>
					</div>}
			</div>

			<div className="w-ful bg-white border border-[#E5E7EB] mt-[20px]">
				<div className="w-ful h-[56px]  !bg-[#F9FAFB] flex	flex-row items-center justify-between px-[24px]">
					<div className='text-[15px] leading-[30px] font-medium text-[#3A4050]'>Manager Feedback and Comment</div>
					<div>
						<button onClick={() => setFeedbackAndComment(!feedbackAndComment)}>
							<Image
								src={require("../../../public/DashboardIcon/Expand_up.svg")}
								alt="expand"
							/>
						</button>
					</div>
				</div>
				{feedbackAndComment &&
					<div className="w-auto  bg-white flex flex-col gap-[24px] mx-[24px] py-[16px]">

						<div className="box-border w-[100%] h-[121px] border border-[#E5E7EB] p-[14px] flex flex-col justify-between">
							<p className="text-[14px] leading-[24px] font-normal text-[#3A4050]">
								Sarah has been an invaluable team member this quarter. Her technical contributions have significantly improved our codebase stability and performance. I'd like to see her take on more mentoring responsibilities in the coming period.
							</p>
							<div className="flex flex-row justify-end w-full">
								<p className='text-[14px] leading-[21px] font-normal text-[#6D7280]'>January 15, 2025</p>
							</div>
						</div>
						<div className="box-border w-[100%] h-[121px] border border-[#E5E7EB] p-[14px] flex flex-col justify-between">
							<p className="text-[14px] leading-[24px] font-normal text-[#3A4050]">
								Sarah has been an invaluable team member this quarter. Her technical contributions have significantly improved our codebase stability and performance. I'd like to see her take on more mentoring responsibilities in the coming period.
							</p>
							<div className="flex flex-row justify-end w-full">
								<p className='text-[14px] leading-[21px] font-normal text-[#6D7280]'>January 15, 2025</p>
							</div>
						</div>
						<div className="box-border w-[100%] h-[121px] border border-[#E5E7EB] p-[14px] flex flex-col justify-between">
							<p className="text-[14px] leading-[24px] font-normal text-[#3A4050]">
								Sarah has been an invaluable team member this quarter. Her technical contributions have significantly improved our codebase stability and performance. I'd like to see her take on more mentoring responsibilities in the coming period.
							</p>
							<div className="flex flex-row justify-end w-full">
								<p className='text-[14px] leading-[21px] font-normal text-[#6D7280]'>January 15, 2025</p>
							</div>
						</div>

					</div>}

			</div>

			<div className="w-ful bg-white border border-[#E5E7EB] mt-[20px]">
				<div className="w-ful h-[56px]  !bg-[#F9FAFB] flex	flex-row items-center justify-between px-[24px]">
					<div className='text-[15px] leading-[30px] font-medium text-[#3A4050]'>HR Notes (Internal Only)</div>
					<div>
						<button onClick={() => setNotes(!notes)}>
							<Image
								src={require("../../../public/DashboardIcon/Expand_up.svg")}
								alt="expand"
							/>
						</button>
					</div>
				</div>
				{notes &&
					<div className="w-auto  bg-white flex flex-col gap-[24px] mx-[24px] py-[16px]">
						<div className="box-border w-full h-[121px] border border-[#E5E7EB] p-[14px] flex flex-col justify-between bg-[#F3F7FF] border-l-[5px] border-l-[#002DB3]">
							<p className="text-[14px] leading-[24px] font-normal text-[#3A4050]">
								Sarah has been an invaluable team member this quarter. Her technical contributions have significantly improved our codebase stability and performance. I'd like to see her take on more mentoring responsibilities in the coming period.
							</p>
							<div className="flex justify-end w-full">
								<p className="text-[14px] leading-[21px] font-normal text-[#6D7280]">January 15, 2025</p>
							</div>
						</div>
						<div className="box-border w-full h-[121px] border border-[#E5E7EB] p-[14px] flex flex-col justify-between bg-[#F3F7FF] border-l-[5px] border-l-[#002DB3]">
							<p className="text-[14px] leading-[24px] font-normal text-[#3A4050]">
								Sarah has been an invaluable team member this quarter. Her technical contributions have significantly improved our codebase stability and performance. I'd like to see her take on more mentoring responsibilities in the coming period.
							</p>
							<div className="flex justify-end w-full">
								<p className="text-[14px] leading-[21px] font-normal text-[#6D7280]">January 15, 2025</p>
							</div>
						</div>
					</div>}
			</div>

			<div className="w-full bg-white  mt-[20px] h-[137px] mb-[200px]">
				<h3 className='text-[14px] leading-[21px] font-medium text-[#3A4050] mb-[6px]'>Add New Note</h3>
				<div className="w-full h-[121px] border border-[#E5E7EB] p-[14px] flex flex-col justify-between">
					<textarea
						className="w-full h-full border-none outline-none resize-none"
						placeholder="Type your note here..."
					></textarea>
				</div>
				<div className="flex justify-end w-full mt-[24px]">
					<button className='bold py-[10px] px-[20px] h-[40px] !bg-[#002DB3] text-white text-[16px] font-semibold flex justify-center items-center'>Save Note</button>
				</div>
			</div>
		</div>
	)
}

export default HrPerformanceEvaluation
