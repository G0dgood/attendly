"use client";
import React, { useState, Suspense } from 'react'
import Image from "next/image";
import PageHeader from '@/components/PageHeader';
import PersonalInformationView from './PersonalInformationView';
import { useUserPrivileges } from '@/utils/userPrivileges';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGetUserByIdQuery } from '@/utils/APISlice/userApi';
import { SVGLoader } from '@/components/SVGLoader';
import EditEmployeeModal from '@/components/modals/EditEmployeeModal';

const ViewEmployeeContent = () => {
	const [activeTabs, setActiveTabs] = useState(1);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const { user } = useUserPrivileges();
	const searchParams = useSearchParams();
	const router = useRouter();
	const employeeId = searchParams.get('id');

	// Query user if ID is present in search parameters
	const { data: employeeData, isLoading: isLoadingEmployee } = useGetUserByIdQuery(
		employeeId || '',
		{ skip: !employeeId }
	);

	if (employeeId && isLoadingEmployee) {
		return (
			<div className="flex justify-center items-center h-[300px] w-full">
				<SVGLoader width="40px" height="40px" color="#2563EB" />
			</div>
		);
	}

	const displayUser = employeeId
		? (employeeData?.data?.user || employeeData?.data?.data || employeeData?.data || employeeData)
		: user;

	// In case there is no user loaded and no session
	if (!displayUser) {
		return (
			<div className="flex justify-center items-center h-[300px] w-full">
				<p className="text-gray-500 font-medium">No employee information found.</p>
			</div>
		);
	}

	return (
		<div className=''>
			<div className="mb-4">
				<button
					onClick={() => router.back()}
					className="cursor-pointer flex flex-row items-center gap-2 text-[#6D7280] hover:text-[#3A4050] text-[14px] font-medium transition bg-transparent border-0 outline-none p-0"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
					Back
				</button>
			</div>
			<div className='flex flex-row justify-between gap-[20px] border border-[#fff] border-b-[#E5E7EB] pb-[20px]'>
				<PageHeader
					text={displayUser?.fullName || displayUser?.name}
					textsup={displayUser?.role}
					textsupSmall={displayUser?.email} />
				<button
					onClick={() => setIsEditModalOpen(true)}
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
							<PersonalInformationView user={displayUser} />
						</div>
					</div>
				</div>
			</div>
			<EditEmployeeModal
				isOpen={isEditModalOpen}
				setIsOpen={setIsEditModalOpen}
				user={displayUser}
			/>
		</div>
	)
}

const EmployeeDashBoard = () => {
	return (
		<Suspense fallback={
			<div className="flex justify-center items-center h-[300px] w-full">
				<SVGLoader width="40px" height="40px" color="#2563EB" />
			</div>
		}>
			<ViewEmployeeContent />
		</Suspense>
	);
}

export default EmployeeDashBoard;
