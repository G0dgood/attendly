import CustomDateDropdown from '@/components/CustomDateDropdown';
import Dropdowns from '@/components/CustomDropdown';
import { stateData } from '@/components/data';
import Input from '@/components/Input'
import React from 'react'

interface PersonalInformationProps {
	input: {
		firstName: string;
		lastName: string;
		middleName: string;
		email: string;
		phoneNumber: string;
		address: string;
		city: string;
		country: string;
		dateOfBirth: string;
	};
	handleOnChange: (field: string, value: string) => void;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ input, handleOnChange }) => {
	return (
		<div className='w-full mt-[20px] flex flex-col gap-[32px]'>
			<div className='flex flex-col md:flex-row gap-[20px] w-full justify-between'>
				< Input value={input.firstName}
					handleOnChange={(e) => handleOnChange("firstName", e.target.value)}
					label={''} placeholder={'First Name'} type={''} />
				< Input value={input.middleName}
					handleOnChange={(e) => handleOnChange("middleName", e.target.value)}
					label={''} placeholder={'Middle Name'} type={''} />
				< Input value={input.lastName}
					handleOnChange={(e) => handleOnChange("lastName", e.target.value)}
					label={''} placeholder={'Last Name'} type={''} />
			</div>
			<div className='flex flex-col md:flex-row gap-[20px] w-full justify-between'>

				< Input value={input.phoneNumber}
					handleOnChange={(e) => handleOnChange("phoneNumber", e.target.value)}
					label={''} placeholder={'Mobile Number'} type={''} />


				< Input value={input.email}
					handleOnChange={(e) => handleOnChange("email", e.target.value)}
					label={''} placeholder={'Email Address'} type={''} />

			</div>
			<div className='flex flex-col md:flex-row gap-[20px] w-full justify-between'>

				< Input value={input.dateOfBirth}
					handleOnChange={(e) => handleOnChange("value1", e.target.value)}
					label={''} placeholder={'Date of Birth'} type={''} />
				<CustomDateDropdown label={'Date of Birth'} name="dateOfBirth"
					handleOnChange={handleOnChange} />

				<Dropdowns
					label={'Marital Status'}
					right={''}
					options={[
						"Single",
						"Married",
						"Divorced",
						"Separated",
						"Widowed"
					]}
					name={''} handleOnChange={handleOnChange}
				/>

			</div>
			<div className='flex flex-col md:flex-row gap-[20px] w-full justify-between'>
				< Input value={input.country}
					handleOnChange={(e) => handleOnChange("country", e.target.value)}
					label={''} placeholder={'Nationality'} type={''} />

				<Dropdowns
					label={'Gender'}
					right={''}
					options={[
						"Male",
						"Female",
						"Other",
						"Prefer not to say"
					]} name={''} handleOnChange={handleOnChange} />

			</div>

			<div className='flex flex-col md:flex-row gap-[20px] w-full justify-between'>
				< Input value={input.address}
					handleOnChange={(e) => handleOnChange("address", e.target.value)}
					label={''} placeholder={'Address'} type={''} />

			</div>
			<div className='flex flex-col md:flex-row gap-[20px] w-full justify-between'>
				<Dropdowns
					label={'State'}
					right={''}
					options={stateData}
					name={''} handleOnChange={handleOnChange}
				/>

				< Input value={input.city}
					handleOnChange={(e) => handleOnChange("city", e.target.value)}
					label={''} placeholder={'City'} type={''} />
			</div>
		</div>
	)
}

export default PersonalInformation