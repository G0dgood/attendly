"use client";
import React, { useEffect, useRef, useState } from 'react'
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options'
import PageHeader from '@/components/PageHeader'
import Search from '@/components/Search'
import Image from "next/image";
import { useOfficeLocation } from '@/utils/OfficeLocationContext';
import moment from "moment";
import OfficeLocationModal from '@/components/modals/OfficeLocationModal';
import { toast } from 'sonner';
import OfficeLocationUpdateModal from '@/components/modals/OfficeLocationUpdateModal';


const Attendance = () => {
	const {
		officeLocations,
		isLoading,
		fetchOfficeLocations,
		addOfficeLocation,
		updateOfficeLocation,
		error,
		success,
		modalOpen,
		setModalOpen,
		successUpdate,
		setSuccessUpdate,
		setSuccess
	} = useOfficeLocation()!;
	const [isOpen, setIsOpen] = useState(false);


	useEffect(() => {
		fetchOfficeLocations();
	}, []);

	// Merge API data with mock "soner"
	const dataToRender = [
		...(officeLocations?.data || officeLocations || [])
	];

	console.log("Office Locations", officeLocations);
	useEffect(() => {
		if (success) {
			toast.success("Office Locations Created!");
			fetchOfficeLocations();
			setSuccess(false)
		} else if (successUpdate) {
			toast.success("Office Locations Updated!");
			fetchOfficeLocations();


		}
	}, [success, successUpdate]);

	useEffect(() => {
		if (
			success || successUpdate
		) {
			const timer = setTimeout(() => {
				setSuccess(false);
				setSuccessUpdate(false)
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [success, successUpdate]);

	return (
		<div className='w-full'>
			<PageHeader text={"Office Location"} />

			<div className='flex flex-col md:flex-row justify-between gap-5 mt-6'>
				<Search />

				<div className='flex flex-col md:flex-row gap-5'>


					<button className="flex flex-row justify-center items-center px-5 py-[8px] gap-2 !bg-[#2563EB]  font-normal text-[14px] leading-[150%] text-[#FFFFFF] rounded-none"
						onClick={() => setIsOpen(true)}>
						Create Office
					</button>
				</div>

			</div>


			<div className="table-responsive-vertical mt-5">
				<div className="table-container">
					<table className="table">
						<thead>
							<tr>
								<th>Office ID</th>
								<th>Name</th>
								<th>Address</th>
								<th>Created At</th>
								<th>Updated At</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{isLoading ? (
								<SVGLoaderFetch colSpan={6} />
							) : dataToRender?.length === 0 ? (
								<NoRecordFound colSpan={6} />
							) : (
								dataToRender?.map((office) => (
									<tr key={office.id}>
										<td data-title="Office ID">
											<button
												onClick={() => {
													navigator.clipboard.writeText(office.id);
													toast.success("Copied Office ID to clipboard");
												}}
												className="cursor-pointer flex flex-row justify-center items-center px-[6px] py-[4px] w-[70px] h-[22px] 
      border font-medium text-[12px] leading-[18px] 
      bg-[#EFF6FF] border-[#93C5FD] text-[#1D4ED8] hover:bg-[#DBEAFE] transition"
												title="Copy Office ID"
											>
												<span className="mr-1">Copy ID</span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-3.5 w-3.5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path d="M4 4a2 2 0 012-2h6a2 2 0 012 2v2h2a2 2 0 012 2v8a2 2 0 01-2 2h-6a2 2 0 01-2-2v-2H6a2 2 0 01-2-2V4z" />
												</svg>
											</button>
										</td>


										<td data-title="Name">{office.name}</td>
										<td data-title="Address">{office.address}</td>
										<td data-title="Created At">
											{moment(office.createdAt).format("YYYY-MM-DD HH:mm")}
										</td>
										<td data-title="Updated At">
											{moment(office.updatedAt).format("YYYY-MM-DD HH:mm")}
										</td>
										<td data-title="Updated">
											<OfficeLocationUpdateModal id={office?.id} office={office} />
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* <div className='flex flex-row justify-between w-full mt-5'>
				<button className="flex flex-row justify-center items-center py-2 gap-2  px-5  bg-white border border-[#E5E7EB] font-medium text-3 leading-[150%] text-[#3A4050]">
					<Image
						src={require("../../public/icon/arrow-left.svg")}
						alt="Next"
					/> Previous</button>
				<div className="flex flex-row items-center gap-[10px]">
					<button className="w-5 h-5 bg-[#F9FAFB] flex justify-center items-center border border-[#E5E7EB]
				text-3 leading-5 text-center text-[#050711] font-inter">1</button>
					<button className="text-3 leading-5 text-center text-[#050711] font-inter">2</button>
					<button className="text-3 leading-5 text-center text-[#050711] font-inter">3</button>
					<div>
						<Image
							src={require("../../public/icon/Number.svg")}
							alt="Next"
						/>
					</div>
					<button className="text-3 leading-5 text-center text-[#050711] font-inter">8</button>
					<button className="text-3 leading-5 text-center text-[#050711] font-inter">9</button>
					<button className="text-3 leading-5 text-center text-[#050711] font-inter">10</button>
				</div>
				<button className="flex flex-row justify-center items-center   py-2 gap-2  px-5  bg-white border border-[#E5E7EB]   font-medium text-[12px] leading-[150%] text-[#3A4050]">
					Next
					<Image
						src={require("../../public/icon/arrow-right.svg")}
						alt="Next"
					/>
				</button>
			</div> */}
			<OfficeLocationModal isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	)
}

export default Attendance
