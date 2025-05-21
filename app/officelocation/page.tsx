"use client";
import React, { useEffect, useState } from 'react'
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options'
import PageHeader from '@/components/PageHeader'
import Search from '@/components/Search'
import Image from "next/image";
import { useOfficeLocation } from '@/utils/OfficeLocationContext';
import moment from "moment";


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
	} = useOfficeLocation()!;

	useEffect(() => {
		fetchOfficeLocations();
	}, []);

	// Merge API data with mock "soner"
	const dataToRender = [
		...(officeLocations?.data || officeLocations || [])
	];

	console.log("Office Locations", officeLocations);


	return (
		<div className='w-full'>
			<PageHeader text={"Office Location"} />

			<div className='flex flex-col md:flex-row justify-between gap-5 mt-6'>
				<Search />

				<div className='flex flex-col md:flex-row gap-5'>
					<button className="flex flex-row justify-center items-center px-5 py-[8px] gap-2 bg-white border border-[#E5E7EB]   font-medium text-[12px] leading-[150%] text-[#3A4050] !rounded-0">
						<Image
							src={require("../../public/icon/Filter_alt.svg")}
							alt="search"
						/>
						Filter
					</button>
					<button className="flex flex-row justify-center items-center px-5 py-[8px] gap-2 !bg-[#002DB3]  font-normal text-[14px] leading-[150%] text-[#FFFFFF] !rounded-0">
						Export
					</button>
				</div>

			</div>

			<div id="table-container">
				<div className="table-responsive-vertical">
					<div className="table-container">
						<table className="table">
							<thead>
								<tr>
									<th>Office ID</th>
									<th>Name</th>
									<th>Address</th>
									<th>Created At</th>
									<th>Updated At</th>
								</tr>
							</thead>
							<tbody>
								{dataToRender?.length === 0 ? (
									<SVGLoaderFetch colSpan={8} />
								) : dataToRender?.length === 0 ? (
									<NoRecordFound colSpan={8} />
								) : (
									dataToRender?.map((office) => (
										<tr key={office.id}>
											<td data-title="Office ID">{office.id}</td>
											<td data-title="Name">{office.name}</td>
											<td data-title="Address">{office.address}</td>
											<td data-title="Created At">
												{moment(office.createdAt).format("YYYY-MM-DD HH:mm")}
											</td>
											<td data-title="Updated At">
												{moment(office.updatedAt).format("YYYY-MM-DD HH:mm")}
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div className='flex flex-row justify-between w-full mt-5'>
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
			</div>
		</div>
	)
}

export default Attendance
