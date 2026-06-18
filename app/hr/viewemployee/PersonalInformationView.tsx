import React from 'react'

const PersonalInformationView = ({ user }: any) => {
	const name = user?.fullName || user?.name || '—';
	const role = user?.role || '—';
	const email = user?.email || '—';
	const phone = user?.phone || '—';
	const gender = user?.gender || '—';
	const status = user?.isActive || '—';

	return (
		<div className="flex flex-col  justify-center pt-[25px] gap-[20px] ">
			<div className='flex flex-row gap-[20px] w-full '>
				<div className='w-[50%] border border-[#fff] border-b-[#E5E7EB] '>
					<div className='w-full flex flex-col pb-[10px]'>
						<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>Employee</p>
						<h1 className='font-medium text-[14px] leading-[150%] text-[#3A4050]'>{name}</h1>
					</div>
				</div>
				<div className='w-[50%] border border-[#fff] border-b-[#E5E7EB] '>
					<div className='w-full flex flex-col pb-[10px]'>
						<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>Role</p>
						<h1 className='font-medium text-[14px] leading-[150%] text-[#3A4050]'>{role}</h1>
					</div>
				</div>
			</div>
			<div className='flex flex-row gap-[20px] w-full '>
				<div className='w-[50%] border border-[#fff] border-b-[#E5E7EB] '>
					<div className='w-full flex flex-col pb-[10px]'>
						<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>Email</p>
						<h1 className='font-medium text-[14px] leading-[150%] text-[#3A4050]'>{email}</h1>
					</div>
				</div>
				<div className='w-[50%] border border-[#fff] border-b-[#E5E7EB] '>
					<div className='w-full flex flex-col pb-[10px]'>
						<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>Phone</p>
						<h1 className='font-medium text-[14px] leading-[150%] text-[#3A4050]'>{phone}</h1>
					</div>
				</div>
			</div>
			<div className='flex flex-row gap-[20px] w-full '>
				<div className='w-[50%] border border-[#fff] border-b-[#E5E7EB] '>
					<div className='w-full flex flex-col pb-[10px]'>
						<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>Gender</p>
						<h1 className='font-medium text-[14px] leading-[150%] text-[#3A4050]'>{gender}</h1>
					</div>
				</div>
				<div className='w-[50%] border border-[#fff] border-b-[#E5E7EB] '>
					<div className='w-full flex flex-col pb-[10px]'>
						<p className='font-normal text-[14px] leading-[150%] text-[#6D7280]'>Status</p>
						<h1 className='font-medium text-[14px] leading-[150%] text-[#3A4050]'>
							{status === 'active' ? 'Active' : status === 'inactive' ? 'Inactive' : status}
						</h1>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PersonalInformationView
