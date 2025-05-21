import CustomDateDropdown from '@/components/CustomDateDropdown';
import Dropdowns from '@/components/CustomDropdown'
import { departmentData, designationData, managerData, roleData } from '@/components/data';
import Input from '@/components/Input'
import React from 'react'

interface ProfessionalInformationProps {
	input: {
		manager: string;
		department: string;
		employee: string;
		firstName: string;
		lastName: string;
		middleName: string;
		email: string;
		phoneNumber: string;
		address: string;
		city: string;
		country: string;
		dateOfBirth: string;
		designation: string;
		role: string;
	};
	handleOnChange: (field: string, value: string) => void;
}

const ProfessionalInformation: React.FC<ProfessionalInformationProps> = ({ input, handleOnChange }) => {
	return (
		<div className='w-full mt-[20px] flex flex-col gap-[32px]'>
			<div className='flex flex-col  md:flex-row gap-[20px] w-full justify-between'>
				< Input value={input.employee}
					handleOnChange={(e) => handleOnChange("employee", e.target.value)}
					label={''} placeholder={'Employee'} type={''} />
				<Dropdowns
					label={'Department'}
					right={''}
					options={departmentData}
					name="department"
					handleOnChange={handleOnChange}
				/>

				<Dropdowns
					label={'Designation'}
					right={''}
					options={designationData}
					name="designation"
					handleOnChange={handleOnChange}
				/>
			</div>
			<div className='flex flex-col  md:flex-row gap-[20px] w-full justify-between'>
				<CustomDateDropdown label={'Joining Date'} name={''} handleOnChange={handleOnChange} />
				<Dropdowns
					label={'Manager'}
					right={''}
					options={managerData}
					name="manager"
					handleOnChange={handleOnChange}
				/>

			</div>
			<div className='flex flex-col  md:flex-row gap-[20px] w-full justify-between '>
				<div className='w-[100%] md:w-[50%]' >
					<CustomDateDropdown label={'Start Date'} name="dateOfBirth"
						handleOnChange={handleOnChange} />
				</div>
				<div className='w-[100%] md:w-[50%]' >
					<Dropdowns
						options={roleData}
						label={'Role'} name="role"
						handleOnChange={handleOnChange} />
				</div>
			</div>
		</div>
	)
}

export default ProfessionalInformation
