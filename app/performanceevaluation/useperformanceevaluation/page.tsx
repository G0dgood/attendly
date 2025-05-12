"use client";
import PageHeader from '@/components/PageHeader'
import arrowUp from "../public/DashboardIcon/Expand_up.svg";
import Datetoday from "../../../public/icon/Date_today_duotone_line.svg";
import Image from "next/image";
import React, { useState } from 'react'
import Dropdowns from '@/components/CustomDropdown';
import CustomDateDropdown from '@/components/CustomDateDropdown';
import Input from '@/components/Input';


const HrPerformanceEvaluation = () => {
	const [evaluationSummaryHistory, setEvaluationSummaryHistory] = useState(false);
	const [feedbackAndComment, setFeedbackAndComment] = useState(false);
	const [notes, setNotes] = useState(false);
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
			<div className='flex flex-row justify-between'>
				<PageHeader text={"Performance Evaluation"} />

			</div>
			<div className=" w-[100%] mt-[32px] !bg-[#fff] border border-[#E5E7EB] box-border p-[24px] flex">
				<div className='w-[496px] h-full flex	flex-col justify-between'>
					<div className='w-full flex	flex-col gap-[1px]'>
						<label className='ftext-[14px] leading-[21px] font-normal text-[#3A4050] mb-[5px]'>Manager</label>
						<div className='flex flex-row  '>
							<Dropdowns label={'Select your manager'} right={''} options={["2022", "2023", "2024", "2025"]} />
						</div>
					</div>
					<div className='flex flex-col md:flex-row   gap-[11px]  w-full mt-[24px]'>
						<div className='w-full flex	flex-col gap-[1px]'>
							<label className='ftext-[14px] leading-[21px] font-normal text-[#3A4050] mb-[5px]'>Date</label>
							<CustomDateDropdown label={'April 1, 2025'} />
						</div>

						<div className='w-full flex	flex-col gap-[1px]'>
							<label className='ftext-[14px] leading-[21px] font-normal text-[#3A4050] mb-[5px]'>Quarter</label>
							<Dropdowns label={'Select your manager'} right={''} options={["2022", "2023", "2024", "2025"]} />
						</div>
					</div>
				</div>

			</div>
			<div className='w-full flex flex-col	md:flex-row justify-between mt-[32px] gap-[32px]'>
				<div className="box-border  w-full h-[auto]   bg-white border border-[#E5E7EB] p-[24px]">
					<h3 className='font-medium text-[16px] leading-[30px] text-[#3A4050]'>Key Performance Indicators (KPIs)</h3>

					<div className='flex flex-row gap-[30px] mt-[24px]'>
						<div className='w-[80%] md:w-[90%]'>
							<Input value={input.value1}
								handleOnChange={(e) => handleOnChange("value1", e.target.value)}
								label={''} placeholder={''} type={''} />
						</div>
						<div className='w-[20%] md:w-[10%]'>
							<Dropdowns label={''} right={''} options={["1", "2", "3", "4", "5"]} />
						</div>
					</div>
					<div className='flex flex-row gap-[30px] mt-[24px]'>
						<div className='w-[80%] md:w-[90%]'>
							<Input value={input.value1}
								handleOnChange={(e) => handleOnChange("value1", e.target.value)}
								label={''} placeholder={''} type={''} />
						</div>
						<div className='w-[20%] md:w-[10%]'>
							<Dropdowns label={''} right={''} options={["1", "2", "3", "4", "5"]} />
						</div>
					</div>
					<div className='flex flex-row gap-[30px] mt-[24px]'>
						<div className='w-[80%] md:w-[90%]'>
							<Input value={input.value1}
								handleOnChange={(e) => handleOnChange("value1", e.target.value)}
								label={''} placeholder={''} type={''} />
						</div>
						<div className='w-[20%] md:w-[10%]'>
							<Dropdowns label={''} right={''} options={["1", "2", "3", "4", "5"]} />
						</div>
					</div>
					<div className='flex flex-row gap-[30px] mt-[24px]'>
						<div className='w-[80%] md:w-[90%]'>
							<Input value={input.value1}
								handleOnChange={(e) => handleOnChange("value1", e.target.value)}
								label={''} placeholder={''} type={''} />
						</div>
						<div className='w-[20%] md:w-[10%]'>
							<Dropdowns label={''} right={''} options={["1", "2", "3", "4", "5"]} />
						</div>
					</div>
					<div className='flex flex-row gap-[30px] mt-[24px]'>
						<div className='w-[80%] md:w-[90%]'>
							<Input value={input.value1}
								handleOnChange={(e) => handleOnChange("value1", e.target.value)}
								label={''} placeholder={''} type={''} />
						</div>
						<div className='w-[20%] md:w-[10%]'>
							<Dropdowns label={''} right={''} options={["1", "2", "3", "4", "5"]} />
						</div>
					</div>
					<div className='flex flex-row gap-[30px] mt-[24px]'>
						<div className='w-[80%] md:w-[90%]'>
							<Input value={input.value1}
								handleOnChange={(e) => handleOnChange("value1", e.target.value)}
								label={''} placeholder={''} type={''} />
						</div>
						<div className='w-[20%] md:w-[10%]'>
							<Dropdowns label={''} right={''} options={["1", "2", "3", "4", "5"]} />
						</div>
					</div>
					<div className='flex flex-row gap-[30px] mt-[24px]'>
						<div className='w-[80%] md:w-[90%]'>
							<Input value={input.value1}
								handleOnChange={(e) => handleOnChange("value1", e.target.value)}
								label={''} placeholder={''} type={''} />
						</div>
						<div className='w-[20%] md:w-[10%]'>
							<Dropdowns label={''} right={''} options={["1", "2", "3", "4", "5"]} />
						</div>
					</div>
					<div className='flex flex-row gap-[30px] mt-[24px]'>
						<div className='w-[80%] md:w-[90%]'>
							<Input value={input.value1}
								handleOnChange={(e) => handleOnChange("value1", e.target.value)}
								label={''} placeholder={''} type={''} />
						</div>
						<div className='w-[20%] md:w-[10%]'>
							<Dropdowns label={''} right={''} options={["1", "2", "3", "4", "5"]} />
						</div>
					</div>
					<div className='flex flex-row gap-[30px] mt-[24px]'>
						<div className='w-[80%] md:w-[90%]'>
							<Input value={input.value1}
								handleOnChange={(e) => handleOnChange("value1", e.target.value)}
								label={''} placeholder={''} type={''} />
						</div>
						<div className='w-[20%] md:w-[10%]'>
							<Dropdowns label={''} right={''} options={["1", "2", "3", "4", "5"]} />
						</div>
					</div>
					<div className='flex flex-row gap-[30px] mt-[24px]'>
						<div className='w-[80%] md:w-[90%]'>
							<Input value={input.value1}
								handleOnChange={(e) => handleOnChange("value1", e.target.value)}
								label={''} placeholder={''} type={''} />
						</div>
						<div className='w-[20%] md:w-[10%]'>
							<Dropdowns label={''} right={''} options={["1", "2", "3", "4", "5"]} />
						</div>
					</div>

					<div className='flex flex-row gap-[30px] mt-[24px] justify-end'>
						<button
							className="flex flex-row justify-center items-center px-4 py-[10px] gap-2 w-[153px] h-[40px] bg-white border border-[#E5E7EB] text-[#3A4050]   hover:bg-[#F9FAFB] transition" >Add More KPI</button>
					</div>
				</div>

				<div className='flex flex-col gap-[32px]'>
					<div className='h-[100%] md:h-[280px]'>
						<div className="box-border w-full md:w-[400px] h-full  bg-white border border-[#E5E7EB]">
							<div className='w-[100%] h-[56px] border-b border-[#E5E7EB] box-border p-4'>
								<p className="  w-full h-[24px] text-[16px] font-medium leading-[24px] text-[#3A4050]">
									Rating Guide
								</p>
							</div>
							<div className='w-full'>
								<div className='w-[100%] py-[8px]	px-[18px]'>
									<div className='flex flex-row gap-[10px]  w-full border-b border-[#E5E7EB] '>
										<div className='w-[20%] font-medium text-[13px] leading-[21px] text-[#3A4050] p-[10px] border-r border-[#E5E7EB]'>5</div>
										<div className='w-[50%] font-medium text-[13px] leading-[21px] text-[#3A4050] p-[10px] border-r border-[#E5E7EB]'>Outstanding</div>
										<div className='w-[30%] font-medium text-[13px] leading-[21px] text-[#3A4050] p-[10px] border-[#E5E7EB]'></div>
									</div>
									<div className='flex flex-row gap-[10px]  w-full border-b  border-[#E5E7EB]'>
										<div className='w-[20%] font-medium text-[13px] leading-[21px] text-[#3A4050] p-[10px] border-r border-[#E5E7EB] '>4</div>
										<div className='w-[50%] font-medium text-[13px] leading-[21px] text-[#3A4050] p-[10px] border-r border-[#E5E7EB]'>Exceed Expectation</div>
										<div className='w-[30%] font-medium text-[13px] leading-[21px] text-[#3A4050] p-[10px]'>85%</div>
									</div>
									<div className='flex flex-row gap-[10px]  w-full border-b border-[#E5E7EB]'>
										<div className='w-[20%] font-medium text-[13px] leading-[21px] text-[#3A4050] p-[10px] border-r border-[#E5E7EB]'>3</div>
										<div className='w-[50%] font-medium text-[13px] leading-[21px] text-[#3A4050] p-[10px] border-r border-[#E5E7EB]'>Meet Expectation</div>
										<div className='w-[30%] font-medium text-[13px] leading-[21px] text-[#3A4050] p-[10px] '>80% and 80%</div>
									</div>
									<div className='flex flex-row gap-[10px]  w-full border-b border-[#E5E7EB]'>
										<div className='w-[20%] font-medium text-[13px] leading-[21px] text-[#3A4050] p-[10px] border-r border-[#E5E7EB]'>2</div>
										<div className='w-[50%] font-medium text-[13px] leading-[21px] text-[#3A4050] p-[10px] border-r border-[#E5E7EB]'>Below Expectation</div>
										<div className='w-[30%] font-medium text-[13px] leading-[21px] text-[#3A4050] p-[10px]'>80%</div>
									</div>
									<div className='flex flex-row gap-[10px]  w-full  '>
										<div className='w-[20%] font-medium text-[13px] leading-[21px] text-[#3A4050] p-[10px] border-r border-[#E5E7EB]' >1</div>
										<div className='w-[50%] font-medium text-[13px] leading-[21px] text-[#3A4050] p-[10px] border-r border-[#E5E7EB]'>Unsatisfactory</div>
										<div className='w-[30%] font-medium text-[13px] leading-[21px] text-[#3A4050] p-[10px]'></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='h-[280px]'>
						<div className="box-border w-full md:w-[400px] h-full  bg-white border border-[#E5E7EB]">
							<div className='w-[100%] h-[56px] border-b border-[#E5E7EB] box-border p-[15px]'>
								<p className="  w-full h-[24px] text-[16px] font-medium leading-[24px] text-[#3A4050]">
									KPI Summary
								</p>
							</div>
							<div className='w-full'>

							</div>
						</div>
					</div>
					<div className='h-[200px]'>
						<div className="box-border w-full md:w-[400px] h-full  bg-white border border-[#E5E7EB]">

							<div className='w-full'>

							</div>
						</div>
					</div>

					<div className='flex flex-row gap-[30px] mt-[24px] justify-end'>
						<button
							className="flex flex-row justify-center items-center px-4 py-[10px] gap-2 w-[153px] h-[40px]  border border-[#002DB3] text-[#fff]   !bg-[#002DB3] hover:bg-[#002DB3] transition" >Add More KPI</button>
					</div>
				</div>

			</div>

		</div>
	)
}

export default HrPerformanceEvaluation
