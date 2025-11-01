import React from 'react'

const PersonalInformationView = ({ user }: any) => {
	return (
		<div className="flex flex-col  justify-center pt-[25px] gap-[20px] ">
			<div className='flex flex-row gap-[20px] w-full '>
				<div className='w-[50%] border border-[#fff] border-b-[#E5E7EB] '>
					<div className='w-full flex flex-col pb-[10px]'>
						<p className='ont-normal text-[14px] leading-[150%] text-[#6D7280]'>Employee</p>
						<h1 className='font-medium text-[14px] leading-[150%] text-[#3A4050]'>{user?.fullName}</h1>
					</div>
				</div>
				<div className='w-[50%] border border-[#fff] border-b-[#E5E7EB] '>
					<div className='w-full flex flex-col pb-[10px]'>
						<p className='ont-normal text-[14px] leading-[150%] text-[#6D7280]'>Role</p>
						<h1 className='font-medium text-[14px] leading-[150%] text-[#3A4050]'>{user?.role}</h1>
					</div>
				</div>
			</div>
			<div className='flex flex-row gap-[20px] w-full '>
				<div className='w-[50%] border border-[#fff] border-b-[#E5E7EB] '>
					<div className='w-full flex flex-col pb-[10px]'>
						<p className='ont-normal text-[14px] leading-[150%] text-[#6D7280]'>Email</p>
						<h1 className='font-medium text-[14px] leading-[150%] text-[#3A4050]'>{user?.email}</h1>
					</div>
				</div>
				<div className='w-[50%] border border-[#fff] border-b-[#E5E7EB] '>
					<div className='w-full flex flex-col pb-[10px]'>
						<p className='ont-normal text-[14px] leading-[150%] text-[#6D7280]'>Phone</p>
						<h1 className='font-medium text-[14px] leading-[150%] text-[#3A4050]'>{user?.phone}</h1>
					</div>
				</div>
			</div>




		</div>
	)
}

export default PersonalInformationView
