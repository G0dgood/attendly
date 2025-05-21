"use client";
import React, { useState } from 'react'
import PageHeader from '@/components/PageHeader';
import { useRouter } from 'next/navigation';
import PersonalInformation from './PersonalInformation';
import ProfessionalInformation from './ProfessionalInformation';
import { useRegisterUserMutation } from '@/utils/APISlice/userApi';
import { SVGLoader } from '@/components/SVGLoader';
import { Toaster, toast } from 'sonner';

interface ProfessionalInformationProps {
	input: {
		firstName: string;
		lastName: string;
		middleName: string;
		email: string;
		password: string;
		phoneNumber: string;
		role: string;
		address: string;
		gender: string;
		maritalStatus: string;
		dateOfBirth: string;
		country: string;
		state: string;
		city: string;
	};
	handleOnChange: (key: string, value: string) => void;
}

const EmployeeDashBoard: React.FC<ProfessionalInformationProps> = () => {
	const router = useRouter()
	const [registerUser, { isLoading, isSuccess, isError, error }] = useRegisterUserMutation();
	const [activeTab, setActiveTab] = useState(1);
	const [input, setInput] = useState({
		firstName: "",
		lastName: "",
		middleName: "",
		email: "",
		password: "",
		phoneNumber: "",
		role: "",
		address: "",
		gender: "",
		maritalStatus: "",
		dateOfBirth: "",
		country: "",
		state: "",
		city: ""
	});

	console.log('input-input', input)

	const handleOnChange = (input: string, value: string) => {
		setInput((prevState) => ({
			...prevState,
			[input]: value,
		}));
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		try {
			await registerUser(input).unwrap();
			toast.success('Registered successfully!');
		} catch (err: any) {
			console.error('Registration error:', err);
			toast.error(err?.data?.message || 'Registration failed. Please try again.');
		}
	};

	return (
		<div  >
			<Toaster position="top-right" richColors />
			<PageHeader text={"Add New Employee"} />

			<div className="bg-[#fff] mt-[32px] flex flex-col items-start gap-[10px] w-full border border-[#E5E7EB] p-[20px]">
				<div className='flex flex-row  gap-[20px] w-full pt-[10px] border border-[#fff] border-b-[#E5E7EB]'>
					<button
						onClick={() => setActiveTab(1)}
						className={`relative px-[4px] py-[5px] text-[16px] leading-[150%] whitespace-nowrap font-medium ${activeTab === 1 ? 'text-[#003399] border-b border-[#003399]' : 'text-[#3A4050]'
							}`}
					>
						Personal Information
					</button>
					<button
						onClick={() => setActiveTab(2)}
						className={`relative px-[4px] py-[5px] text-[16px] leading-[150%] whitespace-nowrap font-medium ${activeTab === 2 ? 'text-[#003399] border-b border-[#003399]' : 'text-[#3A4050]'
							}`}
					>
						Professional Information
					</button>
				</div>
				{activeTab === 1 ?
					(<PersonalInformation input={input} handleOnChange={handleOnChange} />)
					: (<ProfessionalInformation input={input} handleOnChange={handleOnChange} />)}


				<div className='flex flex-row  justify-end gap-[20px] mt-[24px] w-full'>
					<div className='flex flex-row gap-[20px]'>
						<button
							onClick={() => setActiveTab(1)}
							className="flex flex-row justify-center items-center  py-[8px] gap-[8px]  px-[20px]  bg-white border border-[#E5E7EB]  font-medium text-[12px] leading-[150%] text-[#3A4050] cursor-pointer">
							Back
						</button>
						{activeTab === 1 ?
							<button
								onClick={() => setActiveTab(2)}
								className="flex flex-row justify-center items-center  py-[8px] gap-2  px-[20px] !bg-[#002DB3]   text-[14px] leading-[150%] text-[#FFFFFF] cursor-pointer">
								Next
							</button> : <button
								onClick={handleSubmit}
								className="flex flex-row justify-center items-center  py-[8px] gap-2  px-[20px] !bg-[#002DB3]   text-[14px] leading-[150%] text-[#FFFFFF] cursor-pointer">

								{isLoading ? <SVGLoader width={"20px"} height={"20px"} color={"#FFF"} /> : "Create"}
							</button>}

					</div>

				</div>
			</div >

		</div >
	)
}

export default EmployeeDashBoard
