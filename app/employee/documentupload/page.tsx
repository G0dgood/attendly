"use client";
import React, { useEffect, useState } from 'react'
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options'
import PageHeader from '@/components/PageHeader'
import Search from '@/components/Search'
import { docData } from '@/components/data';
import Image from "next/image";



const DocumentManagement = () => {
	const [displayData, setDisplayData] = useState<any[]>(docData)
	const [isLoading, setIsLoading] = useState<boolean>(false)



	return (
		<div>
			<div className="flex flex-col md:flex-row justify-between gap-[20px]">

				<PageHeader
					text={"Required Documents Upload"}
					textsup={"Please upload all required documents."}
				/>
				<button className="flex flex-row justify-center items-center   py-[8px] gap-2  px-[20px] !bg-[#002DB3]  font-normal text-sm leading-[150%] text-[#FFFFFF] h-[40px]">
					Submit documents
				</button>
			</div>
			<div
				className="mt-[32px]  flex flex-col items-start  gap-[32px] w-full ">

				<div className="w-full grid grid-cols-1 md:!grid-cols-2 gap-[20px]" 	>
					<div
						style={{ boxShadow: '0px 2px 4px -1px #0000001A, 0px 2px 4px -2px #0000001A' }}
						className="box-border w-full h-[251px] border border-[#E5E7EB] p-[24px] bg-white">

						<p>Birth Certificate</p>

						<div className="box-border flex flex-col justify-center items-center py-[16px] px-[24px] gap-1 w-[auto] h-[152px] bg-white border-2 border-dashed border-[#E5E7EB] mt-[24px]">

							<span
								style={{ boxShadow: '0px 4px 6px -1px #0000001A, 0px 2px 4px -2px #0000001A' }}
								className="flex flex-row justify-center items-center w-[40px] h-[40px] bg-white border border-[#E5E7EB] !shadow-md !rounded-[8px]">
								<Image
									src={require("../../../public/icon/upload-cloud.svg")}
									alt="search"
								/>
							</span>

							<div className='flex flex-row items-center gap-[4px]'>
								<p className='font-semibold text-[14px] leading-[150%] text-[#002DB3]'>Browse File</p>
								<p className='font-normal text-[14px] leading-[150%] text-[#3A4050]'>or drag and drop</p>
							</div>
							<p className='text-[#3A4050] text-[12px] font-normal'>PDF or JPG, max 2MB</p>
						</div>
					</div>

					<div
						style={{ boxShadow: '0px 2px 4px -1px #0000001A, 0px 2px 4px -2px #0000001A' }}
						className="box-border w-full h-[251px] border border-[#E5E7EB] p-[24px] bg-white">
						<p>NYSC Certificate</p>
						<div className="box-border flex flex-col justify-center items-center !py-[16px] !px-[24px] gap-1 w-[auto] h-[152px] bg-white border-2 border-dashed border-[#E5E7EB] mt-[24px]">

							<span
								style={{ boxShadow: '0px 4px 6px -1px #0000001A, 0px 2px 4px -2px #0000001A' }}
								className="flex flex-row justify-center items-center w-[40px] h-[40px] bg-white border border-[#E5E7EB] !shadow-md !rounded-[8px]">
								<Image
									src={require("../../../public/icon/upload-cloud.svg")}
									alt="search"
								/>
							</span>

							<div className='flex flex-row items-center gap-[4px]'>
								<p className='font-semibold text-[14px] leading-[150%] text-[#002DB3]'>Browse File</p>
								<p className='font-normal text-[14px] leading-[150%] text-[#3A4050]'>or drag and drop</p>
							</div>
							<p className='text-[#3A4050] text-[12px] font-normal'>PDF or JPG, max 2MB</p>
						</div>
					</div>
				</div>
				<div className="w-full grid grid-cols-1 md:!grid-cols-2 gap-[20px] " 	>
					<div
						style={{ boxShadow: '0px 2px 4px -1px #0000001A, 0px 2px 4px -2px #0000001A' }}
						className="box-border w-full h-[251px] border border-[#E5E7EB] p-[24px] bg-white">

						<p>Curriculum Vitae</p>

						<div className="box-border flex flex-col justify-center items-center py-[16px] px-[24px] gap-1 w-[auto] h-[152px] bg-white border-2 border-dashed border-[#E5E7EB] mt-[24px]">

							<span
								style={{ boxShadow: '0px 4px 6px -1px #0000001A, 0px 2px 4px -2px #0000001A' }}
								className="flex flex-row justify-center items-center w-[40px] h-[40px] bg-white border border-[#E5E7EB] !shadow-md !rounded-[8px]">
								<Image
									src={require("../../../public/icon/upload-cloud.svg")}
									alt="search"
								/>
							</span>

							<div className='flex flex-row items-center gap-[4px]'>
								<p className='font-semibold text-[14px] leading-[150%] text-[#002DB3]'>Browse File</p>
								<p className='font-normal text-[14px] leading-[150%] text-[#3A4050]'>or drag and drop</p>
							</div>
							<p className='text-[#3A4050] text-[12px] font-normal'>PDF or JPG, max 2MB</p>
						</div>
					</div>


				</div>


			</div>


			<div className='!mt-[40px]'>
				<h3 className='font-medium text-[24px] leading-[150%] text-[#3A4050]'>Forms to Download & Submit</h3>
				<p className="font-medium text-[14px] leading-[150%] text-[#6D7280]">
					Download, complete, and upload back to the system. Some documents require signatures from you or third parties. Please follow the instructions for each document.
				</p>
			</div>

			<div className='flex flex-col md:flex-row gap-[20px] justify-between !mt-[40px]'>
				<div className="box-border flex flex-col items-start !p-[24px_16px] gap-[24px] w-[100%] md:w-[50%]  h-[155px] bg-white border border-[#E5E7EB]">

					<div className='flex items-center gap-[10px]'>
						<Image
							src={require("../../../public/icon/pdfIcon.svg")}
							alt="search"
						/>
						<div>
							<p className='font-medium text-[14px] leading-[150%] text-[#3A4050]'>Guarantor's Form</p>
							<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>200 KB</p>
						</div>
					</div>
					<div className='flex items-center gap-[20px] w-full'>
						<button className="flex flex-row justify-center items-center px-[16px] py-[10px] gap-[8px] w-full h-[40px] !bg-[#002DB3] font-normal text-[14px] leading-[150%] text-[#fff]">
							<Image
								src={require("../../../public/icon/Download_light.svg")}
								alt="Download_light"
							/>
							Download
						</button>
						<button className="flex flex-row justify-center items-center px-[16px] py-[10px] gap-[8px] w-full h-[40px] !bg-[#F3F4F6] font-normal text-[14px] leading-[150%] text-[#002DB3]">
							<Image
								src={require("../../../public/icon/Upload_light.svg")}
								alt="Upload_light"
							/>
							Upload
						</button>

					</div>
				</div>
				<div className="box-border flex flex-col items-start p-[24px_16px] gap-[24px] w-[100%] md:w-[50%] h-[155px] bg-white border border-[#E5E7EB]">

					<div className='flex items-center gap-[10px]'>
						<Image
							src={require("../../../public/icon/pdfIcon.svg")}
							alt="search"
						/>
						<div>
							<p className='font-medium text-[14px] leading-[150%] text-[#3A4050]'>Attestation Form</p>
							<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>200 KB</p>
						</div>
					</div>
					<div className='flex items-center gap-[20px] w-full'>
						<button className="flex flex-row justify-center items-center px-[16px] py-[10px] gap-[8px] w-full h-[40px] !bg-[#002DB3] font-normal text-[14px] leading-[150%] text-[#fff]">
							<Image
								src={require("../../../public/icon/Download_light.svg")}
								alt="Download_light"
							/>
							Download
						</button>
						<button className="flex flex-row justify-center items-center px-[16px] py-[10px] gap-[8px] w-full h-[40px] !bg-[#F3F4F6] font-normal text-[14px] leading-[150%] text-[#002DB3]">
							<Image
								src={require("../../../public/icon/Upload_light.svg")}
								alt="Upload_light"
							/>
							Upload
						</button>

					</div>
				</div>
			</div>

			<div className='flex flex-col md:flex-row gap-[20px] justify-between !mt-[40px]'>
				<div className="box-border flex flex-col items-start !p-[24px_16px] gap-[24px] w-[100%] md:w-[50%]  h-[155px] bg-white border border-[#E5E7EB]">

					<div className='flex items-center gap-[10px]'>
						<Image
							src={require("../../../public/icon/pdfIcon.svg")}
							alt="search"
						/>
						<div>
							<p className='font-medium text-[14px] leading-[150%] text-[#3A4050]'>Guarantor's Form</p>
							<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>200 KB</p>
						</div>
					</div>
					<div className='flex items-center gap-[20px] w-full'>
						<button className="flex flex-row justify-center items-center px-[16px] py-[10px] gap-[8px] w-full h-[40px] !bg-[#002DB3] font-normal text-[14px] leading-[150%] text-[#fff]">
							<Image
								src={require("../../../public/icon/Download_light.svg")}
								alt="Download_light"
							/>
							Download
						</button>
						<button className="flex flex-row justify-center items-center px-[16px] py-[10px] gap-[8px] w-full h-[40px] !bg-[#F3F4F6] font-normal text-[14px] leading-[150%] text-[#002DB3]">
							<Image
								src={require("../../../public/icon/Upload_light.svg")}
								alt="Upload_light"
							/>
							Upload
						</button>

					</div>
				</div>
				<div className="box-border flex flex-col items-start p-[24px_16px] gap-[24px] w-[100%] md:w-[50%] h-[155px] bg-white border border-[#E5E7EB]">

					<div className='flex items-center gap-[10px]'>
						<Image
							src={require("../../../public/icon/pdfIcon.svg")}
							alt="search"
						/>
						<div>
							<p className='font-medium text-[14px] leading-[150%] text-[#3A4050]'>Attestation Form</p>
							<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>200 KB</p>
						</div>
					</div>
					<div className='flex items-center gap-[20px] w-full'>
						<button className="flex flex-row justify-center items-center px-[16px] py-[10px] gap-[8px] w-full h-[40px] !bg-[#002DB3] font-normal text-[14px] leading-[150%] text-[#fff]">
							<Image
								src={require("../../../public/icon/Download_light.svg")}
								alt="Download_light"
							/>
							Download
						</button>
						<button className="flex flex-row justify-center items-center px-[16px] py-[10px] gap-[8px] w-full h-[40px] !bg-[#F3F4F6] font-normal text-[14px] leading-[150%] text-[#002DB3]">
							<Image
								src={require("../../../public/icon/Upload_light.svg")}
								alt="Upload_light"
							/>
							Upload
						</button>

					</div>
				</div>

			</div>
			<div className='flex flex-col md:flex-row gap-[20px] justify-between !mt-[40px]'>
				<div className="box-border flex flex-col items-start !p-[24px_16px] gap-[24px] w-[100%] md:w-[50%]  h-[155px] bg-white border border-[#E5E7EB]">

					<div className='flex items-center gap-[10px]'>
						<Image
							src={require("../../../public/icon/pdfIcon.svg")}
							alt="search"
						/>
						<div>
							<p className='font-medium text-[14px] leading-[150%] text-[#3A4050]'>Guarantor's Form</p>
							<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>200 KB</p>
						</div>
					</div>
					<div className='flex items-center gap-[20px] w-full'>
						<button className="flex flex-row justify-center items-center px-[16px] py-[10px] gap-[8px] w-full h-[40px] !bg-[#002DB3] font-normal text-[14px] leading-[150%] text-[#fff]">
							<Image
								src={require("../../../public/icon/Download_light.svg")}
								alt="Download_light"
							/>
							Download
						</button>
						<button className="flex flex-row justify-center items-center px-[16px] py-[10px] gap-[8px] w-full h-[40px] !bg-[#F3F4F6] font-normal text-[14px] leading-[150%] text-[#002DB3]">
							<Image
								src={require("../../../public/icon/Upload_light.svg")}
								alt="Upload_light"
							/>
							Upload
						</button>

					</div>
				</div>
				<div className="box-border flex flex-col items-start p-[24px_16px] gap-[24px] w-[100%] md:w-[50%] h-[155px] bg-white border border-[#E5E7EB]">

					<div className='flex items-center gap-[10px]'>
						<Image
							src={require("../../../public/icon/pdfIcon.svg")}
							alt="search"
						/>
						<div>
							<p className='font-medium text-[14px] leading-[150%] text-[#3A4050]'>Attestation Form</p>
							<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>200 KB</p>
						</div>
					</div>
					<div className='flex items-center gap-[20px] w-full'>
						<button className="flex flex-row justify-center items-center px-[16px] py-[10px] gap-[8px] w-full h-[40px] !bg-[#002DB3] font-normal text-[14px] leading-[150%] text-[#fff]">
							<Image
								src={require("../../../public/icon/Download_light.svg")}
								alt="Download_light"
							/>
							Download
						</button>
						<button className="flex flex-row justify-center items-center px-[16px] py-[10px] gap-[8px] w-full h-[40px] !bg-[#F3F4F6] font-normal text-[14px] leading-[150%] text-[#002DB3]">
							<Image
								src={require("../../../public/icon/Upload_light.svg")}
								alt="Upload_light"
							/>
							Upload
						</button>

					</div>
				</div>

			</div>

		</div >
	)
}

export default DocumentManagement
